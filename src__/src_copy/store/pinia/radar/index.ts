import { defineStore } from 'pinia';
import { cloneDeep, includes } from 'lodash';
import { useApiRadar } from '@/api/radar';
import { useError } from '@/use/useError';
import { useStringUtils } from '@/use/root/utils/string';
import { useRadarHelpers } from '@/store/pinia/radar/helpers';
import type { TRadarActive, TRadarTab } from '@/store/pinia/radar/types';
import { DynamicObject } from '@/interfaces';
import { useObjectUtils } from '@/use/root/utils/object';
import { useArrayUtils } from '@/use/root/utils/array';
import { filters, activesTable } from './helpers/defaultStates';

/**
 * Хранилище для страницы радара.
 * Название вкладок привязано к ключам некоторых объектов
 */
export const radarStore = defineStore('RADAR_STORE', () => {
  const { _catch } = useError('radarStore');
  const { getFilterStrategy, getActivesList } = useApiRadar();
  const { getQueryObject } = useStringUtils();
  const { prepareFiltersForSending, updateFilterValues } = useRadarHelpers();
  const { hasKey } = useObjectUtils();
  const { hasObjectByKey } = useArrayUtils();

  const state = reactive({
    // Статус инициализации состояния
    isInit: false,

    // Ключи хранилища
    storage: {
      filters: 'RADAR_USER_FILTERS_V1',
      presetSelect: 'RADAR_USER_PRESET_SELECT_V1',
    },

    // Готовые стратегии (приходят по апи)
    filterStrategies: undefined as any,

    // Список активов
    actives: {
      bonds: [] as DynamicObject[],
      etf: [] as DynamicObject[],
      shares: [] as DynamicObject[],
      shares_usa: [] as DynamicObject[],
    },

    // Выбранные пользователем активы
    selectedActives: {
      bonds: [] as DynamicObject,
      etf: [] as DynamicObject[],
      shares: [] as DynamicObject[],
      shares_usa: [] as DynamicObject[],
    },

    // Данные о текущем списке активов
    activesMetaData: {
      bonds: {
        totalItems: 0,
        shownItems: 0,
      },
      etf: {
        totalItems: 0,
        shownItems: 0,
      },
      shares: {
        totalItems: 0,
        shownItems: 0,
      },
      shares_usa: {
        totalItems: 0,
        shownItems: 0,
      },
    },

    // Текущий вид списка активов
    activesViewMode: 'min' as 'min' | 'max',

    // Данные для построения таблиц
    activesTable: {
      ...activesTable,
    },

    // Данные о деньгах
    money: {
      totalInvestment: 400000,
      currentInvestment: 0,
      distributed: 0,
      notDistributed: 0,
      fixedIncome: 0,
    },

    // Процессы для отслеживания определенных событий
    processes: {
      updateActives: false,
      updateSelectedActives: false,
      updateFilters: false,
    },

    // Текущая вкладка
    currentTab: 'bonds' as TRadarTab,

    // Текущие страницы списка активов для каждой страницы
    pages: {
      bonds: 1,
      etf: 1,
      shares: 1,
      shares_usa: 1,
    },

    // Лимит активов для запроса на получение списка активов
    pageSize: 5,

    // Фильтры
    filters: {
      ...filters,
    },

    // Активирован ли режим выбора готовой стратегии
    presetSelect: {
      bonds: true,
      shares: true,
      shares_usa: true,
      etf: true,
    },
  });

  /**
   * Получить готовые стратегии по типу бумаги
   * @param type Тип бумаги
   */
  const getPresets = (type: TRadarActive): any[] => {
    try {
      if (typeof state.filterStrategies[String(type)] === 'undefined') return [];
      return Object.values(state.filterStrategies[String(type)]);
    } catch (e) {
      _catch(e, `getPreset. Type = ${type}`);
      return [];
    }
  };

  /**
   * Проверка ответа от сервера на получение списка активов
   * @param response Ответ от сервера
   */
  const checkActivesResponse = (response: any): DynamicObject[] => {
    try {
      if (response.data) {
        if (Array.isArray(response.data.items)) {
          return [...response.data.items];
        }
      }
      return [];
    } catch (e) {
      _catch(e, 'checkActivesResponse');
      return [];
    }
  };

  /**
   * Обновить общее и показываемое кол-во активов.
   * Используется при смене вкладки
   * @param data Объект, где содержится информация
   */
  const updateActivesMeta = (data: any) => {
    state.activesMetaData[state.currentTab].totalItems = data.total_items;
    state.activesMetaData[state.currentTab].shownItems = data.shows;
  };

  const updateActivesPageNumber = (data: any) => {
    if (data.total_items !== data.shows) {
      state.pages[state.currentTab] += 1;
    }
  };

  /**
   * Получить список активов исходя из фильтров
   * @param resetState Сбросить массив активов
   */
  const updateActives = async (resetState = false) => {
    try {
      state.processes.updateActives = true;

      let res;

      if (state.currentTab === 'bonds') {
        res = await getActivesList(
          'bonds',
          'full',
          state.pages.bonds,
          state.pageSize,
          prepareFiltersForSending(state.filters.bonds),
        );
      }
      if (state.currentTab === 'etf') {
        res = await getActivesList(
          'shares_etf',
          'full',
          state.pages.etf,
          state.pageSize,
          prepareFiltersForSending(state.filters.etf),
        );
      }
      if (state.currentTab === 'shares') {
        res = await getActivesList(
          'shares',
          'full',
          state.pages.shares,
          state.pageSize,
          prepareFiltersForSending(state.filters.shares),
        );
      }
      if (state.currentTab === 'shares_usa') {
        res = await getActivesList(
          'shares_usa',
          'full',
          state.pages.shares_usa,
          state.pageSize,
          prepareFiltersForSending(state.filters.shares_usa),
        );
      }

      if (resetState) {
        state.actives[state.currentTab] = [];
      }

      const resActives = checkActivesResponse(res);

      if (resActives.length > 0) {
        resActives.forEach((active) => {
          state.actives[state.currentTab].push({
            ...active,
            isSelected: false,
            count: 1,
          });
        });
      }

      updateActivesMeta(res.data);
      updateActivesPageNumber(res.data);
    } catch (e) {
      _catch(e, 'getActives');
    } finally {
      state.processes.updateActives = false;
    }
  };

  /**
   * Загрузить состояние из хранилища
   */
  const loadStateFromStorage = (): void => {
    try {
      if (typeof window === 'undefined') return;

      // const storageFilters = localStorage.getItem(state.storage.filters);
      // const storagePresetSelect = localStorage.getItem(state.storage.presetSelect);
      //
      // if (storageFilters) {
      //   state.filters = JSON.parse(storageFilters);
      // }
      //
      // if (storagePresetSelect) {
      //   state.presetSelect = JSON.parse(storagePresetSelect);
      // }
    } catch (e) {
      _catch(e, 'loadStateFromStorage');
    }
  };

  /**
   * Установить состояние в хранилище
   */
  const setStateToStorage = (): void => {
    try {
      if (typeof window === 'undefined') return;

      localStorage.setItem(state.storage.filters, JSON.stringify(state.filters));
      localStorage.setItem(state.storage.presetSelect, JSON.stringify(state.presetSelect));
    } catch (e) {
      _catch(e, 'setStateToStorage');
    }
  };

  /**
   * Удалить состояние из хранилища
   */
  const removeStateFromStorage = (): void => {
    try {
      if (typeof window === 'undefined') return;

      localStorage.removeItem(state.storage.filters);
      localStorage.removeItem(state.storage.presetSelect);
    } catch (e) {
      _catch(e, 'removeStateFromStorage');
    }
  };

  const updateFilter = (filterName: string, filterValue: any): boolean => {
    try {
      if (filterName !== '' && filterValue !== '') {
        if (hasKey(state.filters[state.currentTab], filterName)) {
          state.filters[state.currentTab][filterName].value = filterValue;
          return true;
        }
      }
      return false;
    } catch (e) {
      _catch(e, 'updateFilter');
      return false;
    }
  };

  return {
    ...toRefs(state),
    getPresets,
    updateActives,
    loadStateFromStorage,

    /**
     * Вывести все данные состояния
     */
    logState: () => console.log(state),

    /**
     * Инициализация состояния
     */
    init: async (): Promise<boolean> => {
      try {
        if (state.isInit) return true;

        // Получение готовых стратегий
        const resStrategies = await getFilterStrategy();

        if (resStrategies.data) {
          state.filterStrategies = resStrategies.data;
        }
        // -----------------------------

        state.isInit = true;

        return state.isInit;
      } catch (e) {
        _catch(e, 'init');
        return false;
      }
    },

    /**
     * Переключить режим настройки стратегии
     */
    togglePresetSelectionMode: (): boolean => {
      state.presetSelect[state.currentTab] = !state.presetSelect[state.currentTab];
      setStateToStorage();
      return state.presetSelect[state.currentTab];
    },

    /**
     * Получить список готовых стратегий для выбранной вкладки
     */
    getCurrentPresetList: (): any[] => {
      if (state.currentTab === 'market-map') return [];
      return getPresets(state.currentTab);
    },

    /**
     * Изменить стратегию
     * @param presetName Название стратегии
     */
    changePreset: async (presetName: string): Promise<void> => {
      try {
        for (const filterKey in state.filterStrategies[state.currentTab]) {
          const item = state.filterStrategies[state.currentTab][filterKey];
          if (item.NAME === presetName) {
            state.processes.updateFilters = true;

            state.actives[state.currentTab] = [];
            state.pages[state.currentTab] = 1;
            state.presetSelect[state.currentTab] = false;

            const apiFilters = getQueryObject(item.FILTER_VALUE, true);

            for (const apiFiltersKey in apiFilters) {
              if (hasKey(state.filters[state.currentTab], apiFiltersKey)) {
                if (hasKey(state.filters[state.currentTab][apiFiltersKey], 'fromApi')) {
                  state.filters[state.currentTab][apiFiltersKey].value =
                    state.filters[state.currentTab][apiFiltersKey].fromApi[
                      apiFilters[apiFiltersKey]
                    ];
                } else {
                  state.filters[state.currentTab][apiFiltersKey].value = apiFilters[apiFiltersKey];
                }
              } else {
                console.error('Отсутствует ключ в объекте filters');
                console.error(`Current tab = ${state.currentTab}`);
                console.error(`Key = ${apiFiltersKey}`);
                console.error(`Value = ${apiFilters[apiFiltersKey]}`);
              }
            }

            // await updateActives();
            setStateToStorage();

            console.log(state.filters[state.currentTab]);
            // console.log(state.actives[state.currentTab]);
            state.processes.updateFilters = false;
            return;
          }
        }
      } catch (e) {
        _catch(e, 'changePreset');
      }
    },

    /**
     * Сбросить состояние в хранилище
     */
    resetFilters: (): boolean => {
      try {
        removeStateFromStorage();
        window.location.reload();
        return true;
      } catch (e) {
        _catch(e, 'resetFilters');
        return false;
      }
    },

    /**
     * Изменить вкладку
     * @param newTab Новая вкладка
     */
    changeTab: async (newTab): Promise<void> => {
      try {
        if (state.currentTab !== newTab) {
          state.currentTab = newTab;
          if (state.actives[state.currentTab].length === 0) {
            await updateActives();
          }
        }
      } catch (e) {
        _catch(e, 'changeTab');
      }
    },

    /**
     * Форматировать значение
     * @param active Актив
     * @param activeValueKey Ключ/Формула для получения значения
     */
    activeStatValueFormatter: (active: any, activeValueKey: string) => {
      // TODO: Поддержка формул. Например 'value_1 + value_2 / 100'
      if (active[activeValueKey]) {
        return active[activeValueKey];
      }
      return 0;
    },

    /**
     * Триггер при изменении одного из фильтров. Параметры передаются для force update фильтра
     * @param filterName Название фильтры
     * @param filterValue Значение
     * @param options Настройки
     */
    changeFilterValue: async (
      filterName = '',
      filterValue = '',
      options = {
        // Обновить только значение фильтра, без обновления списка активов
        silentUpdate: false,
      },
    ) => {
      try {
        if (state.processes.updateFilters) return;

        console.warn('changeFilterValue');

        if (options.silentUpdate) {
          updateFilter(filterName, filterValue);
          return;
        }

        state.processes.updateFilters = true;

        state.activesMetaData[state.currentTab].totalItems = 0;
        state.activesMetaData[state.currentTab].shownItems = 0;

        updateFilter(filterName, filterValue);

        state.pages[state.currentTab] = 1;
        await updateActives(true);

        state.processes.updateFilters = false;
        console.log(state.filters[state.currentTab]);
        console.log(state.actives[state.currentTab].length);
      } catch (e) {
        _catch(e, 'changeFilter');
      }
    },

    /**
     * Получить текущую вкладку
     */
    getCurrentTab: computed(() => state.currentTab),

    /**
     * Получить список активов для текущей вкладки
     */
    getCurrentActives: computed(() => state.actives[state.currentTab]),

    /**
     * Получить список названий колонок (групп) показателей для текущей вкладки
     */
    getCurrentStatTitles: computed((): string[] => state.activesTable[state.currentTab].statTitles),

    /**
     * Получить список названий показателей для текущей вкладки
     */
    getCurrentStatValueTitles: computed(() => state.activesTable[state.currentTab].statValueTitles),

    /**
     * Получить список ключей для получения значения из объекта актива для текущей вкладки
     */
    getCurrentStatValueActiveKeys: computed(
      () => state.activesTable[state.currentTab].statValueActiveKeys,
    ),

    /**
     * Получить общее кол-во активов для текущей вкладки
     */
    getCurrentActivesTotalItems: computed(() => state.activesMetaData[state.currentTab].totalItems),

    /**
     * Получить кол-во показанных активов для текущей вкладки
     */
    getCurrentActivesShownItems: computed(() => state.activesMetaData[state.currentTab].shownItems),

    /**
     * Эквивалентно ли общее кол-во активов и кол-во показанных активов для текущей вкладки
     */
    getCurrentEqualItemsCount: computed(
      () =>
        state.activesMetaData[state.currentTab].totalItems ===
        state.activesMetaData[state.currentTab].shownItems,
    ),
  };
});
