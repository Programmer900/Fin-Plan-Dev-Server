import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { useError } from '@/use/useError';

export interface IUnknownResponse {
  status: number;
  data: any;
}

export const useRequest = (axiosConfig: AxiosRequestConfig, defaultErrorText = '') => {
  const { _catch } = useError(defaultErrorText);

  const axiosInstance = ref<AxiosInstance>(axios.create({ ...axiosConfig }));

  axiosInstance.value.interceptors.response.use(undefined, async (err) => {
    const status = err.response.data.statusCode;
    return {
      status,
      data: null,
    };
  });

  return async <T>(
    url: string,
    method = 'get',
    config: AxiosRequestConfig = {},
    errorText = 'request',
  ): Promise<{ status: number; data: T | null }> => {
    try {
      // @ts-ignore
      const response = await axiosInstance.value({
        url,
        method,
        ...config,
      });
      return {
        status: response.status,
        data: response.data,
      };
    } catch (e) {
      _catch(e, errorText);
      return {
        status: 520,
        data: null,
      };
    }
  };
};
