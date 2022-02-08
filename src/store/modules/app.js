import {login as loginApi} from '../../api/login' //避免重名，可以从login导入，在下面使用loginApi名字
import {setTokenTime} from '../../utils/auth'  //设置登录时间
import router from '../../router'
export default {
    namespace:true,
    state:()=>({
        token:localStorage.getItem('token')||'',
        siderBar:false,
        lang:localStorage.getItem('lang')||'zh'
    }),
    mutations:{
        SETTOKEN(state,token){
            state.token = token
            localStorage.setItem('token',token)  //设置token到localstorage中
        },
        changeSiderBar(state){
            state.siderBar = !state.siderBar
        },
        changeLang(state,lang){
            state.lang = lang
        }
    },
    actions:{
        login({commit},userInfo){
            return new Promise((resolve,reject)=>{
                loginApi(userInfo).then(res=>{
                    commit('SETTOKEN',res.token)
                    setTokenTime()
                    router.replace('/')
                    resolve()
                }).catch(err=>{
                    reject(err)
                })
            })
        },

        //token过期退出登录
        logout({commit}){
            commit('SETTOKEN','')
            console.log(11111)
            localStorage.clear()
            router.replace('/login')
        }
    }
}