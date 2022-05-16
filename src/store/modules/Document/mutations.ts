import {
  IDocumentState,
  IIndicatorsChartItem,
  vanilaIndicatorsChartState,
  vanilaState,
} from '@/store/modules/Document/state';

export const mutations = {
  resetState: (state: IDocumentState): void => {
    state = vanilaState();
  },
  resetIndicatorsChart: (state: IDocumentState): void => {
    Object.values(state.indicatorsChart).forEach((item: IIndicatorsChartItem) => {
      item.data = [];
    });
    state.indicatorsChartCategories = [];
    state.indicatorsChartQuarter = [];
  },
  resetTableProp: (state: IDocumentState): void => {
    state.currentTableProp = 'year';
  },
  changeCurrentTableProp: (state: IDocumentState, newValue: string): void => {
    if (state.currentTableProp !== newValue) {
      state.currentTableProp = newValue;
    }
  },
};
