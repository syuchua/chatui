<template>
  <div class="flex h-screen bg-gray-100 dark:bg-gray-900">
    <ConversationSidebar 
      :conversations="conversations"
      :currentConversationId="currentConversationId"
      :user="user"
      @new-conversation="startNewConversation"
      @select-conversation="loadMessages"
      @logout="handleLogout"
    />
    <div class="flex-1 flex flex-col bg-gray-100 dark:bg-gray-900">
      <ChatHeader 
        :models="models"
        :selectedModel="selectedModel"
        :isDarkMode="isDarkMode"
        @select-model="selectedModel = $event"
        @open-settings="openSettings"
        @toggle-dark-mode="toggleDarkMode"
      />
      <ChatMessages :messages="messages" />
      <ChatInput @send-message="sendMessage" />
    </div>
    <SettingsDialog 
      :isOpen="isSettingsOpen"
      :baseUrl="baseUrl"
      :apiKey="apiKey"
      :models="models"
      @close="closeSettings"
      @update-settings="updateSettings"
    />
    <ErrorToast :message="errorMessage" />
    <LoadingIndicator :isLoading="isLoading" message="正在思考回复..." />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ConversationSidebar from './ConversationSidebar.vue'
import ChatHeader from './ChatHeader.vue'
import ChatMessages from './ChatMessages.vue'
import ChatInput from './ChatInput.vue'
import SettingsDialog from './SettingsDialog.vue'
import ErrorToast from './ErrorToast.vue'
import LoadingIndicator from './LoadingIndicator.vue'
import type { User, Message, Conversation } from '@/types'
import { chatService, userService, authService } from '@/services/api'

const route = useRoute()
const router = useRouter()

// 使用 props 接收用户信息
const props = defineProps<{
  user: User | null
}>()

const emit = defineEmits(['logout'])

const user = ref<User | null>(props.user)
const models = ref<string[]>([])
const selectedModel = ref('')
const apiKey = ref('')
const baseUrl = ref('')
const messages = ref<Message[]>([])
const conversations = ref<Conversation[]>([])
const currentConversationId = ref('')
const isSettingsOpen = ref(false)
const errorMessage = ref('')
const isLoading = ref(false)
const isDarkMode = ref(false)

async function startNewConversation() {
  try {
    const newConversation = await chatService.startNewConversation()
    currentConversationId.value = newConversation.id
    conversations.value.unshift({
      id: newConversation.id,
      title: newConversation.title || 'New Conversation',
      date: new Date().toISOString(),
    })
    messages.value = []
    return newConversation
  } catch (error) {
    console.error('Failed to start new conversation:', error)
    throw error
  }
}

async function loadMessages(conversationId: string) {
  try {
    currentConversationId.value = conversationId
    const response = await chatService.getMessages(conversationId)
    messages.value = Array.isArray(response.messages) ? response.messages : []
  } catch (error) {
    console.error('加载消息失败:', error)
    messages.value = []
  }
}

async function sendMessage(content: string) {
  if (content.trim()) {
    isLoading.value = true
    try {
      if (!currentConversationId.value) {
        await startNewConversation()
      }
      const newMessage: Message = {
        id: Date.now().toString(),
        content,
        sender: 'user',
        conversationId: currentConversationId.value,
        timestamp: new Date().toISOString(),
        status: 'sending'
      }
      messages.value.push(newMessage)
      const response = await chatService.sendMessage(currentConversationId.value, content)
      newMessage.status = 'sent'
      messages.value.push(response)
    } catch (error) {
      console.error('Failed to send message:', error)
      errorMessage.value = '发送消息失败,请重试。'
      setTimeout(() => {
        errorMessage.value = ''
      }, 2000)
    } finally {
      isLoading.value = false
    }
  }
}

async function loadUserInfo() {
  try {
    const userInfo = await userService.getUserInfo();
    user.value = userInfo;
  } catch (error) {
    console.error('Failed to load user info:', error);
  }
}

function handleLogout() {
  emit('logout')
}

async function loadSettings() {
  try {
    const settings = await userService.getSettings()
    applySettings(settings)
  } catch (error) {
    console.error('Failed to load settings:', error)
    loadSettingsFromLocalStorage()
  }
}

function applySettings(settings: any) {
  models.value = settings.models || []
  baseUrl.value = settings.baseUrl || ''
  apiKey.value = settings.apiKey || ''
  selectedModel.value = settings.selectedModel || ''
}

async function updateSettings(newSettings: { baseUrl: string, apiKey: string, models: string[], selectedModel: string }) {
  try {
    await userService.updateSettings(newSettings)
    baseUrl.value = newSettings.baseUrl
    apiKey.value = newSettings.apiKey
    models.value = newSettings.models
    selectedModel.value = newSettings.models[0] || ''
    closeSettings()
  } catch (error) {
    console.error('Failed to update settings:', error)
    errorMessage.value = '更新设置失败,请重试。'
  }
}

function loadSettingsFromLocalStorage() {
  const settings = {
    models: JSON.parse(localStorage.getItem('models') || '[]'),
    baseUrl: localStorage.getItem('baseUrl') || '',
    apiKey: localStorage.getItem('apiKey') || '',
    selectedModel: localStorage.getItem('selectedModel') || ''
  }
  applySettings(settings)
}

function saveSettingsToLocalStorage(settings: any) {
  localStorage.setItem('models', JSON.stringify(settings.models))
  localStorage.setItem('baseUrl', settings.baseUrl)
  localStorage.setItem('apiKey', settings.apiKey)
  localStorage.setItem('selectedModel', settings.selectedModel)
}

function openSettings() {
  isSettingsOpen.value = true
}

function closeSettings() {
  isSettingsOpen.value = false
}

function toggleDarkMode() {
  isDarkMode.value = !isDarkMode.value
  document.documentElement.classList.toggle('dark', isDarkMode.value)
  localStorage.setItem('darkMode', isDarkMode.value ? 'true' : 'false')
}

function initDarkMode() {
  const savedDarkMode = localStorage.getItem('darkMode')
  isDarkMode.value = savedDarkMode === 'true'
  document.documentElement.classList.toggle('dark', isDarkMode.value)
}

async function loadConversations() {
  try {
    const loadedConversations = await chatService.getConversations()
    conversations.value = Array.isArray(loadedConversations) ? loadedConversations : []
  } catch (error) {
    console.error('Failed to load conversations:', error)
    conversations.value = []
  }
}

onMounted(async () => {
  initDarkMode()
  try {
    const { valid } = await authService.verifyToken()
    if (!valid) {
      console.log('Token is invalid')
      router.push('/')
    } else {
      console.log('Token is valid')
      await loadUserInfo()
      await loadSettings()
      await loadConversations()
      if (conversations.value.length > 0) {
        await loadMessages(conversations.value[0].id)
      } else {
        await startNewConversation()
      }
    }
  } catch (error) {
    console.error('Token verification failed:', error)
    router.push('/')
  }
})

watch(isDarkMode, (newValue) => {
  localStorage.setItem('darkMode', newValue ? 'true' : 'false')
})

defineExpose({
  startNewConversation
})
</script>

<style lang="postcss">
.dark {
  @apply bg-gray-900 text-white;
}

.dark input,
.dark textarea,
.dark select {
  @apply bg-gray-700 text-white border-gray-600;
}

.dark input::placeholder,
.dark textarea::placeholder {
  @apply text-gray-400;
}
</style>