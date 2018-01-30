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

  export default {
    data() {
      return {
        patientList: [
          {
            id: 1,
            name: '张三丰',
            wantHospital: '我的意愿',
            sex: '女',
            time: '2018-2-6'
          },
          {
            id: 2,
            name: '张三丰',
            wantHospital: '我的意愿',
            sex: '男',
            time: '2018-2-6'
          },
          {
            id: 3,
            name: '张三丰',
            wantHospital: '我的意愿',
            sex: '女',
            time: '2018-2-6'
          },
          {
            id: 4,
            name: '张三丰',
            wantHospital: '我的意愿',
            sex: '女',
            time: '2018-2-6'
          }
        ]
      }
    },
    methods: {
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
