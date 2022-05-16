import { acceptHMRUpdate, defineStore } from 'pinia';
import { ApiStatusCode, useApiFinplan } from '@/use/api/useApiFinplan';
import { DynamicObject } from '@/interfaces';

export const useIndustryItemStore = defineStore('industryItemStore', {
  state: () => ({
    request: {
      code: '',
      verb: '',
      returnPeriods: '',
    },
    item: {} as DynamicObject,
    name: '',
    previewTextHtml: '',
    chartCategories: [] as string[],
    chartData: {
      actives: {
        name: 'Активы',
        data: [],
        type: 'line',
        color: '#97b3de',
        visible: true,
        alert: true,
      },
      currentAssets: {
        name: 'Оборотные активы',
        data: [],
        type: 'column',
        color: '#fec006',
        visible: true,
      },
      equity: {
        name: 'Собственный капитал',
        data: [],
        type: 'column',
        color: '#138ec4',
        visible: false,
      },
      capitalization: {
        name: 'Прошлая капитализация',
        data: [],
        type: 'column',
        color: '#455f85',
        visible: false,
      },
      shareOfEquityInAssets: {
        name: 'Доля собственного капитала в активах',
        data: [],
        type: 'column',
        color: '#F27362',
        visible: false,
      },
      yearSlidingRevenue: {
        name: 'Выручка за год (скользящая)',
        data: [],
        type: 'column',
        color: '#2a8634',
        visible: false,
      },
      yearSlidingProfit: {
        name: 'Прибыль за год (скользящая)',
        data: [],
        type: 'column',
        color: '#AC5BBE',
        visible: false,
      },
      returnOnEquity: {
        name: 'Рентабельность собственного капитала',
        data: [],
        type: 'column',
        color: '#71ad52',
        visible: false,
      },
      PE: {
        name: 'P/E',
        data: [],
        type: 'column',
        color: '#F5DD50',
        visible: false,
      },
      PB: {
        name: 'P/B',
        data: [],
        type: 'column',
        color: '#E1953C',
        visible: false,
      },
      PEquity: {
        name: 'P/Equity',
        data: [],
        type: 'column',
        color: '#ff4495',
        visible: false,
      },
      PSale: {
        name: 'P/Sale',
        data: [],
        type: 'column',
        color: '#36173d',
        visible: false,
      },
    } as DynamicObject,
    initialChartData: {} as DynamicObject,
  }),
  getters: {
    getChartValues(): any {
      return Object.values(this.chartData);
    },
    getChartCategories(): any {
      return this.chartCategories;
    },
    getChartDataKeys(): any {
      return Object.keys(this.chartData);
    },
    getChart(): any {
      return this.chartData;
    },
  },
  actions: {
    async init(code: string, type: string, returnPeriods = 'y'): Promise<boolean> {
      const api = useApiFinplan();
      this.request.code = code;
      this.request.returnPeriods = returnPeriods;
      if (type === 'industries') {
        this.request.verb = 'industryRus';
      }
      if (type === 'sectors') {
        this.request.verb = 'sectorUsa';
      }
      const response = await api.getDetailIndustry(
        this.request.verb,
        this.request.code,
        this.request.returnPeriods,
      );
      if (response.status === ApiStatusCode.success) {
        Object.assign(this.item, response.data);
        this.setFields();
        this.setChart();
        return true;
      }
      return false;
    },
    setFields() {
      this.name = this.item.NAME;
      this.previewTextHtml = this.item.PREVIEW_TEXT;
    },
    setChart() {
      try {
        const periodsArr = Object.values(this.item.PERIODS).reverse();
        console.log(this.item.columns);
        periodsArr.forEach((item: any) => {
          if (item) {
            this.chartData.actives.data.push(Number(item.actives));
            this.chartData.currentAssets.data.push(Number(item.currentAssets));
            this.chartData.equity.data.push(Number(item.equity));
            this.chartData.capitalization.data.push(Number(item.capitalization));
            this.chartData.shareOfEquityInAssets.data.push(Number(item.shareOfEquityInAssets));
            this.chartData.yearSlidingRevenue.data.push(Number(item.yearSlidingRevenue));
            this.chartData.yearSlidingProfit.data.push(Number(item.yearSlidingProfit));
            this.chartData.returnOnEquity.data.push(Number(item.returnOnEquity));
            this.chartData.PE.data.push(Number(item.PE));
            this.chartData.PB.data.push(Number(item.PB));
            this.chartData.PEquity.data.push(Number(item.PEquity));
            this.chartData.PSale.data.push(Number(item.PSale));
            if (item.periodVal === 1) {
              this.chartCategories.push(`Март ${item.periodYear}`);
            }
            if (item.periodVal === 2) {
              this.chartCategories.push(`Июнь ${item.periodYear}`);
            }
            if (item.periodVal === 3) {
              this.chartCategories.push(`Сен. ${item.periodYear}`);
            }
            if (item.periodVal === 4) {
              this.chartCategories.push(`Дек. ${item.periodYear}`);
            }
          }
        });
      } catch (e) {
        console.error('setChart error');
        console.error(e);
      }
    },
    toggleChartItemView(key: string) {
      this.chartData[key].visible = !this.chartData[key].visible;
    },
    resetChart() {
      this.chartData.actives.visible = true;
      this.chartData.currentAssets.visible = true;
      this.chartData.equity.visible = false;
      this.chartData.capitalization.visible = false;
      this.chartData.shareOfEquityInAssets.visible = false;
      this.chartData.yearSlidingRevenue.visible = false;
      this.chartData.yearSlidingProfit.visible = false;
      this.chartData.returnOnEquity.visible = false;
      this.chartData.PE.visible = false;
      this.chartData.PB.visible = false;
      this.chartData.PEquity.visible = false;
      this.chartData.PSale.visible = false;
    },
    reset() {
      this.$reset();
    },
  },
});

if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useIndustryItemStore, import.meta.hot));
