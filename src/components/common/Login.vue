<template>
  <div class="login-madol">
    <div class="mask" @click="changeLoginModuleState(false)"></div>
    <div class="login-box">
      <i
        class="icon iconfont icon-guanbi"
        @click="changeLoginModuleState(false)"
      ></i>
      <ul>
        <li :class="showForm === true ? 'active' : ''" @click="showForm = true">
          手机号码登录
        </li>
        <li style="margin: 1px 10px 0 10px; cursor: default">|</li>
        <li
          :class="showForm === false ? 'active' : ''"
          @click="showForm = false"
        >
          微信扫码登录
        </li>
      </ul>

      <div class="info">
        <div class="form" v-show="showForm">
          <div class="input-group" style="margin-bottom: 5px">
            <input type="text" placeholder="请输入手机号" />
          </div>
          <div class="input-group">
            <slide-verify
              :l="42"
              :r="20"
              :w="362"
              :h="140"
              @success="onSuccess"
              @fail="onFail"
              @refresh="onRefresh"
              :style="{ width: '100%' }"
              class="slide-box"
              ref="slideBlock"
              :slider-text="msg"
            ></slide-verify>
          </div>
          <div class="input-group">
            <input type="text" placeholder="请输入短信验证码" />
            <div class="btn get-qrcode">获取验证码</div>
          </div>
          <div class="btn">登录</div>
        </div>
        <div class="qrcode" v-show="!showForm">二维码</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'Login',
  data() {
    return {
      showForm: true,
      msg: '向右滑动'
    }
  },

  methods: {
    ...mapMutations('LoginModule', [
      'changeLoginModuleState',
      'changeLoginWay'
    ]),
    // 拼图成功
    onSuccess(time) {
      let ms = (time / 1000).toFixed(1)
      this.msg = 'login success，耗时' + ms + 's'
    },
    //拼图失败
    onFail() {
      this.onRefresh() // 重新刷新拼图
    },
    // 拼图刷新
    onRefresh() {
      this.msg = '再试一次'
    }
  }
}
</script>

<style scoped lang="less">
@import '~@/assets/css/global-style.less';
.login-madol {
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  .mask {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }
  .login-box {
    width: 555px;
    height: 423px;
    background: url('~@/assets/img/login-box.png');
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    .iconfont {
      position: absolute;
      right: 70px;
      top: 20px;
      cursor: pointer;
    }
    ul {
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      margin-top: 40px;
      padding-bottom: 30px;
      li {
        cursor: pointer;
        list-style: none;
        color: #ccc;
        font-size: 18px;
      }
      .active {
        color: #333;
        cursor: default;
      }
    }
    .info {
      width: 360px;
      margin: 0 auto;
      .form {
        .btn {
          /* 这个登录按钮样式可以给，获取验证码按钮复用，只定了一个高度*/
          background: @base-color;
          color: #fff;
          height: 50px;
          line-height: 50px;
          border-radius: 3px;
          cursor: pointer;
        }
        .input-group {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
          input {
            flex: 1px; /* 填满 */
            height: 44px;
            text-indent: 1em;
            outline: none; /* input的默认内边框样式去掉 */
          }
          .get-qrcode {
            padding: 0 10px;
            margin-left: 10px;
            cursor: pointer;
          }
        }
      }
    }
  }
}
/deep/.slide-box {
  width: 100%;
  position: relative;
  box-sizing: border-box;
  canvas {
    position: absolute;
    left: 0;
    top: -120px;
    display: none;
    width: 100%;
    box-sizing: border-box;
  }
  .slide-verify-block {
    width: 85px;
    height: 136px;
  }
  .slide-verify-refresh-icon {
    top: -120px;
    display: none;
  }
  &:hover {
    canvas {
      display: block;
    }
    .slide-verify-refresh-icon {
      display: block;
    }
  }
}
</style>
