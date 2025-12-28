<template>
</template>
<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../composables/useAuth.js';

const { logout } = useAuth();
const router = useRouter();

onMounted(async () => {
   try{
    await logout();
    router.push('/login');
   }catch(err){
    console.error('Lỗi khi đăng xuất:', error);
    router.push('/');
   }
})
</script>