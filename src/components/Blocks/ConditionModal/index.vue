<template>
  <div class="modal opened" ref="modal">

    <div class="before" @click="close"></div>
    <div
      class="modal__inner"
      :style="{ width: width }"
    ><button class="modal__close icon icon-close" @click="close">
      <img alt="icon" :src="iconClosest" />
    </button>

      <div class="modal__image"><slot name="image"></slot></div>

      <div class="modal__body" :style="{ backgroundColor: bgColor }">
        <div class="back" v-if="isBack">
          <slot name="back"></slot>
        </div>
        <p class="modal__title"
           :style="{ color: color, textAlign: positionTitle, borderBottom: `1px solid ${separatorColor}` }"
        >
          <slot name="title"></slot>
        </p>
        <div :style="{ color: color }">
          <!--<slot name="content-text" v-html></slot>-->
          <slot name="content-text"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  //import LogoMain from '/components/common/Logo/LogoMain.vue'
  import iconClosest from '@/assets/icons/techAn/close.svg';

  export default {
    name: 'ConditionModal',
    //components: { LogoMain },
    components: {
      iconClosest
    },
    props: {
      separatorColor: {
        type: String,
        default: '#E2E2E2',
      },
      show: {
        type: Boolean,
        default: false,
      },
      color: {
        type: String,
        default: '#797979',
      },
      bgColor: {
        type: String,
        default: '#fff',
      },
      positionTitle: {
        type: String,
        default: 'left'
      },
      width: {
        type: String,
        default: '1000px',
      },
      isBack: {
        type: Boolean,
        default: false,
      }
    },
    /*methods: {
      close() {
        this.$emit('close')
      },
    },*/



    setup(props, { emit }) {
      const close = () => emit('close')

      return {
        iconClosest,
        close
      }
    }
  }
</script>

<style scoped lang="sass">
  .modal
    align-items: flex-start
    position: fixed
    top: 0
    left: 0
    z-index: 100
    overflow: auto
    padding: 50px 40px
    width: 100vw
    height: 100vh
    opacity: 1
    transition: opacity .4s
    li p
      margin-top: 0

    .before
      position: fixed
      top: 0
      left: 0
      z-index: 5
      background: #000
      opacity: .5
      width: 100vw
      height: 100vh

    &__inner
      position: relative
      z-index: 10
      background: #fff
      margin: auto
      width: 450px
      max-width: 95%

    &__close
      display: inline-flex
      justify-content: center
      align-items: center
      position: absolute
      top: -40px
      right: 0
      z-index: 10
      border: none
      background: transparent
      width: 40px
      height: 40px
      font-size: 20px
      color: #fff
      cursor: pointer
      transform: translateX(40px)
      transition: .4s

      &:hover
        color: orange

      &Outer
        height: 0
      img
        transform: rotate(45deg)
        transition: all .4s ease-in-out
        &:hover
          transform: rotate(135deg)
    &__video
      position: relative
      overflow: hidden
      font-size: 0
      width: 100%
      max-height: 100vh

      iframe
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%

    &__image
      overflow: hidden
      font-size: 0

      img
        object-fit: cover
        width: 100%
        height: 100%
        max-height: 50vh

    &__body
      padding: 30px 50px
      color: #2e2e2e

      .more
        margin-top: 40px

    &__title
      border-bottom: 1px solid #2e2e2e
      margin-top: 0
      padding-bottom: 20px
      font-size: 24px
      font-weight: 500
      color: #000
  @media (max-width: 768px)
    .modal
      padding: 25px 15px 70px
      &__close
        top: -30px
        right: 10px
      &__body
        padding: 20px 15px
  @media (max-width: 479px)
    .modal
      &__close
        top: -25px
        right: 15px

.modals-enter-active, .modals-leave-active
  transition: opacity .4s

.modals-enter, .modals-leave-to
  opacity: 0
</style>
