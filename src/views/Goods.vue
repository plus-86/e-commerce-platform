<template>
  <div class="Goods">
    <div class="center">
      <Crumb :nav="[{ name: '全部' }]"></Crumb>
      <div class="hot-image">
        <img src="@/assets/img/hot-image.png" alt="" />
      </div>
      <div class="tagBox">
        <ul class="tag1">
          <li>排序：</li>
          <li
            @click="searchByScore(index, item.min, item.max)"
            v-for="(item, index) in tag1"
            :key="index"
            :class="tag1Num === index ? 'active' : ''"
          >
            {{ item.msg }}
          </li>
        </ul>
        <ul class="tag2">
          <li>分类：</li>
          <li
            @click="searchByClass(index, item.type)"
            v-for="(item, index) in tag2"
            :key="index"
            :class="tag2Num === index ? 'active' : ''"
          >
            {{ item.msg }}
          </li>
        </ul>
      </div>
      <Product :list="list"></Product>
    </div>
  </div>
</template>

<script>
import Product from '@/components/common/Product'
import Crumb from '@/components/common/Crumb'
import { searchProduct } from '@/request/api.js'
export default {
  data() {
    return {
      // 渲染列表
      list: [],
      tag1Num: 0,
      tag2Num: 0,
      tag1: [
        { msg: '全部', min: 0, max: 0 },
        { msg: '我能兑换的', min: 0, max: 0 },
        { msg: '0-500分', min: 0, max: 500 },
        { msg: '500-1000分', min: 500, max: 1000 },
        { msg: '1000-1500分', min: 1000, max: 1500 },
        { msg: '1500-2500分', min: 1500, max: 2500 },
        { msg: '2500-6500', min: 2500, max: 6500 },
        { msg: '6500-10000', min: 6500, max: 10000 }
      ],
      tag2: [
        { msg: '全部', type: 0 },
        { msg: '实物礼品', type: 1 },
        { msg: '虚拟物品', type: 2 }
      ],
      did: 0, // 栏目 1 精品推荐 2热门兑换 0全部
      type: 0, // 1实体商品 2虚拟商品 0全部
      min: 0, // 最大积分
      max: 0, // 最小积分
      keyword: '' // 商品关键字
    }
  },
  methods: {
    // 按积分搜
    searchByScore(index, min, max) {
      // 点亮标签
      this.tag1Num = index
      // 传入最大最小积分
      this.min = min
      this.max = max
      this.goodsSearch({
        did: this.did,
        type: this.type,
        min: this.min,
        max: this.max,
        keyword: this.keyword
      })
    },
    // 按类别搜
    searchByClass(index, type) {
      // 点亮标签
      this.tag2Num = index
      // 传入类别
      this.type = type
      this.goodsSearch({
        did: this.did,
        type: this.type,
        min: this.min,
        max: this.max,
        keyword: this.keyword
      })
    },
    // 抽取搜索方法
    async goodsSearch() {
      let res = await searchProduct({
        did: this.did,
        type: this.type,
        min: this.min,
        max: this.max,
        keyword: this.keyword
      })
      this.list = res.data
    }
  },
  watch: {
    // 问题: 如果当前页面是goods页, 那么搜索只会修改地址栏上的keyword而组件不发生重载, 因此导致goods页无法使用搜索
    // 解决: 只需监听keyword, 当keyword发生改变, 修改当前页data的keyword, 然后再请求一遍即可
    '$route.query.keyword': {
      handler(newVal, oldVal) {
        this.keyword = newVal
        this.goodsSearch()
      }
    }
  },
  created() {
    // 通过搜索栏进goods页的keyword传值 或者 直接进入goods页面
    this.keyword = this.$route.query.keyword || ''
    // 初次载入发起请求
    this.goodsSearch()
  },
  components: {
    Product,
    Crumb
  }
}
</script>

<style lang="less">
@import url('~@/assets/css/global-style.less');
.Goods {
  background: #f5f5f5;
  font-size: 18px;
  font-weight: 100;
  .center {
    .tagBox {
      padding: 40px 0 8px;
      .tag1,
      .tag2 {
        display: flex;
        color: #999;
        margin-bottom: 32px;
        li {
          margin-right: 28px;
          cursor: pointer;
          &:nth-of-type(1) {
            color: #000;
            font-weight: bold;
            margin-right: 10px;
            cursor: default;
          }
          &.active {
            color: @base-color;
            font-weight: bold;
          }
        }
      }
    }
    .hot-image {
      img {
        display: block;
      }
    }
  }
}
</style>
