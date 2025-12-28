<template>
  <div>
    <h1>📰 Quản lý Tin tức</h1>
    <p>Đây là nơi bạn sẽ viết và quản lý các bài viết, tin tức.</p>

    <button class="btn btn-success mb-3">Viết bài mới</button>

    <ul class="list-group">
      <li class="list-group-item">
        Tiêu đề bài viết mẫu 1
        <span class="float-end">
          <button class="btn btn-sm btn-warning me-2">Sửa</button>
          <button class="btn btn-sm btn-danger">Xóa</button>
        </span>
      </li>
      <li class="list-group-item">
        Tiêu đề bài viết mẫu 2
        <span class="float-end">
          <button class="btn btn-sm btn-warning me-2">Sửa</button>
          <button class="btn btn-sm btn-danger">Xóa</button>
        </span>
      </li>
    </ul>

    <router-link :to="{ name: 'AdminDashboard' }" class="mt-3 d-block">
      &larr; Quay lại Dashboard
    </router-link>
  </div>
</template>

<script setup>
// Logic để tải và quản lý tin tức
</script>

<style scoped>
/* CSS mẫu (giả lập Bootstrap) */
.list-group {
  list-style: none;
  padding-left: 0;
}
.list-group-item {
  border: 1px solid #ddd;
  padding: 12px;
  margin-top: -1px; /* Ngăn chặn double borders */
}
.float-end { float: right; }
.me-2 { margin-right: 0.5rem; }
.mt-3 { margin-top: 1rem; }
.mb-3 { margin-bottom: 1rem; }
.d-block { display: block; }
</style>