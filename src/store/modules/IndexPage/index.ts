import { state } from '@/store/modules/IndexPage/state';
import { actions } from '@/store/modules/IndexPage/actions';
import { mutations } from '@/store/modules/IndexPage/mutations';
import { getters } from '@/store/modules/IndexPage/getters';

export const indexPageStore = {
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
