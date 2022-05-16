import mutations from '@/store/mutations';

const { STOCKS_FILTER_CHANGE_PICKED, STOCKS_FILTER_CURRENT } = mutations;

export const stocksFiltersStore = {
  namespaced: true,
  state: {
    stocksFilters: [
      {
        name: 'Все',
        isPicked: true,
      },
      {
        name: 'Дивидендные',
        isPicked: false,
      },
      {
        name: 'Экспортеры',
        isPicked: false,
      },
      {
        name: 'Нефтяные',
        isPicked: false,
      },
      {
        name: 'Энергетика',
        isPicked: false,
      },
      {
        name: 'Можно шортить',
        isPicked: false,
      },
      {
        name: 'Можно с плечом',
        isPicked: false,
      },
      {
        name: 'Строительные',
        isPicked: false,
      },
      {
        name: 'Металлурги',
        isPicked: false,
      },
      {
        name: 'Акции до 1000',
        isPicked: false,
      },
    ],
    currentFilter: {},
  },
  getters: {
    allStocks: (state: any): any => state.stocksFilters,
    currentFilter: (state: any): any => state.currentFilter,
  },
  mutations: {
    [STOCKS_FILTER_CHANGE_PICKED](state: any): void {
      state.stocksFilters = state.stocksFilters.forEach(
        (filterItem) => (filterItem.isPicked = false),
      );
    },
    [STOCKS_FILTER_CURRENT](state: any, pickedFilter): void {
      state.currentFilter = pickedFilter;
    },
  },
};
