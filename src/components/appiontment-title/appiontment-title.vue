<template>
  <div class="title-wrapper">
    <my-title :title="title"></my-title>
    <white-line></white-line>
    <div class="tip">
      <div class="left">
        <i class="icon"></i>
        <span>小提示</span>
      </div>
      <div class="right">
        <div>请填写您的详细信息及需要就诊的医院，工作人员会在第一时间跟您确认预约情况。</div>
        <div>如您在填写预约表中出现问题，可直接拨打预约电话： 15214339560 、 15821084249 。</div>
      </div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
  import WhiteLine from 'components/Line/Line'
  import MyTitle from 'components/title/title'

  export default {
    data() {
      return {
        title: '红胎记治疗门诊预约'
      }
    },
    components: {
      WhiteLine,
      MyTitle
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .title-wrapper
    background-color #fff
    .tip
      height 100px
      padding 10px
      display flex
      .left
        flex 0 0 40px
        width 40px
        font-size 16px
        color #5bbfd3
        text-align center
        padding-top 10px
        i
          display inline-block
          width 20px
          height 20px
          background url("./img/tip.png") no-repeat
          background-size 100% 100%
        span
          box-sizing border-box
          display inline-block
          padding 0 5px
          width 100%
          position relative
          left -3px
      .right
        flex 1
        display flex
        overflow hidden
        line-height 21px
        justify-content center
        flex-direction column
        font-size 14px
        color #6f778c
</style>
