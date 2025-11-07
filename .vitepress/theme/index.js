import DefaultTheme from 'vitepress/theme'
import CodeGroup from './components/CodeGroup.vue'
import CodeGroupItem from './components/CodeGroupItem.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('CodeGroup', CodeGroup)
    app.component('CodeGroupItem', CodeGroupItem)
  }
}

