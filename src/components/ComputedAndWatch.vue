<script setup>
import { ref, computed,watch } from "vue"

const firstName = ref("Nguyen")
const lastName = ref("An")
const count = ref(0)

// computed tự động cập nhật khi firstName hoặc lastName thay đổi
const fullName = computed(() => {
  return firstName.value + " " + lastName.value
})


const increase = ()=>{
    return count.value++;
}

// Theo dõi count
watch(count, (newVal, oldVal) => {
  console.log(`count đổi từ ${oldVal} -> ${newVal}`)
})

</script>

<template>
  <p>*ComputedAndWatch</p>
  <p>Full name: {{ fullName }}</p>
  <button @click="increase">Tang</button>
    <p> Count: {{ count }}</p>
</template>