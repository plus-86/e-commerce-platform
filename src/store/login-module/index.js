export default {
  namespaced: true,
  state: {
    whetherToShowLoginModule: false
  },
  mutations: {
    // 每个 mutation 都有一个  字符串的事件类型 (type)和一个回调函数 (handler)，如下面的 字符串的事件类型 'changeLoginModuleState'
    changeLoginModuleState(state, loginState) {
      // 回调函数会接受 state(就是上面的state) 作为第一个参数
      // mutation的荷载payload，就是传入的额外参数
      state.whetherToShowLoginModule = loginState
    }
  },
  actions: {}
}
