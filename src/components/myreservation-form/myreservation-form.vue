<template>
  <div class="form-wrapper">
    <div class="title">
      <i class="icon"></i>
      <span class="text">我的预约信息</span>
    </div>
    <div class="wrapper">
      <group>
        <x-input title="患者姓名" disabled  text-align="right" v-model="data.name"></x-input>
      </group>
      <group>
        <x-input title="患者性别" disabled   text-align="right" v-model="data.sex"></x-input>
      </group>
      <group>
        <x-input title="患者手机" disabled   type="tel"  text-align="right" v-model="data.phone"></x-input>
      </group>
      <group>
       <x-input title="出生日期" disabled text-align="right" v-model="data.birthday"></x-input>
      </group>
      <group>
        <x-input title="期望预约医院" disabled  text-align="right" v-model="data.wanthospital" ></x-input>
      </group>
      <group>
       <x-input title="期望预约时间" disabled   text-align="right" v-model="data.wantTime"></x-input>
      </group>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
  import Vue from 'vue'
  import {XAddress, XInput, XButton, Group, Datetime, PopupPicker, XTextarea, AlertPlugin, LoadingPlugin, dateFormat} from 'vux'
  import axios from 'axios'
  Vue.use(AlertPlugin)
  Vue.use(LoadingPlugin)
  export default {
    props: {
      formTitle: {
        type: String,
        default: ''
      },
      info: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data() {
      return {
        data: [],
        qudate: dateFormat(new Date(), 'YYYY-MM-DD')
      }
    },
    created() {
      this.getData()
    },
    methods: {
      getData() {
        let openid = localStorage.getItem('openid')
        axios.get('/api/apoint/orderdetailser/', {
          params: {
            openid: openid
          }
        }).then((rsp) => {
          this.$vux.loading.hide()
          if (rsp.data.ret === 0) {
            this.data = rsp.data.data
          } else {
            this.$vux.alert.show({
              content: '获取信息失败!'
            })
          }
        }).catch(e => {
          console.log(e)
        })
      }
    },
    watch: {
      info() {
        this.data = this.data
        this.imgSrcList = this.info.photo
      }
    },
    components: {
      XAddress,
      XInput,
      Group,
      Datetime,
      PopupPicker,
      XTextarea,
      XButton
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .weui-btn + .weui-btn
    margin 0
  .weui-btn_primary
    background: #5bbfd3
  .form-wrapper
    padding 0 18px 10px
    background-color #ffffff
    .title
      height 50px
      line-height 50px
      font-size 16px
      color #6f778c
      i
        display inline-block
        width 20px
        height 20px
        background url("./img/form.png") no-repeat
        background-size 100% 100%
        vertical-align middle
        position relative
        top -2px
    .wrapper
      .option
        display flex
        padding 10px 0
        .option-name
          flex 0 0 5em
          width 5em
        .context
          flex 1
          text-align right
      .imgItem
        width 65px
        height 65px
        display inline-block
        overflow hidden
        text-align center
        position relative
        margin 9px
        vertical-align bottom
        background-size cover
        background-position 50% 50%
        border-radius 3px
        .icon-chahao
          display inline-block
          right 0
          top 0
          width 20px
          height 20px
          background url("./img/chahao.png") no-repeat
          background-size 100% 100%
          extend-click()
          position absolute
      .file
        width 65px
        height 65px
        display inline-block
        background url("./img/selected.png") no-repeat
        background-size 100% 100%
        margin 9px
        position relative
        -left -4px
        vertical-align bottom
        .myfile
          border: none !important
          height 100%
          width 100%
          outline none
          opacity: 0
          &::-webkit-file-upload-button
            width: 10px
            height: 10px
            position: absolute
            outline: 0
            opacity: 0
</style>
