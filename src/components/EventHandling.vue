<!-- @click => bắt sự kiện click chuột -->
<!-- @change => khi giá trị input thay đổi -->
 <!-- @submit => khi submit form -->
<template>
    <button @click="increase">Tang</button>
    <p> Count: {{ count }}</p>
    <input type="text" @change="handleChange" class="form-control" placeholder="Nhap ten">
    <p>@submit => khi submit form</p>
    <form @submit.prevent="submitFrm" class="mt-3">
        <input type="text" v-model="username" class="form-control mb-2" placeholder="Nhap username">
        <button type="submit" class="btn btn-danger">Gửi</button>
    </form>

</template>
<script setup>
   import { ref } from "vue";
   const count = ref(0)

   function increase(){
      count.value++;
   }
   function handleChange(event){
       alert('Enter key '+event.target.value);
   }
   const username = ref('');
   function submitFrm(){
      alert('username: '+username.value);
   }


</script>



