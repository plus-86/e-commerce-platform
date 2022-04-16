<template>
  <div class="Aside">
    <h3>你还可以兑换</h3>
    <ul>
      <li v-for="(item, index) in 5" :key="index">
        <img
          class="product-img"
          src="https://sc.wolfcode.cn/upload/images/product_images/20201118/74934997-99c6-4bd3-96c1-9d14774884a3.jpg"
          alt=""
        />
        <div class="text-info">
          <div class="title">叩丁狼校园文化衫</div>
          <div class="price">
            9900
            <img src="@/assets/icon/chicken-leg.svg" alt="" />
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {}
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
          // 超出的字样用省略号代替
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
    &:hover {
      li {
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
