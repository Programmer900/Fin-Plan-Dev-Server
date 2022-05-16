<template>
  <div class="load_overlay" style="opacity: 1;">
    <p>
      <span class="radar_animate">
        <span class="radar_round_inner"></span>
        <span class="radar_round_track"></span>
        <span class="radar_animate_element blue"></span>
        <span class="radar_animate_element green"></span>
        <span class="radar_animate_element orange"></span>
      </span>
      <span class="radar_txt">Загрузка<span class="dot">.</span><span class="dot">.</span><span class="dot">.</span></span>
    </p>
  </div>
</template>

<script>
  export default {
    name: "Loader",
    props: ['status'],
    data() {
      return {
        visible: false
      }
    },
    mounted() {
      if(this.status) {
        document.querySelector('.menuFloat').classList.add('hide')
      }
    },
    destroyed() {
      document.querySelector('.menuFloat').classList.remove('hide')
    }
  }
</script>

<style scoped lang="sass">
  .load_overlay
    /*display: none*/
    position: fixed
    top: 0
    left: 0
    z-index: 100
    background: rgba(0, 0, 0, 0.8)
    width: 100%
    height: 100%
    text-align: center
    transition: all 0.3s
    p
      position: absolute
      top: 50%
      left: 0
      margin-top: -25px
      width: 100%
      height: 50px
      line-height: 50px
      font-size: 40px
      color: white
      .radar_txt
        display: inline-block
        vertical-align: middle
      .radar_animate
        display: inline-block
        position: relative
        border-radius: 50%
        background: #1c9f44
        overflow: hidden
        margin-right: 30px
        width: 100px
        height: 100px
        vertical-align: middle
        font-size: 0
        text-align: center
        .radar_animate_element
          display: inline-block
          position: absolute
          z-index: 15
          border-radius: 50%
          -webkit-animation: radarRound 2s infinite linear
          -moz-animation: radarRound 2s infinite linear
          animation: radarRound 2s infinite linear
          &.blue
            top: 25px
            left: 15px
            background: #02b5ef
            width: 17px
            height: 17px
            -webkit-animation-delay: 1.7s
            -moz-animation-delay: 1.7s
            animation-delay: 1.7s
          &.green
            top: 62px
            left: 63px
            background: #60b440
            width: 10px
            height: 10px
            -webkit-animation-delay: 2.7s
            -moz-animation-delay: 2.7s
            animation-delay: 2.7s
            display: inline-block
            position: absolute
            z-index: 15
            border-radius: 50%
            -webkit-animation: radarRound 2s infinite linear
            -moz-animation: radarRound 2s infinite linear
            animation: radarRound 2s infinite linear
          &.orange
            color: #ffb400
            top: 78px
            left: 39px
            background: #eb5524
            width: 10px
            height: 10px
            -webkit-animation-delay: 1s
            -moz-animation-delay: 1s
            animation-delay: 1s
        .radar_round_track
          display: inline-block
          position: absolute
          top: 0
          left: 0
          z-index: 10
          background: rgba(166,189,73,0.5)
          width: 50px
          height: 50px
          -webkit-transform-origin: 50px 50px
          transform-origin: 50px 50px
          -webkit-animation: radarTrack 2s infinite linear
          -moz-animation: radarTrack 2s infinite linear
          animation: radarTrack 2s infinite linear
          &:before
            content: ''
            display: inline-block
            position: absolute
            right: -2px
            bottom: 0
            border-radius: 2px
            background: #d9e5a8
            width: 4px
            height: 40px
          &:after
            right: -4px
            bottom: -4px
            border-radius: 50%
            background: #d9e5a8
            width: 8px
            height: 8px
            content: ''
            display: inline-block
            position: absolute

        .radar_round_inner
          display: inline-block
          position: absolute
          top: 16px
          left: 16px
          z-index: 5
          border-radius: 50%
          background: #1a6232
          width: 68px
          height: 68px
          &:after
            content: ''
            display: inline-block
            position: absolute
            border-radius: 50%
            top: 26px
            left: 26px
            z-index: 5
            background: #1a6232
            width: 16px
            height: 16px
          &:before
            content: ''
            display: inline-block
            position: absolute
            border-radius: 50%
            top: 19px
            left: 19px
            z-index: 5
            background: #1c9f44
            width: 30px
            height: 30px


@keyframes radarRound
  from
    opacity: 0
  5%
    opacity: 1
  85%
    opacity: 0
  to
    opacity: 0


@-moz-keyframes radarRound
  from
    opacity: 0
  5%
    opacity: 1
  85%
    opacity: 0
  to
    opacity: 0

@-webkit-keyframes radarRound
  from
    opacity: 0
  5%
    opacity: 1
  85%
    opacity: 0
  to
    opacity: 0

@keyframes radarTrack
  from
    transform: rotate(0deg)
  to
    transform: rotate(360deg)

@-moz-keyframes radarTrack
  from
    transform: rotate(0deg)
  to
    transform: rotate(360deg)

@-webkit-keyframes radarTrack
  from
    transform: rotate(0deg)
  to
    transform: rotate(360deg)

@keyframes fadeIn
  0%
    opacity: 0
  100%
    opacity: 1

.load_overlay
  span.dot:nth-child(1)
    opacity: 0
    animation: fadeIn 500ms infinite
  span.dot:nth-child(2)
    opacity: 0
    animation: fadeIn 500ms infinite
    animation-delay: 500ms
  span.dot:nth-child(3)
    opacity: 0
    animation: fadeIn 500ms infinite
    animation-delay: 1000ms
</style>
