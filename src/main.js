import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/global-style.less'
import SlideVerify from 'vue-monoplasty-slide-verify'

Vue.use(SlideVerify)
Vue.prototype.imgBaseUrl = 'https://sc.wolfcode.cn'
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
