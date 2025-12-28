<template>
  <div class="my-3">
      <h1 class="text-2xl font-bold mb-4">Blogs</h1>
      <p v-if="loading">Đang tải ...</p>
      <p v-else-if="error">Đã sảy ra lỗi! {{error}}</p>
      <div v-else class="row g-3">
          <BlogItem v-for="item in blogs" :key="item.id" :blog="item" />
      </div>
  </div>
</template>
<script setup>
  // doi tuong - xu kien
  import { ref, onMounted } from 'vue';

  import BlogItem from '../components/BlogItem.vue';
  
  import { useBlog } from '../composables/useBlog.js'

  const { blogs,loading,error,fetchBlogs} = useBlog();

  onMounted(()=>{
     fetchBlogs();
  })

</script>
<style>

</style>