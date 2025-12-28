import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router'

/* --- BẮT ĐẦU CẤU HÌNH FONT AWESOME --- */

// 1. Import thư viện lõi
import { library } from '@fortawesome/fontawesome-svg-core'

// 2. Import component FontAwesomeIcon
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// 3. Import các icon bạn muốn sử dụng
import { faPhone, faUser, faFlag } from '@fortawesome/free-solid-svg-icons'

import { useAuth } from './composables/useAuth.js';

const { checkAuth } = useAuth();

// 4. Thêm các icon đã import vào thư viện
library.add(faPhone, faUser, faFlag)

/* --- KẾT THÚC CẤU HÌNH FONT AWESOME --- */



// Tạo một hàm async để khởi động
const initApp = async () => {
  try {
    // 2. Chạy checkAuth ĐẦU TIÊN
    // Nó sẽ kiểm tra localStorage và gọi API để lấy thông tin user nếu có token
    await checkAuth();

  } catch (err) {
    console.error('Lỗi khởi động auth:', err);
  
  } finally {

    // 3. Chỉ mount app SAU KHI đã checkAuth xong
    const app = createApp(App)
    const pinia = createPinia() // Tạo một instance duy nhất

    app.component('font-awesome-icon', FontAwesomeIcon)
    app.use(pinia)
    app.use(router)
    app.mount('#app')
  }
};

// 4. Chạy hàm khởi động
initApp();



