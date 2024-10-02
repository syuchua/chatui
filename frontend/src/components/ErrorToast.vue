<template>
  <TransitionRoot appear :show="!!message" as="template">
    <div class="fixed bottom-4 right-4 z-50">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0 translate-y-2"
        enter-to="opacity-100 translate-y-0"
        leave="ease-in duration-200"
        leave-from="opacity-100 translate-y-0"
        leave-to="opacity-0 translate-y-2"
      >
        <div class="bg-red-500 text-white p-3 rounded shadow-lg">
          {{ message }}
        </div>
      </TransitionChild>
    </div>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { TransitionRoot, TransitionChild } from '@headlessui/vue'

defineProps<{
  message: string
}>()
</script>