import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// 在当前页面点击该页面的路由时会有报错(官方bug)，在vuerouter注册之前写入以下代码
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function (location) {
  return originalPush.call(this, location).catch((err) => {})
}

Vue.use(VueRouter)

const routes = [
  // 重定向
  {
    path: '/', // 用户进我的根目录
    redirect: '/home' // 我给他重定向到home
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/goods',
    component: () => import('@/views/Goods.vue')
  },
  {
    path: '/user',
    component: () => import('@/views/User.vue')
  },
  {
    path: '/order',
    component: () => import('@/views/Order.vue')
  },
  {
    path: '/welfare',
    component: () => import('@/views/Welfare.vue')
  },
  {
    path: '/detail',
    component: () => import('@/views/Detail.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
