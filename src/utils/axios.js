import axios from 'axios'
import { showToast, showFailToast } from 'vant'
import router from '@/router'
import { setLocal, getLocal } from '@/common/js/utils'

console.log('import.meta.env', import.meta.env) // 环境变量获取
// baseURL 基础路径配置，backend-api-01.newbee.ltd/api/v1 为线上请求地址，这里只有一个地址，所以就不做区分
// axios.defaults.baseURL = import.meta.env.MODE == 'development' ? '//backend-api-01.newbee.ltd/api/v1' : '//backend-api-01.newbee.ltd/api/v1'
axios.defaults.baseURL = 'http://localhost:8010/v1'

// 跨域请求是要不要携带cookie，本课程没有跨域请求的情况
axios.defaults.withCredentials = true
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
// 本课程判断用户登录状态是通过 token 来实现
// axios.defaults.headers['token'] = localStorage.getItem('token') || ''
// post 请求时，发送 json 形式的数据包
axios.defaults.headers.post['Content-Type'] = 'application/json'


// 设置axios拦截器：请求拦截器
axios.interceptors.request.use(config => {
    //请求拦截一般会有哪些操作
    // 1.比如config中的一些信息不符合服务器的要求,这里可以做一些修改
    // 2.比如每次发送网络请求时,都希望在界面中显示一个请求的图标(然后再响应拦截中取消显示)
    // 3.某些网络请求必须携带一些特殊的信息(如登录token),如果没有携带就可以拦截并作响应提示

    // 给请求头添加token
    /*
    * 其中   /.*csrftoken=([^;.]*).*$/    是一个正则表达式，用于从cookie中获取csrftoken的值 ，
    * ([^;.]*) 是命名捕获，表示从匹配到的内容中 只获得 ()内的值。
    * string.match(regex) 得到的是一个数组， 第0项是匹配到的全部内容，第1项是通过命名捕获得到的内容，在这里就是csrftoken的值。
    * 这样就完成了使用axios发送请求的正确配置了，同时保证了网站免受csrf攻击的影响.
    */

    // console.log("before request")
    // axios.defaults.headers['Authorization'] = `Bearer ${getLocal('token')}`;


    // 借助config配置token
    config.headers.Authorization = `Bearer ${getLocal('token')}`;
    // console.log(axios.defaults.headers['Authorization'])
    return config
}, err => {
    // 请求未成功发出，如：没有网络...
    return Promise.reject(err)
})


// interceptors 是拦截器，每个请求都会经过这个拦截器，返回的数据可以通过拦截处理后返回
axios.interceptors.response.use(res => {
    if (typeof res.data !== 'object') {
        showFailToast('服务端异常！')
        return Promise.reject(res)
    }
    // if (res.data.resultCode != 200) {
    //     if (res.data.message) showFailToast(res.data.message)
    //     if (res.data.resultCode == 416) {
    //         // 返回 416 代表没有登录状态，路由跳转到/login 页面
    //         router.push({ path: '/login' })
    //     }
    //     if (res.data.data && window.location.hash == '#/login') {
    //         setLocal('token', res.data.data)
    //         axios.defaults.headers['token'] = res.data.data
    //     }
    //     return Promise.reject(res.data)
    // }

    // return res.data

    // console.log(res)
    // console.log(res.status)
    if (res.data && window.location.hash == '#/login') {
        setLocal('token', res.data.token)
        // axios.defaults.headers['Authorization'] = `Bearer ${res.data.token}`;
    }

    return Promise.resolve(res.data)
}, err => {
    if (err.response.data.errors) {
        // console.log(err.response.data.errors)
        // console.log(JSON.stringify(err.response.data.errors))
        var obj = err.response.data.errors
        // console.log(Object.values(obj).toString())
        showFailToast(Object.values(obj).toString())
    } else {
        // console.log(err.response.data.message)
        showFailToast(err.response.data.message)

        // console.log(err.response)
        if (err.response.status == 401 && window.location.hash !== '#/login') {
            router.push({ path: '/login' })
        }
    }

    return Promise.reject(err)
})

export default axios