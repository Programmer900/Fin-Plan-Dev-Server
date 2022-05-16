import { createMemoryHistory, createRouter, createWebHistory, Router } from 'vue-router';
// import { isSSR } from '@/helpers';
import { RouteLocationNormalized } from 'vue-router';
import { routes } from './routes';
// import { LS_LOCALE } from '../../env.common';
// import i18n from '@/plugins/i18n/vue-i18n';

// const router = createRouter({
//   history: isSSR() ? createMemoryHistory() : createWebHistory(),
//   routes,
// });

// router.beforeEach((to, from, next) => {
//   let { locale } = to.params;
//
//   if (!locale || !['ru', 'en'].includes(String(locale))) {
//     if (isSSR()) {
//       locale = 'ru';
//     } else {
//       locale = localStorage.getItem(LS_LOCALE) || 'ru';
//     }
//
//     i18n.global.locale = String(locale);
//
//     if (!['ru', 'en'].includes(String(locale))) {
//       return next(`/${locale}/`);
//     }
//
//     return next(`/${locale}${to.fullPath}`);
//   }
//
//   i18n.global.locale = String(locale);
//
//   return next();
// });

// export function createApplicationRouter(): Router {
//   return router;
// }

import { LS_LOCALE } from '../../env.common';
import i18n from '@/plugins/i18n/vue-i18n';

const checkLocale = (to: RouteLocationNormalized) => {
  let { locale } = to.params;

  if (!locale || !['ru', 'en'].includes(String(locale))) {
    locale = 'ru';

    i18n.global.locale = String(locale);

    return {
      isHaveLocale: false,
      locale,
    };
  }

  i18n.global.locale = String(locale);

  return {
    isHaveLocale: true,
    locale,
  };
};

export const checkRoute = (to, from, next) => {
  const { isHaveLocale, locale } = checkLocale(to);

  if (isHaveLocale) {
    return next();
  }

  return next(`/${locale}${to.fullPath}`);
};
