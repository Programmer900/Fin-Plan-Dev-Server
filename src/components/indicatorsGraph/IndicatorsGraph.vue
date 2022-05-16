<template>
  <div v-if="initGraph && getGraphData">
    <VueHighcharts
      :animate-on-update="true"
      :one-to-one-update="false"
      :options="{
        ...options,
        series: [
          {
            yAxis: 1,
            name: $t('companyIndicators.tableRows.currentAssets.name'),
            type: 'column',
            data: getGraphData.currentActives,
            color: getGraphSeriesData.currentActives.color,
            visible: getGraphSeriesData.currentActives.show,
          },
          {
            yAxis: 1,
            name: $t('companyIndicators.tableRows.assets.name'),
            type: 'column',
            data: getGraphData.actives,
            color: getGraphSeriesData.actives.color,
            visible: getGraphSeriesData.actives.show,
          },
          {
            yAxis: 1,
            name: $t('companyIndicators.tableRows.equityCapital.name'),
            data: getGraphData.equityCapital,
            type: 'column',
            color: getGraphSeriesData.equityCapital.color,
            visible: getGraphSeriesData.equityCapital.show,
          },
          {
            yAxis: 1,
            name: $t('companyIndicators.tableRows.revenueLastYear.name'),
            data: getGraphData.revenueLastYear,
            type: 'column',
            color: getGraphSeriesData.revenueLastYear.color,
            visible: getGraphSeriesData.revenueLastYear.show,
          },
          {
            yAxis: 1,
            name: $t('companyIndicators.tableRows.revenueYearRolling.name'),
            data: getGraphData.revenueYearRolling,
            type: 'column',
            color: getGraphSeriesData.revenueYearRolling.color,
            visible: getGraphSeriesData.revenueYearRolling.show,
          },
          {
            name: $t('companyIndicators.tableRows.pastCapitalization.name'),
            data: getGraphData.pastCapitalization,
            type: 'column',
            color: getGraphSeriesData.pastCapitalization.color,
            visible: getGraphSeriesData.pastCapitalization.show,
          },
          {
            name: $t('companyIndicators.tableRows.currentRevenue.name'),
            data: getGraphData.currentRevenue,
            type: 'column',
            color: getGraphSeriesData.currentRevenue.color,
            visible: getGraphSeriesData.currentRevenue.show,
          },
          {
            name: $t('companyIndicators.tableRows.quarterlyRevenue.name'),
            data: getGraphData.quarterlyRevenue,
            type: 'column',
            color: getGraphSeriesData.quarterlyRevenue.color,
            visible: getGraphSeriesData.quarterlyRevenue.show,
          },
          {
            name: $t('companyIndicators.tableRows.shareEquityAssets.name'),
            data: getGraphData.shareEquityAssets,
            type: 'column',
            color: getGraphSeriesData.shareEquityAssets.color,
            visible: getGraphSeriesData.shareEquityAssets.show,
          },
          {
            name: $t('companyIndicators.tableRows.shareEquityAssets.name'),
            data: getGraphData.shareEquityActives,
            type: 'column',
            color: getGraphSeriesData.shareEquityAssets.color,
            visible: getGraphSeriesData.shareEquityAssets.show,
          },
          {
            name: $t('companyIndicators.tableRows.profit.name'),
            data: getGraphData.profit,
            type: 'column',
            color: getGraphSeriesData.profit.color,
            visible: getGraphSeriesData.profit.show,
          },
          {
            name: $t('companyIndicators.tableRows.profitYearRolling.name'),
            data: getGraphData.profitYearRolling,
            type: 'column',
            color: getGraphSeriesData.profitYearRolling.color,
            visible: getGraphSeriesData.profitYearRolling.show,
          },
          {
            name: $t('companyIndicators.tableRows.quarterlyProfit.name'),
            data: getGraphData.quarterlyProfit,
            type: 'column',
            color: getGraphSeriesData.quarterlyProfit.color,
            visible: getGraphSeriesData.quarterlyProfit.show,
          },
          {
            name: $t('companyIndicators.tableRows.returnOnEquity.name'),
            data: getGraphData.returnOnEquity,
            type: 'column',
            color: getGraphSeriesData.returnOnEquity.color,
            visible: getGraphSeriesData.returnOnEquity.show,
          },
          {
            name: $t('companyIndicators.tableRows.revenueGrowthRate.name'),
            data: getGraphData.revenueGrowthRate,
            type: 'column',
            color: getGraphSeriesData.revenueGrowthRate.color,
            visible: getGraphSeriesData.revenueGrowthRate.show,
          },
          {
            name: $t('companyIndicators.tableRows.assetGrowthRate.name'),
            data: getGraphData.assetGrowthRate,
            type: 'column',
            color: getGraphSeriesData.assetGrowthRate.color,
            visible: getGraphSeriesData.assetGrowthRate.show,
          },
          {
            name: $t('companyIndicators.tableRows.profitGrowthRate.name'),
            data: getGraphData.profitGrowthRate,
            type: 'column',
            color: getGraphSeriesData.profitGrowthRate.color,
            visible: getGraphSeriesData.profitGrowthRate.show,
          },
          {
            yAxis: 0,
            name: $t('companyIndicators.tableRows.quotes.name'),
            data: quotesValue,
            color: getGraphSeriesData.quotes.color,
            visible: getGraphSeriesData.quotes.show,
          },
        ],
        xAxis: {
          categories: quotesDate,
          // categories: getGraphDates,
          lineColor: '#c2c2c2',
        },
        yAxis: [
          {
            // opposite: true,
            gridLineColor: '#c2c2c2',
            title: {
              text: '',
            },
            labels: {
              style: {
                fontSize: '16px',
                color: '#838383',
                fontFamily: 'Montserrat',
              },
            },
          },
          {
            opposite: true,
            gridLineColor: '#c2c2c2',
            title: {
              text: '',
            },
            labels: {
              style: {
                fontSize: '16px',
                color: '#838383',
                fontFamily: 'Montserrat',
              },
            },
          },
        ],
      }"
      :redraw-on-update="true"
      type="chart"
    />
  </div>
  <div v-else>Loading...</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { mapActions, mapGetters } from 'vuex';
