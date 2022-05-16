import { DynamicObject } from '@/interfaces';
import i18n from '@/plugins/i18n/vue-i18n';

export interface IIndicatorsChartItem {
  name: string;
  data: number[];
  type: string;
  color: string;
  visible: boolean;
  permanent?: boolean;
  yAxis?: number;
  alert?: boolean;
}

export interface IIndicatorsChart {
  quotes: IIndicatorsChartItem;
  actives: IIndicatorsChartItem;
  averageProfit: IIndicatorsChartItem;
  currentAssets: IIndicatorsChartItem;
  currentRevenue: IIndicatorsChartItem;
  equity: IIndicatorsChartItem;
  lastYearRevenue: IIndicatorsChartItem;
  profit: IIndicatorsChartItem;
  quarterlyProfit: IIndicatorsChartItem;
  quarterlyRevenue: IIndicatorsChartItem;
  returnOnEquity: IIndicatorsChartItem;
  shareOfEquityInAssets: IIndicatorsChartItem;
  yearSlidingProfit: IIndicatorsChartItem;
  yearSlidingRevenue: IIndicatorsChartItem;
}

export interface IDocumentState {
  data: DynamicObject | null;
  financialData: DynamicObject | null;
  emitentData: DynamicObject | null;
  type: string | null;
  region: string | null;
  id: string | null;
  indicatorsChart: IIndicatorsChart;
  indicatorsChartCategories: number[];
  indicatorsChartQuarter: string[];
  indicatorsChartLocaleInit: boolean;
  currentTableProp: string;
}

export const vanilaIndicatorsChartState = (): IIndicatorsChart => ({
  quotes: {
    name: i18n.global.messages.ru.page.document.quotes,
    data: [],
    type: 'line',
    color: '#138ec4',
    visible: true,
    permanent: true,
    yAxis: 1,
  },
  actives: {
    name: i18n.global.messages.ru.page.document.actives,
    data: [],
    type: 'column',
    color: '#97b3de',
    visible: true,
    alert: true,
  },
  averageProfit: {
    name: i18n.global.messages.ru.page.document.averageProfit,
    data: [],
    type: 'column',
    color: '#455f85',
    visible: false,
  },
  currentAssets: {
    name: i18n.global.messages.ru.page.document.currentAssets,
    data: [],
    type: 'column',
    color: '#fec006',
    visible: true,
  },
  currentRevenue: {
    name: i18n.global.messages.ru.page.document.currentRevenue,
    data: [],
    type: 'column',
    color: '#F27362',
    visible: true,
    alert: true,
  },
  equity: {
    name: i18n.global.messages.ru.page.document.equity,
    data: [],
    type: 'column',
    color: '#2a8634',
    visible: false,
    alert: true,
  },
  lastYearRevenue: {
    name: i18n.global.messages.ru.page.document.lastYearRevenue,
    data: [],
    type: 'column',
    color: '#AC5BBE',
    visible: false,
    alert: true,
  },
  profit: {
    name: i18n.global.messages.ru.page.document.profit,
    data: [],
    type: 'column',
    color: '#71ad52',
    visible: false,
  },
  quarterlyProfit: {
    name: i18n.global.messages.ru.page.document.quarterlyProfit,
    data: [],
    type: 'column',
    color: '#F5DD50',
    visible: false,
  },
  quarterlyRevenue: {
    name: i18n.global.messages.ru.page.document.quarterlyRevenue,
    data: [],
    type: 'column',
    color: '#E1953C',
    visible: false,
  },
  returnOnEquity: {
    name: i18n.global.messages.ru.page.document.returnOnEquity,
    data: [],
    type: 'column',
    color: '#EFB068',
    visible: false,
  },
  shareOfEquityInAssets: {
    name: i18n.global.messages.ru.page.document.shareOfEquityInAssets,
    data: [],
    type: 'column',
    color: '#ff4495',
    visible: false,
  },
  yearSlidingProfit: {
    name: i18n.global.messages.ru.page.document.yearSlidingProfit,
    data: [],
    type: 'column',
    color: '#36173d',
    visible: false,
  },
  yearSlidingRevenue: {
    name: i18n.global.messages.ru.page.document.yearSlidingRevenue,
    data: [],
    type: 'column',
    color: '#48ac99',
    visible: false,
  },
});

export const vanilaState = (): IDocumentState => ({
  data: null,
  financialData: null,
  emitentData: null,
  type: null,
  region: null,
  id: null,
  indicatorsChart: vanilaIndicatorsChartState(),
  indicatorsChartCategories: [],
  indicatorsChartQuarter: [],
  indicatorsChartLocaleInit: false,
  currentTableProp: 'year',
});

export const state: IDocumentState = {
  ...vanilaState(),
};
