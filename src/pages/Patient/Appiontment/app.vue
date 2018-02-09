<template>
  <div class="appiontment-wrapper">
    <appiontment-title></appiontment-title>
    <white-line></white-line>
    <user-form :formTitle="formTitle"
               :formType="formType"
               :arealist="arealist"
               :hostlist="hostlist"
               @userInfo="getUserInfo"
               @telandname="telcheck"
               ref="userForm"
    ></user-form>
    <div class="submit-btn" @click="submitApp">
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
  import {getProvinceList, getHospitalList, submitAppiont, checkTelAndName} from 'common/service/server'
  import {urlSearch} from 'common/js/util'
  import {checkForm, hideMenus} from 'common/js/mixin'

  Vue.use(AlertPlugin)
  export default {
    mixins: [checkForm, hideMenus],
    data() {
      return {
        formType: true,
        formTitle: '预约信息提交（必填）',
        arealist: [],
        hostlist: [],
        userInfo: {},
        photo: []
      }
    },
    created() {
      let request = urlSearch(window.location.href)
      if (request.openid) {
        localStorage.setItem('openid', request.openid)
      }
      this.getProvinceList()
      this.getHospitalList()
    },
    methods: {
      telcheck(tel, name) {
        // console.log(tel)
        // console.log(name)
        if (!this.checkTel(tel)) {
          this.$vux.alert.show({
            content: '请填写正确的手机号码!'
          })
          return false
        }
        let params = {
          phone: tel
        }
        checkTelAndName(params).then(rsp => {
          // console.log(rsp)
          if (rsp.data.ret !== 0) {
            this.$vux.alert.show({
              content: '您有预约正在流程中，无需再次预约!'
            })
          }
        })
      },
      submitApp() {
        this.$refs.userForm.submitInfo()
        let userInfoFlag = this._checkEmpty(this.userInfo)
        // console.log(this.userInfo)
        if (!userInfoFlag) {
          this.$vux.alert.show({
            content: '请填写完整信息，再提交!'
          })
          return false
        }
        if (!this.checkTel(this.userInfo.phone)) {
          this.$vux.alert.show({
            content: '请填写正确的手机号码!'
          })
          return false
        }
        let params = {
          userinfo: JSON.stringify(this.userInfo),
          photo: JSON.stringify(this.photo)
        }
        submitAppiont(params).then(rsp => {
          // console.log(rsp)
          if (rsp.data.ret === 0) {
            window.location.href = './AppiontmentSuccess.html'
          } else if (rsp.data.ret === 1) {
            this.$vux.alert.show({
              content: '您有预约正在流程中，无需再次预约!'
            })
          }
        }).catch(e => {
          console.log(e)
        })
      },
      getUserInfo(userInfo, photo) {
        // 子组件的信息和照片的回传
        this.userInfo = userInfo
        this.photo = photo
      },
      getProvinceList() {
        getProvinceList().then(rsp => {
          // console.log(rsp)
          if (rsp.data.ret === 0) {
            this.arealist = rsp.data.lister
          }
        })
      },
      getHospitalList() {
        getHospitalList().then(rsp => {
          // console.log(rsp)
          if (rsp.data.ret === 0) {
            this.hostlist = rsp.data.lister
          }
        })
      }
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
