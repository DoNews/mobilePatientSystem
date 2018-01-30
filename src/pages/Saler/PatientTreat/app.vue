<template>
  <div class="patient-treat">
    <my-title title="患者信治疗情况"></my-title>
    <white-line></white-line>
    <div class="form-wrapper">
      <group>
        <x-input title="患者姓名" placeholder="患者姓名" text-align="right" v-model="name"
                 :readonly="true"></x-input>
      </group>
      <group>
        <popup-picker title="治疗状态" :data='statuslist' v-model='status' @on-change='statusChange'
                      placeholder="请选择治疗状态"></popup-picker>
      </group>
      <group title="胎记治疗及胎记描述">
        <x-textarea placeholder="请输入具体描述" v-model="desc" :height="130"></x-textarea>
      </group>
    </div>
    <div class="btn">
      <div class="cancel" @click="cancel">取消</div>
      <div class="submit" @click="submit">提交</div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
  import Vue from 'vue'
  import {AlertPlugin, XInput, Group, XTextarea, PopupPicker} from 'vux' // 引用vux使用单引号
  import MyTitle from 'components/title/title'
  import WhiteLine from 'components/Line/Line'

  Vue.use(AlertPlugin)
  export default {
    data() {
      return {
        name: '',
        desc: '',
        status: [],
        statuslist: [['已安排治疗', '预约延后治疗', '转院', '患者未到诊', '暂停跟进']]
      }
    },
    methods: {
      statusChange() {
      },
      cancel() {
      },
      submit() {
      }
    },
    components: {
      MyTitle,
      WhiteLine,
      XInput,
      Group,
      XTextarea,
      PopupPicker
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/index.styl"
  @import "~common/css/initform.styl"
  html, body
    height 100%
    background-color #eef5f5

  .form-wrapper
    background-color #ffffff
    padding 0 18px

  .btn
    display flex
    font-size 18px
    text-align center
    height 40px
    line-height 40px
    position fixed
    bottom 0
    width 100%
    & > div
      flex 1
    .cancel
      background-color #ffffff
      color #5bbfd3
    .submit
      background-color #5bbfd3
      color #ffffff
</style>
