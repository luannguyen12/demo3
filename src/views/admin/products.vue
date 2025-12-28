<template>
  <div>
    <h1>📦 Quản lý Sản phẩm</h1>
    <p>Đây là nơi bạn sẽ thêm, sửa, xóa các sản phẩm.</p>
    
    <table class="table table-striped mt-4">
      <thead>
        <tr>
          <th>ID</th>
          <th>Tên sản phẩm</th>
          <th>Giá</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Sản phẩm Mẫu 1</td>
          <td>100.000đ</td>
          <td><button class="btn btn-sm btn-primary">Sửa</button></td>
        </tr>
        <tr>
          <td>2</td>
          <td>Sản phẩm Mẫu 2</td>
          <td>250.000đ</td>
          <td><button class="btn btn-sm btn-primary">Sửa</button></td>
        </tr>
      </tbody>
    </table>

    <router-link :to="{ name: 'AdminDashboard' }">
      &larr; Quay lại Dashboard
    </router-link>
  </div>
</template>

<script setup>
// Bạn có thể fetch (tải) danh sách sản phẩm ở đây, 
// ví dụ: trong onMounted
</script>

<style scoped>
/* Thêm CSS cho Bootstrap (nếu bạn dùng) hoặc CSS tùy chỉnh */
.table {
  width: 100%;
  border-collapse: collapse;
}
.table th, .table td {
  border: 1px solid #ddd;
  padding: 8px;
}
.table th {
  background-color: #f2f2f2;
}
</style>