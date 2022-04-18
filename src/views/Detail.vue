<template>
  <div class="Detail">
    <div class="center">
      <Crumb></Crumb>
      <div class="product-detail">
        <Main ref="Main" :mainData="mainData"></Main>
        <Aside :asideData="asideData"></Aside>
      </div>
    </div>
  </div>
</template>

<script>
import { productDetail } from '@/request/api.js'
import Crumb from '@/components/common/Crumb'
import Main from '@/components/detail/Main'
import Aside from '@/components/detail/Aside'
export default {
  data() {
    return {
      mainData: {},
      asideData: {}
    }
  },
  methods: {
    async getProductDetail(id) {
      let productRes = await productDetail(id)
      if (!productRes) return

      let productInfo = productRes.data.productInfo
      let thenYouCanBuy = productRes.data.themYouCanBuy

      this.mainData = {
        mainImgArr: productInfo.imgAltas,
        name: productInfo.name,
        seriesSubTitle: productInfo.seriesSubTitle,
        coin: productInfo.coin,
        parameterJson: productInfo.parameterJson
      }

      this.asideData = {
        thenYouCanBuy: thenYouCanBuy
      }
    }
  },
  async created() {
    // 因为是单页面应用，所以切换页面的时候滚动条是不会初始化置顶的
    // 所以设置页面滚动高度为0
    document.documentElement.scrollTop = 0
    // 获取id后, 获取详情页数据
    let id = this.$route.query.id
    this.getProductDetail(id)
  },
  watch: {
    // 监听Aside组件是否改变了id(用户点击了'你还可以兑换里的商品')
    '$route.query.id': {
      handler() {
        let id = this.$route.query.id
        this.getProductDetail(id)
      }
    }
  },
  components: {
    Crumb,
    Main,
    Aside
  }
}
</script>

<style scoped lang="less">
.Detail {
  .center {
    .product-detail {
      display: flex;
    }
  }
}
</style>
