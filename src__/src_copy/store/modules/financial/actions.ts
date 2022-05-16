import { useRoute } from 'vue-router';
import { tableData } from '@/store/modules/financial/state';
import { ApiStatusCode, useApiFinplan } from '@/use/api/useApiFinplan';

import { LS_LOCALE } from '../../../../env.common';

export const actions = {
  async init(
    { commit, state, dispatch }: { commit: any; state: any; dispatch: any },
    config = {} as any,
  ): Promise<boolean> {
    const route = useRoute();

    const region = String(route.params.region) || 'RUS';
    const ticker = String(route.params.ticker) || '';
    const from = config.from || '';
    const to = config.to || '';

    if (ticker) {
      const api = useApiFinplan();
      const response = await api.getFinancialData(region, ticker, from, to);
      console.log(response.data);
      if (response.status === ApiStatusCode.success) {
        commit('setFullData', response.data);
        dispatch('updateState');
      } else {
        console.error('Financial store action error');
      }
      return true;
    }
    console.error('Company error. Config:');
    console.error(config);
    return false;
  },

  commitMaker({ commit }: { commit: any }, item): void {
    commit('setPeriodVal', item);
    commit('setPeriodYear', item);

    commit('setActives', item);
    commit('setCurrentActives', item);
    commit('setEquityCapital', item);
    commit('setRevenueLastYear', item);
    commit('setRevenueYearRolling', item);
    commit('setPastCapitalization', item);
    commit('setCurrentRevenue', item);
    commit('setQuarterlyRevenue', item);
    commit('setShareEquityActives', item);
    commit('setProfit', item);
    commit('setProfitYearRolling', item);
    commit('setQuarterlyProfit', item);
    commit('setReturnOnEquity', item);
    commit('setRevenueGrowthRate', item);
    commit('setActivesGrowthRate', item);
    commit('setProfitGrowthRate', item);
  },

  clearTableFieldData({ state }: { state: any }): void {
    Object.keys(tableData).forEach((key) => (state[key] = []));
  },

  onChangeProp(
    { commit, dispatch, state }: { commit: any; dispatch: any; state: any },
    newProp: string,
  ): void {
    commit('setProp', newProp);

    dispatch('clearTableFieldData');
    dispatch('updateState');
  },

  updateState({ state, dispatch, commit }: { state: any; dispatch: any; commit: any }): void {
    const currentTime = new Date();
    const currentYear = currentTime.getFullYear();

    Object.values(state.fullData).forEach((item: any) => {
      if (item) {
        if (state.prop === 'year') {
          if (Number(item.periodVal) === 3) {
            dispatch('commitMaker', item);
          }
          // else if (Number(item.periodYear) === currentYear) {
          //   dispatch('commitMaker', item);
          // }
        } else if (state.prop === 'quarter') {
          if (Number(item.periodYear) !== 2011) {
            dispatch('commitMaker', item);
          }
        }
      }
    });

    dispatch('updateGraphDates');
  },

  updateGraphDates({ state, commit }: { state: any; commit: any }): void {
    state.graphDates = [];

    const periodValArr = state.periodVal.slice().reverse();
    const periodYearArr = state.periodYear.slice().reverse();

    state.periodVal.forEach((item, index) => {
      const periodVal = Number(periodValArr[index]);
      const periodYear = Number(periodYearArr[index]);

      let month = 0;

      // Определение месяца (номер месяца в году - 1)
      switch (periodVal) {
        case 1: {
          month = 2;
          break;
        }
        case 2: {
          month = 5;
          break;
        }
        case 3: {
          month = 8;
          break;
        }
        case 4: {
          month = 11;
          break;
        }
        default: {
          break;
        }
      }

      const date = new Date(periodYear, month);
      const itemYear = date.getFullYear();
      const itemMonth = date.toLocaleString(localStorage.getItem(LS_LOCALE) || 'ru', {
        month: 'short',
      });
      const monthFormatted = itemMonth[0].toUpperCase() + itemMonth.slice(1);

      commit('setGraphDates', `${monthFormatted} ${itemYear}`);
    });
  },
};
