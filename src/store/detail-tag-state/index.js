export default {
  namespaced: true,
  state: {
    imgTagNum: 0,
    typeTagNum: 0
  },
  mutations: {
    initTag(state) {
      // 切换产品展示图片和规格/尺码标签复位
      state.imgTagNum = 0
      state.typeTagNum = 0
    },
    changeImgTagNum(state, payload) {
      // 切换展示照片
      state.imgTagNum = payload
    },
    changeTypeTagNum(state, payload) {
      // 切换产品规格/尺码 展示图片复位
      state.imgTagNum = 0
      // 切换产品规格/尺码
      state.typeTagNum = payload
    }
  }
}
