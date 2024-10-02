<template>
  <div v-html="renderedContent"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'

const props = defineProps<{
  content: string
}>()

const md: MarkdownIt = new MarkdownIt({
  highlight: function (str: string, lang: string) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value
      } catch (__) {}
    }
    return '' // 使用默认的转义
  }
})

const renderedContent = computed(() => md.render(props.content))
</script>

<style scoped>
/* 添加一些基本的 Markdown 样式 */
:deep(h1, h2, h3, h4, h5, h6) {
  margin-top: 1em;
  margin-bottom: 0.5em;
}

:deep(p) {
  margin-bottom: 1em;
}

:deep(pre) {
  background-color: var(--code-bg-color, #171414);
  color: var(--code-text-color, #333333);
  padding: 1em;
  border-radius: 4px;
  overflow-x: auto;
}

:deep(code) {
  font-family: 'Courier New', Courier, monospace;
  color: var(--inline-code-color, #09afe6);
}

:deep(ul, ol) {
  margin-bottom: 1em;
  padding-left: 2em;
}

:deep(blockquote) {
  border-left: 4px solid #ccc;
  padding-left: 1em;
  margin-left: 0;
  color: #666;
}

:root.dark {
  --code-bg-color: #2d2d2d;
  --code-text-color: #05c6fb;
  --inline-code-color: #1fee10;
}

</style>