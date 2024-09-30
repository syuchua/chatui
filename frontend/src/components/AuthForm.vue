<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center p-4">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
      <div class="p-5">
        <h2 class="text-2xl font-bold text-center text-gray-700 mb-4">
          {{ isLogin ? 'Welcome Back' : 'Create an Account' }}
        </h2>
        <div class="flex justify-center mb-6">
          <button 
            @click="isLogin = true" 
            :class="['px-4 py-2 rounded-l-md', isLogin ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700']"
          >
            Login
          </button>
          <button 
            @click="isLogin = false" 
            :class="['px-4 py-2 rounded-r-md', !isLogin ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700']"
          >
            Register
          </button>
        </div>
        <form @submit.prevent="handleSubmit">
          <div class="space-y-4">
            <div v-if="!isLogin">
              <label for="username" class="block text-sm font-medium text-gray-700">Full Name</label>
              <input 
                id="username" 
                v-model="username" 
                type="text" 
                required 
                class="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                       focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label :for="isLogin ? 'emailOrUsername' : 'email'" class="block text-sm font-medium text-gray-700">
                {{ isLogin ? 'Email or Username' : 'Email Address' }}
              </label>
              <input 
                :id="isLogin ? 'emailOrUsername' : 'email'"
                v-model="emailOrUsername" 
                :type="isLogin ? 'text' : 'email'"
                required 
                class="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                       focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                :placeholder="isLogin ? 'Enter email or username' : 'Enter email'"
              />
            </div>
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
              <input 
                id="password" 
                v-model="password" 
                type="password" 
                required 
                class="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                       focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>
          <button 
            type="submit" 
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-6"
          >
            {{ isLogin ? 'Sign In' : 'Sign Up' }}
          </button>
        </form>
      </div>
      <div class="px-5 py-3 bg-gray-50 border-t border-gray-200 flex justify-between items-center text-sm text-gray-600">
        <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">Forgot password?</a>
        <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">Need help?</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { defineEmits } from 'vue'
import { authService } from '@/services/api'

const router = useRouter()
const isLogin = ref<boolean>(true)
const username = ref<string>('')
const emailOrUsername = ref<string>('')
const password = ref<string>('')

interface LoginData {
  emailOrUsername: string;
  password: string;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

const emit = defineEmits(['login', 'register'])

const handleSubmit = async (): Promise<void> => {
  try {
    if (isLogin.value) {
      const loginData: LoginData = { emailOrUsername: emailOrUsername.value, password: password.value }
      const response = await authService.login(loginData.emailOrUsername, loginData.password)
      emit('login', response)
    } else {
      const registerData: RegisterData = { username: username.value, email: emailOrUsername.value, password: password.value }
      const response = await authService.register(registerData.username, registerData.email, registerData.password)
      emit('register', response)
    }
  } catch (error) {
    console.error('Authentication error:', error)
    if (axios.isAxiosError(error) && error.response) {
      console.error('Error response:', error.response.data)
      alert(`Error: ${error.response.data.error || 'An unknown error occurred'}`)
    } else {
      alert('An unknown error occurred')
    }
  }
}
</script>