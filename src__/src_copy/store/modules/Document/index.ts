import { state } from '@/store/modules/Document/state';
import { actions } from '@/store/modules/Document/actions';
import { mutations } from '@/store/modules/Document/mutations';
import { getters } from '@/store/modules/Document/getters';

export const documentStore = {
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
