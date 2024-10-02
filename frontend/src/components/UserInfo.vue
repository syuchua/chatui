<template>
  <div class="p-4 border-t dark:border-gray-700">
    <div v-if="user" class="flex items-center space-x-3">
      <Avatar>
        <AvatarImage v-if="user.avatar" :src="user.avatar" alt="User avatar" />
        <AvatarFallback 
          :style="avatarStyle"
        >
          {{ getUserInitial(user.name) }}
        </AvatarFallback>
      </Avatar>
      <div>
        <p class="font-medium dark:text-white">{{ user.name || '未知用户' }}</p>
        <p class="text-sm text-gray-500 dark:text-gray-400">{{ user.email || '无邮箱' }}</p>
      </div>
    </div>
    <div v-else class="text-center text-gray-500 dark:text-gray-400">
      未登录
    </div>
    <Button @click="$emit('logout')" variant="ghost" class="w-full mt-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300">
      <LogOut class="w-4 h-4 mr-2" />
      登出
    </Button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { LogOut } from 'lucide-vue-next'
import type { User } from '@/types'

const props = defineProps<{
  user: User | null
}>()

defineEmits(['logout'])

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
  const r = parseInt(bgColor.slice(1, 3), 16);
  const g = parseInt(bgColor.slice(3, 5), 16);
  const b = parseInt(bgColor.slice(5, 7), 16);
  
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  
  return brightness > 128 ? '#000000' : '#FFFFFF';
}

const avatarStyle = computed(() => {
  const bgColor = getUserColor(props.user?.name);
  return {
    backgroundColor: bgColor,
    color: getTextColor(bgColor),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '1.2rem'
  };
});
</script>