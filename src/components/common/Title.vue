<template>
  <div class="title">
    <div class="left">
      <img
        v-show="title === '精品推荐' ? true : false"
        src="@/assets/icon/like.svg"
        alt=""
      />
      <img
        v-show="title === '积分攻略' ? true : false"
        src="@/assets/icon/point.svg"
        alt=""
      />
      <h2>{{ title }}</h2>
    </div>
    <div v-show="title === '积分攻略' ? false : true" class="more">
      <span>更多</span>
      <i class="icon iconfont icon-anniu-jiantouxiangyou"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title']
}
</script>

<style scoped lang="less">
.title {
  display: flex;
  justify-content: space-between;
  color: #666666;
  .left {
    display: flex;
    align-items: center;
    img {
      height: 40px;
      width: 40px;
    }
    h2 {
      font-size: 30px;
      margin-left: 10px;
      color: #000;
    }
  }
  .more {
    display: flex;
    align-items: center;
    cursor: pointer;
    span {
      margin-right: 6px;
    }
    .iconfont {
      font-size: 19px;
    }
  }
}
</style>
