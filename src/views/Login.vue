<template>
  <div>
    <h3>Đăng nhập 🔑</h3>
    <Form @submit="handleLogin" :validation-schema="validationSchema">
      <div class="form-group mb-3">
        <Field
        class="form-control" 
        name="username"  
        type="text" 
        placeholder="Tên đăng nhập (testuser)"
        />
        <ErrorMessage name="username" class="text-danger" />
      </div>
      <div class="form-group mb-3">
        <Field
        class="form-control" 
        name="password" 
        type="password" 
        placeholder="Mật khẩu (password)"
         />
         <ErrorMessage name="password" class="text-danger" />
      </div>
      <button class="btn btn-success" type="submit" :disabled="isLoading">
        {{ isLoading ? 'Đang đăng nhập...' : 'Đăng nhập' }}
      </button>
    </Form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router'; // 1) dùng vue-router
import { useAuth } from '../composables/useAuth.js';

// 1. Imports mới cho VeeValidate và Yup
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';

//const username = ref('');
//const password = ref('');

const { login, isLoading } = useAuth();

const router = useRouter();
const route = useRoute();

const validationSchema = yup.object({
  username:yup.string().required('Vui lòng nhập tên đăng nhập'),
  password:yup.string().required('Vui lòng nhập mật khẩu')

})

// Hàm này sẽ tự động nhận 'values' (một object) từ <Form> khi validation thành công

const handleLogin = async (values) => {

  console.log('username:', values.username, 'password:', values.password);
  
  const res = await login(values.username, values.password);

  const target = res.redirect || route.query.redirect || '/';

  await router.push(target);

};
</script>

<style scoped>
/* Thêm style cho thông báo lỗi (tùy chọn) */
.text-danger {
  color: red;
  font-size: 0.875em;
  margin-top: 0.25rem;
}
</style>