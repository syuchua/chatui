<template>
  <header class="bg-white dark:bg-gray-800 shadow-sm p-4 flex justify-between items-center">
    <ModelSelector :models="models" :selectedModel="selectedModel" @select="$emit('select-model', $event)" />
    <div class="flex items-center">
      <Button @click="$emit('open-settings')" variant="ghost" size="icon" class="hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200">
        <Settings class="h-5 w-5" />
      </Button>
      <Button @click="$emit('toggle-dark-mode')" variant="ghost" size="icon" class="ml-2">
        <Sun v-if="isDarkMode" class="h-5 w-5" />
        <Moon v-else class="h-5 w-5" />
      </Button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button"
import { Settings, Sun, Moon } from 'lucide-vue-next'
import ModelSelector from './ModelSelector.vue'

defineProps<{
  models: string[]
  selectedModel: string
  isDarkMode: boolean
}>()

defineEmits(['select-model', 'open-settings', 'toggle-dark-mode'])
</script>