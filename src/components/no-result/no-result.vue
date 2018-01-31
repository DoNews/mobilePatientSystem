<template>
  <div class="no-result">
    <p class="no-result-text">{{title}}</p>
  </div>
</template>

<script type='text/ecmascript-6'>
  export default {
    props: {
      title: {
        type: String,
        default: '没有更多结果~'
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

  .no-result
    padding 25px 0 10px
    text-align center
    color #a1a2b2
</style>
