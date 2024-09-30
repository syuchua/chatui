<template>
  <div class="flex h-screen bg-gray-100 dark:bg-gray-900">
    <!-- Sidebar -->
    <div class="w-64 bg-white dark:bg-gray-800 shadow-md flex flex-col">
      <div class="flex-1 overflow-y-auto">
        <div class="p-4">
          <h2 class="text-xl font-bold mb-4 dark:text-white">历史对话</h2>
          <Button @click="startNewConversation" class="mb-4 p-2 bg-blue-500 text-white rounded-full w-full hover:bg-blue-600 transition-colors duration-200">
            新建对话
          </Button>
          <div v-if="Array.isArray(conversations)" v-for="conv in conversations" :key="conv.id" 
               @click="loadMessages(conv.id)" 
               class="mt-2 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer transition-colors duration-200"
               :class="{ 'bg-blue-100 dark:bg-blue-900': conv.id === currentConversationId }">
            <div class="flex items-center">
              <MessageSquare class="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400" />
              <span class="text-sm font-medium dark:text-white">{{ conv.title || 'Untitled' }}</span>
            </div>
            <span class="text-xs text-gray-400 dark:text-gray-500 mt-1 block">{{ formatDate(conv.date) || 'No date' }}</span>
          </div>
        </div>
      </div>
      <!-- Account info at the bottom -->
      <div class="p-4 border-t dark:border-gray-700">
        <div class="flex items-center space-x-4">
          <Avatar class="w-12 h-12">
            <AvatarFallback 
              :style="{ 
                backgroundColor: getUserColor(user?.name), 
                color: getTextColor(getUserColor(user?.name)),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '1.2rem'
              }"
            >
              {{ getUserInitial(user?.name) }}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 class="font-semibold dark:text-white">{{ user?.name || 'User' }}</h2>
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ user?.email || 'No email' }}</p>
          </div>
        </div>
        <Button variant="outline" size="sm" @click="handleLogout" class="w-full mt-4 flex items-center justify-center">
          <LogOut class="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col bg-gray-100 dark:bg-gray-900">
      <!-- Header -->
      <header class="bg-white dark:bg-gray-800 shadow-sm p-4 flex justify-between items-center">
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="outline" class="flex items-center">
              {{ selectedModel || '选择模型' }} <ChevronDown class="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem v-for="model in models" :key="model" @select="selectedModel = model">
              {{ model }}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <!-- Settings Button and Dialog -->
        <div>
          <Button @click="openSettings" variant="ghost" size="icon" class="hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200">
            <Settings class="h-5 w-5" />
          </Button>

          <!-- Settings Dialog -->
          <TransitionRoot appear :show="isSettingsOpen" as="template">
            <Dialog as="div" @close="closeSettings" class="relative z-50">
              <!-- Backdrop -->
              <TransitionChild
                as="template"
                enter="ease-out duration-300"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="ease-in duration-200"
                leave-from="opacity-100"
                leave-to="opacity-0"
              >
                <div class="fixed inset-0 bg-black/30 backdrop-blur-sm" />
              </TransitionChild>

              <!-- Dialog Content -->
              <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center p-4 text-center">
                  <TransitionChild
                    as="template"
                    enter="ease-out duration-300"
                    enter-from="opacity-0 scale-95"
                    enter-to="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leave-from="opacity-100 scale-100"
                    leave-to="opacity-0 scale-95"
                  >
                    <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                      <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                        设置
                      </DialogTitle>
                      <div class="mt-2">
                        <p class="text-sm text-gray-500 dark:text-gray-400">
                          在这里调整您的 API 和模型设置。
                        </p>
                      </div>

                      <div class="mt-4 space-y-4">
                        <div class="space-y-2">
                          <Label htmlFor="baseUrl">Base URL</Label>
                          <Input id="baseUrl" v-model="baseUrl" class="w-full" />
                        </div>
                        <div class="space-y-2">
                          <Label htmlFor="apiKey">API Key</Label>
                          <Input id="apiKey" v-model="apiKey" type="password" class="w-full" />
                        </div>
                        <div class="space-y-2">
                          <Label htmlFor="model">Model</Label>
                          <Input id="model" v-model="selectedModel" class="w-full" />
                        </div>
                      </div>

                      <div class="mt-6 flex justify-end">
                        <Button @click="updateSettings" class="bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-200">
                          保存更改
                        </Button>
                      </div>

                      <!-- 加载指示器 -->
                      <div v-if="isLoading" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <Loader2 class="h-8 w-8 animate-spin text-white" />
                      </div>

                      <!-- 成功/错误消息 -->
                      <TransitionRoot appear :show="!!tempSuccessMessage || !!errorMessage" as="template">
                        <div class="fixed bottom-4 right-4 z-50">
                          <TransitionChild
                            as="template"
                            enter="ease-out duration-300"
                            enter-from="opacity-0 translate-y-2"
                            enter-to="opacity-100 translate-y-0"
                            leave="ease-in duration-200"
                            leave-from="opacity-100 translate-y-0"
                            leave-to="opacity-0 translate-y-2"
                          >
                            <div :class="[
                              'p-3 rounded shadow-lg',
                              tempSuccessMessage ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                            ]">
                              {{ tempSuccessMessage || errorMessage }}
                            </div>
                          </TransitionChild>
                        </div>
                      </TransitionRoot>
                    </DialogPanel>
                  </TransitionChild>
                </div>
              </div>
            </Dialog>
          </TransitionRoot>
        </div>

        <!-- Dark Mode Toggle -->
        <Button @click="toggleDarkMode" variant="ghost" size="icon" class="ml-2">
          <Sun v-if="isDarkMode" class="h-5 w-5" />
          <Moon v-else class="h-5 w-5" />
        </Button>
      </header>

      <!-- Chat Area -->
      <div class="flex-1 overflow-auto p-4">
        <div v-for="msg in messages" :key="msg.id" class="mb-4 flex" :class="msg.sender === 'user' ? 'justify-end' : 'justify-start'">
          <div :class="['p-3 rounded-lg max-w-[70%]', 
                        msg.sender === 'user' 
                          ? 'bg-blue-100 dark:bg-blue-800 text-black dark:text-white' 
                          : 'bg-gray-100 dark:bg-gray-700 text-black dark:text-white']">
            {{ msg.content }}
            <div class="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center">
              {{ formatTime(msg.timestamp) }}
              <span v-if="msg.sender === 'user'" class="ml-2">
                <CheckCircle2 v-if="msg.status === 'sent'" class="h-4 w-4 text-green-500" />
                <Loader2 v-else-if="msg.status === 'sending'" class="h-4 w-4 animate-spin" />
                <AlertCircle v-else-if="msg.status === 'error'" class="h-4 w-4 text-red-500" />
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Input Area -->
      <div class="p-4 bg-white dark:bg-gray-800 border-t dark:border-gray-700">
        <div class="flex items-center space-x-2">
          <Textarea v-model="message" placeholder="Type your message here..." 
                    class="flex-1 rounded-lg dark:bg-gray-700 dark:text-white dark:placeholder-gray-400" 
                    rows="3" />
          <Button size="icon" @click="sendMessage" 
                  class="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 transition-colors duration-200">
            <Send class="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>

    <!-- Error Toast -->
    <TransitionRoot appear :show="!!errorMessage" as="template">
      <div class="fixed bottom-4 right-4 z-50">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0 translate-y-2"
          enter-to="opacity-100 translate-y-0"
          leave="ease-in duration-200"
          leave-from="opacity-100 translate-y-0"
          leave-to="opacity-0 translate-y-2"
        >
          <div class="bg-red-500 text-white p-3 rounded shadow-lg">
            {{ errorMessage }}
          </div>
        </TransitionChild>
      </div>
    </TransitionRoot>

    <!-- Loading Indicator -->
    <div v-if="isLoading" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
        <Loader2 class="h-8 w-8 animate-spin text-blue-500" />
        <p class="mt-2 text-gray-600 dark:text-gray-300">该怎么回复...</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { 
  TransitionRoot, 
  TransitionChild, 
  Dialog, 
  DialogPanel, 
  DialogTitle,
  Switch 
} from '@headlessui/vue'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogDescription,
  DialogTrigger
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  MessageSquare, 
  ChevronDown, 
  Settings, 
  Send, 
  LogOut, 
  Sun, 
  Moon, 
  CheckCircle2, 
  Loader2, 
  AlertCircle, 
  RefreshCw
} from 'lucide-vue-next'
import type { User, Message, Conversation } from '@/types'
import { chatService, userService, authService } from '@/services/api'

