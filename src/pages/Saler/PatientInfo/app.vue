<template>
  <div class="patient-info">
  <div style="margin-bottom:40px">
    <my-title title="患者信息表"></my-title>
    <white-line></white-line>
    <user-form :formTitle="formTitle"
               :uploadImgTitle="uploadImgTitle"
               :formType="formType"
               :info="info"
    ></user-form>
    <div class="desclist">
      <div class="descTitle">客服电话确认记录</div>
      <group v-for="(item,index) in descList" :key="index">
        <x-textarea placeholder="暂无记录" v-model="item.remark" :height="130" :readonly="true"></x-textarea>
        <div class="customservice">
          <span>提交人:{{item.name}}</span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span>{{item.time}}</span>
        </div>
      </group>
    </div>
    <div class="loadmore" v-if="!isend" @click="loadmore">加载更多</div>
    </div>
    <div class="btn">
      <div class="cancel" @click="closePage">关闭</div>
      <div class="submit" @click="write">写备忘</div>
    </div>
  </div>
</template>
<script type='text/ecmascript-6'>
  import {XTextarea, Group} from 'vux' // 引用vux使用单引号
  import UserForm from 'components/user-form/user-form'
  import MyTitle from 'components/title/title'
  import WhiteLine from 'components/Line/Line'
  import {getPatientDetail, getMoreInfo} from 'common/service/server'
  import {urlSearch} from 'common/js/util'
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
    created() {
      this.request = urlSearch(window.location.href)
      this.getPatientDetail(this.request.id)
    },
    methods: {
      getPatientDetail(id) {
        let params = {
          id: id
        }
        getPatientDetail(params).then(rsp => {
          if (rsp.data.ret === 0) {
            this.info = rsp.data.data
            this.descList = rsp.data.customer
            this.isend = rsp.is_end
            if (this.descList.length < 3) {
              console.log(this.descList.length)
              this.isend = true
              console.log(this.isend)
            }
          }
        }).catch(e => {
          // console.log(e)
        })
      },
      closePage() {
        window.location.href = './MyPatient.html'
      },
      write() {
        window.location.href = `./PatientTreat.html?id=${this.request.id}`
      },
      loadmore() {
        let params = {
          id: this.request.id
        }
        getMoreInfo(params).then(rsp => {
          if (rsp.data.ret === 0) {
            this.descList = rsp.data.customer
            this.isend = true
          }
        }).catch(e => {
          // console.log(e)
        })
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
