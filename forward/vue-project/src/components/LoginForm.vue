<template>
  <form @submit.prevent="handleSubmit" class="login-form">
    <h2>{{ isLogin ? '登录' : '注册' }}</h2>
    <div v-if="error" class="error-message">{{ error }}</div>
    <div class="form-group">
      <label for="username">用户名</label>
      <input type="text" id="username" v-model="username" required>
    </div>
    <div class="form-group" v-if="!isLogin">
      <label for="email">邮箱</label>
      <input type="email" id="email" v-model="email" required>
    </div>
    <div class="form-group">
      <label for="password">密码</label>
      <input type="password" id="password" v-model="password" required>
    </div>
    <button type="submit">{{ isLogin ? '登录' : '注册' }}</button>
    <p @click="toggleMode" class="toggle-mode">
      {{ isLogin ? '没有账号？点击注册' : '已有账号？点击登录' }}
    </p>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/user';
import { register } from '../services/api';
import axios from 'axios';

const router = useRouter();
const userStore = useUserStore();

const isLogin = ref(true);
const username = ref('');
const email = ref('');
const password = ref('');
const error = ref('');

const toggleMode = () => {
  isLogin.value = !isLogin.value;
  error.value = '';
};

const handleSubmit = async () => {
  error.value = '';
  try {
    if (isLogin.value) {
      console.log('Attempting login...');
      await userStore.login(username.value, password.value);
    } else {
      console.log('Attempting registration...');
      await register(username.value, email.value, password.value);
      // 如果注册成功，自动登录
      await userStore.login(username.value, password.value);
    }
    console.log('Authentication successful');
    router.push('/chat');
  } catch (err) {
    console.error('Authentication error:', err);
    if (axios.isAxiosError(err)) {
      error.value = err.response?.data?.message || '认证失败，请检查您的输入';
    } else {
      error.value = '发生未知错误，请稍后再试';
    }
  }
};
</script>

<style scoped>
.login-form {
  max-width: 300px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.toggle-mode {
  text-align: center;
  margin-top: 10px;
  cursor: pointer;
  color: #007bff;
}

.error-message {
  color: red;
  margin-bottom: 10px;
  text-align: center;
}
</style>
