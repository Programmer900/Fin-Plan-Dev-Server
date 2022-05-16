import type { DynamicObject } from '@/interfaces';
import { bondsFilters, sharesUsaFilters, sharesFilters, etfFilters } from './filters/index';

export const filters: DynamicObject = {
  // Облигации
  bonds: {
    ...bondsFilters,
  },

  // Акции РФ
  shares: {
    ...sharesFilters,
  },

  // Акции США
  shares_usa: {
    ...sharesUsaFilters,
  },

  // ETF
  etf: {
    ...etfFilters,
  },

  // Карта рынка
  marketMap: {},
};
