<script lang="ts">
import Loader from '@/components/Loader/index.vue';

export default defineComponent({
  name: 'RadarChartDonut',
  components: {
    Loader,
  },
});
</script>

<script setup lang="ts">
import { helpersDonut } from '@/views/Radar/modules/Chart/Donut/helpers';
import { useError } from '@/use/useError';
// eslint-disable-next-line import/order
import HighCharts from 'highcharts';
// eslint-disable-next-line import/order
import { cloneDeep } from 'lodash';
import { radarStore } from '@/store/pinia/radar';

const { _catch } = useError('Donut chart');

const radar = radarStore();
const isInit = ref(false);
const donut = helpersDonut();

onMounted(() => {
  try {
    donut.init(HighCharts);
    isInit.value = true;
  } catch (e) {
    _catch(e, 'onMounted');
  }
});

watch(
  () => cloneDeep(radar.actives),
  () => {
    console.warn('Donut: update selected actives');
  },
);
</script>

<template lang="pug">
.chart
  template(v-if='isInit')
    highcharts.chart__hc(:options='donut.getOptions.value')
  Loader(v-else)
</template>

<style scoped lang="scss">
.chart {
}
</style>
