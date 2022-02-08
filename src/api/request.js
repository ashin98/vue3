import axios from 'axios'
import { ElMessage } from 'element-plus'
import { diffTokenTime } from '../utils/auth'
import store from '../store'
 const service = axios.create({
    baseURL: 'https://lianghj.top:8888/api/private/v1',
    timeout: 5000
  })

  //请求拦截器
  service.interceptors.request.use(
    (config)=>{
      if(localStorage.getItem('token')){
        if(diffTokenTime()){
          //如果存在token，并且已经过期了
          store.dispatch('logout')
          return Promise.reject('token已经过期了')
          
        }
      }
      config.headers.Authorization = localStorage.getItem('token')  //设置token
      return config
    },(error)=>{
      return Promise.reject(new Error(error))
    }
  )

  //响应拦截器
  service.interceptors.response.use((res)=>{
    const {data,meta} = res.data
    if(meta.status===200||meta.status===201){
      return data
    }else{
      ElMessage.error(meta.msg)
      return Promise.reject(new Error(meta.msg))
    }
  },
  (error) => {
    
    error.response && ElMessage.error(error.response.data)
    return Promise.reject(new Error(error.response.data))
  }
  )

export default service