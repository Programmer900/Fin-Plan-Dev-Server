export const getters = {
  fullData: (state: any): any => state.previousClose,
  closePrice: (state: any): any => state.previousClose.results[0].c,
};
