<template>
  <div class="form-wrapper">
    <div class="title">
      <i class="icon"></i>
      <span class="text">预约信息</span>
    </div>
    <div class="wrapper">
      <group>
        <x-input title="患者姓名" placeholder="请输入患者姓名" text-align="right" v-model="userInfo.name"></x-input>
      </group>
      <group>
        <datetime :min-year="1900" v-model="userInfo.birthday" @on-change="birthdayChange" title="出生日期" placeholder="请选择出生日期"></datetime>
      </group>
      <group>
        <popup-picker title="患者性别" :data='gender' v-model='userInfo.gender' @on-change='genderChange' placeholder="请选择患者性别"></popup-picker>
      </group>
      <group>
        <x-input title="患者手机" placeholder="请输入患者手机" text-align="right" v-model="userInfo.telephone"></x-input>
      </group>
      <group>
        <popup-picker title="所属区域" :data='arealist' v-model='userInfo.area' @on-change='areaChange' placeholder="请选择所属区域"></popup-picker>
      </group>
      <group>
        <datetime v-model="userInfo.app_time" @on-change="AppTimeChange" title="期望预约时间" placeholder="请选择期望预约时间"></datetime>
      </group>
      <group>
        <popup-picker title="预约医院" :data='hostlist' v-model='userInfo.host' @on-change='hostChange' placeholder="请选择预约医院"></popup-picker>
      </group>
      <div class="option"></div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
  import {XInput, Group, Datetime, PopupPicker} from 'vux'

  export default {
    data() {
      return {
        gender: [['男', '女']],
        arealist: [['上海', '北京']],
        hostlist: [['上海中山医院', '协和医院']],
        /* userInfo: {
          name: '',
          birthday: '2017-12-11',
          gender: ['男'],
          telephone: '',
          area: ['北京'],
          app_time: '2017-12-21',
          host: ['上海中山医院']
        }, */
        userInfo: {
          name: '',
          birthday: '',
          gender: [],
          telephone: '',
          area: [],
          app_time: '',
          host: []
        }
      }
    },
    methods: {
      birthdayChange() {
      },
      genderChange() {
      },
      areaChange() {
      },
      AppTimeChange() {
      },
      hostChange() {
      }
    },
    components: {
      XInput,
      Group,
      Datetime,
      PopupPicker
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .form-wrapper
    padding 0 18px 10px
    .title
      height 50px
      line-height 50px
      font-size 16px
      color #6f778c
      i
        display inline-block
        width 24px
        height 24px
        background url("./img/form.png") no-repeat
        background-size 100% 100%
        vertical-align middle
</style>
