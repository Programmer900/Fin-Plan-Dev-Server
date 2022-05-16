import { DynamicObject } from '@/interfaces';
import { IChartItem } from '@/interfaces/finplan/chart';

export interface IListsChart {
  title: string;
  currentInterval: string;
  items: IChartItem[];
  categories: number[];
  quarters: string[];
}

export interface IListsState {
  title: string;
  type: string;
  previewText: string;
  capitalizationDynamics: DynamicObject;
  chartAboutPage: IListsChart;
  chartPE: IListsChart;
  chartCapitalGrowth: IListsChart;
}

export const setVanillaChart = (): IListsChart => ({
  title: '',
  currentInterval: 'year',
  items: [],
  categories: [],
  quarters: [],
});

export const setVanillaState = (): IListsState => ({
  title: '',
  type: '',
  previewText: '',
  capitalizationDynamics: {},
  chartAboutPage: setVanillaChart(),
  chartPE: setVanillaChart(),
  chartCapitalGrowth: setVanillaChart(),
});

export const state: IListsState = {
  ...setVanillaState(),
};
