<template>
  <div class="User">
    <div class="center">
      <Crumb
        :nav="[{ name: '首页' }, { name: '个人中心' }, { name: '账号管理' }]"
      ></Crumb>
      <div class="box">
        <div class="l">
          <img
            class="avatar"
            src="https://thirdwx.qlogo.cn/mmopen/vi_32/Q3auHgzwzM6uI4iciaXRaOZK7vhrBuh7BoicNVNh9aFZLwqoBkrJYqKoNiazGq8bEPEJzIs670gxSlohiaKEoRwE2VA/132"
            alt=""
          />

          <div class="userInfo">
            <span>阿白：</span>
            <span>0分</span>
          </div>
          <div v-for="(item, index) in title" :key="index">
            <div class="title">
              <i class="icon iconfont icon-peizhiguanli"></i>
              <span>{{ item.titleName }}</span>
            </div>
            <ul>
              <li
                :class="
                  group === item.group ? (tag === idx ? 'active' : '') : ''
                "
                @click="changeTag(item.group, idx, val.path)"
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
import store from '@/store/index.js'
import Crumb from '@/components/common/Crumb.vue'
export default {
  data() {
    return {
      group: 0,
      tag: 0,
      title: [
        {
          group: 0,
          titleName: '交易管理',
          option: [
            { name: '帐号管理', path: 'manage' },
            { name: '我的订单', path: 'order' },
            { name: '购物车', path: 'cart' },
            { name: '消息通知', path: 'message' },
            { name: '积分明细', path: 'detail' },
            { name: '积分攻略', path: 'strategy' }
          ]
        },
        {
          group: 1,
          titleName: '个人信息管理',
          option: [
            { name: '地址管理', path: 'address' },
            { name: '账号安全', path: 'safety' }
          ]
        }
      ]
    }
  },
  methods: {
    changeTag(group, index, path) {
      this.group = group
      this.tag = index
      this.$router.push(`/user/${path}`)
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
        flex: 1;
      }
    }
  }
}
</style>