import VueHighcharts from 'vue3-highcharts';
import { useRoute } from 'vue-router';
import { useSSR } from '@/use/useSSR';
import { useEmitter } from '@/use/useEmitter';
import { useApiFinplan } from '@/use/api/useApiFinplan';

export default defineComponent({
  name: 'IndicatorsGraph',
  components: {
    VueHighcharts,
  },
  data() {
    return {
      options: {
        chart: {
          type: 'line',
          backgroundColor: '',
        },
        title: {
          text: '',
        },
        legend: {
          enabled: false,
          verticalAlign: 'top',
          itemStyle: {
            fontSize: '16px',
            fontFamily: 'Montserrat',
          },
        },
        credits: {
          enabled: false,
        },
        // tooltip: {
        //   shared: true,
        // },
        // plotOptions: {
        //   series: {
        //     pointPlacement: 'on',
        //   },
        // },
      },
    };
  },
  computed: {
    ...mapGetters({
      getStockFullInfo: 'stockInfoStore/fullInfo',
      getStockMonthCandle: 'stockInfoStore/monthCandle',
      getMonthCandleUfClose: 'stockInfoStore/getMonthCandleUfClose',
      getMonthCandleDates: 'stockInfoStore/getMonthCandleDates',
      getPickedRow: 'financialStore/getPickedRow',
      getActives: 'financialStore/getActives',
      getCurrentActives: 'financialStore/getCurrentActives',
      getRevenueLastYear: 'financialStore/getRevenueLastYear',
      getGraphData: 'financialStore/getGraphData',
      getGraphDates: 'financialStore/getGraphDates',
      getGraphSeriesData: 'financialStore/getGraphSeriesData',
      getAssetsChart: 'stockInfoStore/getAssetsChart',
    }),

    initGraph() {
      if (this.getStockFullInfo) {
        this.updateMonthCandleDates();
        // console.log(this.getAssetsChart);
        // console.log(this.getGraphSeriesData.profitGrowthRate);
        // console.log(this.getGraphData.profitGrowthRate);
        return true;
      }

      return false;
    },
  },
  methods: {
    ...mapActions({ updateMonthCandleDates: 'stockInfoStore/updateMonthCandleDates' }),
  },
  setup() {
    const emitter = useEmitter();
    const quotesResponse = ref<any[]>([]);

    const quotesValue = ref<any[]>([]);
    const quotesDate = ref<any[]>([]);

    const validMonth = [2, 8];

    const { params } = useRoute();

    const quotesMakeQuarter = (): void => {
      const dateCurrent = new Date().getFullYear();

      quotesResponse.value.forEach((item: any) => {
        const date = new Date(item.formatedDate);

        if (validMonth.includes(date.getMonth()) && date.getFullYear() !== 2011) {
          quotesValue.value.push(Number(item.value.toFixed(0)));
          quotesDate.value.push(item.formatedDate);
        }
      });
    };

    const quotesMakeYear = (): void => {
      const dateCurrent = new Date().getFullYear();

      quotesResponse.value.forEach((item: any) => {
        const date = new Date(item.formatedDate);

        if (dateCurrent !== date.getFullYear() && date.getFullYear() !== 2011) {
          if (date.getMonth() === 11) {
            quotesValue.value.push(Number(item.value.toFixed(0)));
            quotesDate.value.push(item.formatedDate);
          }
        }
      });
    };

    emitter.on('onChangeTableParam', (paramName: string) => {
      quotesDate.value = [];
      quotesValue.value = [];

      switch (paramName) {
        case 'quarter': {
          quotesMakeQuarter();
          break;
        }
        case 'year': {
          quotesMakeYear();
          break;
        }
        default: {
          break;
        }
      }
    });

    useSSR(async () => {
      const api = useApiFinplan();
      const response = await api.getCompanyChartPriceData(
        params.region,
        params.ticker,
        '2000-03-31',
      );
      // @ts-ignore
      quotesResponse.value = response.data;
      quotesMakeYear();

      console.log(quotesResponse.value);
    });

    return {
      quotesValue,
      quotesDate,
    };
  },
});
</script>

<style scoped lang="scss" src="./style.scss" />
