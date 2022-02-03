import {createRouter, createWebHashHistory} from 'vue-router'
const routes = [
    {
        path:'/login',
        name:'Login',
        component:()=>import('../views/login.vue')
    },
    {
        path:'/register',
        name:'Resgiter',
        component:()=>import('../views/register.vue')
    }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
   })
   

export default router