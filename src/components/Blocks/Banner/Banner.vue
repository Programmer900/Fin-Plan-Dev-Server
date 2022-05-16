<template>
  <div
    ref="banner"
    class="banner"
    :class="{shadow: info.shadow, banner_half: info.direction}"
    :style="{
      backgroundImage: 'url( ' + img + ' )',
      backgroundColor: info.bg,
      backgroundSize: info.size || 'contain',
      display: info.direction ? 'flex' : 'block',
      flexDirection: info.direction || 'column',
      alignItems: info.align || 'center',
  }"
  >
    <div
      class="banner-info"
      :style="{
        width: info.direction ? '50%' : '100%',
      }"
    >
      <p
        class="title"
        :style="{
          color: info.accentColor || info.textColor || '#ffffff',
        }"
      >{{ info.text }}</p>
      <p
        class="subtitle"
        :style="{
            color: info.subtitleColor || info.textColor || '#000',
          }"
      >
      </p>
    </div>
    <router-link :to="info.buttonUrl">
      <button
        class="button"
        :style="{
          backgroundColor: info.accentColor || info.textColor || '#fee333',
          borderColor: info.accentColor || info.textColor || '#fee333',
          color: info.textColor || '#000',
        }"

      >{{ info.buttonText }}</button>
    </router-link>
  </div>
</template>

<script>
  import {
    defineComponent
  } from 'vue';

  import img from './img/img3_1_.jpg'

  export default defineComponent({
    props: ['info'],
    name: "Banner",

    setup({ info }) {

      return {
        info,
        img
      }
    }

  })
</script>

<style scoped lang="sass">
  .banner
    background-size: cover
    margin-bottom: 30px
    padding: 30px 27px 20px
    margin-top: 0px
    background-size: contain
    background-position: 105%
    background-repeat: no-repeat
    position: relative
    max-width: 850px
    min-height: 220px
    width: 100%

    &.shadow
      &:before
        content: ''
        position: absolute
        left: 0
        right: 0
        width: 100%
        height: 100%
        top: 0
        bottom: 0
        background-color: rgba(0,0,0,0.4)

    .title
      margin-bottom: 25px
      margin-top: 20px
      max-width: 100%
      line-height: 1
      font-size: 28px
      font-weight: 700
      color: #fff
      position: relative
    .subtitle
      position: relative
    .button
      border-color: #FEE333
      color: #000000
      border-radius: 30px
      background: #fe0b5a
      height: 60px
      min-width: 225px
      font-size: 24px
    a
      width: 50%
      text-align: right
      text-decoration: none

  @media (max-width: 950px)
    .banner
      .title
        font-size: 30px
      .button
        height: 40px
        min-width: 165px
        font-size: 18px
  @media (max-width: 768px)
    .banner
      background-size: 100% 100%
    .banner-info
      width: 100% !important
  @media (max-width: 650px)
    .banner
      &.banner_half
        flex-direction: column !important
        a, .title
          width: 100% !important
  @media (max-width: 550px)
    .banner
      background-position: 100%
</style>

