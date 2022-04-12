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
import { wechatLogin } from '@/request/api.js'
export default {
  name: 'TopBar',
  computed: {
    ...mapState('LoginModule', ['hasLogin'])
  },
  created() {
    // 以防请求在code获取到之前发生，使用nextTick()
    // 在Vue生命周期的 created() 钩子函数进行的DOM操作一定要放在 Vue.nextTick() 的回调函数中
    // 在ccreated() 钩子函数执行的时候DOM 其实并未进行任何渲染，而此时进行DOM操作无异于徒劳，所以此处一定要将DOM操作的js代码放进 Vue.nextTick() 的回调函数中。与之对应的就是 mounted() 钩子函数，因为该钩子函数执行时所有的DOM挂载和渲染都已完成，此时在该钩子函数中进行任何DOM操作都不会有问题 。
    // this.$nextTick().then(async () => {

    // })
    setTimeout(async () => {
      let loginCode = this.$route.query.code
      // 有code发起请求
      if (loginCode) {
        let wechatLoginResponse = await wechatLogin({ code: loginCode })

        // 对返回的code0、400、407的处理
        if (wechatLoginResponse.code === 0) {
          // 微信扫码登录成功

          // 提示登录成功
          this.asyncChangeToastState({
            msg: '登录成功',
            classType: 'success'
          })

          // 保存token
          localStorage.setItem(
            'x-auth-token',
            wechatLoginResponse['x-auth-token']
          )

          // 切换登录状态
          this.changeLoginState(true)

          // 清除地址栏上的code
          // 刷新当前页面
          this.$router.push(this.$route.path)
        } else if (wechatLoginResponse.code === 400) {
          // code失效
          // 1 提示用户重新扫二维码
          this.asyncChangeToastState({
            msg: 'code失效，请重新扫码',
            classType: 'error'
          })
          // 2 把登录框打开，打开微信扫码，重新申请二维码
          this.changeLoginModuleState(true)
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
        } else if (wechatLoginResponse.code === 407) {
          // 当前扫码的微信号还没有绑定手机号
          // 1 提示让用户用手机号登录
          this.asyncChangeToastState({
            msg: '请使用手机号绑定登录微信',
            classType: 'warning'
          })
          // 2 打开手机登录窗口
          this.changeLoginModuleState(true)

          // 3 保存uuid到本地
          localStorage.setItem('uuid', wechatLoginResponse.uuid)
          // 4.Login登录按钮判断本地uuid，然后调用手机绑定微信号的接口
        }
      } else {
        //  此情况为 1用户没扫码 2用户已经登录
        let mytoken = localStorage.getItem('x-auth-token')
        // 这里不用写if-else，token有或者没有直接拿来做布尔值的判断，交给changeLoginState就行
        this.changeLoginState(Boolean(mytoken))
      }
    }, 100)
  },
  methods: {
    ...mapMutations('LoginModule', [
      'changeLoginModuleState',
      'switchLoginMode',
      'changeLoginState'
    ]),
    ...mapActions('ToastState', ['asyncChangeToastState']),

    hdclick() {
      this.asyncChangeToastState({
        msg: '请先登录',
        classType: 'warning'
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
