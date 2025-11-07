<template>
  <div ref="itemRef" class="code-group-item" :class="{ 'code-group-item-active': isActive, 'code-group-item-hidden': !isActive }">
    <slot />
  </div>
</template>

<script setup>
import { computed, inject, onMounted, ref, nextTick, watch } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  }
})

const activeIndex = inject('codeGroupActiveIndex')
const getIndex = inject('codeGroupGetIndex')
const registerContent = inject('codeGroupRegisterContent')
const myIndex = ref(-1)
const itemRef = ref(null)

const extractCodeContent = () => {
  if (!itemRef.value || !registerContent) return
  
  // 尝试多种方式查找代码元素
  let codeElement = itemRef.value.querySelector('pre code')
  if (!codeElement) {
    codeElement = itemRef.value.querySelector('code')
  }
  if (!codeElement) {
    codeElement = itemRef.value.querySelector('.vp-code code')
  }
  
  if (codeElement) {
    const content = codeElement.textContent || codeElement.innerText
    if (content) {
      registerContent(myIndex.value, content)
    }
  }
}

onMounted(async () => {
  if (getIndex) {
    myIndex.value = getIndex()
  }
  
  // 等待 DOM 渲染后提取代码内容
  await nextTick()
  // 多次尝试提取，确保能获取到内容
  setTimeout(() => {
    extractCodeContent()
  }, 100)
  setTimeout(() => {
    extractCodeContent()
  }, 300)
  setTimeout(() => {
    extractCodeContent()
  }, 500)
  
  // 监听激活状态变化，重新提取内容（以防内容更新）
  watch(isActive, (newVal) => {
    if (newVal) {
      setTimeout(() => {
        extractCodeContent()
      }, 100)
    }
  })
})

const isActive = computed(() => {
  if (myIndex.value === -1) return false
  return activeIndex?.value === myIndex.value
})
</script>

<style scoped>
/* 所有样式已移至 CodeGroup 组件中统一管理 */
</style>
