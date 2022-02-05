//路由守卫

import router from './index'
import store from '../store/index'

const whiteList = ['/login'] //白名单，没有登陆可以跳转的页面
router.beforeEach((to,from,next)=>{
    if(store.getters.token){
        //如果有token
        if(to.path==='/login'){
            next('/')
        }else{
            //没token
            next()
        }
    }else{
        if(whiteList.includes(to.path)){
            next()
        }else{
            next('/login')
        }
    }
})