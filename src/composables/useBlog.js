import { ref } from 'vue';
import axios from "axios";

export function useBlog(){

  const blogs = ref([]);

  const loading = ref(true);

  const error = ref(null);

    const fetchBlogs = async()=>{
        try{

        const res =  await axios.get('https://dummyjson.com/posts');
        
        blogs.value = res.data.posts;

        //console.log( blogs.value);

        }catch (err){
          error.value = err.message;
        }finally{
          loading.value = false;
        }
    }
    return{
       blogs,
       loading,
       error,
       fetchBlogs
    }
}