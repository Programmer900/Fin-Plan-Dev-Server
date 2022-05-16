import { state } from '@/store/modules/Lists/state';
import { actions } from '@/store/modules/Lists/actions';
import { mutations } from '@/store/modules/Lists/mutations';
import { getters } from '@/store/modules/Lists/getters';

export const listsStore = {
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
