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
      <div class="commonProblem" v-show="!showIssue">
        <h4>兑换后运费如何收取？</h4>
        <p>
          商城内大部分实物产品均可包邮，也支持上门自提。虚拟产品则无需运费，可在兑换后直接使用。
        </p>
        <p>
          （注：新疆，西藏，内蒙古，青海，海南，宁夏暂不支持包邮，在此地区兑换商品需提前与客服确认运费。）
        </p>

        <h4>如何申请退换货？</h4>
        <p>所有产品均为鸡腿兑换礼品，无质量问题不支持退换货；</p>
        <p>如因喜好不同，或到货后后悔等原因，不支持退货；</p>
        <p>
          因客户原因如联系方式有误、电话停机、不接电话、无理由拒收等造成快件无法正常签收的情况，叩丁狼均不进行补发或赔付；
        </p>
        <p>
          如因质量问题需要退货，将由客服人员与客户联系，确认邮寄地址与流程。退回物品不得有人为损坏或使用痕迹，否则拒绝退换；
        </p>
        <p>
          如顾客选择自行寄回商品，请先垫付运费，到货验证商品后，叩丁狼将以鸡腿发放形式为用户报销运费，不接受单方面到付件。
        </p>

        <h4>如何开具发票？</h4>
        <p>叩丁狼积分商城产品均为定制礼品，使用积分兑换的产品均不支持开票。</p>
        <h4>关于鸡腿价格问题</h4>
        <p>
          因可能存在系统缓存、页面更新延迟等不确定性情况，导致价格显示异常，商品具体售价请以订单结算页价格为准。如您发现异常情况出现，请立即联系我们补正，以便您能顺兑换。
        </p>
        <h4>联系我们</h4>
        <p>www.wolfcode.cn</p>
        <p>微信公众号搜索“叩丁狼”</p>
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

      let rt = productInfo.description.replaceAll(
        'upload',
        this.imgBaseUrl + '/upload'
      )
      this.richText = rt.replaceAll(
        '<p><img',
        '<p style="margin: 0;"><img style="display: block;"'
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
    .commonProblem {
      text-align: left;
      p {
        &:nth-of-type(11) {
          margin-bottom: 0;
        }
        font-weight: 100;
      }
    }
    .productDetail {
      text-align: left;
    }
  }
}
</style>
