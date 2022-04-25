import instance from './request'
import qs from 'qs' // cnpm i qs
// 获取全部商品(含首页更多，搜索) get请求带请求体（QueryString）参数的写法

export const searchProduct = (params) => instance.get('/products', { params }) // 注意参数名为params不是param 即{ params: params }

// 获取精品推荐
export const productRecommend = () => instance.get('/products/recommend')

//热门兑换
export const productHot = () => instance.get('/products/hot')

//商品详情
export const productDetail = (id) => instance.get(`/products/${id}`)

// 获取验证码
export const sendSMSCode = (param) =>
  instance.post('/sendSMS', qs.stringify(param)) // 服务端要用qs转化过的数据

// 登录
export const submitLogin = (param) =>
  instance.post('/phoneRegin', qs.stringify(param))

// 微信扫码登录
export const wechatLogin = (param) =>
  instance.post('/wechatUsers/PCLogin', qs.stringify(param))

// 手机绑定微信登录
export const wechatBindingLogin = (param) =>
  instance.post('/wechatUsers/binding', qs.stringify(param))

// 获取登录用户信息
export const getUserInfo = () => instance.get('/shop/userProfiles')

// 加入购物车
export const addToCartAPI = (param) =>
  instance.post('/shop/carts/add', qs.stringify(param))

// 解除绑定
export const unbindWechat = (param) =>
  instance.put('/wechatUsers/unbindingWeChat', qs.stringify(param))

// 购物车列表
export const cartList = (params) => instance.get('/shop/carts', { params })

// 删除购物车物品
export const deleteProduct = (params) =>
  instance.delete('/shop/carts', { params })
