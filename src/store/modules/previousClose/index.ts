import { state } from '@/store/modules/previousClose/state';
import { mutations } from '@/store/modules/previousClose/mutations';
import { actions } from '@/store/modules/previousClose/actions';
import { getters } from '@/store/modules/previousClose/getters';

export const previousCloseStore = {
  namespaced: true,
  state: {
    ...state,
  },
  actions: {
    ...actions,
  },
  mutations: {
    ...mutations,
  },
  getters: {
    ...getters,
  },
};
