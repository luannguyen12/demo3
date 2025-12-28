
<script setup>
  import {ref,onMounted} from "vue";
  const posts = ref([]);
  onMounted(async ()=>{
    console.log("✅ Component mounted");
    const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=3");
    posts.value = await res.json(); 
  })
</script>
<template>
  <div>
    <h2>Danh sách bài viết</h2>
    <ul>
      <li v-for="p in posts" :key="p.id">{{ p.title }}</li>
    </ul>
  </div>
</template>