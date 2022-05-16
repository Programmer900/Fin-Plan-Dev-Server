import { AxiosRequestConfig } from 'axios';
import { useRoute } from 'vue-router';
import { FINPLAN_API_URL } from '../../../env.common';
import { DynamicObject } from '@/interfaces';

export enum ApiStatusCode {
  unknown = -1,
  notAuth = 0,
  serverError = 1,
  success = 2,
  requestError = 3,
}

export const useApiFinplan = () => {
  const api = axios.create({
    baseURL: FINPLAN_API_URL,
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

  /**
   * Получение списка активов
   * @param verb служит для уточнения страны РФ или США (пример: RUS/USA)
   * @param type задает тип получаемого актива. для США используется только “shares” (Для RUS: shares / shares_etf / shares_pif / indexes / currencies. Для USA: shares)
   * @param pagesize Задает кол-во возвращаемых элементов на одной странице (пример: 10)
   * @param pagenumber Задает порядковый номер получаемой страницы (пример: 2)
   */
  const getActivesList = async (
    verb: string,
    type: string,
    pagesize: string | number,
    pagenumber: string | number,
  ) =>
    await tryRequest<DynamicObject>(
      `/api/actives/v1/getActivesList/${verb}/${type}/${pagesize}/${pagenumber}`,
    );

  /**
   * Получение детальной информации по облигации
   * @param verb служит для уточнения страны РФ или США (RUS/USA)
   * @param isin isin-код актива (пример: RU000A101WH1)
   */
  const getBond = async (verb: string, isin: string) =>
    await tryRequest<DynamicObject>(`/api/actives/v1/getObligationDetail/${verb}/${isin}`);

  /**
   * Получение детальной информации по ETF
   * @param verb Для получения данных по ETF следует всегда указывать “RUS”
   * @param ticker Тикер актива (пример: AKEU)
   */
  const getETF = async (verb: string, ticker: string) =>
    await tryRequest<DynamicObject>(`/api/actives/v1/getEtfDetail/${verb}/${ticker}`);

  /**
   * Получение детальной информации по акции
   * @param verb служит для уточнения страны РФ или США (RUS/USA). Для получения данных по ETF следует указывать RUS
   * @param ticker Тикер актива (пример: GAZP)
   */
  const getStock = async (verb: string, ticker: string) =>
    await tryRequest<DynamicObject>(`/api/actives/v1/getActionDetail/${verb}/${ticker}`);

  /**
   * Получение последней актуальной котировки актива из базы данных сайта
   * @param verb служит для уточнения страны РФ или США (RUS/USA)
   * @param type тип актива. для РФ может быть указано “shares“ или “bonds“, для США только “shares“ (shares/bonds)
   * @param code тикер для акций и isin или secid код для облигаций (пример: RU000A0JTM44)
   */
  const getLastPriceFormDB = async (verb: string, type: string, code: string) =>
    await tryRequest<DynamicObject>(`/api/actives/v1/getLastPriceFromDb/${verb}/${type}/${code}`);

  /**
   * Получение финансовых показателей компании по тикеру / isin-коду актива
   * @param verb служит для уточнения страны РФ (для акций, облигаций РФ) или США (пример: RUS/RUS_BOND/USA)
   * @param code для акций принимает значение тикера актива, для облигаций isin код или secid (пример: AAPL, GAZP, RU000A102VY6)
   * @param from Единственный квартал либо начальный квартал требуемого диапазона. Необязательный параметр, при отсутствии будет возвращен весь набор данных за все существующие кварталы. (пример: 1-2019-KVARTAL)
   * @param to Указывает квартал окончания требуемого диапазона. Необязательный параметр, при отсутствии или равенстве значения параметру “from“ будет возвращен набор данных за квартал указанный в параметре “from” (пример: 2-2021-KVARTAL)
   */
  const getFinancialData = async (verb: string, code: string, from = '', to = '') =>
    await tryRequest<DynamicObject>(
      `/api/actives/v1/getFinancialData/${verb}/${code}/${from}/${to}`,
    );

  /**
   * Получение финансовых показателей компании по тикеру / isin-коду актива
   * @param verb служит для уточнения страны РФ (для акций, облигаций РФ) или США (пример: RUS/USA)
   * @param emitentId id компании эмитента, получается из метода “getActionDetail“->RADAR_DATA->PROPS->EMITENT_ID (пример: 61781)
   */
  const getCompanyDescription = async (verb: string, emitentId: string) =>
    await tryRequest<DynamicObject>(`/api/actives/v1/getCompanyDescription/${verb}/${emitentId}`);

  /**
   * Получение финансовых показателей компании по тикеру / isin-коду актива
   * @param verb служит для уточнения страны РФ или США (пример: RUS/USA)
   * @param code isin код актива (пример: RU0007252813)
   */
  const getDividends = async (verb: string, code: string) =>
    await tryRequest<DynamicObject>(`/api/actives/v1/getDividends/${verb}/${code}`);

  /**
   * Получение детальной информации для индекса
   * @param ticker Тикер индекса для отбора (пример: RTSI)
   */
  const getIndexDetail = async (ticker: string) =>
    await tryRequest<DynamicObject>(`/api/actives/v1/getIndexDetail/${ticker}`);

  /**
   * Получение данных графика для индекса
   * @param ticker Тикер индекса для отбора (пример: RTSI)
   */
  const getIndexChartData = async (ticker: string) =>
    await tryRequest<DynamicObject>(`/api/actives/v1/getIndexChartData/${ticker}`);

  const getCompanyChartPriceData = async (
    verb: string | string[],
    ticker: string | string[],
    endOfStartQuartal: string | string[],
  ) =>
    await tryRequest<DynamicObject>(
      `/api/actives/v1/getCompanyChartPriceData/${verb}/${ticker}/${endOfStartQuartal}`,
    );

  const getCurrentFinancialData = async () => {
    const route = useRoute();
    const { region, ticker } = route.params;

    const res = await getFinancialData(String(region), String(ticker));
    console.log(res);
    const { data } = res;

    // @ts-ignore
    const dataArr = Object.values(data);
    const dataLength = dataArr.length - 1;

    let currentQuarter;

    for (let i = 0; i < dataLength; i++) {
      if (dataArr[i]) {
        currentQuarter = dataArr[i];
        break;
      }
    }

    return currentQuarter;
  };

  const getStockInfo = async (company: string | string[], region: string | string[]) =>
    await tryRequest<DynamicObject>(`/api/actives/v1/getActionDetail/${region}/${company}/`);

  const getEmitentInfo = async (id: string | number) =>
    await tryRequest<DynamicObject>(`/api/actives/v1/getCompanyDescription/RUS/${id}`);

  const getBondInfo = async (isin: string | string[], region: string | string[]) =>
    await tryRequest<DynamicObject>(`/api/actives/v1/getObligationDetail/${region}/${isin}`);

  /**
   * Получение списка отраслей РФ
   * @param pageNumber Задает порядковый номер получаемой страницы
   * @param pageSize Задает кол-во возвращаемых элементов на одной странице
   */
  const getIndustriesList = async (pageNumber: number, pageSize = 10000000) =>
    await tryRequest<DynamicObject>(
      `/api/industries/v1/getIndustriesList/${pageSize}/${pageNumber}`,
    );

  /**
   * Получение списка секторов США
   * @param pageNumber Задает порядковый номер получаемой страницы
   * @param pageSize Задает кол-во возвращаемых элементов на одной странице
   */
  const getSectorsList = async (pageNumber: number, pageSize = 10000000) =>
    await tryRequest<DynamicObject>(`/api/industries/v1/getSectorsList/${pageSize}/${pageNumber}`);

  /**
   * Проверка доступа к сервису Радар
   */
  const checkPayRadar = async () => await tryRequest<DynamicObject>('/api/ta/v1/checkPayRadar/');

  /**
   * Получение текущего авторизованного пользователя
   * @param debug Для тестирования установить значение verb равным «debug» и передать дополнительные параметры
   * «userId» и «authorized» и метод вернет эти данные без реальной проверки.
   * Для рабочего режима установить значение verb равным «work» и выполнить запрос без дополнительных параметров
   */
  const getUser = async (debug = false) => {
    if (debug) {
      return await tryRequest<DynamicObject>(
        `/api/ta/v1/getUser/debug/userId:1/authorized:true/isAdmin:true/payRadar:false/`,
      );
    }
    return await tryRequest<DynamicObject>(`/api/ta/v1/getUser/work/`);
  };

  /**
   * Получение списка резервных копий указанного сохранения пользователя
   * @param userId Id пользователя
   * @param saveName Название сохранения для которого требуется получить список резервных копий
   */
  const getBackupList = async (userId: number, saveName: string) =>
    await tryRequest<DynamicObject>(`/api/ta/v1/getBackupList/${userId}/${saveName}/`);

  /**
   * Получение списка названий сохранений пользователя
   * @param userId Id пользователя
   * @param param1 id строки БД или название сейва, позволяет получить более конкретный результат
   */
  const getSaveList = async (userId: number, param1?: number | string) =>
    await tryRequest<DynamicObject>(`/api/ta/v1/getSaveList/${userId}/${param1}`);

  /**
   * Получение списка названий сохранений пользователя с номером шаблона
   * @param userId Id пользователя
   * @param param1 id строки БД или название сейва, позволяет получить более конкретный результат.
   */
  const getSaveListExt = async (userId: number, param1?: number | string) =>
    tryRequest<DynamicObject>(`/api/ta/v1/getSaveListExt/${userId}/${param1}`);

  /**
   * Получение списка публичных графиков
   */
  const getPublicListGraphData = async () =>
    await tryRequest<DynamicObject>(`/api/ta/v1/getPublicListGraphData/`);

  /**
   * Получение timestamp последнего сохранения по id пользователя и названию сохранения
   * @param userId Id пользователя
   * @param saveName Название сохранения
   */
  const getLastTimestamp = async (userId: number, saveName: string) =>
    await tryRequest<DynamicObject>(`/api/ta/v1/getLastTimestamp/${userId}/${saveName}/`);

  /**
   * Сохранение графика пользователя
   * @param userId Id пользователя
   * @param saveName Название сохранения, если не передано то будет установлено название «По умолчанию»
   * @param data Структура данных графика
   */
  const setGraphData = async (userId: number, saveName: string, data: DynamicObject) =>
    await tryRequest<DynamicObject>(`/api/ta/v1/setGraphData/${userId}/${saveName}/`, 'put', {
      data: {
        ...data,
      },
    });

  /**
   * Получение графика пользователя
   * @param userId Id пользователя
   * @param saveId Опционально при восстановлении нужного сохранения передается вторым параметром id записи нужного сохранения либо название сохранения.
   */
  const getGraphData = async (userId: number, saveId?: number | string) =>
    await tryRequest<DynamicObject>(`/api/ta/v1/getGraphData/${userId}/${saveId}/`);

  /**
   * Удаление графика пользователя
   * @param userId Id пользователя
   * @param saveName Название сохранения, если не передано то будет установлено название «По умолчанию»
   */
  const deleteGraphData = async (userId: number, saveName: string) =>
    await tryRequest<DynamicObject>(`/api/ta/v1/deleteGraphData/${userId}/${saveName}/`, 'post');

  /**
   * Установка и снятие признака публичности графика
   * @param verb Для установки признака публичности передается значение «set», для снятия «unset»
   * @param userId Id пользователя
   * @param saveName Название сохранения, если не передано то будет использовано название «По-умолчанию»
   */
  const setPublicTemplate = async (verb: 'set' | 'unset', userId: number, saveName: string) =>
    await tryRequest<DynamicObject>(
      `/api/ta/v1/setPublicTemplate/${verb}/${userId}/${saveName}/`,
      'post',
    );

  /**
   * Получение списка акций РФ
   */
  const getActionList = async () => await tryRequest<DynamicObject>(`/api/ta/v1/getActionList/`);

  /**
   * Получение списка акций США
   */
  const getActionListUsa = async () =>
    await tryRequest<DynamicObject>(`/api/ta/v1/getActionListUsa/`);

  /**
   * Получение списка индексов Мосбиржи
   */
  const getIndexList = async () => await tryRequest<DynamicObject>(`/api/ta/v1/getIndexList/`);

  /**
   * Получение детальной информации по активу
   * @param verb Указывает на SECID получаемого актива, через подчеркивание позволяет установить принадлежность к РФ или США. (Пример: RU0009029540_RUS)
   * @param modify Указывает возвращать ли данные радара по активу
   * @param activeCodeType Тип передаваемого кода бумаги: ISIN или SECID (Тикер)
   */
  const getDetailInfo = async (
    verb: string,
    modify: 'full' | 'min',
    activeCodeType: 'ISIN' | 'SECID',
  ) =>
    await tryRequest<DynamicObject>(
      `/api/ta/v1/getDetailInfo/${verb}/modify:${modify}/${activeCodeType}`,
    );

  /**
   * Сброс кэша для методов api
   * @param verb
   */
  const clearTACache = async (verb: 'getActionList' | 'getActionListUsa') =>
    await tryRequest<DynamicObject>(`/api/ta/v1/clearTACache/${verb}`);

  /**
   * Получение кода сессии битрикс
   */
  const getBXSessid = async () => await tryRequest<DynamicObject>(`/api/ta/v1/getBXSessid`);

  /**
   * Получение списка индикаторов для графика
   * @param verb Указывет, возвращать только минимальный набор данных (min) из кодов и названий индикаторов или (full) полный набор описаний.
   */
  const getIndicatorsList = async (verb: 'min' | 'full') =>
    await tryRequest<DynamicObject>(`/api/ta/v1/getIndicatorsList/${verb}`);

  /**
   * Получение детальной информации по отраслям РФ, США и по секторам США
   * @param verb Уточнение типа детального запроса, определяет из какой области данных требуется получить детальную информацию
   * @param code Символьный код отрасли РФ/США или сектора США
   * @param returnPeriods Возвращать периоды отчетности
   */
  const getDetailIndustry = async (verb: string, code: string, returnPeriods = 'n') =>
    await tryRequest(`/api/industries/v1/getDetail/${verb}/${code}/${returnPeriods}/`);

  return {
    getDetailIndustry,
    getIndicatorsList,
    getBXSessid,
    clearTACache,
    getDetailInfo,
    getIndexList,
    getActionListUsa,
    getActionList,
    setPublicTemplate,
    deleteGraphData,
    getGraphData,
    setGraphData,
    checkPayRadar,
    getBondInfo,
    getEmitentInfo,
    getStockInfo,
    getActivesList,
    getBond,
    getETF,
    getLastPriceFormDB,
    getFinancialData,
    getCompanyDescription,
    getDividends,
    getIndexDetail,
    getIndexChartData,
    getStock,
    getCompanyChartPriceData,
    getCurrentFinancialData,
    getIndustriesList,
    getSectorsList,
    getUser,
    getBackupList,
    getSaveList,
    getSaveListExt,
    getPublicListGraphData,
    getLastTimestamp,
  };
};
