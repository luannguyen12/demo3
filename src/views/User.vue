<template>
  <div>
    <div v-if="isAuthenticated">
      <p>Chào mừng, <strong>{{ user.name }}</strong>!</p>
      <button @click="logout">Đăng xuất</button>
    </div>
    <p v-else>Vui lòng đăng nhập để xem thông tin của bạn.</p>
  </div>
</template>

<script setup>
import { useAuth } from '../composables/useAuth.js';

// Lấy trạng thái và các phương thức xác thực đã được chia sẻ
const { user, isAuthenticated, logout } = useAuth();
</script>