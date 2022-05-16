import { routeDocumentTypes } from '@/helpers/route.helper';
import { IDocumentState, vanilaIndicatorsChartState } from '@/store/modules/Document/state';
import { DynamicObject } from '@/interfaces';
import { useI18nMsg } from '@/use/useI18nMsg';
import { utils } from '@/services/utils';
import { useApiFinplan } from '@/use/api/useApiFinplan';

interface IConfig {
  type: string;
  id: string;
  region: string;
}

export const actions = {
  async initData(
    { state, commit }: { state: IDocumentState; commit: any },
    config: IConfig,
  ): Promise<boolean> {
    const api = useApiFinplan();
    try {
      if (config.type === routeDocumentTypes.stock) {
        const response = await api.getStock(config.region, config.id);
        // @ts-ignore
        state.data = response.data;
      } else if (config.type === routeDocumentTypes.bond) {
        const response = await api.getBond(config.region, config.id);
        // @ts-ignore
        state.data = response.data;
      } else if (config.type === routeDocumentTypes.etf) {
        const response = await api.getETF(config.region, config.id);
        // @ts-ignore
        state.data = response.data;
      } else {
        commit('resetState');
        return false;
      }
      let response = await api.getFinancialData(config.region, config.id);
      // console.log(state.data);
      // @ts-ignore
      state.financialData = response.data;
      response = await api.getCompanyDescription(
        config.region,
        state.data?.RADAR_DATA.PROPS.EMITENT_ID,
      );
      // @ts-ignore
      state.emitentData = response.data;

      state.region = config.region;
      state.type = config.type;
      state.id = config.id;
      // console.log(state.data);
      // console.log(state.emitentData);
      // console.log(state.financialData);
      return true;
    } catch (e) {
      commit('resetState');
      // console.log(e);
      return false;
    }
  },

  initIndicatorsChartLocale({ state }: { state: IDocumentState }): void {
    state.indicatorsChart.quotes.name = useI18nMsg().page.document.quotes;
    state.indicatorsChart.actives.name = useI18nMsg().page.document.actives;
    state.indicatorsChart.averageProfit.name = useI18nMsg().page.document.averageProfit;
    state.indicatorsChart.currentAssets.name = useI18nMsg().page.document.currentAssets;
    state.indicatorsChart.currentRevenue.name = useI18nMsg().page.document.currentRevenue;
    state.indicatorsChart.equity.name = useI18nMsg().page.document.equity;
    state.indicatorsChart.lastYearRevenue.name = useI18nMsg().page.document.lastYearRevenue;
    state.indicatorsChart.profit.name = useI18nMsg().page.document.profit;
    state.indicatorsChart.quarterlyProfit.name = useI18nMsg().page.document.quarterlyProfit;
    state.indicatorsChart.quarterlyRevenue.name = useI18nMsg().page.document.quarterlyRevenue;
    state.indicatorsChart.returnOnEquity.name = useI18nMsg().page.document.returnOnEquity;
    state.indicatorsChart.shareOfEquityInAssets.name =
      useI18nMsg().page.document.shareOfEquityInAssets;
    state.indicatorsChart.yearSlidingProfit.name = useI18nMsg().page.document.yearSlidingProfit;
    state.indicatorsChart.yearSlidingRevenue.name = useI18nMsg().page.document.yearSlidingRevenue;
    state.indicatorsChart.pe.name = 'P/E';
    state.indicatorsChart.pb.name = 'P/B';
    state.indicatorsChart.pEquity.name = 'P/Equity';
    state.indicatorsChart.pSale.name = 'P/Sale';
  },

  initIndicatorsChart({ state, dispatch }: { state: IDocumentState; dispatch: any }): boolean {
    try {
      const monthCandleData: DynamicObject[] = Object.values(state.data?.GRAPH_CANDLE_DATA.M);
      const finData = new Map<string, any>(Object.entries(state.financialData?.data).reverse());
      console.log(state);
      console.log(finData);
      finData.forEach((item: DynamicObject) => {
        if (item) {
          if (state.currentTableProp === 'year' && Number(item.periodVal) !== 4) {
            return;
          }
          state.indicatorsChart.actives.data.push(Number(item?.actives) || 0);
          state.indicatorsChart.averageProfit.data.push(Number(item?.averageProfit) || 0);
          state.indicatorsChart.currentAssets.data.push(Number(item?.currentAssets) || 0);
          state.indicatorsChart.currentRevenue.data.push(Number(item?.currentRevenue) || 0);
          state.indicatorsChart.equity.data.push(Number(item?.equity) || 0);
          state.indicatorsChart.lastYearRevenue.data.push(Number(item?.lastYearRevenue) || 0);
          state.indicatorsChart.profit.data.push(Number(item?.profit) || 0);
          state.indicatorsChart.quarterlyProfit.data.push(Number(item?.quarterlyProfit) || 0);
          state.indicatorsChart.quarterlyRevenue.data.push(Number(item?.quarterlyRevenue) || 0);
          state.indicatorsChart.returnOnEquity.data.push(Number(item?.returnOnEquity) || 0);
          state.indicatorsChart.shareOfEquityInAssets.data.push(
            Number(item?.shareOfEquityInAssets) || 0,
          );
          state.indicatorsChart.yearSlidingProfit.data.push(Number(item?.yearSlidingProfit) || 0);
          state.indicatorsChart.yearSlidingRevenue.data.push(Number(item?.yearSlidingRevenue) || 0);
          state.indicatorsChart.capitalization.data.push(Number(item?.capitalization) || 0);
          state.indicatorsChart.halfyearRevenue.data.push(Number(item?.halfyearRevenue) || 0);
          state.indicatorsChart.halfyearProfit.data.push(Number(item?.halfyearProfit) || 0);
          state.indicatorsChart.pe.data.push(Number(item?.PE) || 0);
          state.indicatorsChart.pb.data.push(Number(item?.PB) || 0);
          state.indicatorsChart.pEquity.data.push(Number(item?.PEquity) || 0);
          state.indicatorsChart.pSale.data.push(Number(item?.PSale) || 0);
        }
      });

      monthCandleData.forEach((item: DynamicObject) => {
        const month = Number(new Date(item.UF_DATE_TO).getMonth() + 1);

        if (state.currentTableProp === 'year' && month === 12) {
          state.indicatorsChart.quotes.data.push(Number(item.UF_CLOSE));
          state.indicatorsChartCategories.push(new Date(item.UF_DATE_TO).getFullYear());
        } else if (state.currentTableProp === 'quarter' && month % 3 === 1) {
          state.indicatorsChartQuarter.push(`${utils.getQuarterByMonth(month)}кв.`);
          state.indicatorsChart.quotes.data.push(Number(item.UF_CLOSE));
          state.indicatorsChartCategories.push(new Date(item.UF_DATE_TO).getFullYear());
        }
      });

      // if (state.currentTableProp === 'year') {
      const catLength = state.indicatorsChartCategories.length;
      const indicLength = state.indicatorsChart.actives.data.length;

      if (catLength < indicLength) {
        state.indicatorsChart.quotes.data.push(
          Number(monthCandleData[monthCandleData.length - 1].UF_CLOSE),
        );
        state.indicatorsChartCategories.push(
          new Date(monthCandleData[monthCandleData.length - 1].UF_DATE_TO).getFullYear(),
        );
      } else if (catLength > indicLength) {
        for (let i = indicLength; i < catLength; i++) {
          state.indicatorsChart.actives.data.push(0);
          state.indicatorsChart.averageProfit.data.push(0);
          state.indicatorsChart.currentAssets.data.push(0);
          state.indicatorsChart.currentRevenue.data.push(0);
          state.indicatorsChart.equity.data.push(0);
          state.indicatorsChart.lastYearRevenue.data.push(0);
          state.indicatorsChart.profit.data.push(0);
          state.indicatorsChart.quarterlyProfit.data.push(0);
          state.indicatorsChart.quarterlyRevenue.data.push(0);
          state.indicatorsChart.returnOnEquity.data.push(0);
          state.indicatorsChart.shareOfEquityInAssets.data.push(0);
          state.indicatorsChart.yearSlidingProfit.data.push(0);
          state.indicatorsChart.yearSlidingRevenue.data.push(0);
          state.indicatorsChart.pe.data.push(0);
          state.indicatorsChart.pb.data.push(0);
          state.indicatorsChart.pEquity.data.push(0);
          state.indicatorsChart.pSale.data.push(0);
          state.indicatorsChart.capitalization.data.push(0);
          state.indicatorsChart.halfyearProfit.data.push(0);
          state.indicatorsChart.halfyearRevenue.data.push(0);
        }
      }

      if (!state.indicatorsChartLocaleInit) {
        dispatch('initIndicatorsChartLocale');
        state.indicatorsChartLocaleInit = true;
      }

      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  },

  resetIndicatorsChartToDefault({
    state,
    dispatch,
    commit,
  }: {
    state: IDocumentState;
    dispatch: any;
    commit: any;
  }): boolean {
    commit('resetIndicatorsChart');
    state.indicatorsChart = vanilaIndicatorsChartState();
    dispatch('initIndicatorsChart');
    return true;
  },
};
