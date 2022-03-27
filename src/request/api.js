import instance from './request'

// 获取精品推荐
export const productRecommend = () => instance.get('products/recommend')
