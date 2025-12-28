<script setup>
import { useCounterStore } from '@/stores/counter'
const counter = useCounterStore()
</script>
<template>
  <div>
    <p>Count: {{ counter.count }}</p>
  </div>
</template>
