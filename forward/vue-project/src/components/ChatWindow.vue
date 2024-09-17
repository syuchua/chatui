<template>
  <div class="chat-window">
    <div class="messages">
      <div v-for="message in currentConversation.messages" :key="message.id" :class="['message', message.sender]">
        {{ message.content }}
      </div>
    </div>
    <div class="input-area">
      <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="输入消息..." />
      <button @click="sendMessage">发送</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, computed } from 'vue';
import type { Conversation as IConversation, Message as IMessage } from '../types';

const props = defineProps<{
  conversations: IConversation[];
  activeConversationId: string | null;
}>();

const emit = defineEmits(['send-message']);

const newMessage = ref('');

const currentConversation = computed(() => {
  return props.conversations.find(conv => conv.id === props.activeConversationId) || { 
    id: '',
    title: '',
    messages: [] as IMessage[]
  };
});

function sendMessage() {
  if (newMessage.value.trim()) {
    emit('send-message', newMessage.value);
    newMessage.value = '';
  }
}
</script>

<style scoped>
/* 样式保持不变 */
</style>
