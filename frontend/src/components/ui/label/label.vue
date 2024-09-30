<template>
  <label :for="htmlFor" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
    <slot></slot>
  </label>
</template>

<script setup lang="ts">
defineProps<{
  htmlFor?: string
}>()
</script>