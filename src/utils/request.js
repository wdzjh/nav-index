import Axios from 'axios'
import { Loading } from 'element-ui'

const resInstance = Axios.create({
    // baseURL:'/api',
    timeout:5000 //请求超时拦截
})
let service
resInstance.interceptors.request.use((config)=>{
    service = Loading.service()
    return config
})

resInstance.interceptors.response.use((response)=>{
    service.close()
    if (response.data.code === 0 && response.data.msg === 'NOTLOGIN') {// 返回登录页面
        console.log('---/login.vue---')
        localStorage.removeItem('userInfo')
        this.$router.push('/login')
      } else {
        return response
      }
},err=>{
    console.log(err,'err');
    return Promise.reject(err)
})

export default resInstance;