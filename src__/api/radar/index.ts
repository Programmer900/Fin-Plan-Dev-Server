import { IUnknownResponse, useRequest } from '@/use/root/request';
import { FINPLAN_API_URL } from '../../../env.common';
import type { TRadarVerb } from '@/api/radar/types';

export const useApiRadar = () => {
  const req = useRequest(
    {
      baseURL: FINPLAN_API_URL,
      headers: {
        // Для обхода cors политики. Бекендер берет значение из HTTP_ACCESS_CONTROL_REQUEST_HEADERS
        X_SENDER: 'outsource',
      },
    },
    'useApiRadar',
  );

  return {
    getFilterStrategy: async () => await req<IUnknownResponse>('/api/radar/v1/getFilterStrategy/'),
    getActivesList: async (
      verb: TRadarVerb,
      dataVolume: 'short' | 'supershort' | 'full',
      pageNumber: number,
      pageSize: number,
      filter = '',
    ) =>
      await req<IUnknownResponse>(
        `/api/radar/v1/getActivesList/${verb}/${dataVolume}/${pageNumber}/${pageSize}/`,
        'post',
        {
          data: {
            filter,
          },
        },
      ),
  };
};
