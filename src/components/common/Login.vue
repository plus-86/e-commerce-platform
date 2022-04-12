<template>
  <div class="login-madol">
    <div class="mask" @click="changeLoginModuleState(false)"></div>
    <div class="login-box">
      <i
        class="icon iconfont icon-guanbi"
        @click="changeLoginModuleState(false)"
      ></i>
      <ul>
        <li
          :class="loginWithPhoneNumber === true ? 'active' : ''"
          @click="switchLoginMode(true)"
        >
          手机号码登录
        </li>
        <li style="margin: 1px 10px 0 10px; cursor: default">|</li>
        <li
          :class="loginWithPhoneNumber === false ? 'active' : ''"
          @click="weixinClick"
        >
          微信扫码登录
        </li>
      </ul>

      <div class="info">
        <div class="form" v-show="loginWithPhoneNumber">
          <div class="input-group" style="margin-bottom: 5px">
            <input
              type="text"
              placeholder="请输入手机号"
              v-model="phoneNumber"
            />
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
              class="slide-box"
              ref="slideBlock"
              :slider-text="msg"
            ></slide-verify>
          </div>
          <div class="input-group">
            <input
              type="text"
              placeholder="请输入短信验证码"
              v-model="SMSCode"
            />
            <div v-show="!showCount" class="btn get-qrcode" @click="getSMSCode">
              <span>获取验证码</span>
            </div>
            <div v-show="showCount" class="btn get-qrcode cool-down">
              <span>{{ initCount }}s</span>
            </div>
          </div>
          <div class="btn" @click="toLogin">登录</div>
        </div>
        <div id="weixin" class="qrcode" v-show="!loginWithPhoneNumber"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { sendSMSCode, submitLogin, wechatBindingLogin } from '@/request/api'
