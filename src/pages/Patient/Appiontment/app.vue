<template>
  <div class="appiontment-wrapper">
    <appiontment-title></appiontment-title>
    <white-line></white-line>
    <user-form :formTitle="formTitle"
               :formType="formType"
    ></user-form>
    <div class="submit-btn">
      预约提交
    </div>
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
    data() {
      return {
        formType: true,
        formTitle: '预约信息提交（必填）'
      }
    },
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
  @import "~common/css/initform.styl"
  .appiontment-wrapper
    background-color #f0f5f5

  .submit-btn
    width 100%
    height 40px
    line-height 40px
    text-align center
    background-color #5bbfd3
    color #ffffff
    margin 50px 0 0

</style>
