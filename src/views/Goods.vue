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
      <Product :list="showList"></Product>
      <div class="loadingText">
        <p v-show="isLoading">正在加载...</p>
        <p v-show="hasReachedBottom">没有更多了</p>
      </div>
    </div>
  </div>
</template>

<script>
import Product from '@/components/common/Product'
import Crumb from '@/components/common/Crumb'
import { searchProduct } from '@/request/api.js'
import {
  getScrollTop,
  getClientHeight,
  getScrollHeight
} from '@/utils/index.js'
export default {
  data() {
    return {
      // 所有产品列表
      list: [],
      // 滚动加载产品列表
      showList: [],
      tag1Num: 0,
      tag2Num: 0,
      tag1: [
        { msg: '全部', min: 0, max: 0 },
        { msg: '我能兑换的', min: 0, max: 0 },
        { msg: '0-500分', min: 0, max: 500 },
        { msg: '500-1000分', min: 500, max: 1000 },
        { msg: '1000-1500分', min: 1000, max: 1500 },
        { msg: '1500-2500分', min: 1500, max: 2500 },
        { msg: '2500-6500分', min: 2500, max: 6500 },
        { msg: '6500-10000分', min: 6500, max: 10000 },
        { msg: '10000分以上', min: 10000, max: 100000 }
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
      keyword: '', // 商品关键字
      // 触底加载数据
      page: 1,
      size: 8,
      isLoading: false, // 节流: 利用一个变量，控制代码在一段时间内(setTimeOut)不会重复触发执行
      hasReachedBottom: false
    }
  },
  mounted() {
    // 进入组件加载监听事件
    window.addEventListener('scroll', this.scrollLoading) // addEventListener('监听事件', 执行函数)
  },
  beforeDestroy() {
    // 离开组件后删除监听事件
    window.removeEventListener('scroll', this.scrollLoading)
  },
  methods: {
    //滚动加载
    scrollLoading() {
      //  窗口高度 + 超出窗口的高度 >= 页面高度 - 20
      if (getClientHeight() + getScrollTop() >= getScrollHeight() - 20) {
        // 所有图片都加载完了
        if (this.showList.length >= this.list.length) {
          // 更改加载字样
          this.hasReachedBottom = true
          // 不再执行下面的代码, 提升性能
          return
        }

        // 如果为false进入加载
        if (this.isLoading === false) {
          // 把状态改为true, 500ms(setTimeOut)内该函数不会重复触发执行
          this.isLoading = true
          setTimeout(() => {
            this.page++ // 从第二页开始
            for (
              let i = (this.page - 1) * this.size;
              i < this.size * this.page;
              i++
            ) {
              // 针对最后一页，如果有才push到数组里
              this.list[i] ? this.showList.push(this.list[i]) : ''
            }
            // 500ms后当执行循环遍历, 遍历结束后isLoading状态改为false, 此时可以重新触发该函数
            this.isLoading = false
          }, 500)
        }
      }
    },
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
      this.showList = this.list.filter((item, index) => index < 8)
      // 滚动加载数据初始化
      this.hasReachedBottom = false
      this.page = 1
      // 所选类别，没有数据
      if (this.showList.length >= this.list.length) {
        // 更改加载字样
        this.hasReachedBottom = true
      }
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
    .loadingText {
      height: 24px;
      p {
        margin: 0;
      }
    }

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
