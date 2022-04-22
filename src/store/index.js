import Vue from 'vue'
import Vuex from 'vuex'
import LoginModule from './login-module'
import ToastState from './toast-state'
import UserInfo from './user-info'
import DetailDataState from './detail-data-state'
import ReloadTopBarModule from './reload-top-bar-module'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    LoginModule,
    ToastState,
    UserInfo,
    DetailDataState,
    ReloadTopBarModule
  }
})
