// composables/useProduct.js
import { ref } from 'vue';
import axios from "axios";

export function useProduct() {
    
    const products = ref([]);
    const loading = ref(true);
    const error = ref(null);

    const fetchProducts = async () => {
        try {
            // const res = await fetch("https://fakestoreapi.com/products");
            // if (!res.ok) throw new Error("Không lấy được dữ liệu!");
            // products.value = await res.json();

            const res = await axios.get('https://fakestoreapi.com/products');

            products.value = res.data

        } catch (err) {
            error.value = err.message;
        } finally {
            loading.value = false;
        }
    };

    return {
        products,
        loading,
        error,
        fetchProducts
  };
}