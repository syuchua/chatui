<template>
  <div class="message-input">
    <textarea
      v-model="message"
      @keydown.enter.prevent="sendMessage"
      placeholder="输入消息..."
      rows="3"
    ></textarea>
    <button @click="sendMessage" :disabled="!message.trim()">发送</button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const message = ref('');
const emit = defineEmits(['send-message']);

function sendMessage() {
  if (message.value.trim()) {
    emit('send-message', message.value);
    message.value = '';
  }
}
</script>

<style scoped>
.message-input {
  display: flex;
  padding: 10px;
  border-top: 1px solid #ccc;
}

textarea {
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
}

button {
  margin-left: 10px;
  padding: 10px 20px;
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
