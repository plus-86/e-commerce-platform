<template>
  <div class="Main">
    <div class="main-left">
      <div class="main-img">
        <img :src="'https://sc.wolfcode.cn' + coverImg" alt="" />
      </div>
      <ul class="optional-img">
        <li
          v-for="(item, index) in mainImgArr"
          :key="index"
          @mouseover="changeImg(index)"
          :class="num === index ? 'imgBorder' : ''"
        >
          <img
            :class="num === index ? '' : 'imgOpacity'"
            :src="'https://sc.wolfcode.cn/' + item.src"
            alt=""
          />
        </li>
      </ul>
    </div>
    <div class="main-right">
      <h2>小熊多功能煮蛋器</h2>
      <p>自动断电丨家用全自动丨早餐神器</p>
      <section>6000积分</section>
      <div>
        <h3>颜色/版本</h3>
        <ul>
          <li class="active">米黄色</li>
        </ul>
      </div>
      <h3>数量</h3>
      <div class="count">
        <div class="reduce">+</div>
        <input type="text" disabled value="1" />
        <div class="plus">-</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      init: true,
      coverImg: '',
      num: 0
    }
  },
  watch: {
    mainImgArr: {
      handler(newVal, oldVal) {
        if (this.init) {
          this.init = false
          this.coverImg = this.mainImgArr[0].src
        }
      }
    }
  },
  // 需求: 把从父组件传过来的 mainImgArr 的第一个数据的图片作为 初始封面
  // 问题: 直接拿 mainImgArr[0].src 绑定到 第5行 img内 时会报错
  // 原因: mainImgArr是父组件先发请求拿到数据，再流到这个子组件的，如果直接 在第5行 img内 使用 mainImgArr[0].src ，会因为数据还没从父组件流过来而报错(此时mainImgArr为空或者说不存在)
  // 解决: 用watch监听mainImgArr数据是否已经从父组件流过来，若已经有mainImgArr，把初始图片赋值给该页面定义的coverImg，再拿coverImg 在第5行 img内 使用 ，就可以解决问题
  props: ['mainImgArr'],
  methods: {
    changeImg(index) {
      this.coverImg = this.mainImgArr[index].src
      this.num = index
    }
  }
}
</script>

<style scoped lang="less">
@import '~@/assets/css/global-style.less';
.Main {
  width: 970px;
  border-right: 1px solid #ececec;
  box-sizing: border-box;
  padding-right: 49px;
  display: flex;
  .main-left {
    width: 459px;
    margin-right: 32px;
    .main-img {
      margin-bottom: 21px;
      img {
        width: 100%;
        display: block;
      }
    }
    .optional-img {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: space-between;
      li {
        width: 100px;
        height: 100px;
        cursor: pointer;
        &.imgBorder {
          border: 3px solid @base-color;
        }
        img {
          width: 100%;
          display: block;
          &.imgOpacity {
            opacity: 0.5;
          }
        }
      }
    }
  }
  .main-right {
    font-weight: 100;
    text-align: left;
    flex: 1; // 横向填满整个盒子
    h2 {
      font-weight: inherit;
      font-size: 28px;
      margin: 0;
    }
    p {
      font-size: 14px;
      color: #999999;
      margin: 15px 0 26px;
    }
    section {
      font-size: 28px;
      color: #fd604d;
      font-weight: bold;
      padding: 0 0 23px;
      border-bottom: 1px solid #ececec;
    }
    h3 {
      font-size: 16px;
      font-weight: inherit;
      margin: 19px 0 14px;
    }
    ul {
      margin: 0;
      padding: 0;
      list-style: none;
      display: flex;
      flex-wrap: wrap;
      li {
        height: 32px;
        border: 1px solid #d1d1d1;
        color: #666;
        padding: 0 17px;
        line-height: 32px;
        cursor: pointer;
        margin-right: 20px;
        margin-bottom: 11px;
        &.active {
          color: @base-color;
          border-color: @base-color;
        }
      }
    }
    .count {
      display: flex;
      text-align: center;
      .plus,
      .reduce {
        width: 28px;
        height: 28px;
        line-height: 30px;
        border: 1px solid #999;
        color: #999;
      }
      input {
        width: 45px;
        height: 28px;
        padding: 0;
        border: 0;
        border-bottom: 1px solid #999;
        border-top: 1px solid #999;
        text-align: center;
      }
    }
  }
}
</style>
