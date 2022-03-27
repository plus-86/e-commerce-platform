<template>
  <div id="app">
    <TopBar></TopBar>
    <Header></Header>
    <router-view />
    <Footer></Footer>
    <Login v-show="whetherToShowLoginModule"></Login>
  </div>
</template>
<script>
import TopBar from '@/components/common/TopBar'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import Login from '@/components/common/Login'
import { mapState } from 'vuex'
export default {
  name: 'app',
  computed: {
    ...mapState('LoginModule', ['whetherToShowLoginModule']) // mapState去找根文件下的LoginModule，然后再找LoginModule里的whetherToShowLoginModule
  },
  components: {
    TopBar,
    Header,
    Footer,
    Login
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
</style>
