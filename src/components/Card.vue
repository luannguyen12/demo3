<template>
    <div class="card">
        <header>
            <slot name="header"></slot>
        </header>
        <main>
            <slot>Mặc đinh: Nội dung chính</slot>
        </main>
        <footer>
              <slot name="footer"></slot>
        </footer>
    </div>
</template>
<script setup>
</script>
<style scoped>
.card {
  border: 1px solid #ccc;
  padding: 15px;
  border-radius: 8px;
}
</style>