<template>
  <div class="Header">
    <div class="center">
      <img class="left" src="..\..\assets\img\header-image.png" alt="" />
      <div class="mid">
        <ul>
          <li
            :class="$route.path === '/home' ? 'active' : ''"
            @click="$router.push('/home')"
          >
            首页
          </li>
          <li
            :class="$route.path === '/goods' ? 'active' : ''"
            @click="$router.push('/goods')"
          >
            全部商品
          </li>
          <li
            :class="$route.path === '/user' ? 'active' : ''"
            @click="$router.push('/user')"
          >
            个人中心
          </li>
          <li
            :class="$route.path === '/order' ? 'active' : ''"
            @click="$router.push('/order')"
          >
            我的订单
          </li>
          <li
            :class="$route.path === '/welfare' ? 'active' : ''"
            @click="$router.push('/welfare')"
          >
            专属福利
          </li>
        </ul>
      </div>
      <div class="right">
        <input
          type="text"
          placeholder="请输入要搜索的商品"
          @keyup.13="searchByKeyword"
          v-model="userInput"
        />
        <div class="btn" @click="searchByKeyword">
          <i class="icon iconfont icon-search1187938easyiconnet"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      userInput: ''
    }
  },
  methods: {
    searchByKeyword() {
      // 跳转到goods页面把参数交给goods页面处理
      this.$router.push(`/goods?keyword=${this.userInput}`)
      // 清空搜索栏
      this.userInput = ''
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/assets/css/global-style.less';
.Header {
  .center {
    height: 118px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      width: 257px;
      height: 56px;
    }
    .mid {
      ul {
        width: 500px;
        display: flex;
        justify-content: space-between;
        li {
          cursor: pointer;
        }
        // 悬浮和点击的样式
        li:hover,
        .active {
          font-weight: bold;
          color: @base-color;
        }
      }
    }
    .right {
      display: flex;
      input {
        width: 208px;
        height: 34px;
        border-radius: 20px 0 0 20px;
        border: 2px solid #dedede;
        border-right: 0;
        text-indent: 1em; /* 缩进 */
        outline: none; /* 聚焦时候的内边框样式 */
      }
      .btn {
        width: 50px;
        height: 40px;
        background: @base-color;
        border-radius: 0 20px 20px 0;
        cursor: pointer;
        .iconfont {
          color: #fff;
          line-height: 40px;
        }
      }
    }
  }
}
</style>
