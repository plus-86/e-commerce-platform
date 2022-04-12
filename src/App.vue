<template>
  <div id="app">
    <TopBar :key="TopBarValue"></TopBar>
    <Header></Header>
    <router-view />
    <Footer></Footer>
    <Login v-show="whetherToShowLoginModule"></Login>
    <transition name="fade">
      <Toast v-show="showToast"></Toast>
    </transition>
  </div>
</template>
<script>
import TopBar from '@/components/common/TopBar'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import Login from '@/components/common/Login'
import Toast from '@/components/common/Toast'
import { mapState } from 'vuex'
export default {
  name: 'app',
  data() {
    return {
      TopBarValue: 1
    }
  },
  watch: {
    '$route.path': {
      handler() {
        this.TopBarValue++
      }
    }
  },
  computed: {
    ...mapState('LoginModule', ['whetherToShowLoginModule']), // mapState去找根文件下的LoginModule，然后再找LoginModule里的whetherToShowLoginModule
    ...mapState('ToastState', ['showToast'])
  },
  components: {
    TopBar,
    Header,
    Footer,
    Login,
    Toast
  }
}
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.fade-enter {
  opacity: 0; /** 插入的新元素最开始是透明的 **/
}
.fade-enter-active {
  transition: opacity 0.5s; /**然后用动画过渡慢慢显示出来**/
}
.fade-leave {
  opacity: 1; /**离开的元素开始是不透明的**/
}
.fade-leave-active {
  opacity: 0;
  transition: opacity 0.5s; /**然后离开的时候慢慢变透明**/
}
</style>
