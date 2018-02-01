<template>
  <div class="title">
    <i class="icon"></i>
    <span v-text="title"></span>
  </div>
</template>

<script type='text/ecmascript-6'>
  export default {
    props: {
      title: {
        type: String,
        default: '光动力抽奖'
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .title
    height .4rem
    line-height .4rem
    background-color #edeef5
    font-size 0
    text-align center
    border-top-left-radius 5px
    border-top-right-radius 5px
    border 1px solid #e6e6e6
    border-bottom 0
    .icon
      display inline-block
      width 18px
      height 19px
      background-image url("./img/logo.png")
      background-size cover
      vertical-align middle
    span
      vertical-align middle
      font-size .12rem
      color #474959
      font-weight 600
</style>
