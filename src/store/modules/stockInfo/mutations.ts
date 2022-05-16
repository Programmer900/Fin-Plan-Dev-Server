export const mutations = {
  STOCK_INFO(state: any, newValue: any): void {
    state.stockInfo = newValue;
  },
  setMonthCandleDates(state: any, newValues: any): void {
    const year = newValues.year || '';
    const month = newValues.month || '';

    state.monthCandleDates.push(`${month} ${year}`);
  },
};
