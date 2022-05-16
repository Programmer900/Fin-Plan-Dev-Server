<template>
  <div class="accordion">
    <div class="accordion__title" @click="toggleItem">
      <slot name="title"></slot>
      <span class="icon icon-arr_simple_down" :class="classObject">

        <img alt="arrow" :src="arrow" />

      </span>
    </div>
    <transition name="accordion">
      <div v-show="show" class="content">
        <slot name="content"></slot>
      </div>
    </transition>
  </div>
</template>

<script>
  import {
    defineComponent
  } from 'vue';

  import arrow from '@/assets/icons/arrowup.svg';
  import arrowdown from '@/assets/icons/arrowdown.svg';

  export default defineComponent({
    name: "index",
    props: ['isOpenDefault'],
    data: function() {
      return {
        show: this.isOpenDefault,
        arrow,
        arrowdown,
      }
    },
    methods: {
      toggleItem: function() {
        this.show = !this.show
      }
    },
    computed: {
      classObject: function () {
        return this.show  ? 'active' : ''
      },
    },
  })
</script>

<style scoped lang="sass">
  .accordion
    cursor: pointer
    border-top: 1px solid #cdebdb
    border-bottom: 1px solid #cdebdb
    margin: 10px 0
    &:hover
      border-top: 1px solid #00a44c
      border-bottom: 1px solid #00a44c
      transition: all .4s ease
      .accordion__title
        color: #00a44c
        .icon
          color: #00a44c

    .content
      width: 100%

    .accordion__title
      height: 100%
      width: 100%
      position: relative
      padding: 15px 0
      font-size: 26px
      font-weight: 600
      color: #333
      cursor: pointer
      transition: all 0.3s
      display: flex
      justify-content: space-between
      align-items: center
      font-weight: 300
      .icon
        transition: all 0.5s
        font-size: 15px
        color: #ddd
        width: 40px
        &.active
          transform: rotate(180deg)

  .accordion-enter-active, .accordion-leave-active
    transition: all .3s ease
  .accordion-enter, .accordion-leave-to
    transform: translateX(10px)
    opacity: 0
  @media (max-width: 530px)
    .accordion__title
      font-size: 16px !important
    .accordion .accordion__title .icon
      width: 20px
  @media (max-width: 430px)
  .calculator-iis__table .content
    overflow-y: scroll
</style>
