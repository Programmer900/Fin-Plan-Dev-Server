<template>
  <div class="valuationItem">
    <div class="valuationItem__title">{{ title }}</div>
    <Swiper class="valuationItem__swiper" :free-mode="true" :slidesPerView="'auto'">
      <SwiperSlide v-for="(filter, index) in Object.values(stateFilters)" :key="index">
        <div
          :class="[
            'valuationItem__filter',
            { 'valuationItem__filter--is-active': filter.isActive },
          ]"
        >
          {{ filter.text }}
        </div>
      </SwiperSlide>
    </Swiper>
    <div class="valuationItem__activesList">
      <div
        :class="[
          'valuationItem__active',
          { 'valuationItem__active--error': active.type === 'error' },
          { 'valuationItem__active--success': active.type === 'success' },
          { 'valuationItem__active--warning': active.type === 'warning' },
        ]"
        v-for="(active, index) in activesItems"
        :key="index"
      >
        <div class="valuationItem__activeIcon"></div>
        <div class="summoryItem__activeWrap">
          <div class="valuationItem__activeTitle">{{ active.title }}</div>
          <div class="valuationItem__activeSubtitle">{{ active.subtitle }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';

export default defineComponent({
  name: 'PagePortfolioAssetValuationItem',
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  setup() {
    const stateFilters = reactive({
      all: {
        text: 'Все',
        isActive: true,
      },
      problematic: {
        text: 'Проблемные',
        isActive: false,
      },
      atRisk: {
        text: 'В зоне риска',
        isActive: false,
      },
      withoutRisk: {
        text: 'Без риска',
        isActive: false,
      },
    });

    const activesItems = ref<any[]>([
      {
        title: 'Название облигации',
        subtitle: 'Низкая финансовая устойчивость бизнеса (доля СК = 20%)',
        type: 'error',
      },
      {
        title: 'Название облигации',
        subtitle: 'Низкая финансовая устойчивость бизнеса (доля СК = 20%)',
        type: 'error',
      },
      {
        title: 'Название облигации',
        subtitle: 'Низкая финансовая устойчивость бизнеса (доля СК = 20%)',
        type: 'success',
      },
      {
        title: 'Название облигации',
        subtitle: 'Низкая финансовая устойчивость бизнеса (доля СК = 20%)',
        type: 'error',
      },
      {
        title: 'Название облигации',
        subtitle: 'Низкая финансовая устойчивость бизнеса (доля СК = 20%)',
        type: 'warning',
      },
      {
        title: 'Название облигации',
        subtitle: 'Низкая финансовая устойчивость бизнеса (доля СК = 20%)',
        type: 'error',
      },
      {
        title: 'Название облигации',
        subtitle: 'Низкая финансовая устойчивость бизнеса (доля СК = 20%)',
        type: 'warning',
      },
    ]);

    return {
      stateFilters,
      activesItems,
    };
  },
});
</script>

<style scoped lang="scss">
.valuationItem {
  ::v-deep .swiper-slide {
    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }

    &:not(:last-child) {
      margin-right: 0;
    }
  }

  &__swiper {
    margin-bottom: 20px;
  }

  &__title {
    margin-bottom: 15px;
    font-weight: 600;
    font-size: 12px;
    line-height: 150%;
  }

  &__filter {
    padding: 5px 20px;
    font-weight: 600;
    font-size: 12px;
    line-height: 150%;

    &:hover {
      color: #fec006;
    }

    &--is-active {
      background: #fff;
      border-radius: 15px;

      &:hover {
        color: #000;
        background: #fec006;
      }
    }
  }

  &__active {
    display: flex;
    margin-bottom: 20px;
  }

  &__activeIcon {
    $_size: 10px;

    position: relative;
    top: 3px;
    width: $_size;
    height: $_size;
    margin-right: 7px;
    border-radius: 100%;
  }

  &__activeTitle {
    margin-bottom: 5px;
    font-weight: 600;
    font-size: 12px;
    line-height: 150%;
  }

  &__activeSubtitle {
    color: #797979;
    font-weight: 500;
    font-size: 12px;
    line-height: 150%;
  }

  &__active--error &__activeIcon {
    background: #ce0e07;
  }

  &__active--error &__activeTitle {
    color: #ce0e07;
  }

  &__active--success &__activeIcon {
    background: #2a8634;
  }

  &__active--success &__activeTitle {
    color: #2a8634;
  }

  &__active--warning &__activeIcon {
    background: #fec006;
  }

  &__active--warning &__activeTitle {
    color: #fec006;
  }

  @include respond-to(900) {
    &__title {
      margin-bottom: 30px;
      font-size: 20px;
    }

    &__filter {
      padding: 15px 40px;
      font-size: 18px;
      border-radius: 30px;
    }

    &__swiper {
      margin-bottom: 70px;
    }

    &__active {
      margin-bottom: 55px;
    }

    &__activeTitle {
      margin-bottom: 13px;
      font-size: 20px;
    }

    &__activeSubtitle {
      font-size: 16px;
    }

    &__activeIcon {
      $_size: 24px;

      width: $_size;
      height: $_size;
      margin-right: 15px;
    }
  }

  @include respond-to(1200) {
    &__activesList {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      column-gap: 4%;
    }
  }
}
</style>
