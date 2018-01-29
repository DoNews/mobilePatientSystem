<template>
  <div class="appiontment-wrapper">
    <appiontment-title></appiontment-title>
    <white-line></white-line>
    <user-form></user-form>
  </div>
</template>

<script type='text/ecmascript-6'>
  import Vue from 'vue'
  import {AlertPlugin} from 'vux' // 引用vux使用单引号
  import AppiontmentTitle from 'components/appiontment-title/appiontment-title'
  import UserForm from 'components/user-form/user-form'
  import WhiteLine from 'components/Line/Line'

  Vue.use(AlertPlugin)
  export default {
    mounted() {
    },
    components: {
      AppiontmentTitle,
      UserForm,
      WhiteLine
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/index.styl"

  .weui-cells, .vux-no-group-title
    margin-top 0 !important
    font-size 14px !important
    color #6f778c

  .vux-datetime
    color #6f778c !important

  .weui-cells
    &:after
      border-bottom none !important

  .vux-cell-value
    color #333741 !important

  .weui-input
    color #333741 !important

  .dp-header, .dp-item.dp-right, .vux-popup-header-right
    color #5bbfd3 !important
</style>
