import { defineAsyncComponent } from 'vue';
import Loader from '@/components/Loader/index.vue';
import { ITabPanelAsyncItem } from '@/interfaces/finplan/TabPanelAsyncItem';

export const tabs: ITabPanelAsyncItem[] = [
  {
    label: 'Облигации',
    component: defineAsyncComponent({
      loader: () => import('@/views/Radar/modules/TabPanels/Bonds/index.vue'),
      loadingComponent: Loader,
    }),
    value: 0,
    type: 'bonds',
  },
  {
    label: 'Акции РФ',
    component: defineAsyncComponent({
      loader: () => import('@/views/Radar/modules/TabPanels/StockRu/index.vue'),
      loadingComponent: Loader,
    }),
    value: 1,
    type: 'shares',
  },
  {
    label: 'Акции США',
    component: defineAsyncComponent({
      loader: () => import('@/views/Radar/modules/TabPanels/StockUsa/index.vue'),
      loadingComponent: Loader,
    }),
    value: 2,
    type: 'shares_usa',
  },
  {
    label: 'ETF',
    component: defineAsyncComponent({
      loader: () => import('@/views/Radar/modules/TabPanels/ETF/index.vue'),
      loadingComponent: Loader,
    }),
    value: 3,
    type: 'etf',
  },
  {
    label: 'Карта рынка',
    component: defineAsyncComponent({
      loader: () => import('@/views/Radar/modules/TabPanels/MarketMap/index.vue'),
      loadingComponent: Loader,
    }),
    value: 4,
    type: 'market-map',
  },
];
