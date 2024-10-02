import axios from 'axios';
import Cookies from 'js-cookie';
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
    login: async (emailOrUsername, password) => {
        const response = await api.post('/login', { emailOrUsername, password });
        if (response.data && response.data.token) {
            Cookies.set('token', response.data.token, { secure: true, sameSite: 'strict' });
            console.log('Token set:', response.data.token); // 添加这行来调试
        }
        return response.data;
    },
    register: async (username, email, password) => {
        const response = await api.post('/register', { username, email, password });
        Cookies.set('token', response.data.token, { secure: true, sameSite: 'strict' });
        return response.data;
    },
    verifyToken: async () => {
        const token = Cookies.get('token');
        const response = await api.get('/verify-token', {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    },
    logout: () => {
        Cookies.remove('token');
    },
};
export const chatService = {
    sendMessage: async (conversationId, content) => {
        const response = await api.post('/chat', { conversationId, content });
        return response.data;
    },
    getConversations: async () => {
        const response = await api.get('/conversations');
        return response.data;
    },
    getMessages: async (conversationId) => {
        const response = await api.get(`/conversations/${conversationId}/messages`);
        console.log('Received messages:', response.data.messages);
        return response.data;
    },
    startNewConversation: async () => {
        const response = await api.post('/conversations');
        return response.data;
    },
    getModels: async () => {
        const response = await api.get('/models');
        return response.data;
    },
};
export const userService = {
    getUserInfo: async () => {
        const response = await api.get('/user/info');
        return response.data;
    },
    getSettings: async () => {
        const response = await api.get('/user/settings');
        return response.data;
    },
    updateSettings: async (settings) => {
        const response = await api.post('/user/settings', settings);
        return response.data;
    },
};
//# sourceMappingURL=api.js.map