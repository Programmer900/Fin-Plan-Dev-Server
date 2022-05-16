import { getPreviousClose } from '@/services/polygon.service';

export const actions = {
  init({ commit }: { commit: any }, stockTicker: any) {
    return getPreviousClose(stockTicker).then((res) => {
      commit('PREVIOUS_CLOSE', res);
      return Promise.resolve(res);
    });
  },
};
