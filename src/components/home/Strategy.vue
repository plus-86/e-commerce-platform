<template>
  <div class="Strategy">
    <ul>
      <li v-for="(item, index) in strategyList" :key="index">
        <h4>{{ item.h4 }}</h4>
        <div class="btn">{{ item.btn }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      strategyList: [
        {
          h4: '签到得鸡腿',
          btn: '去签到'
        },
        {
          h4: '购课得鸡腿',
          btn: '去购课'
        },
        {
          h4: '推荐得鸡腿',
          btn: '去推荐'
        },
        {
          h4: '做任务得鸡腿',
          btn: '做任务'
        }
      ]
    }
  }
}
</script>

<style scoped lang="less">
.Strategy {
  color: #fff;
  padding-bottom: 47px;
  ul {
    display: flex;
    justify-content: space-between;
    li {
      // 填充背景要写在改变效果的 background-size: 100% 100%; 样式之前，否则过渡动画不生效

      &:nth-of-type(1) {
        background: url(~@/assets/img/strategy-sign-in.png);
        background-size: 100% 100%;
        transition: 0.5s;
      }
      &:nth-of-type(2) {
        background: url(~@/assets/img/strategy-buy-class.png);
        background-size: 100% 100%;
        transition: 0.5s;
      }
      &:nth-of-type(3) {
        background: url(~@/assets/img/strategy-recommend.png);
        background-size: 100% 100%;
        transition: 0.5s;
      }
      &:nth-of-type(4) {
        background: url(~@/assets/img/strategy-quest.png);
        background-size: 100% 100%;
        transition: 0.5s;
      }
      width: 285px;
      height: 168px;
      padding: 43px 0 0 29px;
      box-sizing: border-box;
      cursor: pointer;
      &:hover {
        background-size: 105% 105%;
      }
      h4 {
        font-size: 24px;
        font-weight: 700;
        margin-bottom: 19px;
        margin-top: 0;
        text-align: left;
      }
      .btn {
        width: 96px;
        height: 27px;
        font-size: 18px;
        font-weight: 100;
        line-height: 27px;
        border: 1px solid #fff;
      }
    }
  }
}
</style>
