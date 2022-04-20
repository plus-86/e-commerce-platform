export default {
  namespaced: true,
  state: {
    // 展示图片
    imgTagNum: 0,
    // 产品规格
    typeTagNum: 0
  },
  mutations: {
    initTag(state) {
      // 切换产品 展示图片、规格/尺码标签和添加的产品数量 复位
      state.imgTagNum = 0
      state.typeTagNum = 0
      state.productAmount = 1
    },
    changeImgTagNum(state, payload) {
      // 切换展示照片 当imgTagNum和数组下标index相等时展示对应的图片
      state.imgTagNum = payload
    },
    changeTypeTagNum(state, payload) {
      // 切换产品规格/尺码 展示的图片需要复位
      state.imgTagNum = 0
      // 切换产品规格/尺码 当typeTagNum和对应的数组下标index相等时展示对应的 规格/尺码 样式
      state.typeTagNum = payload
    }
  }
}
