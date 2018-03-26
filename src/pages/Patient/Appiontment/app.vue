<template>
  <div class="appiontment-wrapper">
    <appiontment-title></appiontment-title>
    <white-line></white-line>
    <user-form :formTitle="formTitle"
               :formType="formType"
               :arealist="arealist"
               :hostlist="hostlist"
               :userInfo="userInfo"
               :list3="hostlist"
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
        list3: [],
        userInfo: {},
        photo: [],
        codes: '',
        openid: ''
      }
    },
    mounted() {
    },
    created() {
       // (ua.match(/MicroMessenger/i) === 'micromessenger')
      let request = urlSearch(window.location.href)
      this.openid = request.openid
      // let ua = navigator.userAgent.toLowerCase()
      if (this.openid) {
        localStorage.setItem('openid', request.openid)
        window.location.href = '/static/MobileClient/Patient/Appiontment.html'
      } else if (localStorage.getItem('openid')) {
        this.openid = localStorage.getItem('openid')
      } else {
        window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxcf86e59e9c228363&redirect_uri=http%3A%2F%2Fwx.yuemia.com%2Fwechat%2Fopenid.ashx%3Fwx%3Dfindangel%26type%3D1%26Url%3Dhttp%253A%252F%252Fyuyue.tianshizhiwen.org%252FcheckUser&response_type=code&scope=snsapi_base&state=O#wechat_redirect'
      }
      this.getProvinceList()
      this.getHospitalList()
    },
    methods: {
      telcheck(tel, name) {
        if (!this.checkTel(tel)) {
          this.$vux.alert.show({
            content: '请填写正确的手机号码!'
          })
          return false
        }
        let params = {
          phone: tel,
          openid: this.openid
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
        let len = this.codes.length
        if (len === 0) {
          this.$vux.alert.show({
            content: '请输入验证码，再提交!'
          })
          return false
        }
        let userInfoFlag = this._checkEmpty(this.userInfo)
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
          photo: JSON.stringify(this.photo),
          codes: this.codes
        }
        console.log(localStorage.getItem('openid'))
        submitAppiont(params).then(rsp => {
          if (rsp.data.ret === 0) {
            window.location.href = './AppiontmentSuccess.html'
          } else if (rsp.data.ret === 1) {
            this.$vux.alert.show({
              content: '您有预约正在流程中，无需再次预约!'
            })
          } else if (rsp.data.ret === 2) {
            this.$vux.alert.show({
              content: '验证码不正确'
            })
          }
        }).catch(e => {
          console.log(e)
        })
      },
      getUserInfo(userInfo, photo, codes) {
        // 子组件的信息和照片的回传
        this.userInfo = userInfo
        this.photo = photo
        this.codes = codes
      },
      getProvinceList() {
        getProvinceList().then(rsp => {
          if (rsp.data.ret === 0) {
            this.arealist = rsp.data.lister
          }
        })
      },
      getHospitalList() {
        getHospitalList().then(rsp => {
          if (rsp.data.ret === 0) {
            this.hostlist = rsp.data.lister[0]
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
