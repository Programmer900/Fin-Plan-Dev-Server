import { ICurrency, IDynamics, IIndexPageStore } from '@/store/modules/IndexPage/state';
import { DynamicObject } from '@/interfaces';

export const getters = {
  getName: (state: IIndexPageStore): string => state.name,
  getPreviewText: (state: IIndexPageStore): string => state.previewText,
  getFullName: (state: IIndexPageStore): string => state.fullName,
  getTicker: (state: IIndexPageStore): string => state.ticker,
  getCurrency: (state: IIndexPageStore): ICurrency => state.currency,
  getDynamics: (state: IIndexPageStore): IDynamics => state.dynamics,
  getChartData: (state: IIndexPageStore): DynamicObject => state.chart.data,
};
