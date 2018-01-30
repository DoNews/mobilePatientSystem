<template>
  <div class="wrapper">
    <my-title title="我的患者"></my-title>
    <white-line></white-line>
    <div class="list">
      <patient v-for="(item,index) in patientList"
               :key="index"
               :patient="item"
               @editorPatient="editorPatient"
               @detailPatient="detailPatient"
      ></patient>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
  import MyTitle from 'components/title/title'
  import WhiteLine from 'components/Line/Line'
  import Patient from 'components/patient/patient'
  import {getPatientList} from 'common/service/server'

  export default {
    data() {
      return {
        patientList: []
      }
    },
    created() {
      this.getPatientList()
    },
    methods: {
      getPatientList() {
        let params = {
          // openid: localStorage.getItem('openid')
          openid: 'o_MHBjuPu3dDh2-1z5rPfmXNfsAQ'
        }
        getPatientList(params).then(rsp => {
          // console.log(rsp)
          if (rsp.data.ret === 0) {
            this.patientList = rsp.data.lister
          }
        })
      },
      editorPatient(patient) {
        console.log(patient)
      },
      detailPatient(patient) {
        console.log(patient)
      }
    },
    components: {
      MyTitle,
      WhiteLine,
      Patient
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/index.styl"
  html, body
    height 100%
    background-color #eef5f5
</style>
