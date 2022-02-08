import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router/index'
import store from './store/index'
import ElementPlus from 'element-plus'
import '../node_modules/element-plus/dist/index.css'
import './router/permission'  //导入使用路由守卫
import * as ELIcons from '@element-plus/icons-vue'
import i18n from './i18n'
import filterTime from './utils/time'


const app = createApp(App)
// 屏蔽错误信息
// app.config.errorHandler = () => null;
// 屏蔽警告信息
app.config.warnHandler = () => null;
for (const iconName in ELIcons) {
    app.component(iconName, ELIcons[iconName])
  }
  filterTime(app)
app.use(router).use(store).use(i18n).use(ElementPlus).mount('#app')
