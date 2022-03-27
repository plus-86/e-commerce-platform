import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://kumanxuan1.f3322.net:8881/cms/',
  timeout: 5000
})

instance.interceptors.request.use(
  (config) => {
    console.log('请求拦截器', config)
    return config
  },
  (err) => {
    return new Promise.reject(err)
  }
)

instance.interceptors.response.use(
  (res) => {
    console.log('响应拦截器', res)
    return res
  },
  (err) => {
    return new Promise.reject(err)
  }
)

export default instance
