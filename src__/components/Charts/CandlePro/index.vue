<template>
  <template v-if="isInit">
    <VueHighchart
      type="stockChart"
      :options="{
        ...chartOptions,
      }"
      :redrawOnUpdate="true"
      :oneToOneUpdate="false"
      :animateOnUpdate="true"
    />
  </template>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import StockCharts from 'highcharts/modules/stock';
import HighCharts from 'highcharts';
import { DynamicObject } from '@/interfaces';
import { getChartOptions } from '@/components/Charts/CandlePro/utils/chartOptions';

export default defineComponent({
  name: 'ChartCandlePro',
  props: {
    values: {
      type: Array,
      required: true,
    },
    categories: {
      type: Array,
      required: true,
    },
    height: {
      type: String,
      default: '600px',
    },
  },
  setup(props) {
    const isInit = ref<boolean>(false);
    const chartOptions = ref<DynamicObject | null>(null);

    const init = () => {
      StockCharts(HighCharts);
      chartOptions.value = getChartOptions(props.values, props.categories, props.height);
      isInit.value = true;
    };

    onMounted(() => {
      init();
    });

    return {
      isInit,
      chartOptions,
    };
  },
});
</script>

<style scoped lang="scss"></style>
