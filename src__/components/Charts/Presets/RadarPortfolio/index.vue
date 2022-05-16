<template>
  <div :class="['chartPreset', `chartPreset--${chartType}`]">
    <div class="chartPreset__container">
      <div v-if="chartType !== 'portfolio'" class="chartPreset__stats">
        <slot name="stats" />
      </div>
      <div class="chartPreset__grid">
        <RadarChartDonut v-if="chartType !== 'map'" />
        <div class="chartPreset__wrap">
          <RadarChartArea />
          <div v-if="chartType !== 'portfolio'" class="chartPreset__options">
            <InputCheckbox
              v-if="chartType !== 'map'"
              v-model:selected="isIIS"
              class="radarBonds__checkbox"
              :is-left-checkmark="true"
              title="Учитывать использование ИИС"
            />
            <InputCheckbox
              v-if="chartType !== 'map'"
              v-model:selected="isFutureBonds"
              class="radarBonds__checkbox"
              :is-left-checkmark="true"
              title="Будущие дивиденды"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import RadarChartDonut from '@/views/Radar/modules/Chart/Donut/index.vue';
import ChartPlaceholder from '@/components/Charts/Placeholder/index.vue';
import InputCheckbox from '@/components/Inputs/Checkbox/index.vue';
import RadarChartArea from '@/views/Radar/modules/Chart/Area/index.vue';

export default defineComponent({
  name: 'ChartPresetRadarPortfolio',
  components: {
    RadarChartArea,
    InputCheckbox,
    ChartPlaceholder,
    RadarChartDonut,
  },
  props: {
    chartType: {
      type: String,
      default: '',
    },
  },
  setup() {
    const stateOptions = reactive({
      isIIS: true,
      isFutureBonds: true,
    });

    return {
      ...toRefs(stateOptions),
    };
  },
});
</script>

<style scoped lang="scss">
.chartPreset {
  $blockname: &;

  padding-bottom: 40px;

  &__container {
    @include wrap-pad();
  }

  &__wrap {
    margin-top: 30px;
  }

  &__options {
    display: grid;
    grid-template-columns: 1fr;
    margin-top: 20px;
    row-gap: 14px;
  }

  &__stats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin-bottom: 40px;
    padding: 20px;
    background: #f7f7f7;
    row-gap: 35px;
  }

  @include respond-to(1900) {
    &__stats {
      padding: 60px 80px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__wrap {
      margin-top: 0;
    }

    &__grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    }

    &__options {
      grid-auto-flow: column;
      grid-template-columns: repeat(auto-fill, 1fr);
      margin-top: 35px;
      row-gap: 0;
    }
  }

  &--map {
    #{$blockname} {
      &__grid {
        display: block !important;
      }
    }
  }
}
</style>
