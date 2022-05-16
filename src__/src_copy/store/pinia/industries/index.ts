import { defineStore, acceptHMRUpdate } from 'pinia';
import { TGetIndustriesPayload } from '@/store/pinia/industries/types';
import { ApiStatusCode, useApiFinplan } from '@/use/api/useApiFinplan';
import { ITableCommonRow, ITableCommonRowLink } from '@/components/Tables/Common/types';
import { finDataKeys } from '@/helpers/finDataKeys';
import { DynamicObject } from '@/interfaces';

export const useIndustriesStore = defineStore('industries', {
  state: () => ({
    items: [] as any[],
    tableRows: [] as ITableCommonRow[],
    sumInd: [] as DynamicObject[],
    sumIndCategories: [] as string[],
    tableColTitles: [] as string[],
    accessRegions: ['usa', 'rus'],
    currentCountry: '',
    type: '',
  }),
  getters: {
    /**
     * Название отраслей
     */
    getIndNames: (state) => {
      try {
        const result: string[] = [];
        if (!Array.isArray(state.items)) return [];
        state.items.forEach((item) => {
          result.push(item.NAME || '');
        });
        return result;
      } catch (e) {
        console.error('getIndNames pinia');
        console.error(e);
        return [];
      }
    },

    /**
     * Прирост капитализации по кварталу
     */
    getCapGrowthLastQuart: (state): number[] => {
      try {
        const result: number[] = [];
        if (!Array.isArray(state.items)) return [];
        state.items.forEach((item) => {
          result.push(item.FIN_DATA[0].capitalizationGrowthRateFromLastQuart || 0);
        });
        return result;
      } catch (e) {
        console.error('getCapGrowthLastQuart pinia');
        console.error(e);
        return [];
      }
    },

    /**
     * Прирост капитализации по году
     */
    getCapGrowthBeginYear: (state): number[] => {
      try {
        const result: number[] = [];
        if (!Array.isArray(state.items)) return [];
        state.items.forEach((item) => {
          result.push(item.FIN_DATA[0].capitalizationGrowthRateFromBeginYear || 0);
        });
        return result;
      } catch (e) {
        console.error('getCapGrowthBeginYear pinia');
        console.error(e);
        return [];
      }
    },

    /**
     * Средний PE по отраслям
     */
    getPe: (state): number[] => {
      try {
        const result: number[] = [];
        if (!Array.isArray(state.items)) return [];
        state.items.forEach((item) => {
          result.push(item.FIN_DATA[0].PE);
        });
        return result;
      } catch (e) {
        console.error('getPe pinia');
        console.error(e);
        return [];
      }
    },
  },
  actions: {
    resetState() {
      this.$reset();
    },

    async setIndustries(payload: TGetIndustriesPayload): Promise<boolean> {
      if (this.items.length) return true;
      const api = useApiFinplan();
      let response;
      this.currentCountry = payload.country;
      if (this.currentCountry === 'rus') {
        this.type = 'industries';
      }
      if (this.currentCountry === 'usa') {
        this.type = 'sectors';
      }
      if (this.currentCountry === 'usa') {
        response = await api.getSectorsList(payload.pageNumber, payload.pageSize);
      }
      if (this.currentCountry === 'rus') {
        response = await api.getIndustriesList(payload.pageNumber, payload.pageSize);
      }
      // console.log(response.data);
      if (response.status === ApiStatusCode.success) {
        try {
          this.items = [...response.data.ITEMS];
          return true;
        } catch (e) {
          console.error(e);
          return false;
        }
      }
      return false;
    },

    setTableRows() {
      if (this.tableRows.length) return;
      this.items.forEach((item) => {
        try {
          const data = item.FIN_DATA[0];
          this.tableRows.push({
            title: item.NAME,
            id: item.ID,
            code: item.CODE,
            values: [
              Number(data.currentAssets),
              Number(data.actives),
              Number(data.equity),
              Number(data.capitalization),
              Number(data.shareOfEquityInAssets),
              Number(data.assetGrowthRate),
              Number(data.yearSlidingRevenue),
              Number(data.yearSlidingProfit),
              Number(data.returnOnEquity),
              Number(data.PE),
              Number(data.PB),
              Number(data.PEquity),
              Number(data.PSale),
              Number(data.profitGrowRate),
              Number(data.revenueGrowRate),
              Number(data.capitalizationGrowthRateFromBeginYear),
            ],
            link: {
              name: 'ListsWrapAbout',
              params: {
                locale: 'ru',
                type: this.type,
                region: this.currentCountry,
                id: item.CODE,
              },
            },
          });
        } catch (e) {
          console.error(e);
        }
      });
    },

    setTableColTitles() {
      if (this.tableColTitles.length) return;
      finDataKeys.forEach((key) => {
        this.tableColTitles.push(key);
      });
    },

    updateIndicator(id: number) {
      this.sumInd[id].picked = !this.sumInd[id].picked;
    },

    /**
     * Суммарные показатели
     */
    initSumInd(type: 'quart' | 'year') {
      try {
        const date = new Date();
        const year = date.getFullYear();
        const quarter = Math.floor((date.getMonth() + 3) / 3);

        const tempSumInd = [...this.sumInd];
        this.sumInd = [];
        this.sumIndCategories = [];

        finDataKeys.forEach((key, index) => {
          let picked = false;
          if (tempSumInd.length > 0) {
            if (tempSumInd[index].picked) picked = true;
          } else if (index <= 2) picked = true;

          this.sumInd.push({
            title: key,
            id: index,
            code: index,
            values: [],
            picked,
          });
        });

        for (const period of Object.values(this.items[0].FIN_DATA_FULL_PERIODS)) {
          if (this.sumInd && period) {
            const periodYear = Number(period.periodYear);
            const periodQuarter = Number(period.periodVal);

            if (periodQuarter === 0 || periodYear <= 2015) continue;

            if (type === 'year') {
              const periodVal = Number(period.periodVal);
              if (periodVal !== 4) continue;
              this.sumIndCategories.push(`${periodYear}`);
            } else {
              this.sumIndCategories.push(`${periodQuarter}кв. ${periodYear}`);
            }

            const {
              currentAssets,
              actives,
              capitalization,
              equity,
              shareOfEquityInAssets,
              capitalizationGrowthRateFromBeginYear,
              assetGrowthRate,
              yearSlidingRevenue,
              yearSlidingProfit,
              returnOnEquity,
              PE,
              PB,
              PEquity,
              PSale,
              profitGrowRate,
              revenueGrowRate,
            } = period;

            this.sumInd[0].values.push(Number(currentAssets));
            this.sumInd[1].values.push(Number(actives));
            this.sumInd[2].values.push(Number(equity));
            this.sumInd[3].values.push(Number(capitalization));
            this.sumInd[4].values.push(Number(shareOfEquityInAssets));
            this.sumInd[5].values.push(Number(assetGrowthRate));
            this.sumInd[6].values.push(Number(yearSlidingRevenue));
            this.sumInd[7].values.push(Number(yearSlidingProfit));
            this.sumInd[8].values.push(Number(returnOnEquity));
            this.sumInd[9].values.push(Number(PE));
            this.sumInd[10].values.push(Number(PB));
            this.sumInd[11].values.push(Number(PEquity));
            this.sumInd[12].values.push(Number(PSale));
            this.sumInd[13].values.push(Number(profitGrowRate));
            this.sumInd[14].values.push(Number(revenueGrowRate));
            this.sumInd[15].values.push(Number(capitalizationGrowthRateFromBeginYear));
          }
        }
      } catch (e) {
        console.error('initSumInd');
        console.error(e);
      }
    },
  },
});

if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useIndustriesStore, import.meta.hot));
