<script lang="ts">
import HighCharts from 'highcharts';
import StockCharts from 'highcharts/modules/stock';
import TableCommon from '@/components/Tables/Common/index.vue';
import { useIndustriesStore } from '@/store/pinia/industries';
import Loader from '@/components/Loader/index.vue';
import { useChartTools } from '@/views/Lists/modules/Pages/All/modules/Charts/Column/helpers/chartTools';

export default defineComponent({
  name: 'ListsSumIndicators',
  components: { Loader, TableCommon },
  setup() {
    const chartTools = useChartTools();
    const indStore = useIndustriesStore();
    const route = useRoute();

    const selectedPeriod = ref<'quart' | 'year'>('quart');
    const isInit = ref(false);
    const notFound = ref(false);
    const series = ref<any[]>([]);

    const updateSeries = () => {
      series.value = [];
      indStore.sumInd.forEach((item) => {
        if (item.picked === true) {
          series.value.push({
            name: item.title,
            data: item.values,
          });
        }
      });
    };

    const init = () => {
      isInit.value = false;
      const routeType = String(route.params.type);
      if (routeType !== 'industries') {
        isInit.value = true;
        notFound.value = true;
        return;
      }
      StockCharts(HighCharts);
      indStore.initSumInd(selectedPeriod.value);
      updateSeries();
      chartTools.init(series.value, indStore.sumIndCategories);
      isInit.value = true;
    };

    const changePeriod = () => {
      indStore.initSumInd(selectedPeriod.value);
      updateSeries();
      chartTools.updateSeries(series.value);
      chartTools.updateCategories(indStore.sumIndCategories);
    };

    const onClickPeriod = (period: 'quart' | 'year') => {
      selectedPeriod.value = period;
      changePeriod();
    };

    const onSelectIndicator = (id: number) => {
      indStore.updateIndicator(id);
      updateSeries();
      chartTools.updateSeries(series.value);
    };

    onServerPrefetch(() => {
      init();
    });

    onMounted(() => {
      if (isInit.value) return;
      init();
    });

    return {
      onClickPeriod,
      onSelectIndicator,
      getTableColTitles: computed(() => indStore.sumIndCategories),
      getTableRows: computed(() => indStore.sumInd),
      getChartColumnOptions: chartTools.getChartOptions,
      isInit,
      notFound,
      selectedPeriod,
    };
  },
});
</script>

<template lang="pug">
.sumInd
  .sumInd__container
    h1.sumInd__title Суммарные показатели
    template(v-if='isInit && !notFound')
      highcharts.sumInd__chart(:options='getChartColumnOptions')
      .sumInd__periods
        .sumInd__period(
          :class='[{ "sumInd__period--active": selectedPeriod === "quart" }]',
          @click='onClickPeriod("quart")'
        ) По кварталам
        .sumInd__period(
          :class='[{ "sumInd__period--active": selectedPeriod === "year" }]',
          @click='onClickPeriod("year")'
        ) По годам
      TableCommon.sumInd__table(
        :col-titles='getTableColTitles',
        index-title='Показатель',
        :rows='getTableRows',
        @clickRow='onSelectIndicator'
      )
    Loader(v-if='!isInit')
    h3(v-if='notFound') Информация не найдена
</template>

<style scoped lang="scss">
.sumInd {
  padding-top: 50px;

  ::v-deep(.table-common__th) {
    padding-top: 30px;
    padding-bottom: 30px;
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
