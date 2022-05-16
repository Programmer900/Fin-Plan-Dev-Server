export const getters = {
  fullInfo: (state: any): any => state.stockInfo,
  periods: (state: any): any => state.stockInfo.RADAR_DATA.PERIODS,
  weekCandleData: (state: any) => state.stockInfo.GRAPH_CANDLE_DATA.W,
  monthCandle: (state: any) => state.stockInfo.GRAPH_CANDLE_DATA.M,
  getMonthCandleUfClose: (state: any) => {
    const data: any = [];
    const values = Object.values(state.stockInfo.GRAPH_CANDLE_DATA.M);

    values.forEach((item: any) => data.push(Number(item.UF_CLOSE)));

    return data;
  },
  getMonthCandleDates: (state: any) => state.monthCandleDates,
  getBeta: (state: any): number => Number(state.stockInfo.RADAR_DATA.PROPS.BETTA),
  getPE: (state: any): number => Number(state.stockInfo.RADAR_DATA.DYNAM.PE),
  getPB: (state: any): number => Number(state.stockInfo.MIN_MAX.PB),
  getProfit: (state: any): number => Number(state.stockInfo.RADAR_DATA.DYNAM['Прибыль']),
  getDividends: (state: any): number => Number(state.stockInfo.RADAR_DATA.DYNAM['Дивиденды %']),
  getEquityCapital: (state: any): number =>
    Number(Number(state.stockInfo.RADAR_DATA.DYNAM['Собственный капитал']).toFixed(0)),
  getCapitalization: (state: any): number =>
    Number(state.stockInfo.RADAR_DATA.PROPS.ISSUECAPITALIZATION),
  getRevenue: (state: any): number =>
    Number(state.stockInfo.MIN_MAX['Выручка за год (скользящая)'].MAX),
  getMinMax: (state: any): any => state.stockInfo.MIN_MAX,
  getAssetsChart: (state: any): any => state.stockInfo.GRAPH_CANDLE_DATA.W,
};
