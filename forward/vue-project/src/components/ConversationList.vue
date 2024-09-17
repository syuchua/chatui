<template>
  <div class="conversation-list">
    <h2>对话列表</h2>
    <div v-if="loading">加载中...</div>
    <div v-else-if="error">{{ error }}</div>
    <ul v-else-if="conversations && conversations.length">
      <li 
        v-for="conversation in conversations" 
        :key="conversation.id" 
        @click="selectConversation(conversation.id)" 
        :class="{ active: conversation.id === activeConversationId }"
      >
        {{ conversation.title }}
      </li>
    </ul>
    <div v-else class="no-conversations">暂无对话</div>
    <button @click="createNewConversation" :disabled="loading">新建对话</button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import type { Conversation as IConversation } from '../types';

const props = defineProps<{
  conversations: IConversation[];
  activeConversationId: string | null;
  loading: boolean;
  error: string | null;
}>();

const emit = defineEmits(['select-conversation', 'new-conversation']);

const selectConversation = (id: string) => {
  emit('select-conversation', id);
};

const createNewConversation = () => {
  emit('new-conversation');
};
</script>

<style scoped>
.conversation-list {
  width: 250px;
  border-right: 1px solid #ccc;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

h2 {
  margin-bottom: 15px;
}

ul {
  list-style-type: none;
  padding: 0;
  flex-grow: 1;
}

li {
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #eee;
}

li:hover {
  background-color: #f0f0f0;
}

li.active {
  background-color: #e6f7ff;
}

.loading, .error, .no-conversations {
  padding: 20px;
  text-align: center;
  color: #666;
}

.error {
  color: red;
}

button {
  width: 100%;
  padding: 10px;
  margin-top: 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover:not(:disabled) {
  background-color: #0056b3;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>
