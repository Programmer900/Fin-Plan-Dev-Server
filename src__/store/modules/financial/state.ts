export const tableData = {
  periodVal: [],
  periodYear: [],
  actives: [],
  currentActives: [],
  equityCapital: [],
  revenueLastYear: [],
  revenueYearRolling: [],
  pastCapitalization: [],
  currentRevenue: [],
  quarterlyRevenue: [],
  shareEquityActives: [],
  profit: [],
  profitYearRolling: [],
  quarterlyProfit: [],
  returnOnEquity: [],
  revenueGrowthRate: [],
  activesGrowthRate: [],
  profitGrowthRate: [],
};

export const state = {
  fullData: '',
  prop: 'year',
  empty: '------',
  pickedRows: new Map(),
  pickedRowsLimit: 6,
  graphDates: [],
  graphSeriesData: {
    quotes: {
      id: 'quotes',
      color: '#1fa0b7',
      show: true,
      permanent: true,
    },
    actives: {
      id: 'actives',
      color: '#97b3de',
      show: false,
    },
    currentActives: {
      id: 'currentActives',
      color: '#fec006',
      show: true,
    },
    equityCapital: {
      id: 'equityCapital',
      color: '#F27362',
      show: false,
    },
    revenueLastYear: {
      id: 'revenueLastYear',
      color: '#2a8634',
      show: true,
    },
    revenueYearRolling: {
      id: 'revenueYearRolling',
      color: '#AC5BBE',
      show: false,
    },
    pastCapitalization: {
      id: 'pastCapitalization',
      color: '#5FC0F0',
      show: false,
    },
    currentRevenue: {
      id: 'currentRevenue',
      color: '#F5DD50',
      show: false,
    },
    quarterlyRevenue: {
      id: 'quarterlyRevenue',
      color: '#E1953C',
      show: false,
    },
    shareEquityAssets: {
      id: 'shareEquityAssets',
      color: '#EFB068',
      show: false,
    },
    profit: {
      id: 'profit',
      color: '#ff4495',
      show: false,
    },
    profitYearRolling: {
      id: 'profitYearRolling',
      color: '#36173d',
      show: false,
    },
    quarterlyProfit: {
      id: 'quarterlyProfit',
      color: '#48ac99',
      show: false,
    },
    returnOnEquity: {
      id: 'returnOnEquity',
      color: '#ffd900',
      show: false,
    },
    revenueGrowthRate: {
      id: 'revenueGrowthRate',
      color: '#225b75',
      show: false,
    },
    assetGrowthRate: {
      id: 'assetGrowthRate',
      color: '#ff4b12',
      show: false,
    },
    profitGrowthRate: {
      id: 'profitGrowthRate',
      color: '#52e3c2',
      show: false,
    },
  },
  ...tableData,
};