const router = useRouter();

const props = defineProps<{
  user: User | null
}>()

const emit = defineEmits(['logout'])

const models = ref<string[]>([])
const selectedModel = ref('')
const apiKey = ref('')
const baseUrl = ref('')
const message = ref('')
const messages = ref<Message[]>([])
const conversations = ref<Conversation[]>([])
const currentConversationId = ref('')
const isSettingsOpen = ref(false);

const errorMessage = ref('')

const isLoading = ref(false)

const tempSuccessMessage = ref('')

const openSettings = () => {
  isSettingsOpen.value = true
}

const closeSettings = () => {
  isSettingsOpen.value = false
}

const startNewConversation = async () => {
  try {
    const newConversation = await chatService.startNewConversation()
    currentConversationId.value = newConversation.id
    conversations.value.unshift({
      id: newConversation.id,
      title: newConversation.title || 'New Conversation',
      date: new Date().toISOString(),
      // 添加其他必要的属性
    })
    messages.value = []
    return newConversation
  } catch (error) {
    console.error('Failed to start new conversation:', error)
    throw error
  }
}

async function sendMessage() {
  if (message.value.trim()) {
    isLoading.value = true
    try {
      if (!currentConversationId.value) {
        await startNewConversation()
      }
      const newMessage: Message = {
        id: Date.now().toString(),
        content: message.value,
        sender: 'user',
        conversationId: currentConversationId.value,
        timestamp: new Date().toISOString(),
        status: 'sending'
      }
      messages.value.push(newMessage)
      const response = await chatService.sendMessage(currentConversationId.value, message.value)
      newMessage.status = 'sent'
      messages.value.push(response)
      message.value = ''
    } catch (error) {
      console.error('Failed to send message:', error)
      errorMessage.value = '发送消息失败，请重试。'
      // 设置定时器自动清除错误消息
      setTimeout(() => {
        errorMessage.value = ''
      }, 2000) // 2秒后清除错误消息
    } finally {
      isLoading.value = false
    }
  }
}

