<template>
  <div class="Product">
    <li class="fixed-box" v-for="(item, index) in 8" :key="index">
      <div class="movable-box">
        <img
          src="http://sc.wolfcode.cn/upload/images/product_images/20200629/c73c4afe-43c6-4d87-9cdd-4db6828059a0.png"
          alt=""
        />
        <h3>帆布袋</h3>
        <section>
          <span>2500</span>
          <img class="chicken-leg" src="@/assets/icon/chicken-leg.svg" alt="" />
        </section>
        <div class="btn">立即兑换</div>
      </div>
    </li>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="less">
@import '~@/assets/css/global-style.less';
.Product {
  font-size: 18px;
  font-weight: 100;
  display: flex;
  // 换行
  flex-wrap: wrap;
  // 固定的盒子li
  .fixed-box {
    cursor: pointer;
    margin: 0 20px 20px 0;
    &:nth-of-type(4n) {
      // 第4的倍数个时，右侧外边距为0
      margin-right: 0;
    }
    // 可移动的盒子div，鼠标悬浮后向上移动
    .movable-box {
      background: #fff;
      // relative: 标签(或者说盒子)仍然占有初始的位置，相对初始位置进行位置的调整( 利用top、bottom、left、right这些属性调整相对位置)
      // 这里默认情况下(鼠标没有悬浮在盒子上)，也要给它一个position: relative;和top: 0;，否则:hover状态的时候不会有过渡动画的效果
      position: relative;
      top: 0;
      transition: 0.5s;
      padding-bottom: 32px;

      h3 {
        font-weight: 100;
      }
      section {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 20px;
        span {
          color: #fd604d;
          font-weight: 700;
        }
        .chicken-leg {
          width: 20px;
          height: 20px;
        }
      }
      .btn {
        width: 100px;
        height: 36px;
        border: 1px solid @base-color;
        line-height: 36px;
        margin: 0 auto;
      }
    }
    // 这个对应上面的 .movable-box
    &:hover {
      .movable-box {
        position: relative;
        top: -5px;
        // box-shadow对应的参数分别是 x轴偏移量、y轴偏移量、阴影模糊半径、阴影颜色
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
        .btn {
          background: @base-color;
          color: #fff;
        }
      }
    }
  }
}
</style>
