<template>
  <div class="item" @click="selectItem(patient)">
    <div class="option">
      <div class="option-name">患者姓名:</div>
      <div class="context" v-text="patient.name"></div>
    </div>
    <div class="option">
      <div class="option-name">预约医院:</div>
      <div class="context" v-text="patient.hospital"></div>
    </div>
    <div class="option">
      <div class="option-name">性别:</div>
      <div class="context" v-text="patient.sex"></div>
    </div>
    <div class="option">
      <div class="option-name">就诊时间:</div>
      <div class="context" v-text="patient.wantTime"></div>
    </div>
    <div class="operate">
      <i class="icon editor" @click.stop="editor(patient)"></i>
      <i class="icon arrow"></i>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
  export default {
    props: {
      patient: Object,
      default: () => {
        return {}
      }
    },
    methods: {
      editor(patient) {
        this.$emit('editorPatient', patient)
      },
      selectItem(patient) {
        this.$emit('detailPatient', patient)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .item
    background-color #ffffff
    padding 0 45px 0 15px
    margin-bottom 10px
    position relative
    .option
      height 35px
      line-height 35px
      display flex
      font-size 14px
      position relative
      &::after
        content ' '
        position absolute
        left 0
        bottom 0
        right 0
        border-top 1px solid #ebebeb
        color #e6e3e4
        transform-origin 0 0
        transform scaleY(0.5)
      &:last-child
        &::after
          border-top none
      .option-name
        flex 0 0 70px
        width 70px
        color #6f778c
      .context
        flex 1
        box-sizing border-box
        padding-left 5px
        color #333741
    .operate
      width 45px
      position absolute
      right 0
      top 0
      height 100%
      justify-content center
      display flex
      align-items center
      .icon
        display: inline-block
        width 20px
        height 20px
        &.arrow
          width 8px
          height 15px
          background url("./img/arrow.png") no-repeat
          background-size 100% 100%
        &.editor
          background url("./img/icon.png") no-repeat
          background-size 100% 100%
          position absolute
          right 10px
          top 10px
          &:before
            content: ''
            position: absolute
            top: -10px
            left: -10px
            right: -10px
            bottom: -10px
</style>
