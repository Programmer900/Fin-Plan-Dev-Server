import { state } from '@/store/modules/financial/state';
import { actions } from '@/store/modules/financial/actions';
import { mutations } from '@/store/modules/financial/mutations';
import { getters } from '@/store/modules/financial/getters';

export const financialStore = {
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
