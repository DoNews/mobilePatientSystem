<template>
  <div class="wrapper">
    <my-title title="我的患者"></my-title>
    <white-line></white-line>
    <div class="list" v-if="patientList.length">
      <patient v-for="(item,index) in patientList"
               :key="index"
               :patient="item"
               @editorPatient="editorPatient"
               @detailPatient="detailPatient"
      ></patient>
    </div>
    <no-result v-if="!patientList.length"></no-result>
  </div>
</template>

<script type='text/ecmascript-6'>
  import MyTitle from 'components/title/title'
  import WhiteLine from 'components/Line/Line'
  import Patient from 'components/patient/patient'
  import NoResult from 'components/no-result/no-result'
  import {getPatientList} from 'common/service/server'
  import {urlSearch} from 'common/js/util'
  import {hideMenus} from 'common/js/mixin'

  export default {
    mixins: [hideMenus],
    data() {
      return {
        patientList: []
      }
    },
    created() {
      let request = urlSearch(window.location.href)
      if (request.openid && request.openid !== 'undefined') {
        localStorage.setItem('openid', request.openid)
      }
      this.getPatientList()
    },
    methods: {
      getPatientList() {
        let params = {
          openid: localStorage.getItem('openid')
          // openid: 'o_MHBjuPu3dDh2-1z5rPfmXNfsAQ'
        }
        getPatientList(params).then(rsp => {
          if (rsp.data.ret === 0) {
            this.patientList = rsp.data.lister
          }
        })
      },
      editorPatient(patient) {
        window.location.href = `./PatientTreat.html?id=${patient.id}`
      },
      detailPatient(patient) {
        window.location.href = `./PatientInfo.html?id=${patient.id}`
      }
    },
    components: {
      MyTitle,
      WhiteLine,
      Patient,
      NoResult
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/index.styl"
  
  html, body
    height 100%
    background-color #eef5f5
</style>
