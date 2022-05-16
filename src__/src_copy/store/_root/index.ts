import { createStore } from 'vuex';
import { stocksFiltersStore } from '@/store/modules/stocksFilters.module';
import { stockInfoStore } from '@/store/modules/stockInfo/stockInfo.module';
import { previousCloseStore } from '@/store/modules/previousClose';
import { localeStore } from '@/store/modules/locale.module';
import { financialStore } from '@/store/modules/financial';
import { documentStore } from '@/store/modules/Document';
import { listsStore } from '@/store/modules/Lists';
import { indexPageStore } from '@/store/modules/IndexPage';

export const rootStore = createStore({
  state: {
    preloader: false,
    stock: {},
    emitent: {},
    bond: {},
  },
  mutations: {
    togglePreloader(state, payload) {
      state.preloader = payload.isActive;
    },
    addStock(state, stock) {
      state.stock = stock;
    },
    addEmitent(state, emitent) {
      state.emitent = emitent;
    },
    addBond(state, bond) {
      state.bond = bond;
    },
  },
  actions: {},
  modules: {
    stocksFiltersStore,
    stockInfoStore,
    previousCloseStore,
    localeStore,
    financialStore,
    documentStore,
    listsStore,
    indexPageStore,
  },
  getters: {
    preloader(state) {
      return state.preloader;
    },
    stock(state) {
      return state.stock;
    },
    bond(state) {
      return state.bond;
    },
    emitent(state) {
      return state.emitent;
    },
  },
});
