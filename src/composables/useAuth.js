import { ref, computed } from 'vue';
import { useRouter } from 'vue-router'; // Thêm route
// Trạng thái này nằm ngoài hàm, biến nó thành global (singleton)
// Điều này đảm bảo tất cả các component đều chia sẻ cùng một trạng thái xác thực.
const user = ref(null); 
const isLoading = ref(false);

export function useAuth() {
  // Một thuộc tính tính toán (computed property) để dễ dàng kiểm tra người dùng đã xác thực hay chưa
  const isAuthenticated = computed(() => !!user.value);

  const router = useRouter(); // Lấy router bên trong hàm

  // --- Trạng thái Computed ---
  const isLoggedIn = computed(() => !!user.value);
  const authUser = computed(() => user.value);

  // Giả lập quá trình đăng nhập
  const login = async (username, password) => {
    isLoading.value = true;
    try {
      // Giả lập một lệnh gọi API
      await new Promise(resolve => setTimeout(resolve, 1000)); 

     if (username === 'testuser' && password === 'password') {

      user.value = { name: 'Người dùng Test', email: 'test@example.com', role: 'user' };
      const fakeToken = 'jwt-token-user-' + Date.now();
      localStorage.setItem('auth_token', fakeToken);

      return {
        success: true,
        user: user.value,
        token: fakeToken,
        redirect: '/dashboard' // 1. Redirect của User thường
      };
  
  // --- TRƯỜNG HỢP 2: ADMIN ---
  } else if (username === 'adminuser' && password === 'adminpass') {
      
      user.value = { name: 'Quản trị viên', email: 'admin@example.com', role: 'admin' };
      const fakeToken = 'jwt-token-admin-' + Date.now();
      localStorage.setItem('auth_token', fakeToken);

      return {
        success: true,
        user: user.value,
        token: fakeToken,
        redirect: '/admin/dashboard' // 2. Redirect của Admin
      };

  // --- TRƯỜNG HỢP 3: ĐĂNG NHẬP THẤT BẠI ---
  }else {
        throw new Error('Thông tin đăng nhập không hợp lệ');
      }
    } catch (error) {
      console.error(error);
      alert(error.message); // Hoặc xử lý lỗi một cách tinh tế hơn
    } finally {
      isLoading.value = false;
    }
  };

  // Quá trình đăng xuất
  const logout = async () => {
    console.log('Đăng xuất...');
    localStorage.removeItem('auth_token');
    user.value = null;
    await router.push('/login');
  };

  const checkAuth = async () => {
    // 1. Lấy token từ localStorage
    const token = localStorage.getItem('auth_token');

    if (!token) {
      // Không có token, không làm gì cả
      return;
    }
    try {

      // --- GIẢ LẬP DỮ LIỆU ---
      console.log('Đang xác thực token đã lưu...');
      await new Promise(r => setTimeout(r, 300));
      const fakeUser = { id: 1, name: 'Test User', username: 'testuser' };
      // --- KẾT THÚC GIẢ LẬP ---

     // 3. Cập nhật lại state
      user.value = fakeUser;

    }catch(error){
      // 4. Nếu token hết hạn hoặc không hợp lệ
      console.error('Token không hợp lệ hoặc đã hết hạn:', error);
      // Xóa token hỏng
      localStorage.removeItem('auth_token');
    }
  }

  // Trả về trạng thái và các phương thức để component sử dụng
  return {
    user, // computed
    isLoading, // computed
    isAuthenticated, // computed
    isLoggedIn, // computed
    authUser, // computed

    login, // action
    logout, // action
    checkAuth, // action (chỉ dùng ở main.js)
  };
}