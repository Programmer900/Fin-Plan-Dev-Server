<template>
  <div class="strategies">
    <div class="strategies__text">
      Вы можете выбрать готовую стратегию или открыть расширенный поиск и настроить свою стратегию
    </div>
    <Swiper
      class="strategies__swiper"
      :free-mode="true"
      :navigation="true"
      :slides-per-view="'auto'"
      :space-between="50"
    >
      <SwiperSlide v-for="(preset, presetIndex) in getStrategiesList" :key="presetIndex">
        <div class="strategies__item" @click="onClickPreset(preset.NAME)">
          <div class="strategies__itemImg">
            <img alt="Название стратегии" :src="strategyPlaceholder" />
          </div>
          <div class="strategies__itemText">{{ preset.NAME }}</div>
        </div>
      </SwiperSlide>
    </Swiper>
    <!--    <div class="strategies__text">-->
    <!--      Краткое описание стратегии в двух/трёх предложениях, возможно со ссылкой на статью с подробным-->
    <!--      описанием-->
    <!--    </div>-->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import strategyPlaceholder from '@/assets/img/strategy-placeholder.svg';
import 'swiper/components/navigation/navigation.scss';
import SwiperCore, { Navigation } from 'swiper/core';
import { radarStore } from '@/store/pinia/radar';
import { useStringUtils } from '@/use/root/utils/string';

SwiperCore.use([Navigation]);

export default defineComponent({
  name: 'PageRadarReadyStrategies',
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const radar = radarStore();
    const { getQueryObject } = useStringUtils();

    const onClickPreset = (presetName: string) => {
      radar.changePreset(presetName);
    };

    return {
      onClickPreset,
      strategyPlaceholder,
      getStrategiesList: computed(() => radar.getCurrentPresetList()),
    };
  },
});
</script>

<style scoped lang="scss">
.strategies {
  &__text {
    @include wrap-pad();

    margin-top: 30px;
    color: #afafaf;
    font-weight: 500;
    font-size: 10px;
    line-height: 150%;
  }

  &__swiper {
    margin-top: 30px;
    margin-bottom: 10px;
  }

  &__item {
    display: block;
    text-decoration: none;
  }

  &__itemImg {
    $_size: 150px;

    width: $_size;
    height: $_size;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      object-fit: cover;
    }
  }

  &__itemText {
    margin-top: 15px;
    color: #000;
    font-weight: 500;
    font-size: 12px;
    line-height: 150%;
    text-align: center;
  }

  ::v-deep(.swiper-slide) {
    &:first-child {
      @include wrap-mar--left();
    }
  }

  ::v-deep(.swiper-container) {
    padding: 50px 0;
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

  ::v-deep(.swiper-slide) {
    //height: 100px;
  }

  @include respond-to($container-media--tablet) {
    &__text {
      font-size: 15px;
    }

    &__swiper {
      margin-top: 50px;
      //margin-bottom: 70px;
    }

    &__itemText {
      font-size: 20px;
    }
  }

  @include respond-to(900) {
    ::v-deep.swiper-button {
      &-prev {
        right: 180px;
      }

      &-next {
        right: 100px;
      }
    }
  }

  @include respond-to(1200) {
    &__text {
      font-size: 20px;
    }

    &__item {
      display: flex;
      align-items: center;
    }

    &__swiper {
      margin-top: 70px;
      //margin-bottom: 140px;
    }

    &__itemText {
      margin: 0 40px 0 30px;
      font-size: 24px;
      text-align: left;
    }
  }

  @include respond-to($container-media--desktop) {
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
