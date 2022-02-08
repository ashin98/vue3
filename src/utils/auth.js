//此文件设置token过期时间
const TOKEN_TIME = 'tokenTime'
const TOKEN_VALUE = 1000*3600

//登录时设置时间
export const setTokenTime = ()=>{
    localStorage.setItem(TOKEN_TIME,Date.now())
}

//获取登录时间
export const getTokenTime = ()=>{
    return localStorage.getItem(TOKEN_TIME)
}
//判断是否已过期
export const diffTokenTime = ()=>{
    const currentTime = Date.now()
    const tokenTime = getTokenTime()
    return currentTime - tokenTime > TOKEN_VALUE   //为true时已经过期了
}