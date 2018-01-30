<template>
  <div class="title">
      <span class="text">
        {{title}}
      </span>
  </div>
</template>

<script type='text/ecmascript-6'>
  export default {
    props: {
      title: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .title
    background-color #e5f3ff
    line-height 40px
    height 40px
    text-align center
    .text
      color #2c899b
      font-size 16px
      font-weight 500
</style>
