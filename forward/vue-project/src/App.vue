<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useRouter } from 'vue-router'
import { useUserStore } from './stores/user'

const router = useRouter()
const userStore = useUserStore()

const logout = () => {
  userStore.logout();
  router.push('/');
};
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/" v-if="!userStore.isLoggedIn">登录</RouterLink>
        <RouterLink to="/chat" v-if="userStore.isLoggedIn">聊天</RouterLink>
        <a href="#" @click.prevent="logout" v-if="userStore.isLoggedIn">登出</a>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
/* 保持样式不变 */
</style>
