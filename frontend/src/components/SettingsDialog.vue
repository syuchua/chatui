<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeDialog" class="relative z-50">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/30 backdrop-blur-sm" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
              <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                设置
              </DialogTitle>
              <div class="mt-2">
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  在这里调整您的 API 和模型设置。
                </p>
              </div>

              <div class="mt-4 space-y-4">
                <div class="space-y-2">
                  <Label htmlFor="baseUrl">Base URL</Label>
                  <Input id="baseUrl" v-model="localBaseUrl" class="w-full" />
                </div>
                <div class="space-y-2">
                  <Label htmlFor="apiKey">API Key</Label>
                  <Input id="apiKey" v-model="localApiKey" type="password" class="w-full" />
                </div>
                <div class="space-y-2">
                  <Label htmlFor="models">模型列表（用逗号分隔）</Label>
                  <Input id="models" v-model="localModels" class="w-full" />
                </div>
              </div>

              <div class="mt-6 flex justify-end space-x-2">
                <Button @click="closeDialog" variant="outline">取消</Button>
                <Button @click="saveSettings" :disabled="isSaving">
                  <Loader2 v-if="isSaving" class="mr-2 h-4 w-4 animate-spin" />
                  保存更改
                </Button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from 'lucide-vue-next'

const props = defineProps<{
  isOpen: boolean
  baseUrl: string
  apiKey: string
  models: string[]
}>()

const emit = defineEmits(['close', 'update-settings'])

const localBaseUrl = ref(props.baseUrl)
const localApiKey = ref(props.apiKey)
const localModels = ref(props.models.join(', '))
const isSaving = ref(false)

watch(() => props.isOpen, (newValue) => {
  if (newValue) {
    localBaseUrl.value = props.baseUrl
    localApiKey.value = props.apiKey
    localModels.value = props.models.join(', ')
  }
})

function closeDialog() {
  emit('close')
}

async function saveSettings() {
  isSaving.value = true
  try {
    const updatedSettings = {
      baseUrl: localBaseUrl.value,
      apiKey: localApiKey.value,
      models: localModels.value.split(',').map(model => model.trim()).filter(model => model !== '')
    }
    emit('update-settings', updatedSettings)
    closeDialog()
  } catch (error) {
    console.error('Failed to save settings:', error)
  } finally {
    isSaving.value = false
  }
}
</script>