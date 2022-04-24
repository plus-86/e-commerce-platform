<template>
  <div @click="c">User</div>
</template>

<script>
import store from '@/store/index.js'
export default {
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
  }
}
</script>

<style lang="less"></style>
