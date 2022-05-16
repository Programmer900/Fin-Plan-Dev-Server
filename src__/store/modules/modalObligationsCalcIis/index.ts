import { state } from '@/store/modules/modalObligationsCalcIis/state';
import { actions } from '@/store/modules/modalObligationsCalcIis/actions';
import { mutations } from '@/store/modules/modalObligationsCalcIis/mutations';
import { getters } from '@/store/modules/modalObligationsCalcIis/getters';

export const modalObligationsCalcIisStore = {
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
