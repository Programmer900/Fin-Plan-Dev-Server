import { IIndexPageStore, initState } from '@/store/modules/IndexPage/state';
import { DynamicObject } from '@/interfaces';

interface IInitConfig {
  resDetail: DynamicObject;
  resChart: DynamicObject;
}

export const mutations = {
  init: (state: IIndexPageStore, config: IInitConfig): void => {
    const { resDetail, resChart } = config;

    // @ts-ignore
    state.chart.data = [...resChart.items];

    state.id = resDetail.ID;
    state.ticker = resDetail.CODE;
    state.name = resDetail.NAME;
    state.indexStaff.in = [...resDetail.INDEX_STAFF.IN];
    state.indexStaff.main = [...resDetail.INDEX_STAFF.MAIN];
    state.previewText = resDetail.PREVIEW_TEXT;
    state.dynamics.current = resDetail.PROPERTIES.QUOTATIONS_NOW.VALUE;
    state.dynamics.month = resDetail.PROPERTIES.QUOTATIONS_MONTH.VALUE;
    state.dynamics.year = resDetail.PROPERTIES.QUOTATIONS_ONE_YEAR.VALUE;
    state.dynamics.threeYears = resDetail.PROPERTIES.QUOTATIONS_THREE_YEAR.VALUE;
    state.currency.sign = resDetail.PROPERTIES.CURRENCYID.CURRENCY_SIGN;
    state.currency.value = resDetail.PROPERTIES.CURRENCYID.VALUE;
  },

  reset: (state: IIndexPageStore): void => {
    state = initState();
  },
};
