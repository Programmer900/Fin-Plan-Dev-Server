<template>
  <div class="slider">
    <div class="slider__inner">
      <Swiper :free-mode="true" :navigation="true" :slides-per-view="'auto'" :space-between="20">
        <SwiperSlide v-for="(item, index) in items" :key="index" :navigation="true">
          <a class="slider__sliderInner" :href="item.link">
            <img :alt="item.title" :src="item.img" />
            <h3>{{ item.title }}</h3>
          </a>
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';

import SwiperCore, { Navigation } from 'swiper/core';

SwiperCore.use([Navigation]);

export interface IHelpSliderItem {
  title: string;
  link: string;
  img: string;
}

export default defineComponent({
  name: 'HelpSlider',
  props: {
    items: {
      type: Array as () => IHelpSliderItem[],
      required: true,
    },
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {},
});
</script>

<style scoped lang="scss">
.slider {
  $blockname: &;

  padding-top: 30px;

  &__sliderInner {
    $_border-radius: 10px;
    $_trans: all 0.15s ease;

    position: relative;
    display: block;
    width: 100%;
    height: 100%;

    img {
      position: relative;
      z-index: -1;
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: $_border-radius;
      transition: $_trans;
    }

    h3 {
      position: absolute;
      bottom: 0;
      left: 20px;
      color: #fff;
      font-size: 14px;
      text-transform: uppercase;
    }

    &::before {
      position: absolute;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.2);
      border-radius: $_border-radius;
      transition: $_trans;
      content: '';
    }
  }

  ::v-deep .swiper-container {
    padding-top: 30px;
    padding-bottom: 100px;
  }

  ::v-deep .swiper-slide {
    width: 168px;
    height: 230px;
    cursor: pointer;

    &:first-child {
      @include wrap-mar--left();
    }

    &:last-child {
      @include wrap-mar--right();
    }

    &:hover {
      #{$blockname} {
        &__sliderInner {
          &::before {
            transform: scale(1.1);
          }

          img {
            transform: scale(1.1);
          }
        }
      }
    }
  }

  ::v-deep .swiper-button {
    $_top: 86%;

    &-prev::after,
    &-next::after {
      $_size: 40px;

      width: $_size;
      height: $_size;
      background: url('@/assets/icons/slider-arrow.svg') no-repeat center;
      content: '';
    }

    &-prev {
      top: $_top;
      right: 70px;
      left: unset;
    }

    &-next {
      top: $_top;
      right: $container-pad-side--mobile;
      transform: rotate(180deg);
    }
  }

  @include respond-to(900) {
    padding-top: 0;

    ::v-deep .swiper-slide {
      &:first-child {
        margin-left: 20px;
      }

      &:last-child {
        margin-right: 0;
      }
    }

    ::v-deep .swiper-button {
      &-prev {
        right: 180px;
      }

      &-next {
        right: 100px;
      }
    }
  }

  @include respond-to($container-media--desktop) {
    ::v-deep .swiper-container {
      padding-bottom: 70px;
    }

    ::v-deep .swiper-slide {
      width: 280px;
      height: 380px;

      &:last-child {
        margin-right: $container-pad-side--desktop / 2;
      }
    }

    ::v-deep .swiper-button {
      $_top: 92%;

      &-prev {
        top: $_top;
        right: 260px;
      }

      &-next {
        top: $_top;
        right: 200px;
      }
    }
  }
}
</style>
