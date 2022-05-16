import { state } from '@/store/modules/modalObligationsCalc/state';
import { actions } from '@/store/modules/modalObligationsCalc/actions';
import { mutations } from '@/store/modules/modalObligationsCalc/mutations';
import { getters } from '@/store/modules/modalObligationsCalc/getters';

export const modalObligationsCalcStore = {
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
