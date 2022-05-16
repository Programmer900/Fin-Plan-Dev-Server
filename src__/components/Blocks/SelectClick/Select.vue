<template>
  <div
    class="select"
  >
    <div class="select__active" @click="onShowList" :class="show ? 'show' : '' ">
      {{ options[active_el] }}
      <div class="icon icon-arr_simple_down"></div>
    </div>
    <transition name="fade">
      <ul class="select__list" v-if="show" :class="show ? 'show' : '' ">
        <li :key="i" v-for="(title,i) in options" @click="$emit('shouldShowTitle', title)">
          <a
             @click.prevent="onActive(i)"
             :class="{ active : active_el == i }
          ">{{ title }}</a></li>
      </ul>
    </transition>
    <span
      v-if="tooltip"
      class="tooltip_marker has-tooltip"
    >{{ isType }}</span>
  </div>
</template>

<script>
  import {
    defineComponent
  } from 'vue';

  export default defineComponent({
    props: ['options', 'tooltipType'],
    data() {
      return {
        active_el: 0,
        show: false
      }
    },
    methods: {
      onActive(el) {
        this.active_el = el
        this.show = false
      },
      onShowList() {
        this.show = !this.show
      },
    },
    computed: {
      isType() {
        switch (this.tooltipType) {
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
  })
</script>

<style scoped lang="sass">

.select
  position: relative
  &__inline
    div.select
      display: inline-block
  &__active
    position: relative
    z-index: 5
    white-space: nowrap
    font-size: 16px
    cursor: pointer
    color: orange

    .icon
      top: -2px
      margin-left: 5px
      font-size: 8px
      transition: .3s

  &__list
    position: absolute
    top: 100%
    left: -20px
    z-index: 10
    opacity: 0
    visibility: hidden
    margin: 0
    padding: 0
    list-style: none
    transition: .3s
    background: white
    width: 160px

    li
      margin-bottom: 5px
      padding: 0
      font-size: 16px
      font-weight: 400
      a
        text-decoration: none
        color: black
        padding: 10px
        font-size: 12px
        cursor: pointer
        display: block
        width: 100%
        &:hover
          background-color: #008940
          color: #FFFFFF
      &:last-child
        margin: 0

      &::before
        display: none


  .select__active.show .icon
    transform: rotate(180deg)
  .select__list.show
    position: absolute
    opacity: 1
    visibility: visible
    li
      margin-bottom: 0
      a
        &.active
          background-color: green
          color: white

.events_datepicker_container__fields .form_element.__inline > div
  display: inline-block

.fade-enter-active, .fade-leave-active
  transition: opacity .2s

.fade-enter, .fade-leave-active
  opacity: 0
</style>
