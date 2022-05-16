import { IListsState, setVanillaChart, setVanillaState } from '@/store/modules/Lists/state';

export const mutations = {
  setDefaultChartAboutPageState: (state: IListsState): void => {
    state.chartAboutPage.items = [];
    state.chartAboutPage.categories = [];
    state.chartAboutPage.quarters = [];
  },
  setChartIntervalAboutPage: (state: IListsState, newValue: string): void => {
    state.chartAboutPage.currentInterval = newValue;
  },
};
