import { DynamicObject } from '@/interfaces';
import { IDocumentState, IIndicatorsChart } from '@/store/modules/Document/state';

export const getters = {
  getData: (state: IDocumentState): DynamicObject | null => state.data,
  getType: (state: IDocumentState): string | null => state.type,
  getRegion: (state: IDocumentState): string | null => state.region,
  getId: (state: IDocumentState): string | null => state.id,
  getName: (state: IDocumentState): string | null =>
    state.data?.RADAR_DATA.NAME || state.data?.RADAR_DATA.COMPANY.NAME || '???',
  getIndexes: (state: IDocumentState): string[] | null => {
    const indexes: string[] = [];

    state.data?.RADAR_DATA.PROPS.PROP_MSCI === 'Да' && indexes.push('MSCI');
    state.data?.RADAR_DATA.PROPS.PROP_MMVB === 'Да' && indexes.push('ММВБ');

    return indexes;
  },
  getCandle: (state: IDocumentState): DynamicObject | null =>
    state.data?.GRAPH_CANDLE_DATA?.M || null,
  getBeta: (state: IDocumentState): number | null => {
    const betta = state.data?.RADAR_DATA.PROPS.BETTA;
    if (betta) {
      return Number(betta);
    }
    return null;
  },
  getPE: (state: IDocumentState): number | null => {
    const pe = state.data?.RADAR_DATA?.DYNAM.PE;
    if (pe) {
      return Number(pe);
    }
    return null;
  },
  getPB: (state: IDocumentState): number | null => {
    const pb = state.data?.MIN_MAX.PB;
    if (pb) {
      return Number(pb);
    }
    return null;
  },
  getProfit: (state: IDocumentState): number | null => {
    const profit = state.data?.RADAR_DATA?.DYNAM['Прибыль'];
    if (profit) {
      return Number(state.data?.RADAR_DATA?.DYNAM['Прибыль']);
    }
    return null;
  },
  getDividends: (state: IDocumentState): number | null =>
    Number(state.data?.RADAR_DATA.DYNAM['Дивиденды %']),
  getEquityCapital: (state: IDocumentState): number | null =>
    Number(Number(state.data?.RADAR_DATA.DYNAM['Собственный капитал']).toFixed(0)),
  getCapitalization: (state: IDocumentState): number | null =>
    Number(state.data?.RADAR_DATA.PROPS.ISSUECAPITALIZATION),
  getRevenue: (state: IDocumentState): number | null =>
    Number(state.data?.MIN_MAX?.['Выручка за год (скользящая)']?.MAX),
  getMinMax: (state: IDocumentState): DynamicObject | null => state.data?.MIN_MAX,
  getCurrentFinancialData: (state: IDocumentState): DynamicObject | null => {
    if (state.financialData?.data) {
      const lastQuarter: DynamicObject[] = Object.values(state.financialData?.data);
      return lastQuarter[lastQuarter.length - 1];
    }
    return null;
  },
  getEmitentData: (state: IDocumentState): DynamicObject | null => state.emitentData,
  getSecId: (state: IDocumentState): string | null => state.data?.RADAR_DATA.PROPS.ISIN,
  getIndicatorsChart: (state: IDocumentState): IIndicatorsChart => state.indicatorsChart,
  getIndicatorsChartCategories: (state: IDocumentState): number[] =>
    state.indicatorsChartCategories,
  getIndicatorsQuarter: (state: IDocumentState): string[] => state.indicatorsChartQuarter,
  getCurrentTableProp: (state: IDocumentState): string => state.currentTableProp,
};
