<template>
  <div class="TopBar">
    <div class="center">
      <div class="left">欢迎来到叩丁狼积分商城</div>
      <div class="right">
        <ul>
          <li><i class="icon iconfont icon-youke"></i> 用户名：游客</li>
          <li>我的积分：--</li>
          <li>获取积分</li>
          <li>叩丁狼官网</li>
          <li class="login-btn" @click="changeLoginModuleState(true)">登录</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'TopBar',
  methods: {
    ...mapMutations('LoginModule', ['changeLoginModuleState'])
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
          &.login-btn {
            /* 因为这个login-btn是li同一层级的，所以这里的意思是 li元素且有login-btn类名, 才能选中它 */
            width: 124px;
            height: 40px;
            background: @base-color;
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
