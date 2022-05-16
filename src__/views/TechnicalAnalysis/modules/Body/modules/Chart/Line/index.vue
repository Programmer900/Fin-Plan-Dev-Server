<script lang="ts">
export default defineComponent({
  name: 'TechAnLineChart',
});
</script>

<script setup lang="ts">
import DragPanes from 'highcharts/modules/drag-panes.js';
import AnnotationsAdvanced from 'highcharts/modules/annotations-advanced.js';
import PriceIndicator from 'highcharts/modules/price-indicator.js';
import FullScreen from 'highcharts/modules/full-screen.js';
import StockTools from 'highcharts/modules/stock-tools.js';
import StockCharts from 'highcharts/modules/stock';
import HighCharts from 'highcharts';
import { useError } from '@/use/useError';
import { lineChart } from '@/views/TechnicalAnalysis/modules/Body/modules/Chart/settings/line';
import { useTechAnalysisStore } from '@/store/pinia/technicalAnalysis';

const techStore = useTechAnalysisStore();
const { _catch } = useError('TechAnLineChart');
const chart = lineChart();

const isInit = ref(false);

const init = async () => {
  try {
    if (isInit.value) return;

    DragPanes(HighCharts);
    AnnotationsAdvanced(HighCharts);
    PriceIndicator(HighCharts);
    FullScreen(HighCharts);
    StockTools(HighCharts);
    StockCharts(HighCharts);

    await chart.init(HighCharts);
    // console.log(chart.getSettings);
    isInit.value = true;
  } catch (e) {
    _catch(e, 'init');
  }
};

onMounted(async () => {
  await init();
});

watch(
  () => techStore.selectedChartMode,
  () => {
    if (techStore.selectedChartMode === 'line') {
      chart.initSeries();
      chart.initCategories();
    }
  },
);
</script>

<template>
  <div class="chart">
    <template v-if="isInit">
      <highcharts
        class="chart__hc"
        :constructor-type="'stockChart'"
        :options="chart.getSettings.value"
      />
    </template>
  </div>
</template>

<style scoped lang="scss">
.chart {
  $block: &;

  &__hc {
    width: 100%;
    padding-top: 80px;
    padding-bottom: 80px;
    padding-left: 60px;
    background: #fff;
  }

  &--dark-mode {
    #{$block} {
      &__graph {
        background: #000;
      }
    }
  }
}
</style>
