import { AxiosRequestConfig } from 'axios';
import { POLYGON_API_KEY, POLYGON_API_URL } from '../../../env.common';
import { getCurrencyConversion, getPreviousClose } from '@/services/polygon.service';

export enum ApiStatusCode {
  unknown = -1,
  notAuth = 0,
  serverError = 1,
  success = 2,
  requestError = 3,
}

export const useApiPolygon = () => {
  const api = axios.create({
    baseURL: POLYGON_API_URL,
    params: {
      apiKey: POLYGON_API_KEY,
    },
  });

  api.interceptors.response.use(undefined, async (err) => {
    const status = err.response.data.statusCode;
    if (status === 401) {
      // authUserStore.removeToken();
      // await router.push({ name: 'login' });
      return {
        status: ApiStatusCode.notAuth,
        data: null,
      };
    }
    if (status === 500) {
      return {
        status: ApiStatusCode.serverError,
        data: null,
      };
    }
    return {
      status: ApiStatusCode.unknown,
      data: null,
    };
  });

  const tryRequest = async <T>(
    url: string,
    method = 'get',
    config: AxiosRequestConfig = {},
  ): Promise<{ status: number; data: T | null }> => {
    try {
      // @ts-ignore
      const response = await api({
        url,
        method,
        ...config,
      });

      if (typeof response.data !== null && typeof response.data !== 'undefined') {
        return {
          status: ApiStatusCode.success,
          data: response.data,
        };
      }
      return {
        status: ApiStatusCode.success,
        data: null,
      };
    } catch (e) {
      console.error(e);
      return {
        status: ApiStatusCode.requestError,
        data: null,
      };
    }
  };

  const getPreviousClose = async (
    stockTicker: string | string[],
    adjusted: boolean | string = true,
  ) => await tryRequest(`/v2/aggs/ticker/${stockTicker}/prev?adjusted=${adjusted}`);

  const getCurrencyConversion = async (from = 'RUB', to = 'USD', amount = 100, precision = 2) =>
    await tryRequest(`/v1/conversion/${from}/${to}?amount=${amount}&precision=${precision}`);

  return {
    getPreviousClose,
    getCurrencyConversion,
  };
};
