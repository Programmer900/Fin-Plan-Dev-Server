import { RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
  {
    path: '/blog',
    // path: '/:locale/document/:region/:company/:ticker/:bondcode/:document',
    name: 'Blog',
    component: () => import('../views/Blog/index.vue'),
  },
  {
    path: '/learning',
    // path: '/:locale/document/:region/:company/:ticker/:bondcode/:document',
    name: 'Learning',
    component: () => import('../views/Learning/index.vue'),
  },
  {
    path: '/:locale/calculator-iis/',
    // path: '/:locale/document/:region/:company/:ticker/:bondcode/:document',
    name: 'CalculatorIis',
    component: () => import('../views/Services/CalculatorIis/index.vue'),
  },
  {
    path: '/:locale/calculator-profit/',
    name: 'CalculatorProfit',
    component: () => import('../views/Services/CalculatorProfit/index.vue'),
  },
  {
    path: '/:locale/calendar-ipo/',
    // path: '/:locale/document/:region/:company/:ticker/:bondcode/:document',
    name: 'CalendarIpo',
    component: () => import('../views/Services/CalendarIpo/index.vue'),
  },
  {
    path: '/:locale/calendar-invest/',
    // path: '/:locale/document/:region/:company/:ticker/:bondcode/:document',
    name: 'CalendarInvest',
    component: () => import('../views/Services/CalendarInvest/index.vue'),
  },
  {
    path: '/:locale/rating-active/',
    // path: '/:locale/document/:region/:company/:ticker/:bondcode/:document',
    name: 'RatingActive',
    component: () => import('../views/Services/RatingActive/index.vue'),
  },
  {
    path: '/:locale/:type/:region/:company/:id/',
    // path: '/:locale/document/:region/:company/:ticker/:bondcode/:document',
    name: 'Document',
    component: () => import('../views/Document/index.vue'),
    children: [
      {
        name: 'DocumentInfo',
        path: 'info',
        component: () => import('../views/Document/modules/Views/modules/Pages/Info/index.vue'),
      },
      {
        name: 'DocumentAboutCompany',
        path: 'about-company',
        component: () =>
          import('../views/Document/modules/Views/modules/Pages/AboutCompany/index.vue'),
      },
      {
        name: 'DocumentBonds',
        path: 'bonds',
        component: () => import('../views/Document/modules/Views/modules/Pages/Bonds/index.vue'),
      },
      {
        name: 'DocumentCompanyIndicators',
        path: 'company-indicators',
        component: () =>
          import('../views/Document/modules/Views/modules/Pages/CompanyIndicators/index.vue'),
      },
      {
        name: 'DocumentDiscussion',
        path: 'discussion',
        component: () =>
          import('../views/Document/modules/Views/modules/Pages/Discussion/index.vue'),
      },
      {
        name: 'DocumentDividends',
        path: 'dividends',
        component: () =>
          import('../views/Document/modules/Views/modules/Pages/Dividends/index.vue'),
      },
      {
        name: 'DocumentReport',
        path: 'report',
        component: () => import('../views/Document/modules/Views/modules/Pages/Report/index.vue'),
      },
    ],
  },
  {
    name: 'ListsWrap',
    path: '/:locale/stats/:type/:region/',
    component: () => import('../views/Lists/index.vue'),
    redirect: { name: 'ListsWrapAll' },
    children: [
      {
        name: 'ListsWrapAll',
        path: 'list',
        component: () => import('../views/Lists/modules/Pages/All/index.vue'),
      },
      {
        name: 'ListsWrapAbout',
        path: 'about/:id',
        component: () => import('../views/Lists/modules/Pages/About/index.vue'),
      },
    ],
  },
  {
    path: '/:locale/:type/:region',
    name: 'SecurityList',
    component: () => import('../views/SecurityList/index.vue'),
  },
  {
    path: '/:locale/index/:name/:ticker',
    name: 'Index',
    component: () => import('../views/Index/index.vue'),
  },
  {
    path: '/:locale/technical-analysis',
    name: 'TechnicalAnalysis',
    component: () => import('../views/TechnicalAnalysis/index.vue'),
  },
  {
    path: '/:locale/portfolio',
    name: 'Portfolio',
    component: () => import('../views/Portfolio/index.vue'),
  },
  {
    path: '/:locale/radar',
    name: 'Radar',
    component: () => import('../views/Radar/index.vue'),
  },
  { path: '/:catchAll(.*)', redirect: '/ru/stocks/rus' },
];
