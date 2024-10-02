<template>
  <div class="w-64 bg-white dark:bg-gray-800 shadow-md flex flex-col">
    <div class="flex-1 overflow-y-auto">
      <div class="p-4">
        <h2 class="text-xl font-bold mb-4 dark:text-white">历史对话</h2>
        <Button @click="$emit('new-conversation')" class="mb-4 p-2 bg-blue-500 text-white rounded-full w-full hover:bg-blue-600 transition-colors duration-200">
          新建对话
        </Button>
        <div v-for="conv in conversations" :key="conv.id" 
             @click="$emit('select-conversation', conv.id)" 
             class="mt-2 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer transition-colors duration-200"
             :class="{ 'bg-blue-100 dark:bg-blue-900': conv.id === currentConversationId }">
          <div class="flex items-center">
            <MessageSquare class="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400" />
            <span class="text-sm font-medium dark:text-white">{{ conv.title || 'Untitled' }}</span>
          </div>
          <span class="text-xs text-gray-400 dark:text-gray-500 mt-1 block">{{ formatDate(conv.date) }}</span>
        </div>
      </div>
    </div>
    <UserInfo :user="user" @logout="$emit('logout')" />
  </div>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button"
import { MessageSquare } from 'lucide-vue-next'
import UserInfo from './UserInfo.vue'
import type { User, Conversation } from '@/types'

defineProps<{
  conversations: Conversation[]
  currentConversationId: string
  user: User | null
}>()

defineEmits(['new-conversation', 'select-conversation', 'logout'])

function formatDate(dateString: string | undefined): string {
  if (!dateString) return 'No date';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
</script>