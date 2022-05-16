<script lang="ts">
import Loader from '@/components/Loader/index.vue';

export default {
  name: 'RadarChartArea',
  components: {
    Loader,
  },
};
</script>

<script setup lang="ts">
// eslint-disable-next-line import/order
import HighCharts from 'highcharts';
// eslint-disable-next-line import/order
import { cloneDeep } from 'lodash';
import { radarChartArea } from '@/views/Radar/modules/Chart/Area/helpers';
import { radarStore } from '@/store/pinia/radar';
import { useError } from '@/use/useError';

const { _catch } = useError('Radar area chart');
const radar = radarStore();
const chart = radarChartArea();
const isInit = ref(false);

onMounted(() => {
  try {
    chart.init(HighCharts);
    isInit.value = true;
  } catch (e) {
    _catch(e, 'onMounted');
  }
});

watch(
  () => cloneDeep(radar.actives),
  () => {
    console.warn('Area: update selected actives');
  },
);
</script>

<template lang="pug">
.chart
  template(v-if='isInit')
    highcharts.chart__hc(:options='chart.getOptions.value')
  Loader(v-else)
</template>

<style scoped lang="scss">
.component {
}
</style>
