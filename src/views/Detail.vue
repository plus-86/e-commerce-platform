<template>
  <div class="Detail">
    <div class="center">
      <Crumb :nav="nav"></Crumb>
      <div class="product-detail">
        <Main ref="Main" :mainData="mainData"></Main>
        <Aside :asideData="asideData"></Aside>
      </div>
      <ul class="tag">
        <li @click="cc" :class="showIssue ? 'active' : ''">商品详情</li>
        <li @click="cc" :class="!showIssue ? 'active' : ''">常见问题</li>
      </ul>
      <div class="productDetail" v-show="showIssue" v-html="richText"></div>
      <div class="commonProblem" v-show="!showIssue">常见问题常见问题</div>
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
      // Main组件的数据
      mainData: {},
      // Aside组件数据
      asideData: {},
      // Crumb组件数据
      nav: [],
      // 商品详情/常见问题标签切换
      showIssue: true,
      // 富文本
      richText: ''
    }
  },
  methods: {
    cc() {
      this.showIssue = !this.showIssue
    },
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
        parameterJson: productInfo.parameterJson,
        stock: productInfo.stock
      }

      this.asideData = {
        thenYouCanBuy: thenYouCanBuy
      }
      this.nav = productRes.data.nav

      this.richText = productInfo.description.replaceAll(
        'upload',
        this.imgBaseUrl + '/upload'
      )
      // 切换产品 或 规格 复位产品数量
      this.$refs.Main.productAmount = 1
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
@import '~@/assets/css/global-style.less';

.Detail {
  background: #f5f5f5;
  font-size: 18px;
  .center {
    .product-detail {
      display: flex;
    }
    .tag {
      display: flex;
      li {
        width: 120px;
        height: 50px;
        font-weight: 700;
        text-align: center;
        line-height: 50px;
        cursor: pointer;
        &.active {
          background: @base-color;
          color: #fff;
        }
      }
    }
  }
}
</style>
