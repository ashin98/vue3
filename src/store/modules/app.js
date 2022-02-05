import {login as loginApi} from '../../api/login' //避免重名，可以从login导入，在下面使用loginApi名字
import router from '../../router'
export default {
    namespace:true,
    state:()=>{{
        token:localStorage.getItem('token')||''
    }},
    mutations:{
        SETTOKEN(state,token){
            state.token = token
            localStorage.setItem('token',token)  //设置token到localstorage中
        }
    },
    actions:{
        login({commit},userInfo){
            return new Promise((resolve,reject)=>{
                loginApi(userInfo).then(res=>{
                    commit('SETTOKEN',res.token)
                    router.replace('/')
                    resolve()
                }).catch(err=>{
                    reject(err)
                })
            })
        }
    }
}