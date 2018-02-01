<template>
  <div class="su-wrapper">
    <div class="user-info">
      <div class="title">
        <i class="icon"></i>
        <span>认证成功</span>
      </div>
      <div class="option">
        <div class="wrapper">
          <img src="./img/success.png" alt="">
        </div>
      </div>
      <div class="text">
        <p>恭喜，您的认证已成功！</p>
        <p v-text="txt" v-if="txt"></p>
        <p>我们有丰富的功能等着您。</p>
      </div>
    </div>
    <div class="submit-btn" @click='closePage'>
      关闭
    </div>
    <div class="crumb">
      <span>提交信息 &gt;</span>
      <span class="current">认证成功</span>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
  export default {
    props: {
      txt: {
        type: String,
        default: ''
      }
    },
    methods: {
      closePage() {
        /* eslint-disable no-undef */
        WeixinJSBridge.call('closeWindow')
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/myreset.css"

  .su-wrapper
    padding .25rem .1rem
    .user-info
      background-color #fff
      padding-bottom .3rem
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
      .option
        .wrapper
          margin .3rem 0
          box-sizing border-box
          text-align center
          img
            width 80%
      .text
        text-align center
        color #474959
        line-height .2rem
        font-weight 500
    .submit-btn
      width 100%
      height .4rem
      line-height: .4rem
      color #429ab0
      font-size .15rem
      text-align center
      border-radius 5px
      background-color #fff
      margin .3rem 0 .1rem
    .crumb
      width 100%
      height .4rem
      line-height: .4rem
      text-align center
      .current
        color #429ab0

</style>
