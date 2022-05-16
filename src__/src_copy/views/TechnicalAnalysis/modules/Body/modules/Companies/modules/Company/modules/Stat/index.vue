<template>
  <div class="stat">
    <div class="stat__title">{{ title }}</div>
    <div class="stat__fields">
      <div v-for="(titleStat, titleIndex) in titles" :key="titleIndex" class="stat__field">
        <div class="stat__value">
          {{ activeStatValueFormatter(active, valueKeys[titleIndex]) }}
        </div>
        <div class="stat__subtitle">{{ titleStat }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { radarStore } from '@/store/pinia/radar';

export default defineComponent({
  name: 'TechnicalAnalysisPageCompanyStat',
  props: {
    title: {
      type: String,
      required: true,
      default: '',
    },
    titles: {
      type: Array,
      required: true,
      default: () => [],
    },
    valueKeys: {
      type: Array,
      required: true,
      default: () => [],
    },
    active: {
      type: Object,
      required: true,
      default: undefined,
    },
  },
  setup() {
    const radar = radarStore();

    return {
      activeStatValueFormatter: (active, activeValueKey) =>
        radar.activeStatValueFormatter(active, activeValueKey),
    };
  },
});
</script>

<style scoped lang="scss">
.stat {
  $blockname: &;

  position: relative;
  z-index: 0;

  &__title {
    padding-top: 16px;
    padding-bottom: 14px;
    color: #747474;
    font-weight: 500;
    font-size: 12px;
    transition: 0.3s all ease;
  }

  &__fields {
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
    padding: 20px 0 10px;
    overflow-y: auto;
    column-gap: 4%;
    border-bottom: 1px solid #e8e8e8;
    transition: 0.3s all ease;
  }

  &__value {
    padding-bottom: 3px;
    font-weight: 600;
    font-size: 14px;
  }

  &__subtitle {
    color: #747474;
    font-weight: 500;
    font-size: 10px;
    line-height: 150%;
  }

  &::after {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 0;
    background: #f7f7f7;
    transition: 0.3s all ease;
    content: '';
  }

  &:hover {
    #{$blockname} {
      &__title {
        transform: translateX(15px);
      }

      &__fields {
        transform: translateX(15px);
      }
    }
  }

  &:hover::after {
    height: 100%;
  }

  @include respond-to(1000) {
    border-bottom: none;
  }

  @include respond-to(1200) {
    &__title {
      font-size: 14px;
    }

    &__fields {
      grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
      column-gap: 12%;
    }

    &__subtitle {
      font-size: 11px;
    }

    &__value {
      font-size: 14px;
    }
  }

  @include respond-to(1600) {
    &__title {
      font-size: 18px;
    }

    &__subtitle {
      font-size: 12px;
    }

    &__value {
      font-size: 18px;
    }

    &:hover {
      #{$blockname} {
        &__title {
          transform: translateX(30px);
        }

        &__fields {
          transform: translateX(30px);
        }
      }
    }
  }
}
</style>
