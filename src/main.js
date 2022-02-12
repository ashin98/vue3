import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router/index'
import store from './store/index'
import ElementPlus from 'element-plus'
import '../node_modules/element-plus/dist/index.css'
import './router/permission'  //导入使用路由守卫

createApp(App).use(router).use(store).use(ElementPlus).mount('#app')