import { verifyPhoneNumber } from '@/utils/index'
export default {
  name: 'Login',
  data() {
    return {
      // 滑块提示文字
      msg: '向右滑动',
      // 用户输入的手机号
      phoneNumber: '',
      // 用户输入的验证码
      SMSCode: '',
      // 倒计时初始化
      initCount: 30,
      maxCount: 30, // 最大读秒数提上来，到时候要改的话不用去方法里找
      // 是否显示倒计时
      showCount: false,
      // 计时器
      timer: null
    }
  },
  computed: {
    ...mapState('LoginModule', ['loginWithPhoneNumber'])
  },
  methods: {
    ...mapMutations('LoginModule', [
      'changeLoginModuleState',
      'changeLoginState',
      'switchLoginMode'
    ]),
    ...mapActions('ToastState', ['asyncChangeToastState']),
    // 拼图成功
    onSuccess(time) {
      let ms = (time / 1000).toFixed(1)
      this.msg = 'login success，耗时' + ms + 's'
    },
    // 拼图失败
    onFail() {
      this.onRefresh() // 重新刷新拼图
    },
    // 拼图刷新
    onRefresh() {
      this.msg = '再试一次'
    },
    // 抽取手机验证和滑块验证
    varify() {
      // 手机号验证,封到utils里了
      if (!verifyPhoneNumber(this.phoneNumber)) {
        this.asyncChangeToastState({
          msg: '请输入正确的手机号',
          classType: 'warning'
        })
        return false
      }
      // 拼图验证
      if (this.msg === '再试一次' || this.msg === '向右滑动') {
        this.asyncChangeToastState({
          msg: '请完成拼图验证',
          classType: 'warning'
        })
        return false
      }
      return true
    },
    // 获取验证码验证
    async getSMSCode() {
      // 手机号和滑块验证
      if (!this.varify()) return

      // 发送获取验证码请求到后台
      let SMSCodeResponse = await sendSMSCode({ phone: this.phoneNumber })
      if (!SMSCodeResponse) return // 如果返回的是false就return掉，不进行读秒操作

      // 读秒
      this.showCount = true // 显示读秒
      this.countDown() // 开始读秒
    },
    // 倒计时逻辑
    countDown() {
      // data里调一个空的(null)timer给它赋值
      this.timer = setInterval(() => {
        this.initCount--
        // 倒数到0清除读秒，然后显示获取验证码按钮，初始化读秒
        if (this.initCount === -1) {
          this.showCount = false // 显示获取验证码按钮
          this.initCount = this.maxCount // 读秒复位
          clearTimeout(this.timer) // 清除读秒器
        }
      }, 1000)
    },
    // 登录验证
    async toLogin() {
      // 手机号和滑块验证
      if (!this.varify()) return

      // 验证码验证
      // 判断用户输入的验证码是否为空
      if (!this.SMSCode.trim()) {
        this.asyncChangeToastState({
          msg: '请输入验证码',
          classType: 'warning'
        })
        return
      }

      // 登录
      let uuid = localStorage.getItem('uuid')
      let loginResponse = null
      // 发送验证码和手机号到后端进行验证，后端返回结果，判断是否可以登录

      // 判断是普通登录还是绑定登录
      if (uuid) {
        // 调用绑定登录的接口
        loginResponse = await wechatBindingLogin({
          verifyCode: this.SMSCode.trim(),
          phone: this.phoneNumber.trim(),
          uuid
        })
      } else {
        // 调用普通登录的接口
        loginResponse = await submitLogin({
          verifyCode: this.SMSCode.trim(),
          phone: this.phoneNumber.trim()
        })
      }

      // 如果业务逻辑失败（登录失败），则return
      if (!loginResponse) return

      // 登录成功后
      // 提示登录成功
      this.asyncChangeToastState({
        msg: '登录成功',
        classType: 'success'
      })

      // 关闭登录窗口
      this.changeLoginModuleState(false)

      // 保存token
      localStorage.setItem('x-auth-token', loginResponse['x-auth-token'])

      // 切换登录状态
      this.changeLoginState(true)

      // 清除uuid和地址栏上的code
      if (uuid) {
        // 清除本地uuid
        localStorage.removeItem('uuid')
        // 刷新当前页面
        this.$router.push(this.$route.path)
      }
    },
    weixinClick() {
      // 切换到微信登录和盒子
      this.switchLoginMode(false)

      // 申请二维码
      let _this = this
      new WxLogin({
        id: 'weixin',
        appid: 'wx67cfaf9e3ad31a0d', // 这个appid是人家给的，写死
        scope: 'snsapi_login',
        // 扫码成功后重定向的接口
        redirect_uri: 'https://sc.wolfcode.cn/cms/wechatUsers/shop/PC',
        // state填写编码后的url
        state: encodeURIComponent(
          window.btoa('http://127.0.0.1:8080' + _this.$route.path)
        ),
        // 调用样式文件
        href: 'data:text/css;base64,DQouaW1wb3dlckJveCAudGl0bGUsIC5pbXBvd2VyQm94IC5pbmZvew0KICAgIGRpc3BsYXk6IG5vbmU7DQp9DQouaW1wb3dlckJveCAucXJjb2Rlew0KICAgIG1hcmdpbi10b3A6IDA7DQp9DQo='
      })
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
            width: 80px;
            padding: 0 10px;
            margin-left: 10px;
            cursor: pointer;
          }
          .cool-down {
            background-color: #cccccc;
            cursor: default;
          }
        }
      }
    }
  }
}
// /deep/深度选择器，原理就是通过父元素找到我们需要改变的子元素(子元素名字在依赖里面找)，然后改变它的样式即可。
/deep/.slide-box {
  width: 100%;
  position: relative;
  box-sizing: border-box;
  canvas {
    // 拼图画布
    position: absolute;
    left: 0;
    top: -120px;
    display: none;
    width: 100%;
    box-sizing: border-box;
  }
  .slide-verify-block {
    // 拼图块大小
    width: 85px;
    height: 136px;
  }
  .slide-verify-slider {
    border: 0; // 滑块边框有默认样式，去掉
  }
  .slide-verify-refresh-icon {
    // 刷新图片的按钮
    top: -120px;
    display: none;
  }
  &:hover {
    // 鼠标悬浮到滑块上
    canvas {
      display: block;
    }
    .slide-verify-refresh-icon {
      display: block;
    }
  }
}
</style>
