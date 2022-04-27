<template>
  <div class="Address">Address</div>
</template>

<script>
import store from '@/store/index.js'
export default {
  beforeRouteEnter(to, from, next) {
    console.log(to, from, next)
    store.dispatch('ToastState/asyncChangeToastState', {
      msg: '该功能暂未开放',
      classType: 'warning'
    })
  }
}
</script>

<style></style>
