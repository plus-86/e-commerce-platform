export default {
  namespaced: true,
  state: {
    // 是否显示弹窗
    showToast: false,
    // 弹窗文字
    msg: '',
    // 弹窗icon
    classType: ''
  },
  mutations: {
    changeToastState(state, payload) {
      state.showToast = payload.showToast
      state.msg = payload.msg
      state.classType = payload.classType
    }
  },
  actions: {
    asyncChangeToastState(state, payload) {
      // Action 提交的是 mutation，而不是直接变更状态，走一波异步
      // 这里调mutations里的changeToastState，更改state
      // 外面参数传进来，再传给changeToastState
      state.commit('changeToastState', {
        showToast: true, // 开关必执行，不用通过传参
        msg: payload.msg, // 弹窗文字
        classType:
          payload.classType === 'error'
            ? 'icon-chucuo'
            : payload.classType === 'warning'
            ? 'icon-jingshi'
            : 'icon-zhengque' // icon和颜色
      })

      setTimeout(() => {
        state.commit('changeToastState', {
          showToast: false, // 开关必执行，不用通过传参
          msg: payload.msg,
          classType:
            payload.classType === 'error'
              ? 'icon-chucuo'
              : payload.classType === 'warning'
              ? 'icon-jingshi'
              : 'icon-zhengque'
        })
      }, 1500)
    }
  }
}
