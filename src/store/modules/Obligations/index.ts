import { state } from '@/store/modules/Obligations/state';
import { actions } from '@/store/modules/Obligations/actions';
import { mutations } from '@/store/modules/Obligations/mutations';
import { getters } from '@/store/modules/Obligations/getters';

export const obligationsStore = {
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
