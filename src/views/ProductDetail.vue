<!-- ProductDetail.vue -->
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const product = ref(null)
const loading = ref(true)
const error = ref(null)
onMounted(async () => {
  const id = route.params.id
  try {
    const res = await axios.get(`https://fakestoreapi.com/products/${id}`)
    product.value = res.data
  } catch (err) {
    error.value = err.message || 'Error fetching product detail'
  } finally {
    loading.value = false
  }
})

function goBack() {
  router.back()
}
</script>

<template>
  <div>
    <p v-if="loading">Đang tải …</p>
    <p v-else-if="error">Lỗi: {{ error }}</p>
    <div v-else>
      <h2>{{ product.title }}</h2>
      <img :src="product.image" alt="" width="200" />
      <p>Giá: ${{ product.price }}</p>
      <p>Mô tả: {{ product.description }}</p>
      <p>Danh mục: {{ product.category }}</p>
      <p>Rating: {{ product.rating.rate }} ({{ product.rating.count }} đánh giá)</p>
      <button @click="goBack">Quay lại</button>
    </div>
  </div>
</template>
