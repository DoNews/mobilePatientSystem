<template>
  <div class="patient-info">
  <div style="margin-bottom:40px">
    <my-title title="我的预约"></my-title>
    <myReservationForm></myReservationForm>
    <myReservation></myReservation>
    </div>
  </div>
</template>
<script type='text/ecmascript-6'>
  import {XTextarea, Group} from 'vux' // 引用vux使用单引号
  import myReservationForm from 'components/myreservation-form/myreservation-form'
  import myReservation from 'components/myreservation-bottom/myreservation-bottom'
  import MyTitle from 'components/title/title'
  import WhiteLine from 'components/Line/Line'
  // import {getPatientDetail} from 'common/service/server'
  import {hideMenus} from 'common/js/mixin'
  export default {
    mixins: [hideMenus],
    data() {
      return {
        formType: false,
        formTitle: '预约信息',
        uploadImgTitle: '胎记照片',
        info: {},
        descList: [],
        isend: false
      }
    },
    // methods: {
    //   getPatientDetail(id) {
    //     let params = {
    //       id: id
    //     }
    //     getPatientDetail(params).then(rsp => {
    //       if (rsp.data.ret === 0) {
    //         this.info = rsp.data.data
    //         this.descList = rsp.data.customer
    //         this.isend = rsp.is_end
    //         if (this.descList.length < 3) {
    //           console.log(this.descList.length)
    //           this.isend = true
    //           console.log(this.isend)
    //         }
    //       }
    //     }).catch(e => {
    //       console.log(e)
    //     })
    //   }
    // },
    components: {
      MyTitle,
      XTextarea,
      WhiteLine,
      Group,
      myReservation,
      myReservationForm
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/index.styl"
  @import "~common/css/initform.styl"
  .patient-info
    background-color #eef5f5
  .desclist
    padding 10px 18px
    background-color #ffffff
    box-sizing border-box
    .descTitle
      color #6f778c
      font-size 14px
    .customservice
      padding 5px 0
    .customservice span:nth-child(2)
      float right
      display inline-block
  .btn
    display flex
    font-size 16px
    text-align center
    height 40px
    line-height 40px
    width 100%
    position fixed
    bottom 0
    & > div
      flex 1
    .cancel
      background-color #ffffff
      color #5bbfd3
    .submit
      background-color #5bbfd3
      color #ffffff

  .weui-cell, .vux-x-textarea
    background-color #ffffff
  .weui-cells__title
    background-color #ffffff
  .weui-label
    color: rgba(0,0,0,0.4)!important
    font-weight: bold!important
  .loadmore 
    height 45px
    line-height 45px
    text-align center
    font-size 18px
    color #5bbfd3
    width 100%
    background #fff
    cursor pointer
</style>
