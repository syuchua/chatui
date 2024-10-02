<template>
  <div class="p-4 bg-white dark:bg-gray-800 border-t dark:border-gray-700">
    <div class="flex items-center space-x-2">
      <Textarea 
        v-model="inputMessage" 
        placeholder="输入消息,按 Enter 发送,Shift+Enter 换行..." 
        class="flex-1 rounded-lg dark:bg-gray-700 dark:text-white dark:placeholder-gray-400" 
        rows="3"
        @keydown.enter.exact.prevent="sendMessage"
        @keydown.shift.enter.prevent="newLine"
      />
      <Button 
        size="icon" 
        @click="sendMessage" 
        class="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 transition-colors duration-200"
      >
        <Send class="h-5 w-5" />
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Send } from 'lucide-vue-next'

const inputMessage = ref('')

const emit = defineEmits(['send-message'])

function sendMessage() {
  if (inputMessage.value.trim()) {
    emit('send-message', inputMessage.value)
    inputMessage.value = ''
  }
}

function newLine(event: KeyboardEvent) {
  const target = event.target as HTMLTextAreaElement
  const start = target.selectionStart
  const end = target.selectionEnd
  inputMessage.value = inputMessage.value.substring(0, start) + '\n' + inputMessage.value.substring(end)
  // 在下一个事件循环中设置光标位置,以确保在 Vue 更新 DOM 后执行
  setTimeout(() => {
    target.selectionStart = target.selectionEnd = start + 1
  }, 0)
}
</script>