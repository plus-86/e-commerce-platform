import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://kumanxuan1.f3322.net:8881/cms/',
  timeout: 5000
})

instance.interceptors.request.use(
  (config) => {
    return config
  },
  (err) => {
    return new Promise.reject(err)
  }
)

instance.interceptors.response.use(
  (res) => {
    let res_data = res.data
    // code为0时，业务逻辑为成功，把这个弹窗工具抽取出来
    if (res_data.code != 0) {
      // 不为0弹窗，return一个false给用到的页面做统一处理
      alert(res_data.message)
      return false
    }
    return res_data
  },
  // 请求失败走这里
  // 这个抛出的错误就相当于组件中发送请求后的catch方法
  (err) => {
    return new Promise.reject(err)
  }
)

export default instance
