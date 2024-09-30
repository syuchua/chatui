import axios from 'axios';
import Cookies from 'js-cookie';
import type { User, Message, Conversation } from '@/types';

const api = axios.create({
  baseURL: '/api', // 使用相对路径，让 Vite 代理处理
  withCredentials: true,
});

// 拦截器添加token到请求头
api.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  login: async (emailOrUsername: string, password: string) => {
    const response = await api.post<{ token: string; user: User }>('/login', { emailOrUsername, password });
    if (response.data && response.data.token) {
      Cookies.set('token', response.data.token, { secure: true, sameSite: 'strict' });
      console.log('Token set:', response.data.token); // 添加这行来调试
    }
    return response.data;
  },
  register: async (username: string, email: string, password: string) => {
    const response = await api.post<{ token: string; user: User }>('/register', { username, email, password });
    Cookies.set('token', response.data.token, { secure: true, sameSite: 'strict' });
    return response.data;
  },
  verifyToken: async () => {
    const token = Cookies.get('token');
    const response = await api.get<{ valid: boolean; user: User }>('/verify-token', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },
  logout: () => {
    Cookies.remove('token');
  },
};

export const chatService = {
  sendMessage: async (conversationId: string, content: string) => {
    const response = await api.post<Message>('/chat', { conversationId, content });
    return response.data;
  },
  getConversations: async () => {
    const response = await api.get<Conversation[]>('/conversations');
    return response.data;
  },
  getMessages: async (conversationId: string) => {
    const response = await api.get<Message[]>(`/conversations/${conversationId}/messages`);
    return response.data;
  },
  startNewConversation: async () => {
    const response = await api.post<Conversation>('/conversations');
    return response.data;
  },
  getModels: async () => {
    const response = await api.get<string[]>('/models');
    return response.data;
  },
};

export const userService = {
  updateSettings: async (baseUrl: string, apiKey: string, model: string) => {
    const response = await api.post('/user/settings', { baseUrl, apiKey, model });
    return response.data;
  },
};
