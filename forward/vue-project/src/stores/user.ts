import { defineStore } from 'pinia';
import type { User } from '../types';
import { login as apiLogin } from '../services/api'; // 确保导入 login 函数

export const useUserStore = defineStore('user', {
  state: () => ({
    currentUser: null as User | null,
    token: localStorage.getItem('token') as string | null, // 从 localStorage 初始化 token
  }),
  getters: {
    isLoggedIn: (state) => !!state.token,
  },
  actions: {
    setUser(user: User | null) {
      this.currentUser = user;
    },
    setToken(token: string) {
      this.token = token;
      localStorage.setItem('token', token);
    },
    logout() {
      this.currentUser = null;
      this.token = null;
      localStorage.removeItem('token');
    },
    async login(username: string, password: string) {
      try {
        const response = await apiLogin(username, password);
        this.setUser(response.user);
        this.setToken(response.token);
        return response;
      } catch (error) {
        console.error('Login failed:', error);
        throw error;
      }
    },
  },
});
