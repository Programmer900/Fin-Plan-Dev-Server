<template>
  <div class="chartStat">
    <div class="chartStat__field">
      <InputNumber v-if="isActive" v-model:value="valueModel" text-right="₽" />
      <span v-else>{{ value }}</span>
      <span v-if="rightText" class="chartStat__rightText">{{ rightText }}</span>
    </div>
    <div class="chartStat__title">{{ title }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import InputNumber from '@/components/Inputs/Number/index.vue';
import { useVModel } from '@/use/useVModel';

export default defineComponent({
  name: 'ChartPresetRadarPortfolioStat',
  components: { InputNumber },
  props: {
    title: {
      type: String,
      required: true,
    },
    value: {
      type: [String, Number],
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    rightText: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    return {
      valueModel: useVModel(props, 'value', true),
    };
  },
});
</script>

<style scoped lang="scss">
.chartStat {
  &__field {
    margin-bottom: 5px;

    span {
      font-weight: 600;
      font-size: 16px;
      line-height: 150%;
    }
  }

  &__title {
    color: #afafaf;
    font-weight: 500;
    font-size: 10px;
    line-height: 150%;
  }

  &__rightText {
    display: inline-block;
    padding-left: 10px;
  }

  @include respond-to($container-media--tablet) {
    &__field {
      span {
        font-size: 18px;
      }
    }

    &__title {
      font-size: 14px;
    }
  }
}
</style>
