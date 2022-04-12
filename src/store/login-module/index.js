export default {
  namespaced: true,
  state: {
    // 是否显示登录模块
    whetherToShowLoginModule: false,
    // 用token判断是否已登录
    hasLogin: localStorage.getItem('x-auth-token') ? true : false,
    // 显示手机登录或扫码登录
    loginWithPhoneNumber: true
  },
  mutations: {
    // 每个 mutation 都有一个  字符串的事件类型 (type)和一个回调函数 (handler)，如下面的 字符串的事件类型 'changeLoginModuleState'
    changeLoginModuleState(state, loginModuleState) {
      // 回调函数会接受 state(就是上面的state) 作为第一个参数
      // mutation的荷载payload，就是传入的额外参数
      state.whetherToShowLoginModule = loginModuleState
    },
    // 切换登录状态
    changeLoginState(state, loginState) {
      state.hasLogin = loginState
    },
    // 切换手机\扫码登录
    switchLoginMode(state, mode) {
      state.loginWithPhoneNumber = mode
    }
  },
  actions: {}
}
