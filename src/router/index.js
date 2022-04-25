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
  // 错误
  {
    path: '*',
    name: 'Error',
    component: () => import('@/views/Error.vue')
  },
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
    path: '/user', // 进入user
    component: () => import('@/views/User.vue'),
    redirect: '/user/manage', // 重定向到user/manage
    children: [
      // {
      //   path: 'manage',
      //   name: 'manage',
      //   component: () => import('@/views/user/Manage.vue')
      // },
      // {
      //   path: 'order',
      //   name: 'order',
      //   component: () => import('@/views/user/Order.vue')
      // },
      {
        path: 'cart',
        name: 'cart',
        component: () => import('@/views/user/Cart.vue')
      },
      // {
      //   path: 'message',
      //   name: 'message',
      //   component: () => import('@/views/user/Message.vue')
      // },
      // {
      //   path: 'detail',
      //   name: 'detail',
      //   component: () => import('@/views/user/Detail.vue')
      // },
      // {
      //   path: 'strategy',
      //   name: 'strategy',
      //   component: () => import('@/views/user/Strategy.vue')
      // },
      // {
      //   path: 'address',
      //   name: 'address',
      //   component: () => import('@/views/user/Address.vue')
      // },
      // {
      //   path: 'safety',
      //   name: 'safety',
      //   component: () => import('@/views/user/Safety.vue')
      // },
      {
        path: '*',
        component: () => import('@/views/Error.vue')
      }
    ]
  },
  // {
  //   path: '/order',
  //   component: () => import('@/views/Order.vue')
  // },
  // {
  //   path: '/welfare',
  //   component: () => import('@/views/Welfare.vue')
  // },
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
