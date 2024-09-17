<template>
  <div class="login-view">
    <LoginForm />
  </div>
</template>

<script lang="ts" setup>
import LoginForm from '../components/LoginForm.vue';
</script>

<style scoped>
.login-view {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
}
</style>
