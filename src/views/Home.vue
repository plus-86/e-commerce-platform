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
        <Title></Title>
        <div class="boutique-list">
          <Product></Product>
        </div>
        <Title></Title>
        <div class="hot-list">
          <Product></Product>
        </div>
      </div>
      <div class="strategy">
        <div class="center">
          <Title></Title>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { productRecommend } from '@/request/api.js'
import instance from '@/request/request.js'
import axios from 'axios'
import Title from '@/components/common/Title'
import Product from '@/components/common/Product'
export default {
  name: 'Home',
  async created() {
    // let res = await productRecommend()
    // console.log(res)
  },
  components: {
    Title,
    Product
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
  }
  .strategy {
    background: #fff;
  }
}
</style>
