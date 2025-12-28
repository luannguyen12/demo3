import { defineStore } from 'pinia'
import { ref, computed,watch } from 'vue'

export const useCartStore = defineStore('cart', () => {
    
    // --- STATE ---

    // 1. Đọc dữ liệu từ localStorage khi store khởi tạo
    // Dùng JSON.parse để chuyển chuỗi JSON thành object/array.
    // Nếu không có gì trong localStorage, dùng mảng rỗng [].
     const items = ref(JSON.parse(localStorage.getItem('cartItems')) || [])
 
    // --- GETTERS (Computed Properties) ---

    // Tính tổng số lượng sản phẩm trong giỏ hàng
    const itemCount = computed(() => {
       return items.value.reduce((total, item) => total + item.quantity, 0)
    })

    // Tính tổng thành tiền của giỏ hàng
    const cartTotal = computed(() => {
        return items.value.reduce((total, item) => total + (item.price * item.quantity), 0)
    })

    // --- ACTIONS ---

    /**
   * Thêm một sản phẩm vào giỏ hàng.
   * Nếu sản phẩm đã tồn tại, chỉ tăng số lượng.
   * @param {object} product - Sản phẩm cần thêm vào.
   */

    function addItem(product) {
           const existingItem = items.value.find(item => item.id === product.id)

            if (existingItem) {
            // Nếu sản phẩm đã có, tăng số lượng
             existingItem.quantity++
            } else {
            // Nếu là sản phẩm mới, thêm vào mảng với số lượng là 1
              items.value.push({ ...product, quantity: 1 })
            }

            // --- THÊM DÒNG NÀY ĐỂ HIỆN THÔNG BÁO ---
            // Sử dụng template literal để hiển thị tên sản phẩm cho sinh động
            $.notify(
            `${product.title} đã được thêm vào giỏ!`, 
            "success" // Kiểu thông báo: "success", "info", "warn", "error"
            );
            // ------------------------------------------

        console.log('Cart updated:', items.value)
    }

    /**
   * Xóa một sản phẩm khỏi giỏ hàng bằng ID.
   * @param {number|string} productId - ID của sản phẩm cần xóa.
   */

    function removeItem(productId) {
      items.value = items.value.filter(item => item.id !== productId)
    }

    /**
     * Cập nhật số lượng cho một sản phẩm.
     * Nếu số lượng <= 0, sản phẩm sẽ bị xóa.
     * @param {number|string} productId - ID của sản phẩm.
     * @param {number} newQuantity - Số lượng mới.
     */
    function updateQuantity(productId, newQuantity) {
        const item = items.value.find(item => item.id === productId)
        if (item) {
            if (newQuantity > 0) {
                item.quantity = newQuantity
            } else {
                // Nếu số lượng mới là 0 hoặc âm, xóa sản phẩm
                removeItem(productId)
            }
        }
    }

    /**
    * Xóa toàn bộ sản phẩm khỏi giỏ hàng.
    */
    function clearCart() {
        items.value = []
    }

     // 2. Dùng 'watch' để tự động lưu vào localStorage mỗi khi 'items' thay đổi
    watch(items,(newItems)=>{
        // Dùng JSON.stringify để chuyển object/array thành chuỗi JSON.
        localStorage.setItem('cartItems', JSON.stringify(newItems))
    },{deep: true})
    // 'deep: true' để theo dõi sự thay đổi bên trong các object của mảng

    

    // Return tất cả state, getters, và actions để các component có thể sử dụng
    return {
        items,
        itemCount,
        cartTotal,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
    }
})