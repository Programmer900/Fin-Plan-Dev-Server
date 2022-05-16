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
