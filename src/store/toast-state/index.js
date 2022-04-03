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
      state.commit('changeToastState', {
        showToast: true,
        msg: payload.msg,
        classType: payload.classType
      })

      setTimeout(() => {
        state.commit('changeToastState', {
          showToast: false,
          msg: payload.msg,
          classType: payload.classType
        })
      }, 1500)
    }
  }
}
