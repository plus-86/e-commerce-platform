<template>
  <div class="Aside">
    <h3>你还可以兑换</h3>
    <ul>
      <li
        v-for="(item, index) in asideData.thenYouCanBuy"
        :key="index"
        @click="toDetail(item.id)"
      >
        <img class="product-img" :src="imgBaseUrl + item.img" alt="" />
        <div class="text-info">
          <div class="title">{{ item.name }}</div>
          <div class="price">
            {{ item.coin }}
            <img src="@/assets/icon/chicken-leg.svg" alt="" />
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  props: ['asideData'],
  methods: {
    ...mapMutations('DetailTagState', ['initTag']),
    toDetail(id) {
      // 点击后改变地址栏id, Detail组件监听到id改变, 发起请求, 而不用重载页面, 提高用户体验
      this.$router.push(`/detail?id=${id}`)

      // 获取新的数据后，图片和产品tag复位
      this.initTag()
    }
  }
}
</script>

<style scoped lang="less">
@import '~@/assets/css/global-style.less';

.Aside {
  flex: 1; // 填满
  padding-left: 19px;
  h3 {
    margin-top: 0;
    margin-bottom: 20px;
    font-weight: 400;
    text-align: left;
  }
  ul {
    font-size: 18px;
    cursor: pointer;
    li {
      display: flex;
      justify-content: space-between;
      margin-bottom: 30px;
      img {
        width: 80px;
        border: 1px solid transparent;
      }
      .text-info {
        width: 110px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .price {
          display: flex;
          align-items: center;
          font-weight: 700;
          color: #fd604d;
          img {
            width: 30px;
            margin-left: 20px;
          }
        }
        .title {
          font-weight: 100;
          // 超出盒子的字样用省略号代替
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      &:hover {
        .product-img {
          border-color: @base-color;
        }
        .text-info {
          .title {
            color: @base-color;
          }
        }
      }
    }
  }
}
</style>
