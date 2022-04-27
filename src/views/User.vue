<template>
  <div class="User">
    <div class="center">
      <Crumb :nav="nav"></Crumb>
      <div class="box">
        <div class="l">
          <img class="avatar" :src="userInfo.headImg" alt="" />

          <div class="userInfo">
            <span>{{ userInfo.nickName }}：</span>
            <span>{{ userInfo.coin }}分</span>
            <div class="operation">
              [<span @click="exit">退出</span>][<span @click="unbindingWechat"
                >解绑微信</span
              >]
            </div>
          </div>

          <div v-for="(item, index) in title" :key="index">
            <div class="title">
              <i class="icon iconfont icon-peizhiguanli"></i>
              <span>{{ item.titleName }}</span>
            </div>
            <ul>
              <li
                :class="$route.path === val.path ? 'active' : ''"
                @click="$router.push(val.path)"
                v-for="(val, idx) in item.option"
                :key="idx"
              >
                {{ val.name }}
              </li>
            </ul>
          </div>
        </div>
        <div class="r">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import store from '@/store/index.js'
import Crumb from '@/components/common/Crumb.vue'
import { unbindWechat } from '@/request/api.js'
export default {
  computed: {
    ...mapState('UserInfo', ['userInfo'])
  },
  data() {
    return {
      nav: [{ name: '首页' }, { name: '个人中心' }, { name: '账号管理' }],
      group: 0,
      tag: 0,
      title: [
        {
          group: 0,
          titleName: '交易管理',
          option: [
            { name: '购物车', path: '/user/cart' },
            { name: '帐号管理', path: '/user/manage' },
            { name: '我的订单', path: '/user/order' },
            { name: '消息通知', path: '/user/message' },
            { name: '积分明细', path: '/user/detail' },
            { name: '积分攻略', path: '/user/strategy' }
          ]
        },
        {
          group: 1,
          titleName: '个人信息管理',
          option: [
            { name: '地址管理', path: '/user/address' },
            { name: '账号安全', path: '/user/safety' }
          ]
        }
      ]
    }
  },
  methods: {
    ...mapActions('ToastState', ['asyncChangeToastState']),
    // 退出
    exit() {
      localStorage.removeItem('x-auth-token')
      this.asyncChangeToastState({
        msg: '您已退出登录，即将返回首页',
        classType: 'success'
      })
      setTimeout(() => {
        this.$router.push('/')
      }, 2000)
    },
    // 解绑微信
    async unbindingWechat() {
      let res = await unbindWechat({
        phone: this.userInfo.phone
      })
      if (!res) return
      this.asyncChangeToastState({
        msg: res.data,
        classType: 'success'
      })
    }
  },
  beforeRouteEnter(to, from, next) {
    let token = localStorage.getItem('x-auth-token')
    // 这里就不需要判断进的哪个路由了，因为只有进User的路由才会触发这个钩子
    if (token) {
      // 有token就执行next()前往User页面
      next()
    } else {
      // 否则弹窗提示
      store.dispatch('ToastState/asyncChangeToastState', {
        msg: '请先登录',
        classType: 'warning'
      })
    }
  },
  components: {
    Crumb
  }
}
</script>

<style lang="less">
@import url('~@/assets/css/global-style.less');
.User {
  font-weight: 100;
  font-size: 18px;
  .center {
    .box {
      display: flex;
      min-height: 740px;
      border-top: 1px solid #ececec;
      padding-top: 28px;
      padding-bottom: 48px;
      .l {
        width: 200px;
        margin-right: 60px;
        background: #e7e7e7;
        .avatar {
          width: 100px;
          height: 100px;
          display: block;
          margin: 30px auto 19px;
        }
        .userInfo {
          text-align: center;
          margin-bottom: 43px;
          .operation {
            font-size: 14px;
            span {
              color: @base-color;
              &:hover {
                text-decoration: underline;
                cursor: pointer;
              }
            }
          }
        }
        .title {
          display: flex;
          align-items: center;
          padding-left: 18px;
          margin-bottom: 14px;
          i {
            font-size: 24px;
            margin-right: 6px;
          }
        }
        ul {
          padding-left: 20px;
          li {
            text-align: left;
            margin-bottom: 17px;
            cursor: pointer;
            &.active {
              border-left: 2px solid @base-color;
              padding-left: 10px;
              color: @base-color;
            }
          }
        }
      }
      .r {
        width: 940px;
      }
    }
  }
}
</style>
