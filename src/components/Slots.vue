<template>
   <Card>
       <template #header><h2>Header slot</h2></template>
       <p>Mặc đinh: Đây là mô tả sản phẩm</p>
       <template #footer><h3>Footer slot</h3></template>
    </Card>
</template>
<script setup>
  import Card from './Card.vue';
</script>
