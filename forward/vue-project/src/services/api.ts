import axios from 'axios';
import type { Conversation as IConversation, Message as IMessage, User } from '../types';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

// 添加请求拦截器
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export interface AuthResponse {
  user: User;
  token: string;
}

export const login = (username: string, password: string): Promise<AuthResponse> => 
  api.post('/login', { username, password }).then(response => response.data);

export const register = (username: string, email: string, password: string): Promise<AuthResponse> => 
  api.post('/register', { username, email, password }).then(response => response.data);

export const getConversations = (): Promise<IConversation[]> => 
  api.get('/conversations').then(response => {
    console.log('Conversations response:', response.data);
    if (response.data && response.data.conversations) {
      if (Array.isArray(response.data.conversations)) {
        return response.data.conversations.filter((conv: any) => 
          conv && typeof conv === 'object' && conv.id && conv.title && Array.isArray(conv.messages)
        ) as IConversation[];
      }
    }
    return []; // 如果没有对话，返回空数组
  });

export const getConversationMessages = (conversationId: string): Promise<IMessage[]> => 
  api.get(`/conversations/${conversationId}/messages`).then(response => response.data);

export const updateConversationTitle = (conversationId: string, title: string): Promise<void> => 
  api.put(`/conversations/${conversationId}/title`, { title });

export const sendMessage = (conversationId: string, message: string): Promise<IMessage> => 
  api.post('/chat', { conversation_id: conversationId, message }).then(response => response.data);

export const createConversation = (title: string = "新对话"): Promise<IConversation> => 
  api.post('/conversations', { title }).then(response => response.data);

export default api;
