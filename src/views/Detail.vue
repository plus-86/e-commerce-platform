<template>
  <div class="Detail">
    <div class="center">
      <Crumb></Crumb>
      <div class="product-detail">
        <Main :mainImgArr="mainImgArr" :coverImg="coverImg"></Main>
        <Aside></Aside>
      </div>
    </div>
    详情页
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
      mainImgArr: [],
      coverImg: ''
    }
  },
  async created() {
    let id = this.$route.query.id
    let productRes = await productDetail(id)
    let productInfo = productRes.data.productInfo
    this.mainImgArr = productInfo.imgAltas
    this.coverImg = productInfo.coverImg
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
