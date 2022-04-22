export default {
  namespaced: true,
  state: {
    topBarKeyValue: 0
  },
  mutations: {
    reloadTopBar(state) {
      state.topBarKeyValue++
    }
  },
  actions: {}
}
