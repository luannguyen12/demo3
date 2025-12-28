<template>
<div class="col-12 col-sm-6 col-md-4">
    <div class="border product_item rounded-lg p-2 shadow hover:shadow-lg transition">
        <div class="wrap_img">
            <img
                :src="product.image"
                :alt="product.title"
                class="w-full h-40 object-contain mb-2"
            />
            </div>
            <h2 class="text-sm font-semibold mb-1"><a href="#" :title="product.title">{{ product.title }}</a></h2>
            <p class="text-green-600 font-bold">${{ product.price }}</p>
            <button @click="addToCart(product)">Add to cart</button>
            <button @click="$emit('add-to-favorite',product)">Like</button>
            <!-- <button @click="goDetail(product.id)">Xem chi tiết</button> -->
            <!-- Router link -->
           <router-link :to="`/products/${product.id}`" :title="product.title">
             <span>Chi tiet</span>
          </router-link>
            
    </div>
  </div>
</template>
<script setup>
 // khai bao props de nhan product
  defineProps({
    product:Object
  })

  import { useRouter  } from 'vue-router'
  const router = useRouter()

  function goDetail(id) {
    router.push(`/products/${id}`)
  }

  defineEmits(['add-to-cart','add-to-favorite'])

  import { useCartStore } from '@/stores/cart'

  const cartStore = useCartStore()

  function addToCart(product) {
    cartStore.addItem(product)
  }

</script>
<style scoped>
 .wrap_img{
     position:relative;
     width:100%;
     height:0;
     padding-bottom:100%;
     margin-bottom:10px
 }
 .wrap_img img{
  position:absolute;
  width:100%;
  height:100%;
  top:0;
  left:0;
  object-fit:contain;
 }
 .product_item h2{
  text-align:left;
  font-size:18px;
  line-height:1.3;
  display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp:3;
    overflow: hidden;
    text-overflow: ellipsis;
 }
  .product_item h2 a{
     color:#333;
  }
   .product_item h2 a:hover{
    color:red;
   }
</style>