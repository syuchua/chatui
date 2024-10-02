<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline" class="flex items-center">
        {{ selectedModel || '选择模型' }} <ChevronDown class="ml-2 h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem v-for="model in models" :key="model" @select="$emit('select', model)">
        {{ model }}
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown } from 'lucide-vue-next'

defineProps<{
  models: string[]
  selectedModel: string
}>()

defineEmits(['select'])
</script>