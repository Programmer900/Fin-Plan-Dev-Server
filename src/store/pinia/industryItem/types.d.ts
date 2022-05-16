export interface IChartItem {
  name: string;
  data: number[];
  type: string;
  color: string;
  visible: boolean;
  permanent?: boolean;
  yAxis?: number;
  alert?: boolean;
}

export interface IChart {
  actives: IChartItem;
  averageProfit: IChartItem;
  currentAssets: IChartItem;
  currentRevenue: IChartItem;
  equity: IChartItem;
  lastYearRevenue: IChartItem;
  profit: IChartItem;
  quarterlyProfit: IChartItem;
  quarterlyRevenue: IChartItem;
  returnOnEquity: IChartItem;
  shareOfEquityInAssets: IChartItem;
  yearSlidingProfit: IChartItem;
  yearSlidingRevenue: IChartItem;
}
