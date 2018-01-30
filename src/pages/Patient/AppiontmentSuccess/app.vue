<template>
  <div class="wrapper">
    <div class="img">
      <img src="./img/icon@3x.png" alt="">
    </div>
    <div class="text">
      <div class="top">您的预约信息已提交成功！</div>
      <div class="bottom">客服人员将尽快与您电话确认，请注意接听</div>
    </div>
    <div class="button">
      <div class="diary" @click="goToPage('diary')">去访问战斗日记</div>
      <div class="article" @click="goToPage('article')">查看精彩文章</div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
  export default {
    methods: {
      goToPage(arg) {
        if (arg === 'diary') {
          // window.location.href = ''
        } else if (arg === 'article') {
          // window.location.href = ''
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/index.styl"
  html, body
    height 100%

  .wrapper
    height 100%
    background-color #f0f5f5
    .img
      text-align center
      padding 30px 0 0
      img
        width 28%
    .text
      text-align center
      line-height 21px
      .top
        font-size 18px
        color #333741
        font-weight 500
      .bottom
        font-size 13px
        color #6f778c
        margin 5px 20px
    .button
      & > div
        width 80%
        margin 28px auto
        border-radius 5px
        text-align center
        font-size 15px
        line-height 40px
        height 40px
      .diary
        background-color #5bbfd3
        color #ffffff
      .article
        color #5bbfd3
        background-color #ffffff
        border 1px solid #cbe1e1
</style>
