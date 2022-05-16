<template>
  <div class="checkbox_custom">
    <input @change="handleChange" type="checkbox" name="eventFavorites" value="Y" id="checkbox_0">
    <label for="checkbox_0"><span v-if="options.label">{{ options.label }}</span>
      <!--<span
        v-if="tooltip"
        class="tooltip_marker has-tooltip"
        data-v-6d7a533b=""
        :data-original-title="tooltip"
        v-tooltip="{
          content: tooltip,
          trigger: 'hover',
        }"
      >{{ isType }}</span>-->
      <!--<span
        class="tooltip_marker has-tooltip"
        data-v-6d7a533b=""
        :data-original-title="tooltip"
      >{{ isType }}</span>-->
      <span
        class="tooltip_marker has-tooltip"
      >{{ isType }}</span>

    </label>

  </div>
</template>

<script>
  /*import Vue from 'vue'
  import { mapMutations } from 'vuex'*/

  /*import { VTooltip } from 'v-tooltip'
  Vue.directive('tooltip', VTooltip)*/

  export default {
    props: ['options', 'tooltip'],
    name: "checkbox",
    methods: {
      /*...mapMutations({
        showLoader: 'loader/show',
        hideLoader: 'loader/hide'
      }),*/

      handleChange() {
        this.showLoader()

        setTimeout(() => {
          this.hideLoader()
        }, 2000)
      }
    },
    computed: {
      isType() {
        switch (this.options.type) {
          case 'warning':
            return '!'
            break
          case 'questions':
            return '?'
            break
          default:
            return '?'
            break
        }
      }
    }
  }
</script>

<style scoped lang="sass">
  .checkbox_custom
    margin-bottom: 30px
    height: auto
    min-height: 25px

    margin-top: 0
    font-size: 16px
    &:hover label:after
      background: #dededf
    [type="checkbox"]
      position: absolute
      top: 0
      left: 0
      z-index: 5
      margin: 0!important
      width: 12px
      height: 12px
      opacity: 0
      &:checked + label:before
        opacity: 1
        left: 20px
        background: #ffba00
      &:checked + label:after
        background: #ffe400
    label
      cursor: pointer
      color: #FFFFFF
      font-size: 18px
      display: inline-block
      margin: 0 10px 0 0
      line-height: 20px
      font-weight: 400
      position: relative
      height: auto
      min-height: 12px
      padding-left: 60px
      -webkit-transition: color 0.3s
      -moz-transition: color 0.3s
      transition: color 0.3s
      &:after
        background: #00a94f
        width: 40px
        position: absolute
        z-index: 2
        width: 40px
        content: ''
        top: 0
        left: 0
        border: none!important
        border-radius: 20px
        opacity: 1
        height: 20px
        -webkit-transition: left 0.3s, background 0.3s
        -moz-transition: left 0.3s, background 0.3s
        transition: left 0.3s, background 0.3s
      &:before
        background: #ffe400
        width: 20px
        content: ''
        top: 0
        left: 0
        border: none!important
        border-radius: 20px
        position: absolute
        left: 0
        z-index: 5
        display: inline-block
        line-height: 20px
        height: 20px
        width: 20px
        text-align: center
        font-size: 24px
        color: white
        cursor: pointer
        transition: left 0.3s, background 0.3s
        height: 20px

</style>
