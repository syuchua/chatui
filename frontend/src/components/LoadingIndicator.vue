<template>
  <div v-if="isLoading" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
      <Loader2 class="h-8 w-8 animate-spin text-blue-500" />
      <p class="mt-2 text-gray-600 dark:text-gray-300">{{ message }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Loader2 } from 'lucide-vue-next'

defineProps<{
  isLoading: boolean
  message: string
}>()
</script>