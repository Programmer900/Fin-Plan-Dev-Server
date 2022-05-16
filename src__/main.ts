import { createHead } from '@vueuse/head';
import { viteSSR, ClientOnly } from 'vite-ssr/vue';
import devalue from '@nuxt/devalue';
import mitt from 'mitt';
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { IncomingMessage } from 'http';
import { middlewareHandler, Middleware } from 'vite-ssr-middleware';
import VueHighcharts from 'vue3-highcharts';
import { routes } from '@/routing/routes';
import { rootStore } from '@/store/_root';
import App from '@/App.vue';
import { checkRoute } from '@/routing/router';
import { setupDirectives } from '@/vue-directives';

import './styles/global.scss';
import './components/assets/styles/libs.min.css';
import './components/assets/styles/styles.css';
import './assets/scss/styles.scss';

const middlewareGlob = import.meta.globEager('./middlewares/*.ts');

const Options: Parameters<typeof viteSSR>['1'] = {
  routes,
  pageProps: {
    passToPage: false,
  },
  transformState(state) {
    return import.meta.env.SSR ? devalue(state) : state;
  },
};

export default viteSSR(App, Options, async (params) => {
  const { app, router, initialState, request, isClient } = params;

  // Cookie Parser
  if (!isClient) {
    const req = request as IncomingMessage;
    initialState.cookies = req.headers.cookie
      ?.split(';')
      .map((v) => {
        const cookiesplit = v.split('=');
        const cookieName = cookiesplit[0];
        const cookieValue = cookiesplit[1];

        return {
          [cookieName]: cookieValue,
        };
      })
      .reduce((acc, currentValue) => {
        for (const [key, name] of Object.entries(currentValue)) {
          acc[key] = name;
        }
        return acc;
      }, {});
  }

  Object.values(import.meta.globEager('./modules/*.ts')).map((i) => i.install?.(params));

  const head = createHead();

  app.use(head);
  app.use(rootStore);
  app.use(VueHighcharts);
  app.component('ClientOnly', ClientOnly);

  if (isClient) {
    rootStore.replaceState(initialState.vuex);
  } else {
    initialState.vuex = rootStore.state;
  }

  app.config.globalProperties.emitter = mitt();
  setupDirectives(app);

  // Importing middlewares
  const middlewares: Middleware[] = Object.keys(middlewareGlob).map(
    (key) => middlewareGlob[key].default,
  );

  router.beforeEach(
    (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      checkRoute(to, from, next);
      // next();
    },
  );

  router.beforeEach(middlewareHandler(params, middlewares));

  return {
    head,
  };
});
