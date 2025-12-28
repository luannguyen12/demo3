<template>
    <div class="col-12 col-sm-6 col-md-3">
        <div class="blog_item">
             <h3 class="the_title"> <router-link :to="`/blogs/${blog.id}`" :title="blog.title">{{blog.title}}</router-link></h3>
             <p class="the_excerpt">{{ blog.body }}</p>
        </div>
    </div>
</template>
<script setup>
 // khai bao props de nhan blog
  defineProps({
    blog:Object,
    required: true
  })
</script>
<style scoped>
.blog_item h3{
  line-height:1;
}
.blog_item .the_title{
  font-size:17px;
  line-height:1.2;
  color:#222;
  font-weight:600;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp:2;
     overflow: hidden;
    text-overflow: ellipsis;
}
.blog_item .the_excerpt{
   display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp:3;
    font-size: 14px;
    line-height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>