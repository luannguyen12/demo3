<template>
  <nav class="navbar">
    <h1>My Shop</h1>
    <ul>
     <li><router-link to="/">Trang chủ</router-link></li>
      <li><router-link to="/dashboard">Dashboard - cần login</router-link></li>
      <li><router-link to="/about">Giới thiệu</router-link></li>
      <li><router-link to="/products">Sản phẩm</router-link></li>
      <li><router-link to="/blogs">Blogs</router-link></li>
      <li><router-link to="/contact">Liên hệ</router-link></li>
      <li><router-link to="/order">Giỏ hàng</router-link></li>
      <li><router-link to="/logout">Đăng xuất</router-link></li>
    </ul>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}
.navbar > ul{list-style-type:none;display:flex;}
.navbar > ul > li{
    margin:0 0.5rem;
}
</style>