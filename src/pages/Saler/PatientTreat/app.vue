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
      <div class="submit" @click="submitTreat">提交</div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
  import Vue from 'vue'
  import {AlertPlugin, XInput, Group, XTextarea, PopupPicker} from 'vux' // 引用vux使用单引号
  import MyTitle from 'components/title/title'
  import WhiteLine from 'components/Line/Line'
  import {submitTreat, getPatientDetail} from 'common/service/server'
  import {urlSearch} from 'common/js/util'
  import {hideMenus} from 'common/js/mixin'

  Vue.use(AlertPlugin)
  const statusSwitch = {
    '已安排治疗': 6,
    '预约延后治疗': 11,
    '转院': 13,
    '患者未到诊': 14,
    '暂停跟进': 12
  }
  export default {
    mixins: [hideMenus],
    data() {
      return {
        name: '',
        desc: '',
        status: [],
        statuslist: [['已安排治疗', '预约延后治疗', '转院', '患者未到诊', '暂停跟进']]
      }
    },
    created() {
      this.request = urlSearch(window.location.href)
      this.getPatientDetail()
    },
    methods: {
      submitTreat() {
        if (!this.desc || !this.status.length) {
          this.$vux.alert.show({
            content: '请填写完整备忘信息，再提交!'
          })
          return false
        }
        let params = {
          id: this.request.id,
          openid: localStorage.getItem('openid'),
          describe: this.desc,
          types: statusSwitch[this.status[0]]
        }
        submitTreat(params).then(rsp => {
          if (rsp.data.ret === 0) {
            this.$vux.alert.show({
              content: '您的备忘已经提交成功,可在患者信息详情查看！',
              onHide() {
                // 回到上一级的话 如果是在详情点击进去的，获取之后 不会刷新，新添加的备忘不会显示
                // window.history.back(-1)
                window.location.href = './MyPatient.html'
              }
            })
          }
        })
      },
      getPatientDetail() {
        let params = {
          id: this.request.id
        }
        getPatientDetail(params).then(rsp => {
          if (rsp.data.ret === 0) {
            this.name = rsp.data.data.name
          }
        })
      },
      statusChange(val) {
      },
      cancel() {
        window.history.back(-1)
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
    font-size 16px
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
