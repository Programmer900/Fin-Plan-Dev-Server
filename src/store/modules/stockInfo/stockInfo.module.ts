import { state } from '@/store/modules/stockInfo/state';
import { mutations } from './mutations';
import { actions } from '@/store/modules/stockInfo/actions';
import { getters } from '@/store/modules/stockInfo/getters';

export const stockInfoStore = {
  namespaced: true,
  state: {
    ...state,
  },
  actions: {
    ...actions,
  },
  getters: {
    ...getters,
  },
  mutations: {
    ...mutations,
  },
};
