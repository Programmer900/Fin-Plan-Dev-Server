<script lang="ts">
import ListsWrapChartSwitcher from '@/views/Lists/modules/Pages/All/modules/ChartSwitcher/index.vue';
import { useChartTools } from '@/views/Lists/modules/Pages/All/modules/Charts/UpDown/helpers/chartTools';
import Loader from '@/components/Loader/index.vue';
import { useIndustriesStore } from '@/store/pinia/industries';

export default defineComponent({
  name: 'ListsChartSwitch',
  components: { Loader, ListsWrapChartSwitcher },
  setup() {
    const chartTools = useChartTools();
    const indStore = useIndustriesStore();

    const isInit = ref(false);
    const selectedId = ref(1);
    const selectedPeriod = ref<'quart' | 'year'>('quart');

    const onChangeChart = (selected = -1): void => {
      if (selected !== -1) {
        selectedId.value = selected;
      }
      if (selectedId.value === 1) {
        if (selectedPeriod.value === 'quart') {
          chartTools.updateSeries([{ data: indStore.getCapGrowthLastQuart }]);
        } else if (selectedPeriod.value === 'year') {
          chartTools.updateSeries([{ data: indStore.getCapGrowthBeginYear }]);
        }
      } else if (selectedId.value === 2) {
        chartTools.updateSeries([{ data: indStore.getPe }]);
      }
    };

    const onClickPeriod = (period: 'quart' | 'year') => {
      selectedPeriod.value = period;
      onChangeChart();
    };

    const init = async () => {
      await chartTools.init(
        [
          {
            name: '',
            data: indStore.getCapGrowthLastQuart,
          },
        ],
        indStore.getIndNames,
      );
      isInit.value = true;
    };

    onMounted(async () => {
      await init();
    });

    return {
      getChartUpDownOptions: chartTools.getChartOptions,
      onChangeChart,
      onClickPeriod,
      isInit,
      selectedId,
      selectedPeriod,
    };
  },
});
</script>

<template lang="pug">
.chartSwitch
  .chartSwitch__container(v-if='isInit')
    ListsWrapChartSwitcher.chartSwitch__switcher(@onChangeChart='onChangeChart')
    .chartSwitch__periods(v-if='selectedId === 1')
      .chartSwitch__period(
        :class='[{ "chartSwitch__period--active": selectedPeriod === "quart" }]',
        @click='onClickPeriod("quart")'
      ) По кварталам
      .chartSwitch__period(
        :class='[{ "chartSwitch__period--active": selectedPeriod === "year" }]',
        @click='onClickPeriod("year")'
      ) По годам
    highcharts.chartSwitch__chart(:options='getChartUpDownOptions')
  Loader(v-else)
</template>

<style scoped lang="scss">
.chartSwitch {
  &__switcher {
    margin-bottom: 30px;
  }

  &__periods {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }

  &__period {
    padding: 10px;
    cursor: pointer;
    border: 2px solid #fec006;
    border-radius: 16px;

    &:not(:last-child) {
      margin-right: 20px;
    }

    &--active {
      color: #fff;
      background: #fec006;
    }
  }
}
</style>
