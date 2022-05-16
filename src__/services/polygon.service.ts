import { AxiosResponse } from 'axios';
import { polygonInstance } from '@/plugins/axios';

import { POLYGON_API_URL } from '../../env.common';

const polygon = POLYGON_API_URL;

export const getPreviousClose = async (
  stockTicker: string | string[],
  adjusted: boolean | string = true,
): Promise<any> =>
  await polygonInstance
    .get(`${polygon}/v2/aggs/ticker/${stockTicker}/prev?adjusted=${adjusted}`)
    .then((res: AxiosResponse) => res);

export const getCurrencyConversion = (
  from = 'RUB',
  to = 'USD',
  amount = 100,
  precision = 2,
): Promise<any> =>
  polygonInstance
    .get(`${polygon}/v1/conversion/${from}/${to}?amount=${amount}&precision=${precision}`)
    .then((res: AxiosResponse) => res);
