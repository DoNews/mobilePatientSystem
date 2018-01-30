<template>
  <div class="patient-info">
    <my-title title="患者信息表"></my-title>
    <white-line></white-line>
    <user-form :formTitle="formTitle"
               :uploadImgTitle="uploadImgTitle"
               :formType="formType"
               :info="info"
    ></user-form>
    <div class="desclist">
      <group title="客服电话确认记录" v-for="(item,index) in descList" :key="index">
        <x-textarea placeholder="请输入客服电话确认记录" v-model="item.text" :height="130" :readonly="true"></x-textarea>
        <div class="customservice">
          <span>责任客服:{{item.customservice}}</span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span>{{item.time}}</span>
        </div>
      </group>
    </div>
    <div class="btn">
      <div class="cancel" @click="closePage">关闭</div>
      <div class="submit" @click="write">写备忘</div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
  import Vue from 'vue'
  import {AlertPlugin, XTextarea, Group} from 'vux' // 引用vux使用单引号
  import UserForm from 'components/user-form/user-form'
  import MyTitle from 'components/title/title'
  import WhiteLine from 'components/Line/Line'

  Vue.use(AlertPlugin)
  export default {
    data() {
      return {
        formType: false,
        formTitle: '预约信息',
        uploadImgTitle: '胎记照片',
        info: {},
        descList: [
          {
            id: 1,
            text: '2312312312313213123',
            customservice: '复小丹',
            time: '2017-12-15 14:05'
          },
          {
            id: 2,
            text: '2312312312331231231231213213123',
            customservice: '复小丹',
            time: '2017-12-15 14:05'
          }
        ]
      }
    },
    methods: {
      closePage() {
      },
      write() {
      }
    },
    components: {
      UserForm,
      MyTitle,
      XTextarea,
      WhiteLine,
      Group
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
    .customservice
      padding 5px 0

  .btn
    display flex
    font-size 18px
    text-align center
    height 40px
    line-height 40px
    width 100%
    margin 50px 0 0
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
</style>
