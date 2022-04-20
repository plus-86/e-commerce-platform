<template>
  <div class="Crumb">
    <!-- 最后一项字体加深 -->
    <span
      :class="index === nav.length - 1 ? 'active' : ''"
      v-for="(item, index) in nav"
      :key="index"
      >{{ item.name }}
      <!-- 最后一项不显示斜杠 -->
      <i v-show="index !== nav.length - 1">/</i>
    </span>
  </div>
</template>

<script>
export default {
  props: ['nav']
}
</script>

<style lang="less" scoped>
.Crumb {
  text-align: left;
  padding: 15px 0;
  color: #999;
  font-size: 18px;
  font-weight: 100;
  i {
    font-family: math;
    margin-right: 5px;
  }
  .active {
    color: #000;
    font-weight: bold;
  }
}
</style>
