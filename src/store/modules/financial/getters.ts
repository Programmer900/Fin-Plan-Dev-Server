export const getters = {
  getProp: (state: any): string => state.prop,
  getPeriodVal: (state: any): any => state.periodVal,
  getPeriodYear: (state: any): any => state.periodYear,
  getGraphData: (state: any): any => {
    const actives = state.actives.slice().reverse().map(Number);
    const currentActives = state.currentActives.slice().reverse().map(Number);
    const revenueLastYear = state.revenueLastYear.slice().reverse().map(Number);
    const equityCapital = state.equityCapital.slice().reverse().map(Number);
    const revenueYearRolling = state.revenueYearRolling.slice().reverse().map(Number);
    const pastCapitalization = state.pastCapitalization.slice().reverse().map(Number);
    const currentRevenue = state.currentRevenue.slice().reverse().map(Number);
    const quarterlyRevenue = state.quarterlyRevenue.slice().reverse().map(Number);
    const shareEquityActives = state.shareEquityActives.slice().reverse().map(Number);
    const profit = state.profit.slice().reverse().map(Number);
    const profitYearRolling = state.profitYearRolling.slice().reverse().map(Number);
    const quarterlyProfit = state.quarterlyProfit.slice().reverse().map(Number);
    const returnOnEquity = state.returnOnEquity.slice().reverse().map(Number);
    const revenueGrowthRate = state.revenueGrowthRate.slice().reverse().map(Number);
    const activesGrowthRate = state.activesGrowthRate.slice().reverse().map(Number);
    const profitGrowthRate = state.profitGrowthRate.slice().reverse().map(Number);

    return {
      actives,
      currentActives,
      revenueLastYear,
      equityCapital,
      revenueYearRolling,
      pastCapitalization,
      currentRevenue,
      quarterlyRevenue,
      shareEquityActives,
      profit,
      profitYearRolling,
      quarterlyProfit,
      returnOnEquity,
      revenueGrowthRate,
      activesGrowthRate,
      profitGrowthRate,
    };
  },
  getPickedRows: (state: any) => state.pickedRows,
  getGraphSeriesData: (state: any) => state.graphSeriesData,
  getGraphDates: (state: any): any => state.graphDates,
  getActives: (state: any): any => state.actives,
  getCurrentActives: (state: any): any => state.currentActives,
  getEquityCapital: (state: any): any => state.equityCapital,
  getRevenueLastYear: (state: any): any => state.revenueLastYear,
  getRevenueYearRolling: (state: any): any => state.revenueYearRolling,
  getPastCapitalization: (state: any): any => state.pastCapitalization,
  getCurrentRevenue: (state: any): any => state.currentRevenue,
  getQuarterlyRevenue: (state: any): any => state.quarterlyRevenue,
  getShareEquityActives: (state: any): any => state.shareEquityActives,
  getProfit: (state: any): any => state.profit,
  getProfitYearRolling: (state: any): any => state.profitYearRolling,
  getQuarterlyProfit: (state: any): any => state.quarterlyProfit,
  getReturnOnEquity: (state: any): any => state.returnOnEquity,
  getRevenueGrowthRate: (state: any): any => state.revenueGrowthRate,
  getActivesGrowthRate: (state: any): any => state.activesGrowthRate,
  getProfitGrowthRate: (state: any): any => state.profitGrowthRate,
};
