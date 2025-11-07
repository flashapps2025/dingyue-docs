<template>
  <div class="code-group">
    <div class="code-group__nav">
      <div class="code-group__nav-tabs">
        <button
          v-for="(tab, index) in tabs"
          :key="index"
          class="code-group__nav-tab"
          :class="{ 'code-group__nav-tab-active': index === activeIndex }"
          @click="activeIndex = index"
        >
          {{ tab }}
        </button>
      </div>
      <button
        class="code-group__copy"
        :title="copied ? '已复制!' : '复制代码'"
        @click="copyCode"
      >
        <svg v-if="!copied" class="code-group__copy-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
        <svg v-else class="code-group__copy-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </button>
    </div>
    <div class="code-group__content">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref, provide, onMounted, useSlots, nextTick, watch } from 'vue'

const slots = useSlots()
const activeIndex = ref(0)
const tabs = ref([])
const copied = ref(false)
let itemCounter = 0
const codeContents = new Map()

provide('codeGroupActiveIndex', activeIndex)
provide('codeGroupGetIndex', () => {
  const currentIndex = itemCounter
  itemCounter++
  return currentIndex
})
provide('codeGroupRegisterContent', (index, content) => {
  codeContents.set(index, content)
})

const copyCode = async () => {
  const content = codeContents.get(activeIndex.value)
  if (!content) return
  
  try {
    await navigator.clipboard.writeText(content)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('复制失败:', err)
  }
}

onMounted(async () => {
  await nextTick()
  if (slots.default) {
    const children = slots.default()
    tabs.value = children
      .filter(vnode => {
        return vnode.type && 
               (vnode.type.name === 'CodeGroupItem' || 
                vnode.type.__name === 'CodeGroupItem' ||
                (typeof vnode.type === 'object' && vnode.type.name === 'CodeGroupItem'))
      })
      .map(vnode => {
        const props = vnode.props || {}
        return props.title || 'Code'
      })
  }
})
</script>

<style scoped>
.code-group {
  margin: 1rem 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  overflow: hidden;
  background: var(--vp-code-block-bg);
}

.code-group__nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  margin-bottom: 0 !important;
  padding: 0;
  list-style: none;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-code-block-bg);
  padding: 0.5rem 0.5rem 0 0.5rem;
}

.code-group__nav-tabs {
  display: flex;
  flex: 1;
}

.code-group__nav-tab {
  padding: 0.5rem 1rem;
  margin: 0;
  margin-right: 0.25rem;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
  transition: color 0.2s;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  border-radius: 4px 4px 0 0;
}

.code-group__nav-tab:hover {
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
}

.code-group__nav-tab-active {
  color: var(--vp-c-brand);
  border-bottom-color: var(--vp-c-brand);
}

.code-group__content {
  position: relative;
  margin: 0;
  padding: 0;
}

.code-group__copy {
  padding: 0.5rem;
  margin: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  color: var(--vp-c-text-2);
  transition: color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}

.code-group__copy:hover {
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
}

.code-group__copy-icon {
  width: 16px;
  height: 16px;
}

.code-group__copy:active {
  transform: scale(0.95);
}

/* CodeGroupItem 相关样式 */
.code-group__content :deep(.code-group-item) {
  display: block;
  margin: 0;
  padding: 0;
}

.code-group__content :deep(.code-group-item-hidden) {
  display: none !important;
}

.code-group__content :deep(.code-group-item-active) {
  display: block !important;
}

/* 隐藏语言标签 */
.code-group__content :deep(.code-group-item .lang) {
  display: none !important;
}

/* 隐藏 VitePress 默认的复制按钮 */
.code-group__content :deep(.code-group-item .copy) {
  display: none !important;
}

/* 确保代码块容器有正确的样式和最大高度，去掉所有间隙 */
.code-group__content :deep(.code-group-item pre) {
  margin: 0 !important;
  margin-top: 0 !important;
  padding-top: 0 !important;
  max-height: 480px;
  overflow-y: auto;
  border-radius: inherit;
  border: none;
}

.code-group__content :deep(.code-group-item .vp-code) {
  margin: 0 !important;
  margin-top: 0 !important;
  padding-top: 0 !important;
  max-height: 480px;
  overflow-y: auto;
  border: none;
  border-radius: inherit;
}

.code-group__content :deep(.code-group-item .language-swift),
.code-group__content :deep(.code-group-item .language-objective-c),
.code-group__content :deep(.code-group-item [class*="language-"]) {
  margin: 0 !important;
  margin-top: 0 !important;
  padding-top: 0 !important;
  max-height: 480px;
  overflow-y: auto;
  border: none;
  border-radius: inherit;
}

.code-group__content :deep(.code-group-item pre code) {
  display: block;
  max-height: 480px;
  padding: 24px;
  overflow-y: auto;
}
</style>
