<template>
  <div class="TopBar">
    <div class="center">
      <div class="left">欢迎来到叩丁狼积分商城</div>
      <div class="right">
        <ul>
          <li @click="hdclick">
            <i class="icon iconfont icon-youke"></i> 用户名：游客
          </li>
          <li>我的积分：--</li>
          <li>获取积分</li>
          <li>叩丁狼官网</li>
          <li
            class="btn"
            @click="changeLoginModuleState(true)"
            v-show="!hasLogin"
          >
            登录
          </li>
          <li class="btn cart" v-show="hasLogin">
            <i class="icon iconfont icon-gouwuche"></i>
            <span class="cart-text">购物车</span>
            <span class="number">0</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
export default {
  name: 'TopBar',
  computed: {
    ...mapState('LoginModule', ['hasLogin'])
  },
  methods: {
    ...mapMutations('LoginModule', ['changeLoginModuleState']),
    ...mapMutations('ToastState', ['changeToastState']),
    ...mapActions('ToastState', ['asyncChangeToastState']),

    hdclick() {
      this.changeToastState({
        msg: '请先登录',
        classType: 'icon-chucuo'
      })
    }
  }
}
</script>

<style scoped lang="less">
@import '~@/assets/css/global-style.less';
.TopBar {
  font-size: 14px;
  color: #fff;
  height: 40px;
  background: #242b39;
  .center {
    height: 40px;
    line-height: 40px;
    display: flex;
    justify-content: space-between;
    .right {
      ul {
        display: flex;
        margin: 0;
        padding: 0;
        cursor: pointer;
        li {
          list-style: none;
          margin-left: 20px;
          .iconfont {
            font-size: 14px;
            margin-right: 10px;
          }
          &.btn {
            /* 因为这个btn是li同一层级的，所以这里的意思是 li元素且有login-btn类名, 才能选中它 */
            width: 124px;
            height: 40px;
            background: @base-color;
          }
          &.cart {
            display: flex;
            justify-content: center;
            align-items: center;
            .iconfont {
              margin-right: 0;
              font-size: 20px;
            }
            .cart-text {
              margin: 0 8px 0 8px;
            }
            .number {
              width: 22px;
              height: 22px;
              line-height: 22px;
              border-radius: 50%;
              background-color: #fd604d;
            }
          }
        }
      }
    }
    .left {
      cursor: default;
    }
  }
}
</style>
