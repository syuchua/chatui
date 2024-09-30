<template>
  <div>
    <AuthForm v-if="!isAuthenticated" @login="handleLogin" @register="handleRegister" />
    <ChatInterface v-else :user="user!" @logout="handleLogout" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AuthForm from './components/AuthForm.vue'
import ChatInterface from './components/ChatInterface.vue'
import { User, UserData } from './types'
import router from './router'
import { authService } from './services/api'
import Cookies from 'js-cookie'

const isAuthenticated = ref(false)
const user = ref<User | null>(null)

const handleLogin = async (data: { token: string; user: User }) => {
  Cookies.set('token', data.token, { secure: true, sameSite: 'strict' })
  isAuthenticated.value = true
  user.value = data.user
  router.push('/chat')
}

const handleRegister = async (userData: UserData) => {
  try {
    const response = await authService.register(userData.name, userData.email, userData.password)
    if (response.token) {
      Cookies.set('token', response.token, { secure: true, sameSite: 'strict' })
      isAuthenticated.value = true
      user.value = response.user
      router.push('/chat')
    }
  } catch (error) {
    console.error('Registration failed:', error)
    alert('注册失败，请检查您的信息。')
  }
}

const handleLogout = () => {
  Cookies.remove('token')
  isAuthenticated.value = false
  user.value = null
  router.push('/')
  alert('您已成功登出。')
}

onMounted(async () => {
  const token = Cookies.get('token')
  if (token) {
    try {
      const response = await authService.verifyToken()
      if (response.valid) {
        isAuthenticated.value = true
        user.value = response.user
      } else {
        handleLogout()
      }
    } catch (error) {
      console.error('Token verification failed:', error)
      handleLogout()
    }
  }
})
</script>