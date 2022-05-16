import { IListsChart, IListsState } from '@/store/modules/Lists/state';
import { DynamicObject } from '@/interfaces';
import { IChartItem } from '@/interfaces/finplan/chart';

export const getters = {
  getPreviewText: (state: IListsState): string => state.previewText,
  getHeaderTitle: (state: IListsState): string => state.title,
  getChartItemsAboutPage: (state: IListsState): IChartItem[] => state.chartAboutPage.items,
  getChartCategoriesAboutPage: (state: IListsState): number[] => state.chartAboutPage.categories,
  getChartQuartersAboutPage: (state: IListsState): string[] => state.chartAboutPage.quarters,
  getChartIntervalAboutPage: (state: IListsState): string => state.chartAboutPage.currentInterval,
  getCapitalizationDynamics: (state: IListsState): DynamicObject => state.capitalizationDynamics,
};
