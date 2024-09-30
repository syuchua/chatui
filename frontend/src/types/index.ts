export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Conversation {
  id: string;
  title: string;
  date: string;
}

export interface Message {
  id: string;
  conversationId: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  status: 'sent' | 'sending' | 'error' | 'loading' | 'streaming';
}

export interface Credentials {
  email: string;
  password: string;
}

export interface UserData {
  name: string;
  email: string;
  password: string;
}

export interface ApiResponse<T> {
  data: T;
}