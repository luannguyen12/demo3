import { createRouter, createWebHistory } from 'vue-router'


// 1. Import các LAYOUT làm component cha
import DefaultLayout from '../layouts/DefaultLayout.vue';
import EmptyLayout from '../layouts/EmptyLayout.vue';
import AdminLayout from '../views/admin/AdminLayout.vue'; // (Layout Admin của bạn)

//import ProductList from '../components/ProductList.vue'

// Import `useAuth` ngay tại đây
import { useAuth } from '../composables/useAuth.js';

import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Contact from '@/views/Contact.vue'
import Blogs from '@/views/Blogs.vue'
import BlogDetail from '@/views/BlogDetail.vue'
import Dashboard from '@/views/Dashboard.vue';
import Login from '@/views/Login.vue';
import Logout from '@/views/Logout.vue';
import Products from '@/views/Products.vue';
import ProductDetail from '@/views/ProductDetail.vue'
import Order from '@/views/Orders.vue'
import Profile from '@/views/Profile.vue'


const routes = [
  {
    path: '/',
    component: DefaultLayout, // Layout cha
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component:Dashboard,
        meta: {
          requiresAuth: true // cần login
        }
      },
      { path: '/', name: 'Home', component:Home,
        'meta':{
          title: 'Trang chủ - My App',
          keywords: 'vue3, home, app',
          description: 'Đây là trang chủ của ứng dụng'
        }
      },
      { path: '/about', name:'About', component:About,
        'meta':{ 
          title: 'Giới thiệu',
          keywords: 'Giới thiệu',
          description: 'Giới thiệu'}
      },
      { path: '/contact', name:'Contact', component:Contact,
        'meta':{
          title: 'Liên hệ',
          keywords: 'Liên hệ',
          description: 'Liên hệ'
        }
      },
      { path: '/order', name:'Order', component:Order,
        'meta':{
          title: 'Giỏ hàng',
          keywords: 'Giỏ hàng',
          description: 'Giỏ hàng'
        }
      },
      { path: '/blogs', name:'Blogs', component:Blogs,
        'meta':{
          title: 'Blogs',
          keywords: 'Blogs',
          description: 'Blogs'
        }
      },
      { path: '/blogs/:id',
        name:'BlogDetail',
        component: BlogDetail, 
        props: true 
      },
      { path: '/products', component: Products,
        'meta':{
          title: 'Products',
          keywords: 'Products',
          description: 'Products',
          // 👇 Chỉ cần thêm dòng này vào // xac thuc can dang nhap
          //requiresAuth: true
        }
      },
      { path: '/products/:id', component: ProductDetail, props: true },
      {
        path: '/login',
        name: 'login',
        component:Login
      },
      {
        path: '/logout',
        name: 'logout',
        component: Logout
      }
    ]
  },
  
  // --- NHÓM 2: GIAO DIỆN TRỐNG (DÙNG EmptyLayout) ---
  {
    path: '/', // Dùng path rỗng để không thêm prefix
    component: EmptyLayout, // Layout cha
    children: [
      {
        path: '/login',
        name: 'login',
        component:Login
      },
      {
        path: '/logout',
        name: 'logout',
        component: Logout
      },
      {
        path: 'admin/login', // path: /admin/login
        name: 'AdminLogin',
        component: () => import('../views/admin/login.vue'),
        meta: { requiresGuest: true }
      }
    ]
  },

  // --- NHÓM 3: GIAO DIỆN ADMIN (DÙNG AdminLayout) ---
  {
    path: '/admin',
    component: AdminLayout, // Layout cha
    redirect: { name: 'AdminDashboard' },
    // 3. Bảo vệ TẤT CẢ các route con bên trong
    meta: { requiresAuth: true }, // (Bạn có thể đổi thành requiresAdmin: true nếu cần)
    // 4. Đây là các ROUTE CON
    children: [
      {
        // Path sẽ là: /admin/dashboard
        path: 'dashboard', 
        name: 'AdminDashboard',
        component: () => import('../views/admin/dashboard.vue'),
        // Meta ở đây sẽ "merge" với meta của cha
        // (Route này vẫn sẽ yêu cầu requiresAuth: true)
      },
      {
        // Path sẽ là: /admin/login
        path: 'login', 
        name: 'AdminLogin',
        component: () => import('../views/admin/login.vue'),
        // 5. GHI ĐÈ Meta: Trang login KHÔNG cần đăng nhập
        meta: {
          requiresAuth: false, // Tắt của cha
          requiresGuest: true  // Chỉ cho khách vào
        }
      },
        // --- DEMO THÊM 2 ROUTE MỚI ---
      {
        // Path: /admin/products
        path: 'products',
        name: 'AdminProducts',
        component: () => import('../views/admin/products.vue')
        // Không cần meta, tự động được bảo vệ
      },
      {
        // Path: /admin/news
        path: 'news',
        name: 'AdminNews',
        component: () => import('../views/admin/news.vue')
        // Không cần meta, tự động được bảo vệ
      }
    ]

  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

//localStorage.removeItem('token');

// Giả sử check login qua localStorage
// login thanh cong tao 
function isLoggedIn() {
  return !!localStorage.getItem('auth_token')
}

router.beforeEach((to, from, next) => {

  // Lấy trạng thái đăng nhập từ `useAuth`
  // Lưu ý: Phải gọi `useAuth` bên ngoài (hoặc dùng Pinia) 
  // nếu bạn cần truy cập nó ở đây. 
  // Tuy nhiên, cách đơn giản nhất là đọc từ state "singleton"
  const { isLoggedIn } = useAuth();

  const requiresAuth = to.meta.requiresAuth;
  const requiresGuest = to.meta.requiresGuest;

  if (requiresAuth && !isLoggedIn.value) {
    // 1. Nếu route yêu cầu đăng nhập (requiresAuth) mà user chưa đăng nhập
    // -> Chuyển hướng về trang login
    console.log('Bảo vệ route: Yêu cầu đăng nhập. Chuyển về /login.');

    // KIỂM TRA XEM ĐÂY CÓ PHẢI LÀ ROUTE ADMIN KHÔNG
    if (to.fullPath.startsWith('/admin')) {
      // Nếu ĐÚNG, chuyển hướng đến trang đăng nhập CỦA ADMIN
      console.log('Bảo vệ route: Yêu cầu đăng nhập Admin. Chuyển về /admin/login.');
      next({ name: 'AdminLogin', query: { redirect: to.fullPath } });
    } else {
      // Nếu KHÔNG, chuyển hướng đến trang đăng nhập CỦA USER
      console.log('Bảo vệ route: Yêu cầu đăng nhập User. Chuyển về /login.');
      next({ name: 'Login', query: { redirect: to.fullPath } });
    }

  }else if (requiresGuest && isLoggedIn.value) {
     // 2. Nếu route yêu cầu là khách (requiresGuest) (ví dụ: trang Login)
     // mà user đã đăng nhập
     // -> Chuyển hướng về trang dashboard

    console.log('Bảo vệ route: Đã đăng nhập. Chuyển về /dashboard.');

    // Nếu đã đăng nhập mà cố vào /admin/login -> đẩy về /admin/dashboard
    if (to.name === 'AdminLogin') {
      next({ name: 'AdminDashboard' });
    }else if (to.name === 'Login') {
      // (Giả sử bạn có 1 route 'Dashboard' cho user)
      next({ name: 'dashboard' }); 
    } 
    // Các trường hợp khác
    else {
      next({ path: '/' });
    }

  }else{
    
    next();
  }

  // if (to.meta.requiresAuth && !isLoggedIn()) {
  //   // Nếu route yêu cầu login mà chưa đăng nhập → chuyển hướng sang trang login
  //   next({ name: 'login' })
  // } else {
  //   next() // cho phép đi tiếp
  // }
})

export default router
