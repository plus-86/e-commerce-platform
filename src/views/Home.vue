<template>
  <div class="home">home</div>
</template>

<script>
import { productRecommend } from '@/request/api.js'
import instance from '@/request/request.js'
import axios from 'axios'
export default {
  name: 'Home',
  async created() {
    let res = await productRecommend()
    console.log(res)
  },
  components: {}
}
</script>

<style></style>
