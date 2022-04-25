import { getUserInfo } from '@/request/api'
export default {
  namespaced: true,
  state: {
    cartTotal: 0,
    userInfo: {
      nickName: '游客',
      coin: 0,
      headImg: 'icon iconfont icon-youke',
      phone: ''
    }
  },
  mutations: {
    changeUserInfo(state, payload) {
      state.cartTotal = payload.cartTotal
      state.userInfo = payload.userInfo
      state.phone = payload.phone
    },
    initUserInfo(state) {
      state.cartTotal = 0
      state.userInfo = {
        nickName: '游客',
        coin: 0,
        headImg: 'icon iconfont icon-youke'
      }
    }
  },
  actions: {
    async asyncChangeUserInfo({ commit }) {
      // 结构了一下commit，本来是state→state.commit('', )
      let userInfoRes = await getUserInfo()
      commit('changeUserInfo', userInfoRes.data)
    }
  }
}
