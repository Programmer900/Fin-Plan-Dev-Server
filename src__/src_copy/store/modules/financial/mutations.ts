export const mutations = {
  setFullData: (state: any, newData: any): void => {
    state.fullData = newData;
  },
  setProp: (state: any, newProp: string): void => {
    state.prop = newProp.toLowerCase();
  },
  setGraphSeriesReverseValue: (state: any, id: any): void => {
    state.graphSeriesData[id].show = !state.graphSeriesData[id].show;
  },
  setPeriodVal: (state: any, newItem: any): void => {
    if (newItem.periodVal) {
      state.periodVal.push(newItem.periodVal);
    } else {
      state.periodVal.push('?');
    }
  },
  setPeriodYear: (state: any, newItem: any): void => {
    if (newItem.periodYear) {
      state.periodYear.push(newItem.periodYear);
    } else {
      state.periodYear.push('?');
    }
  },
  setGraphDates: (state: any, newItem: any): void => {
    state.graphDates.push(newItem);
  },
  setActives: (state: any, newItem: any): void => {
    if (newItem.actives) {
      state.actives.push(Number(newItem.actives));
    } else {
      state.actives.push(state.empty);
    }
  },
  setCurrentActives: (state: any, newItem: any): void => {
    if (newItem.currentAssets) {
      state.currentActives.push(Number(newItem.currentAssets));
    } else {
      state.currentActives.push(state.empty);
    }
  },
  setEquityCapital: (state: any, newItem: any): void => {
    if (newItem.equity) {
      state.equityCapital.push(newItem.equity);
    } else {
      state.equityCapital.push(state.empty);
    }
  },
  setRevenueLastYear: (state: any, newItem: any): void => {
    if (newItem.lastYearRevenue) {
      state.revenueLastYear.push(Number(newItem.lastYearRevenue));
    } else {
      state.revenueLastYear.push(state.empty);
    }
  },
  setRevenueYearRolling: (state: any, newItem: any): void => {
    if (newItem.yearSlidingRevenue) {
      state.revenueYearRolling.push(newItem.yearSlidingRevenue);
    } else {
      state.revenueYearRolling.push(state.empty);
    }
  },
  setPastCapitalization: (state: any, newItem: any): void => {
    if (newItem.capitalization) {
      state.pastCapitalization.push(newItem.capitalization);
    } else {
      state.pastCapitalization.push(state.empty);
    }
  },
  setCurrentRevenue: (state: any, newItem: any): void => {
    if (newItem.currentRevenue) {
      state.currentRevenue.push(newItem.currentRevenue);
    } else {
      state.currentRevenue.push(state.empty);
    }
  },
  setQuarterlyRevenue: (state: any, newItem: any): void => {
    if (newItem.quarterlyRevenue) {
      state.quarterlyRevenue.push(newItem.quarterlyRevenue);
    } else {
      state.quarterlyRevenue.push(state.empty);
    }
  },
  setShareEquityActives: (state: any, newItem: any): void => {
    if (newItem.shareOfEquityInAssets) {
      state.shareEquityActives.push(newItem.shareOfEquityInAssets);
    } else {
      state.shareEquityActives.push(state.empty);
    }
  },
  setProfit: (state: any, newItem: any): void => {
    if (newItem.profit) {
      state.profit.push(newItem.profit);
    } else {
      state.profit.push(state.empty);
    }
  },
  setProfitYearRolling: (state: any, newItem: any): void => {
    if (newItem.yearSlidingProfit) {
      state.profitYearRolling.push(newItem.yearSlidingProfit);
    } else {
      state.profitYearRolling.push(state.empty);
    }
  },
  setQuarterlyProfit: (state: any, newItem: any): void => {
    if (newItem.quarterlyProfit) {
      state.quarterlyProfit.push(newItem.quarterlyProfit);
    } else {
      state.quarterlyProfit.push(state.empty);
    }
  },
  setReturnOnEquity: (state: any, newItem: any): void => {
    if (newItem.returnOnEquity) {
      state.returnOnEquity.push(newItem.returnOnEquity);
    } else {
      state.returnOnEquity.push(state.empty);
    }
  },
  setRevenueGrowthRate: (state: any, newItem: any): void => {
    if (newItem.revenueGrowRate) {
      state.revenueGrowthRate.push(newItem.revenueGrowRate);
    } else {
      state.revenueGrowthRate.push(state.empty);
    }
  },
  setActivesGrowthRate: (state: any, newItem: any): void => {
    if (newItem.assetGrowthRate) {
      state.activesGrowthRate.push(newItem.assetGrowthRate);
    } else {
      state.activesGrowthRate.push(state.empty);
    }
  },
  setProfitGrowthRate: (state: any, newItem: any): void => {
    if (newItem.profitGrowRate) {
      state.profitGrowthRate.push(newItem.profitGrowRate);
    } else {
      state.profitGrowthRate.push(state.empty);
    }
  },
};
