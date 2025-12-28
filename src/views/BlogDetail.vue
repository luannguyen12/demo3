
<script setup>
import { ref, onMounted } from 'vue'

import { useRoute, useRouter } from 'vue-router'

import axios from 'axios'

const route = useRoute()

const router = useRouter()

const blog = ref(null)

const loading = ref(true)

const error = ref(null)

onMounted(async ()=>{
  const id = route.params.id;
  try{
     const res = await axios.get(`https://dummyjson.com/posts/${id}`);
     blog.value = res.data;
  }catch(err){
     error.value = err.message || 'Error fetching blog detail'
  }finally{
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
       <h1 class="the_tit">{{blog.title}}</h1>
       <div class="the_content">
          {{blog.body }}
       </div>
    </div>
  </div>
</template>
<style scoped>
  .the_tit{
    font-size:20px;
    font-weight:600;
    color:#222;
  }
  .the_content{
    font-size:14px;
    line-height:1.5;
    color:#444;
  }
</style>