<template>
  <div class="form-wrapper">
    <div class="title">
      <i class="icon"></i>
      <span class="text">{{formTitle}}</span>
    </div>
    <div class="wrapper">
      <group>
        <x-input required title="患者姓名" placeholder="请输入患者姓名" text-align="right" v-model="userInfo.name"
                 :readonly="!formType"></x-input>
      </group>
      <group>
        <datetime :min-year="1900" v-model="userInfo.birthday" @on-change="birthdayChange" title="出生日期"
                  placeholder="请选择出生日期" :readonly="!formType" :end-date="qudate"></datetime>
      </group>
      <group>
        <popup-picker title="患者性别" :data='gender' v-model='sex' @on-change='genderChange'
                      placeholder="请选择患者性别" v-if="formType"></popup-picker>
        <div class="option" v-if="!formType">
          <div class="option-name">患者性别</div>
          <div class="context">{{userInfo.sex}}</div>
        </div>
      </group>
      <group>
        <x-input title="患者手机" required type="tel" placeholder="请输入患者手机" text-align="right" v-model="userInfo.phone"
                 :readonly="!formType" @on-blur="telBlur"></x-input>
      </group>
      <group>
        <popup-picker title="所属区域" :data='arealist' v-model='area' @on-change='areaChange'
                      placeholder="请选择所属区域" v-if="formType"></popup-picker>
        <div class="option" v-if="!formType">
          <div class="option-name">所属区域</div>
          <div class="context">{{userInfo.area}}</div>
        </div>
      </group>
      <group>
        <datetime v-model="userInfo.wantTime" @on-change="AppTimeChange" title="期望预约时间"
                  placeholder="请选择期望预约时间" :readonly="!formType" :start-date="qudate"></datetime>
      </group>
      <group>
        <popup-picker title="预约医院" :data='hostlist' v-model='host' @on-change='hostChange'
                      placeholder="请选择预约医院" v-if="formType"></popup-picker>
        <div class="option" v-if="!formType">
          <div class="option-name">预约医院</div>
          <div class="context">{{userInfo.wanthospital}}</div>
        </div>
      </group>
      <group title="胎记治疗及胎记描述">
        <x-textarea placeholder="请输入具体描述" v-model="userInfo.description" :height="130"
                    :readonly="!formType"></x-textarea>
      </group>
      <group :title="uploadImgTitle">
        <div class="imgItem" v-show="imgSrcList.length>0" v-for="(imgSrc,index) in imgSrcList" :key="index"
             :style="bgStyle(imgSrc)">
          <i class="icon-chahao" @click="delOne(index)" v-if="formType"></i>
        </div>
        <div class="file" v-if="formType">
          <input type="file" class="myfile" ref="file" @change="getFileUrl($event)">
        </div>
      </group>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
  import Vue from 'vue'
  import {XInput, Group, Datetime, PopupPicker, XTextarea, AlertPlugin, LoadingPlugin, dateFormat} from 'vux'
  import axios from 'axios'

  Vue.use(AlertPlugin)
  Vue.use(LoadingPlugin)
  export default {
    props: {
      formTitle: {
        type: String,
        default: ''
      },
      uploadImgTitle: {
        type: String,
        default: '胎记照片上传（单张照片大小在20M以内）'
      },
      formType: {
        type: Boolean,
        default: ''
      },
      info: {
        type: Object,
        default: () => {
          return {}
        }
      },
      arealist: {
        type: Array,
        default: () => {
          return []
        }
      },
      hostlist: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    data() {
      return {
        gender: [['男', '女']],
        // arealist: [['上海', '北京']],
        // hostlist: [['上海中山医院', '协和医院']],
        /* userInfo: {
          name: '',
          birthday: '2017-12-11',
          gender: ['男'],
          telephone: '',
          area: ['北京'],
          app_time: '2017-12-21',
          host: ['上海中山医院']
        }, */
        sex: [],
        area: [],
        host: [],
        userInfo: {
          name: '',
          birthday: '',
          sex: '',
          phone: '',
          area: '',
          wantTime: '',
          wanthospital: '',
          description: ''
        },
        imgSrcList: [],
        qudate: dateFormat(new Date(), 'YYYY-MM-DD')
      }
    },
    created() {
    },
    methods: {
      telBlur(val, $event) {
        this.$emit('telandname', val, this.userInfo.name ? this.userInfo.name : '')
      },
      birthdayChange() {
      },
      genderChange() {
        this.userInfo.sex = this.sex[0]
      },
      areaChange() {
        // 提交的时候 要ID
        let aIndex = this.findId(this.arealist, this.area[0])
        this.userInfo.area = this.arealist[0][aIndex].id
      },
      AppTimeChange() {
        // console.log(this.userInfo.wantTime)
      },
      hostChange() {
        // 提交的时候 要ID
        let aIndex = this.findId(this.hostlist, this.host[0])
        this.userInfo.wanthospital = this.hostlist[0][aIndex].id
      },
      findId(arr, el) {
        return arr[0].findIndex((item) => {
          return item.value === el
        })
      },
      bgStyle(imgUrl) {
        if (!imgUrl) {
          return ''
        } else {
          return `background-image: url(${imgUrl})`
        }
      },
      getFileUrl($event) {
        let fileDoc = $event.target.files[0]
        if (!fileDoc) {
          return false
        }
        // console.log(fileDoc)
        let size = Math.floor(fileDoc.size / 1024)
        if (size > 20000) {
          this.$vux.alert.show({
            content: '上传图片不能高于20M，请重新选择!'
          })
          return false
        }
        let formData = new FormData()
        formData.append('img', fileDoc)
        this.$vux.loading.show({
          text: '上传中...'
        })
        axios.post('/api/apoint/upload/', formData).then((rsp) => {
          // console.log(rsp)
          this.$vux.loading.hide()
          if (rsp.data.result === 0) {
            this.imgSrcList.push(rsp.data.imgurl)
          } else {
            this.$vux.alert.show({
              content: '上传图片失败，请重新上传!'
            })
          }
        }).catch(e => {
          console.log(e)
        })
      },
      delOne(index) {
        this.imgSrcList.splice(index, 1)
      },
      submitInfo() {
        this.userInfo.openid = localStorage.getItem('openid') !== 'undefined' ? localStorage.getItem('openid') : ''
        this.$emit('userInfo', this.userInfo, this.imgSrcList)
      }
    },
    watch: {
      info() {
        this.userInfo = this.info
        this.imgSrcList = this.info.photo
      }
    },
    components: {
      XInput,
      Group,
      Datetime,
      PopupPicker,
      XTextarea
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
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
