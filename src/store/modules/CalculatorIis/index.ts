import { state } from '@/store/modules/CalculatorIis/state';
import { actions } from '@/store/modules/CalculatorIis/actions';
import { mutations } from '@/store/modules/CalculatorIis/mutations';
import { getters } from '@/store/modules/CalculatorIis/getters';

export const calculatorIisStore = {
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
