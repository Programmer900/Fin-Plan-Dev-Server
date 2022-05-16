import { LS_LOCALE } from '../../../../env.common';
import { useApiFinplan } from '@/use/api/useApiFinplan';

export const actions = {
  async setStockInfo({ commit }: { commit: any }, config: any) {
    const { region, company } = config;
    const api = useApiFinplan();
    const response = await api.getStock(company, region);
    commit('STOCK_INFO', response.data);
    return response.data;
  },

  updateMonthCandleDates({ commit, state }: { commit: any; state: any }): void {
    const graphCandleData = state.stockInfo.GRAPH_CANDLE_DATA.M;
    const keys = Object.keys(graphCandleData);

    state.monthCandleDates = [];

    keys.forEach((key: any) => {
      const value = key.split('-');
      const date = new Date(value[0], value[1] - 1, value[2]);

      const year = date.getFullYear();
      const month = date.toLocaleString(localStorage.getItem(LS_LOCALE) || 'ru', {
        month: 'short',
      });
      const monthFormatted = month[0].toUpperCase() + month.slice(1);

      commit('setMonthCandleDates', { month: monthFormatted, year });
    });
  },
};