function handleLogout() {
  emit('logout')
}

async function updateSettings() {
  isLoading.value = true
  try {
    await userService.updateSettings(baseUrl.value, apiKey.value, selectedModel.value);
    closeSettings()
    tempSuccessMessage.value = '设置已成功更新'
    setTimeout(() => {
      tempSuccessMessage.value = ''
    }, 2000) // 2秒后清除成功消息
  } catch (error) {
    console.error('Failed to update settings:', error);
    errorMessage.value = '更新设置失败，请重试。'
  } finally {
    isLoading.value = false
  }
}

async function loadConversations() {
  try {
    const loadedConversations = await chatService.getConversations()
    console.log('Loaded conversations:', loadedConversations)
    conversations.value = Array.isArray(loadedConversations) ? loadedConversations : []
  } catch (error) {
    console.error('Failed to load conversations:', error)
    conversations.value = []
  }
}

async function loadMessages(conversationId: string) {
  try {
    console.log('Loading messages for conversation:', conversationId);
    currentConversationId.value = conversationId;
    const loadedMessages = await chatService.getMessages(conversationId);
    console.log('Loaded messages:', loadedMessages);
    messages.value = Array.isArray(loadedMessages) ? loadedMessages : [];
  } catch (error) {
    console.error('Failed to load messages:', error);
    messages.value = [];
  }
}

// async function loadModels() {
//   try {
//     models.value = await chatService.getModels()
//     if (models.value.length > 0) {
//       selectedModel.value = models.value[0]
//     }
//   } catch (error) {
//     console.error('Failed to load models:', error)
//     errorMessage.value = '加载模型列表失败，请重试。'
//   }
// }

// 在 onMounted 中调用 loadModels
onMounted(async () => {
  try {
    const { valid } = await authService.verifyToken();
    if (!valid) {
      console.log('Token is invalid');
      router.push('/');
    } else {
      console.log('Token is valid');
      // await loadModels(); // 加载模型列表
      await loadConversations();
      console.log('Conversations after loading:', conversations.value);
      if (Array.isArray(conversations.value) && conversations.value.length > 0) {
        await loadMessages(conversations.value[0].id);
      } else {
        await startNewConversation();
      }
    }
  } catch (error) {
    console.error('Token verification failed:', error);
    router.push('/');
  }
})

defineExpose({
  startNewConversation
})

const colors = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
  '#F06292', '#AED581', '#FFD54F', '#4DB6AC', '#7986CB'
];

function getUserColor(name: string | undefined): string {
  if (!name) return colors[0];
  return colors[name.charCodeAt(0) % colors.length];
}

function getUserInitial(name: string | undefined): string {
  if (!name) return '?';
  return name.charAt(0).toUpperCase();
}

function getTextColor(bgColor: string): string {
  // 将十六进制颜色转换为 RGB
  const r = parseInt(bgColor.slice(1, 3), 16);
  const g = parseInt(bgColor.slice(3, 5), 16);
  const b = parseInt(bgColor.slice(5, 7), 16);
  
  // 计算亮度
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  
  // 如果背景色较亮，返回深色文字；否则返回浅色文字
  return brightness > 128 ? '#000000' : '#FFFFFF';
}

// 格式化日期
function formatDate(dateString: string | undefined): string {
  if (!dateString) return 'No date';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// 添加格式化时间的函数
function formatTime(timestamp: string | undefined): string {
  if (!timestamp) return ''
  return new Date(timestamp).toLocaleTimeString()
}

const isDarkMode = ref(false);

function toggleDarkMode() {
  isDarkMode.value = !isDarkMode.value
  document.documentElement.classList.toggle('dark', isDarkMode.value)
  localStorage.setItem('darkMode', isDarkMode.value ? 'true' : 'false')
}

// 监听深色模式变化
watch(isDarkMode, (newValue) => {
  localStorage.setItem('darkMode', newValue ? 'true' : 'false')
})

// 在 onMounted 中初始化深色模式
onMounted(() => {
  const savedDarkMode = localStorage.getItem('darkMode')
  isDarkMode.value = savedDarkMode === 'true'
  document.documentElement.classList.toggle('dark', isDarkMode.value)
})

// async function refreshModels() {
//   isLoading.value = true
//   try {
//     await loadModels()
//     tempSuccessMessage.value = '模型列表已更新'
//     setTimeout(() => {
//       tempSuccessMessage.value = ''
//     }, 3000)
//   } catch (error) {
//     console.error('Failed to refresh models:', error)
//     errorMessage.value = '刷新模型列表失败，请重试。'
//   } finally {
//     isLoading.value = false
//   }
// }
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