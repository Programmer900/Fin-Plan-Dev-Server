<template>
  <div class="select">
    <div class="select__active">
      {{ options[active_el] }}
      <div class="icon icon-arr_simple_down"></div>
    </div>
    <ul class="select__list">
      <li :key="i" v-for="(title,i) in options" @click="$emit('onChange'), $emit('shouldShowTitle', title)">
        <a
           @click.prevent="onActive(i)"
           :class="{ active : active_el == i }
        ">{{ title }}</a></li>
    </ul>
  </div>
</template>

<script>
  export default defineComponent({
    props: ['options'],
    data() {
      return {
        active_el: 0
      }
    },
    methods: {
      onActive(el) {
        this.active_el = el
      }
    }
  })
</script>

<style scoped lang="sass">
  .select
    position: relative

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
    &:hover
      .select__active .icon
        transform: rotate(180deg)
      .select__list
        position: absolute
        opacity: 1
        visibility: visible
        li
          margin-bottom: 0
          a
            &.active
              background-color: green
              color: white
</style>
