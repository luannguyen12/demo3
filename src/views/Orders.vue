<script setup>
    import { useCartStore } from '../stores/cart';

    const cartStore = useCartStore()

    // TẠO MỘT HÀM MỚI ĐỂ XỬ LÝ VIỆC XÓA
    function confirmRemoveItem(item) {
      // Hiển thị hộp thoại xác nhận của trình duyệt
      const confirmed = window.confirm(`Bạn có chắc chắn muốn xóa "${item.title}" khỏi giỏ hàng?`)

      // Nếu người dùng nhấn "OK" (confirmed = true), thì mới gọi action từ store
      if (confirmed) {
        cartStore.removeItem(item.id)

        // (Tùy chọn) Thêm thông báo xóa thành công bằng Notify.js
        $.notify(`Đã xóa ${item.name} khỏi giỏ hàng`, "info");
      }
    }

    

</script>
<template>
  <div>
    <h1>Orders Page</h1>
    <p>Danh sách đơn hàng</p>
    <p v-if="cartStore.itemCount === 0">Giỏ hàng trống.</p>
    <div v-else>
      <ul class="listCarts">
        <li v-for="item in cartStore.items" :key="item.id">
           <p>Tên {{item.title}}</p>
           <p>Số lượng: {{ item.quantity }} </p>
           <p>Giá: {{ item.price * item.quantity }}</p>
           <p><button @click="confirmRemoveItem(item)">Xóa</button></p>
        </li>
      </ul>
      <hr>
      <h3>Tổng cộng: {{ cartStore.cartTotal.toLocaleString() }} VNĐ ({{ cartStore.itemCount }} sản phẩm)</h3>
      <button @click="cartStore.clearCart()">Xóa hết</button>
    </div>

    <div class="user-info">
    <h2>Thông tin Liên hệ</h2>
    <p>
      <font-awesome-icon :icon="['fas', 'user']" />
      <span>Nguyễn Văn A</span>
    </p>
    <p>
      <font-awesome-icon icon="fas fa-phone" />
      <span>0909 123 456</span>
    </p>

    <h3>Các thuộc tính hữu ích:</h3>
    <p>
      <font-awesome-icon :icon="['fas', 'flag']" size="2x" /> <font-awesome-icon :icon="['fas', 'flag']" rotation="90" /> <font-awesome-icon :icon="['fas', 'flag']" spin /> <font-awesome-icon :icon="['fas', 'flag']" style="color: red;" /> </p>
  </div>
  np
  </div>
</template>
<style>
   .listCarts{
    list-style-type:none;
    padding:0;
    margin:0;
   }
</style>