<template>
  <div class="line" :style="lineStyle"></div>
</template>

<script type='text/ecmascript-6'>
  export default {
    props: {
      height: {
        type: Number,
        default: 10
      }
    },
    computed: {
      lineStyle() {
        return `height: ${this.height}px`
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .line
    background-color #eef5f5
</style>
