// i18n国际化 安装npm i vue-i18n@next
import { createI18n } from "vue-i18n";
import EN from './en'  //导入中英文资源
import ZH from './zh'

const message = {
    //定义不同语言对应的内容

    en:{
        ...EN
    },
    zh:{
        ...ZH
    }
}

//设置当前的语言
const getcurrentLanguage = ()=>{
    //通过浏览器设置当前语言
    const UAlang = navigator.language //如果是中文就打印出zh-CN
    console.log(UAlang)
    const langCode = UAlang.indexOf('zh') !=-1?'zh':'en'   //判断是否是中文，如果是中文就输出zh，否则en
    localStorage.setItem('lang',langCode)
    return langCode
}

const i18n = createI18n({
    legacy:false,
    globalInjection:true,  
    locale:getcurrentLanguage()||'zh',  //语言
    messages:message   //内容
})
export default i18n
//在main.js中全局导入