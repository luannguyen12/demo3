import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  
  const count = ref(0)
  const channel = new BroadcastChannel('counter_channel')

  function increment() { 
    count.value++
    console.log('[store] ++ ->',count.value);
    // phat song gia tri moi
    channel.postMessage({ count:count.value })
  }
  function decrement() {
    count.value-- 
    console.log('[store] -- ->', count.value)
    // phat song gia tri moi
    channel.postMessage({ count: count.value })
  }
  function reset() { 
    count.value = 0
    console.log('[store] -- ->', count.value)
    // phat song gia tri moi
    channel.postMessage({ count: count.value }) 
  }
  function set(newValue) {
    count.value = newValue
    console.log('[store] set from another tab ->', count.value)
  }
  channel.onmessage = (event) => {
    if (count.value !== event.data.count) {
      set(event.data.count) // <-- Gọi hàm set() cục bộ
    }
  }

  return { count, increment, decrement, reset,set } 
})