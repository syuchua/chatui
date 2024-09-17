<template>
  <div class="chat-view">
    <div class="conversation-list">
      <h2>对话列表</h2>
      <button @click="createNewConversation">新建对话</button>
      <ul v-if="conversations.length">
        <li v-for="conversation in conversations" :key="conversation.id" @click="selectConversation(conversation.id)" :class="{ active: conversation.id === activeConversationId }">
          {{ conversation.title }}
        </li>
      </ul>
      <p v-else>暂无对话</p>
    </div>
    <div class="chat-container">
      <div v-if="isLoading" class="loading">加载中...</div>
      <div v-else-if="error" class="error-message">{{ error }}</div>
      <div v-else-if="activeConversationId" class="chat-window">
        <h3>{{ activeConversation?.title }}</h3>
        <div class="messages">
          <div v-for="message in activeConversation?.messages" :key="message.id" :class="['message', message.sender]">
            {{ message.content }}
          </div>
        </div>
        <div class="input-area">
          <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="输入消息..." />
          <button @click="sendMessage">发送</button>
        </div>
      </div>
      <div v-else class="no-conversation">
        请选择或创建一个对话
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useChatService } from '../services/chatService';
import type { Conversation } from '../types';

const {
  conversations,
  isLoading,
  error,
  fetchConversations,
  sendMessage: sendHttpMessage,
  startNewConversation
} = useChatService();

const activeConversationId = ref<string | null>(null);
const newMessage = ref('');

const activeConversation = computed(() => 
  conversations.value.find(conv => conv.id === activeConversationId.value)
);

onMounted(async () => {
  try {
    await fetchConversations();
  } catch (err) {
    console.error('获取对话列表失败:', err);
  }
});

function selectConversation(id: string) {
  activeConversationId.value = id;
}

async function createNewConversation() {
  try {
    const newConversationId = await startNewConversation();
    await fetchConversations();
    activeConversationId.value = newConversationId;
  } catch (error) {
    console.error('创建新对话失败:', error);
  }
}

async function sendMessage() {
  if (activeConversationId.value && newMessage.value.trim()) {
    try {
      await sendHttpMessage(newMessage.value, activeConversationId.value);
      newMessage.value = '';
      await fetchConversations(); // 刷新对话列表以获取最新消息
    } catch (error) {
      console.error('发送消息失败:', error);
    }
  }
}
</script>

<style scoped>
.chat-view {
  display: flex;
  height: calc(100vh - 60px); /* 假设顶部导航栏高度为60px */
}

.conversation-list {
  width: 250px;
  border-right: 1px solid #ccc;
  padding: 20px;
  overflow-y: auto;
}

.conversation-list ul {
  list-style-type: none;
  padding: 0;
}

.conversation-list li {
  cursor: pointer;
  padding: 10px;
  margin-bottom: 5px;
  background-color: #f0f0f0;
  border-radius: 5px;
}

.conversation-list li.active {
  background-color: #e0e0e0;
}

.chat-container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.chat-window {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.messages {
  flex-grow: 1;
  overflow-y: auto;
  margin-bottom: 20px;
}

.message {
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  max-width: 70%;
}

.message.user {
  align-self: flex-end;
  background-color: #dcf8c6;
}

.message.ai {
  align-self: flex-start;
  background-color: #f0f0f0;
}

.input-area {
  display: flex;
}

.input-area input {
  flex-grow: 1;
  padding: 10px;
  margin-right: 10px;
}

.loading, .no-conversation, .error-message {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 1.2em;
  color: #666;
}

.error-message {
  color: red;
}
</style>

