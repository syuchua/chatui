import './assets/main.css' // 导入 Tailwind CSS

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import axios from 'axios'
import Cookies from 'js-cookie'

// 设置 axios 的基础 URL
axios.defaults.baseURL = 'http://localhost:8080' // 替换为您的后端 API URL
axios.defaults.withCredentials = true

axios.interceptors.request.use(config => {
  const token = Cookies.get('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

app.config.errorHandler = (err, vm, info) => {
  console.error('Unhandled error:', err, info)
  // 显示给用户
  alert('发生了一个错误：' + err)
}
