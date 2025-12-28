<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Danh sách sản phẩm</h1>
    <!-- Trạng thái loading -->
    <p v-if="loading">Đang tải dữ liệu...</p>

    <!-- Trạng thái lỗi -->
    <p v-else-if="error" class="text-red-600">Lỗi: {{ error }}</p>

    <!-- Danh sách sản phẩm -->
    <div v-else class="row g-3">
        <ProductItem v-for="item in products" :key="item.id" :product="item" @add-to-cart="handAddToCart" @add-to-favorite = "handAddToFavor" />
    </div>
  </div>
</template>

<script setup>

import { ref, onMounted } from "vue";

import ProductItem from './ProductItem.vue'

import { useProduct } from '../composables/useProduct.js';

const { products, loading, error, fetchProducts } = useProduct();

onMounted(() => {
  fetchProducts();
});

function handAddToCart(product){
  console.log("Add to cart item",product.title)
}

function handAddToFavor(product){
  console.log("❤️ Đã thêm vào danh sách yêu thích:", product.title)
}

</script>
<style scoped>
 div[data-v-32d040e6]{
  border-radius:5px;
 }

</style>
