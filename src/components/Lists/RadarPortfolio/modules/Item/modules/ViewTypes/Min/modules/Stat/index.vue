<template>
  <div class="stat">
    <div v-if="title" class="stat__title">{{ title }}</div>
    <div class="stat__fields">
      <div v-for="(title, titleIndex) in titles" :key="titleIndex" class="stat__field">
        <div class="stat__value">{{ activeStatValueFormatter(active, valueKeys[titleIndex]) }}</div>
        <div class="stat__subtitle">{{ title }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { radarStore } from '@/store/pinia/radar';

export default defineComponent({
  name: 'ListItemViewMinStatRadarPortfolio',
  props: {
    title: {
      type: String,
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
  white-space: nowrap !important;

  &__title {
    padding-bottom: 10px;
    color: #747474;
    font-weight: 500;
    font-size: 12px;
    line-height: 150%;
  }

  &__fields {
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
    padding: 0 0 20px;
    column-gap: 4%;
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

  @include respond-to($container-media--tablet) {
    &__fields {
      grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    }

    &__title {
      font-size: 16px;
    }

    &__subtitle {
      font-size: 12px;
    }

    &__value {
      font-size: 14px;
    }
  }
}
</style>
