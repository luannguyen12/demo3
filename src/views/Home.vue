<script setup>
import { useCounterStore } from '@/stores/counter'
import { storeToRefs } from 'pinia'

const counter = useCounterStore()
const { count } = storeToRefs(counter)
const { increment, decrement, reset } = counter
</script>
<template>
  <div>
    <h1>Home Page</h1>
    <p>Chào mừng đến trang chính</p>
    <p>Count: {{ count }}</p>
    <button @click="decrement()">-</button>
    <button @click="increment()">+</button>
    <button @click="reset()">Reset</button>
  </div>
</template>
