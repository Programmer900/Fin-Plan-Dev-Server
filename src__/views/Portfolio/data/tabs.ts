import { defineAsyncComponent } from 'vue';
import Loader from '@/components/Loader/index.vue';

export const tabs = [
  {
    label: 'Портфель',
    component: defineAsyncComponent({
      loader: () => import('@/views/Portfolio/modules/TabPanels/Portfolio/index.vue'),
      loadingComponent: Loader,
    }),
    value: 0,
  },
  {
    label: 'Бек-Тест',
    component: defineAsyncComponent({
      loader: () => import('@/views/Portfolio/modules/TabPanels/BekTest/index.vue'),
      loadingComponent: Loader,
    }),
    value: 1,
  },
  {
    label: 'История',
    component: defineAsyncComponent({
      loader: () => import('@/views/Portfolio/modules/TabPanels/History/index.vue'),
      loadingComponent: Loader,
    }),
    value: 2,
  },
  {
    label: 'Доходы',
    component: defineAsyncComponent({
      loader: () => import('@/views/Portfolio/modules/TabPanels/Income/index.vue'),
      loadingComponent: Loader,
    }),
    value: 3,
  },
  {
    label: 'Анализ',
    component: defineAsyncComponent({
      loader: () => import('@/views/Portfolio/modules/TabPanels/Analysis/index.vue'),
      loadingComponent: Loader,
    }),
    value: 4,
  },
];
