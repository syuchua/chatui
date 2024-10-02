<template>
  <div class="flex-1 overflow-auto p-4">
    <div v-if="messages.length > 0">当前消息数量: {{ messages.length }}</div>
    <div v-for="msg in messages" :key="msg.id" class="mb-4 flex" :class="msg.sender === 'user' ? 'justify-end' : 'justify-start'">
      <div :class="['p-3 rounded-lg max-w-[70%]', 
                    msg.sender === 'user' 
                      ? 'bg-blue-100 dark:bg-blue-800 text-black dark:text-white' 
                      : 'bg-gray-100 dark:bg-gray-700 text-black dark:text-white']">
        <MarkdownRenderer :content="msg.content" />
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
</template>

<script setup lang="ts">
import { MarkdownRenderer } from '@/components/ui/markdown'
import { CheckCircle2, Loader2, AlertCircle } from 'lucide-vue-next'
import type { Message } from '@/types'

defineProps<{
  messages: Message[]
}>()

function formatTime(timestamp: string | undefined): string {
  if (!timestamp) return ''
  return new Date(timestamp).toLocaleTimeString()
}
</script>