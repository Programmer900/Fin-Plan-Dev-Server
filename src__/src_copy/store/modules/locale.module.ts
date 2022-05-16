import i18n from '@/plugins/i18n/vue-i18n';

import { LS_LOCALE } from '../../../env.common';

export const localeStore = {
  namespaced: true,
  state: {
    // Не работает в SSR
    // appLang: localStorage.getItem(LS_LOCALE) || 'ru',
    appLang: 'ru',
  },
  actions: {
    init({ state }: { state: any }, locale: string): void {
      i18n.global.locale = locale;
      state.appLang = locale;
    },
  },
  mutations: {
    setAppLang(state: any, newValue: string): void {
      const _newValue = newValue.toLowerCase();

      state.appLang = _newValue;
      i18n.global.locale = _newValue;
      localStorage.setItem(LS_LOCALE, _newValue);
    },
  },
  getters: {
    getAppLang: (state: any): string => state.appLang,
    getOtherLocale: () => {
      const unpickedList: string[] = [];

      Object.keys(i18n.global.messages).forEach((lang) => {
        if (lang.toLowerCase() !== i18n.global.locale.toLowerCase()) {
          unpickedList.push(lang);
        }
      });

      return unpickedList;
    },
  },
};
