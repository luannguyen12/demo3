// src/plugins/useMeta.js
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

export function useMeta() {
  const route = useRoute()

  // hàm set meta
  const setMeta = (name, content) => {
    if (!content) return
    let el = document.querySelector(`meta[name="${name}"]`)
    if (el) {
      el.setAttribute('content', content)
    } else {
      el = document.createElement('meta')
      el.setAttribute('name', name)
      el.setAttribute('content', content)
      document.head.appendChild(el)
    }
  }

  const updateMeta = (meta) => {
    if (meta?.title) document.title = meta.title
    if (meta?.keywords) setMeta('keywords', meta.keywords)
    if (meta?.description) setMeta('description', meta.description)
  }

  // khi component mount
  onMounted(() => {
    updateMeta(route.meta)
  })

  // khi route thay đổi
  watch(
    () => route.meta,
    (meta) => {
      updateMeta(meta)
    },
    { deep: true, immediate: true }
  )
}
