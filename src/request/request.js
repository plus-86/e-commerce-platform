import axios from 'axios'
// 引入vuex
import store from '@/store/index.js'

const instance = axios.create({
  baseURL: '/api',
  timeout: 5000
})

instance.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem('x-auth-token')
    if (token) {
      // 把token放到请求头内
      config.headers['x-auth-token'] = token
    }
    return config
  },
  (err) => {
    store.dispatch('ToastState/asyncChangeToastState', {
      msg: err,
      classType: 'error'
    })
    return new Promise.reject(err)
  }
)

instance.interceptors.response.use(
  (res) => {
    let res_data = res.data
    // code为0、400、407时，业务逻辑为成功，把这个弹窗工具抽取出来
    if (res_data.code != 0 && res_data.code != 400 && res_data.code != 407) {
      // 不为0、400、407弹窗，return一个false给用到的页面做统一处理
      // 这里用自定义组件toast替换alert
      store.dispatch('ToastState/asyncChangeToastState', {
        msg: res_data.message,
        classType: 'error'
      })
      return false
    }
    return res_data
  },
  // 请求失败走这里
  // 这个抛出的错误就相当于组件中发送请求后的catch方法
  (err) => {
    store.dispatch('ToastState/asyncChangeToastState', {
      msg: err,
      classType: 'error'
    })
    return new Promise.reject(err)
  }
)

export default instance
