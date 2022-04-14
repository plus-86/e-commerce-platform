<template>
  <div class="Home">
    <div class="banner">
      <div class="center">
        <div class="banner-image">
          <img src="@/assets/img/banner.png" alt="" />
        </div>
      </div>
    </div>
    <div class="product">
      <div class="center">
        <Title :title="boutiqueTitle"></Title>
        <div class="boutique-list">
          <Product :list="boutiqueList" :maxLength="maxLength"></Product>
        </div>
        <Title :title="hotTitle"></Title>
        <div class="hot-list">
          <div class="hot-image">
            <img src="@/assets/img/hot-image.png" alt="" />
          </div>
          <Product :list="hotList" :maxLength="maxLength"></Product>
        </div>
      </div>
      <div class="strategy">
        <div class="center">
          <Title title="积分攻略"></Title>
          <Strategy></Strategy>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { productRecommend, productHot } from '@/request/api.js'
import instance from '@/request/request.js'
import axios from 'axios'
import Title from '@/components/common/Title'
import Product from '@/components/common/Product'
import Strategy from '@/components/common/Strategy'
export default {
  name: 'Home',
  data() {
    return {
      boutiqueTitle: '',
      boutiqueList: [],
      hotTitle: '',
      hotList: [],
      maxLength: 8
    }
  },
  async created() {
    let boutiqueRes = await productRecommend()
    this.boutiqueTitle = boutiqueRes.data.name
    this.boutiqueList = boutiqueRes.data.data.records
    let hotRes = await productHot()
    this.hotTitle = hotRes.data.name
    this.hotList = hotRes.data.data.records
  },
  components: {
    Title,
    Product,
    Strategy
  }
}
</script>

<style scoped lang="less">
.Home {
  .banner {
    .center {
      .banner-image {
        padding-bottom: 30px;
        img {
          // CSS图片底部留白
          // 问题描述:
          // div里放了个img，底部留白，用了padding:0，没去掉，记录一下。
          // 原因分析:
          // img元素默认是inline元素，而inline元素的vertical-align属性的默认值为baseline，
          // 也就是文字基线对齐，所以图片底部的留白就是baseline和bottom之间的距离。
          // 解决方案:
          // 1. 使用display: block;将img转换成block元素即可。
          // 2. 重写默认的vertical-align: baseline;，建议设置为vertical-align: middle;
          // 3. 设置图片的浮动或者定位属性，通过添加 float 或 position 属性来改变display属性，将图片隐式转换为块级元素。
          display: block;
        }
      }
    }
  }
  .product {
    background: #f5f5f5;
    .center {
      .hot-list {
        .hot-image {
          margin-bottom: 30px;
          img {
            display: block;
          }
        }
      }
    }
  }
  .strategy {
    background: #fff;
  }
}
</style>
