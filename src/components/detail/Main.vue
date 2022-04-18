<template>
  <div class="Main">
    <div class="main-left">
      <div class="main-img">
        <img :src="imgBaseUrl + coverImg" alt="" />
      </div>
      <ul class="optional-img">
        <li
          v-for="(item, index) in mainData.mainImgArr"
          :key="index"
          @mouseover="changeImg(index)"
          :class="imgTagNum === index ? 'imgBorder' : ''"
        >
          <!-- imgTagNum初始值是0, 也就是首次加载渲染第一张图片 -->
          <!-- 内联样式不能用global-style.less文件内的@base-color, 这里写一个类选择器做一个三元表达式的绑定-->
          <img
            :class="imgTagNum === index ? '' : 'imgOpacity'"
            :src="imgBaseUrl + item.src"
            alt=""
          />
        </li>
      </ul>
    </div>
    <div class="main-right">
      <h2>{{ mainData.name }}</h2>
      <p>{{ mainData.seriesSubTitle }}</p>
      <section>{{ mainData.coin }}积分</section>
      <div v-for="(item, index) in mainData.parameterJson" :key="index">
        <h3>{{ item.title }}</h3>
        <ul>
          <li
            v-for="(itm, index) in item.parameters"
            :key="index"
            :class="typeTagNum === index ? 'active' : ''"
            @click="changeType(index, itm.id)"
          >
            {{ itm.title }}
          </li>
        </ul>
      </div>
      <h3>数量</h3>
      <div class="count">
        <div class="reduce"><i class="icon iconfont icon-add"></i></div>
        <input type="text" disabled value="1" />
        <div class="plus"><i class="icon iconfont icon-minus"></i></div>
      </div>
      <div class="btns">
        <div class="add-to-cart">加入购物车</div>
        <div class="buy-now">立即购买</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      // 大图片的渲染
      coverImg: ''
      // imgNum: 0,
      // typeNum: 0
    }
  },
  computed: {
    ...mapState('DetailTagState', ['imgTagNum', 'typeTagNum'])
  },
  // 功能: 把从父组件传过来的 mainImgArr 的第一个数据的图片作为 初始封面
  // 问题: 直接拿 mainImgArr[0].src 绑定到 第5行 img内 时会报错
  // 原因: mainImgArr是父组件先发请求拿到数据，再流到这个子组件的，如果直接 在第5行 img内 使用 mainImgArr[0].src ，会因为数据还没从父组件流过来而报错(此时mainImgArr为空或者说不存在)
  // 解决: 用watch监听mainImgArr数据是否已经从父组件流过来，若已经有mainImgArr，把初始图片赋值给该页面定义的coverImg，再拿coverImg 在第5行 img内 使用 ，就可以解决问题
  watch: {
    mainData: {
      handler(newVal, oldVal) {
        // 此侦听器用来监听数据是否已从父组件流向该子组件
        // 当数据已流向该组件时，获取第一张图片作为大图封面
        this.coverImg = this.mainData.mainImgArr[0].src
      }
    }
  },
  props: ['mainData'],
  methods: {
    ...mapMutations('DetailTagState', ['changeImgTagNum', 'changeTypeTagNum']),
    changeImg(index) {
      // 改大图
      this.coverImg = this.mainData.mainImgArr[index].src
      // 改小图
      this.changeImgTagNum(index)
    },
    changeType(index, id) {
      // 切换尺码/规格
      this.changeTypeTagNum(index)
      // 点击后改变地址栏id, Detail组件监听到id改变, 发起请求, 而不用重载页面, 提高用户体验
      this.$router.push(`/detail?id=${id}`)
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
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: space-between;
      li {
        width: 100px;
        height: 100px;
        border: 3px solid transparent;
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
      display: flex;
      flex-wrap: wrap;
      li {
        height: 32px;
        border: 1px solid #d1d1d1;
        color: #666;
        padding: 0 17px;
        line-height: 32px;
        font-size: 18px;
        cursor: pointer;
        margin-right: 20px;
        margin-bottom: 11px;
        &:hover,
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
        line-height: 28px;
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
    .btns {
      margin-top: 24px;
      display: flex;
      font-size: 18px;
      div {
        width: 150px;
        height: 46px;
        color: #fff;
        text-align: center;
        line-height: 46px;
        cursor: pointer;
        margin-right: 19px;
        &.add-to-cart {
          background: #3dc36b;
        }
        &.buy-now {
          background: #fd604d;
        }
      }
    }
  }
}
</style>
