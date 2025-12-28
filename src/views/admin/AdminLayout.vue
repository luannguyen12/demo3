<template>
  <div class="admin-layout" style="display: flex;">
    <nav  style="width: 200px; background-color: #333; color: white; min-height: 100vh; padding: 10px;">
      <h3>Admin Panel</h3>
      <router-link :to="{ name: 'AdminDashboard' }">Dashboard</router-link><br>
      <router-link :to="{ name: 'AdminProducts' }">Products</router-link><br>
      <router-link :to="{ name: 'AdminNews' }">News</router-link><br>
      <hr>
      <router-link to="/">Về trang chủ</router-link>
    </nav>
    <main style="flex-grow: 1; padding: 20px;">
      <router-view />
    </main>
  </div>
</template>
<script setup>
// Đảm bảo import router-link nếu bạn chưa
import { RouterLink, RouterView } from 'vue-router';
</script>