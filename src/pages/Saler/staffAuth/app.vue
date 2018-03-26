<template>
  <div class="reg-wrapper">
    <div class="user-info">
      <auth-title :title="authTitle"></auth-title>
      <div class="option">
        <div class="wrapper">
          <div class="option-name">员工姓名</div>
          <div class="operate">
            <input type="text" v-model="userInfo.name" class="user-operate" placeholder="请输入真实姓名(必填)">
          </div>
        </div>
      </div>
      <div class="option">
        <div class="wrapper">
          <div class="option-name">工作邮箱</div>
          <div class="operate">
            <input type="text" v-model="userInfo.email" class="user-operate" placeholder="请输入工作邮箱(必填)">
          </div>
        </div>
      </div>
      <div class="option">
        <div class="wrapper">
          <div class="option-name">手机号码</div>
          <div class="operate">
            <input type="number" v-model="userInfo.phone" class="user-operate tel" placeholder="请输入手机号码" maxlength="11"
                   v-on:input="maxLength">
          </div>
        </div>
        <div class="getIcode" :class="hasGet" @click="sendIcode">{{getIcodeTxt}}</div>
      </div>
      <div class="option">
        <div class="wrapper">
          <div class="option-name">验证码</div>
          <div class="operate">
            <input type="text" v-model="userInfo.vercode" class="user-operate" placeholder="请输入验证码">
          </div>
        </div>
      </div>
    </div>
    <div class="submit-btn" @click="submitInfo">
      提交认证
    </div>
    <div class="crumb">
      <span class="current">提交信息 &gt;</span>
      <span>认证成功</span>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
  import AuthTitle from 'components/auth-title/auth-title.vue'
  import Vue from 'vue'
  import {ToastPlugin, LoadingPlugin} from 'vux'
  import {checkForm, hideMenus} from 'common/js/mixin'
  import {urlSearch} from 'common/js/util'
  import {submitAuthInfo, submitSendCode} from 'common/service/server'

  Vue.use(ToastPlugin)
  Vue.use(LoadingPlugin)
  const ALL_SECOND = 60
  export default {
    mixins: [checkForm, hideMenus],
    data() {
      return {
        userInfo: {
          vercode: '',
          name: '',
          phone: '',
          email: '',
          openid: ''
        },
        hasGet: '',
        getIcodeTxt: '获取验证码',
        authTitle: '内部员工认证通道'
      }
    },
    created() {
      let currentUrl = window.location.href
      let request = urlSearch(currentUrl)
      if (request.openid) {
        localStorage.setItem('openid', request.openid)
      }
      this.getIcodeFlag = true
    },
    methods: {
      maxLength() {
        if (this.userInfo.phone.length > 11) {
          this.userInfo.phone = this.userInfo.phone.substring(0, 11)
        }
      },
      submitInfo() {
        this.userInfo.openid = localStorage.getItem('openid')
        // 检空
        if (!this.checkEmpty(this.userInfo)) {
          this.$vux.toast.text('请完善您的信息', 'middle')
          return
        }
        // 检查区域空
        if (!this.checkEmpty(this.userInfo.area)) {
          this.$vux.toast.text('请输入居住地', 'middle')
          return
        }
        // 检格式
        if (!this.checkTel(this.userInfo.phone)) {
          this.$vux.toast.text('请检查手机格式', 'middle')
          return
        }
        if (!this.checkEmail(this.userInfo.email)) {
          this.$vux.toast.text('请完善邮箱格式', 'middle')
          return
        }
        this.$vux.loading.show({
          text: '提交中'
        })
        // console.log(this.userInfo)
        submitAuthInfo(this.userInfo).then(rsp => {
          this.$vux.loading.hide()
          if (rsp.data.ret === 0) {
            window.location.href = './staffAuthSu.html'
          } else {
            this.$vux.toast.text(rsp.data.msg, 'middle')
          }
        }).catch(e => {
          this.$vux.toast.text(e, 'middle')
          this.$vux.loading.hide()
        })
      },
      sendIcode() {
        if (!this.getIcodeFlag) {
          return
        }
        if (!this.checkTel(this.userInfo.phone)) {
          this.$vux.toast.text('请输入手机号码并检查手机号码格式', 'middle')
          return
        }
        let seconds = ALL_SECOND
        var timer = setInterval(() => {
          seconds--
          if (seconds > 0) {
            this.getIcodeTxt = `(${seconds}s)`
            this.hasGet = 'hasget'
            this.getIcodeFlag = false
          } else {
            clearInterval(timer)
            this.getIcodeTxt = `重新获取`
            this.hasGet = ''
            this.getIcodeFlag = true
          }
        }, 1000)
        let params = {
          phone: this.userInfo.phone
        }
        submitSendCode(params).then((rsp) => {
          if (rsp.data.ret === 0) {
            this.$vux.toast.text('验证码已发送，请注意查收!', 'middle')
          }
        }).catch((e) => {
          this.$vux.toast.text('验证码发送失败，请再次尝试!', 'middle')
        })
      },
      checkEmpty(obj) {
        for (let key in obj) {
          console('key:', key)
          console('value:', obj[key])
          if (obj[key] === '' || !obj[key].length) {
            return false
          }
        }
        return true
      }
    },
    components: {
      AuthTitle
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/myreset.css'
  .reg-wrapper
    padding 0.3rem 0.15rem
    .user-info
      background-color #fff
      padding-bottom 0.3rem
      .title
        height 0.4rem
        line-height 0.4rem
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
          background-image url('img/logo.png')
          background-size cover
          vertical-align middle
        span
          vertical-align middle
          font-size 0.12rem
          color #474959
          font-weight 600
      .option
        height 0.4rem
        line-height 0.4rem
        padding 0 0.15rem
        box-sizing border-box
        position relative
        .wrapper
          display flex
          box-sizing border-box
          position relative
          &::after
            content ' '
            position absolute
            left 0
            bottom 0
            right 0
            height 1px
            border-top 1px solid #e6e3e4
            color #e6e3e4
            -webkit-transform-origin 0 0
            transform-origin 0 0
            -webkit-transform scaleY(0.5)
            transform scaleY(0.5)
          .option-name
            flex 0 0 0.65rem
            width 0.65rem
            height 0.4rem
          .operate
            flex 1
            line-height 0.4rem
            box-sizing border-box
            & > div, .user-operate
              -vertical-align top
              box-sizing border-box
              width 100%
              height 0.4rem
              border none
              outline none
              &.tel
                padding-right 0.8rem
        .getIcode
          position absolute
          right 0.15rem
          top 0.09rem
          width 0.8rem
          height 0.22rem
          background-color #5bbfd3
          color #ffffff
          text-align center
          border-radius 5px
          line-height 0.22rem
          font-size 0.11rem
          &.hasget
            background-color #b3b3b3
    .submit-btn
      width 100%
      height 0.4rem
      line-height 0.4rem
      color #5bbfd3
      font-size 0.15rem
      text-align center
      border-radius 5px
      background-color #fff
      margin 0.6rem 0
    .crumb
      width 100%
      height 0.4rem
      line-height 0.4rem
      text-align center
      .current
        color #429ab0

  .vux-cell-box
    &:before
      border-top none !important

  .vux-no-group-title
    margin-top 0 !important

  .weui-cell
    padding 0 !important

  .weui-cells.vux-no-group-title
    line-height 21px
    width 100% !important
    vertical-align middle !important
    display inline-block !important

  .vux-popup-picker-placeholder.vux-cell-placeholder
    font-size 0.12rem
    color #474959

  .vux-popup-picker-value.vux-cell-value
    font-size 0.12rem
    color #474959

  .weui-cell_access
    .weui-cell__ft
      &:after
        display none !important

  .weui-cells
    &:before, &:after
      content '' !important
      height 0 !important
      border-top none !important
      border-bottom none !important
</style>
