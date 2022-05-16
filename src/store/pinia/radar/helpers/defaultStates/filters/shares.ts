export const sharesFilters = {
  actions_rus_only: {
    id: 'actions_rus_only',
    value: 'all',
    isActive: false,
    dropdownValues: {
      all: {
        label: 'Все',
        value: 'all',
      },
      rus: {
        label: 'РФ',
        value: 'rus',
      },
      other: {
        label: 'Иная',
        value: 'other',
      },
    },
  },
  analitics: {
    id: 'analitics',
    value: 'shares_company_tab',
    isActive: false,
  },
  betta: {
    id: 'betta',
    value: 'all',
    isActive: false,
    dropdownValues: {
      all: {
        label: 'Все',
        value: 'all',
      },
      '-999>-1': {
        label: 'До -1',
        value: '-999>-1',
      },
      '-1>0': {
        label: 'От -1 до 0',
        value: '-1>0',
      },
      '0>0.5': {
        label: 'От 0 до 0.5',
        value: '0>0.5',
      },
      '0.5>1': {
        label: 'От 0.5 до 1',
        value: '0.5>1',
      },
      '1>999': {
        label: 'Больше 1',
        value: '1>999',
      },
      '-9991>1': {
        label: 'Меньше 1',
        value: '-9991>1',
      },
    },
  },
  capitalization: {
    id: 'capitalization',
    value: 'all',
    isActive: false,
    dropdownValues: {
      all: {
        label: 'Все',
        value: 'all',
      },
      100000000: {
        label: '100 млн. руб',
        value: 100000000,
      },
      1000000000: {
        label: '1 млрд. руб',
        value: 1000000000,
      },
      10000000000: {
        label: '10 млрд. руб',
        value: 10000000000,
      },
      100000000000: {
        label: '100 млрд. руб',
        value: 100000000000,
      },
      1000000000000: {
        label: '1 трлн. руб',
        value: 1000000000000,
      },
    },
  },
  // %
  dividends: {
    id: 'dividends',
    value: 0,
    isActive: false,
    symbol: '%',
  },
  export_share: {
    id: 'export_share',
    value: 'default',
    isActive: false,
  },
  future_dividends: {
    id: 'future_dividends',
    value: false,
    isActive: false,
    fromApi: {
      Y: true,
      N: false,
    },
    toApi: {
      true: 'Y',
      false: 'N',
    },
  },
  in_index: {
    id: 'in_index',
    value: 'default',
    isActive: false,
    dropdownValues: {
      default: {
        label: 'Не учитывать',
        value: 'default',
      },
      IMOEX: {
        label: 'Индекс МосБиржи',
        value: 'IMOEX',
      },
      MCXSM: {
        label: 'Индекс МосБиржи SMID',
        value: 'MCXSM',
      },
      MOEXBMI: {
        label: 'Индекс широкого рынка',
        value: 'MOEXBMI',
      },
      MOEXCN: {
        label: 'Индекс потребительского сектора / Индекс потребит сектора',
        value: 'MOEXCN',
      },
      RTSCR: {
        label: 'Индекс РТС потреб. сектора',
        value: 'RTSCR',
      },
      RTSI: {
        label: 'Индекс РТС',
        value: 'RTSI',
      },
      RTSSM: {
        label: 'RTS SMID Index',
        value: 'RTSSM',
      },
      RUBMI: {
        label: 'Индекс РТС широкого рынка',
        value: 'RUBMI',
      },
      MOEXEU: {
        label: 'Индекс электроэнергетики',
        value: 'MOEXEU',
      },
      MRRT: {
        label: 'Индекс "Ответственность и открытость',
        value: 'MRRT',
      },
      MRSV: {
        label: 'Индекс МосБиржи - РСПП Вектор устойчивого развития',
        value: 'MRSV',
      },
      RTSEU: {
        label: 'Индекс РТС электроэнергетики',
        value: 'RTSEU',
      },
      MOEXMM: {
        label: 'Индекс металлов и добычи',
        value: 'MOEXMM',
      },
      RTSMM: {
        label: 'Индекс РТС металлов и добычи',
        value: 'RTSMM',
      },
      MOEXTL: {
        label: 'Индекс телекоммуникаций',
        value: 'MOEXTL',
      },
      RTSTL: {
        label: 'Индекс РТС телекоммуникаций',
        value: 'RTSTL',
      },
      MOEXTN: {
        label: 'Индекс транспорта',
        value: 'MOEXTN',
      },
      RTSTN: {
        label: 'Индекс РТС транспорта',
        value: 'RTSTN',
      },
      MSCI: {
        label: 'Индекс MSCI Russia',
        value: 'MSCI',
      },
      MOEX10: {
        label: 'Индекс МосБиржи 10',
        value: 'MOEX10',
      },
      MOEXBC: {
        label: 'Индекс голубых фишек',
        value: 'MOEXBC',
      },
      MOEXFN: {
        label: 'Индекс финансов',
        value: 'MOEXFN',
      },
      MRBC: {
        label: 'Индекс МосБиржи 15',
        value: 'MRBC',
      },
      RTSFN: {
        label: 'Индекс РТС финансов',
        value: 'RTSFN',
      },
      MOEXOG: {
        label: 'Индекс нефти и газа',
        value: 'MOEXOG',
      },
      RTSOG: {
        label: 'Индекс РТС нефти и газа',
        value: 'RTSOG',
      },
      MOEXCH: {
        label: 'Индекс химии и нефтехимии',
        value: 'MOEXCH',
      },
      RTSCH: {
        label: 'Индекс РТС химии и нефтехимии',
        value: 'RTSCH',
      },
      MOEXINN: {
        label: 'Индекс МосБиржи инноваций',
        value: 'MOEXINN',
      },
      'Индекс РТС электроэнергетики': {
        label: 'Индекс РТС электроэнергетики',
        value: 'Индекс РТС электроэнергетики',
      },
    },
  },
  into_gs_portfolio: {
    id: 'into_gs_portfolio',
    value: false,
    isActive: false,
    fromApi: {
      Y: true,
      N: false,
    },
    toApi: {
      true: 'Y',
      false: 'N',
    },
  },
  index_candidate: {
    id: 'index_candidate',
    value: 'default',
    isActive: false,
  },
  'industry[]': {
    id: 'industry[]',
    value: '',
    isActive: false,
  },
  lotprice: {
    id: 'lotprice',
    value: 'all',
    isActive: false,
    dropdownValues: {
      all: {
        label: 'Все',
        value: 'all',
      },
      '0-1000': {
        label: 'До 1000 руб.',
        value: '0-1000',
      },
      '0-3000': {
        label: 'До 3000 руб.',
        value: '0-3000',
      },
      '0-5000': {
        label: 'До 5000 руб.',
        value: '0-5000',
      },
      '0-10000': {
        label: 'До 10000 руб.',
        value: '0-10000',
      },
      '0-20000': {
        label: 'До 20000 руб.',
        value: '0-20000',
      },
    },
  },
  margin_deals: {
    id: 'margin_deals',
    value: 'default',
    isActive: false,
    dropdownValues: {
      default: {
        label: 'Не учитывать',
        value: 'default',
      },
      short: {
        label: 'Операции "шорт"',
        value: 'short',
      },
      kredit: {
        label: 'Кредит',
        value: 'kredit',
      },
    },
  },
  'month-increase': {
    id: 'month-increase',
    value: 'all',
    isActive: false,
    dropdownValues: {
      all: {
        label: 'Все',
        value: 'all',
      },
      down50: {
        label: 'Падение более 50%',
        value: 'down50',
      },
      down25: {
        label: 'Падение более 25%',
        value: 'down25',
      },
      down10: {
        label: 'Падение более 10%',
        value: 'down10',
      },
      down: {
        label: 'Падение',
        value: 'down',
      },
      up: {
        label: 'Рост',
        value: 'up',
      },
      up10: {
        label: 'Рост более 10%',
        value: 'up10',
      },
      up25: {
        label: 'Рост более 25%',
        value: 'up25',
      },
      up50: {
        label: 'Рост более 50%',
        value: 'up50',
      },
    },
  },
  // %
  'month[Доля просрочки, %][percent]': {
    id: 'month[Доля просрочки, %][percent]',
    value: 10,
    isActive: false,
    symbol: '%',
  },
  'month[Доля просрочки, %][use]': 'Y',
  // %
  'month[Н1,%][percent]': {
    id: 'month[Н1,%][percent]',
    value: 10,
    isActive: false,
  },
  'month[Н1,%][use]': 'Y',
  'month[Рейтинг по активам, номер][top]': {
    id: 'month[Рейтинг по активам, номер][top]',
    value: 20,
    isActive: false,
  },
  'month[Рейтинг по активам, номер][use]': 'Y',
  // %
  'month[Рентабельность собственного капитала, %][percent]': {
    id: 'month[Рентабельность собственного капитала, %][percent]',
    value: 10,
    isActive: false,
  },
  'month[Рентабельность собственного капитала, %][use]': 'Y',
  month_value: {
    id: 'month_value',
    value: 'last',
    isActive: false,
  },
  no_dividends: {
    id: 'no_dividends',
    value: false,
    isActive: false,
    fromApi: {
      Y: true,
      N: false,
    },
    toApi: {
      true: 'Y',
      false: 'N',
    },
  },
  'p-e': {
    id: 'p-e',
    value: 'all',
    isActive: false,
    dropdownValues: {
      all: {
        label: 'Все',
        value: 'all',
      },
      '1-2': {
        label: 'До 0.5',
        value: '1-2',
      },
      1: {
        label: 'До 1',
        value: 1,
      },
      '3-2': {
        label: 'До 1.5',
        value: '3-2',
      },
      2: {
        label: 'До 2',
        value: 2,
      },
    },
  },
  pe: {
    id: 'pe',
    value: 14,
    isActive: false,
  },
  peg: {
    id: 'peg',
    value: 'all',
    isActive: false,
    dropdownValues: {
      all: {
        label: 'Все',
        value: 'all',
      },
      '1-2': {
        label: 'До 0.5',
        value: '1-2',
      },
      1: {
        label: 'До 1',
        value: 1,
      },
      '3-2': {
        label: 'До 1.5',
        value: '3-2',
      },
      2: {
        label: 'До 2',
        value: 2,
      },
    },
  },
  // %
  'period[Доля собственного капитала в активах][percent]': {
    id: 'period[Доля собственного капитала в активах][percent]',
    value: 10,
    isActive: false,
  },
  'period[Доля собственного капитала в активах][use]': 'Y',
  // %
  'period[Рентабельность собственного капитала][percent]': {
    id: 'period[Рентабельность собственного капитала][percent]',
    value: 10,
    isActive: false,
  },
  'period[Рентабельность собственного капитала][use]': 'Y',
  // %
  'period[Темп прироста выручки][percent]': {
    id: 'period[Темп прироста выручки][percent]',
    value: 10,
    isActive: false,
  },
  'period[Темп прироста выручки][use]': 'Y',
  // %
  'period[Темп роста активов][percent]': {
    id: 'period[Темп роста активов][percent]',
    value: 10,
    isActive: false,
  },
  'period[Темп роста активов][use]': 'Y',
  // %
  'period[Темп роста прибыли][percent]': {
    id: 'period[Темп роста прибыли][percent]',
    value: 10,
    isActive: false,
  },
  'period[Темп роста прибыли][use]': 'Y',
  period_value: {
    id: 'period_value',
    value: 'last',
    isActive: false,
    dropdownValues: {
      last: {
        label: 'Последний период',
        value: 'last',
      },
      '3-2021': {
        label: '3 кв. 2021',
        value: '3-2021',
      },
      '2-2021': {
        label: '2 кв. 2021',
        value: '2-2021',
      },
      '1-2021': {
        label: '1 кв. 2021',
        value: '1-2021',
      },
      '4-2020': {
        label: '4 кв. 2020',
        value: '4-2020',
      },
    },
  },
  profitability: {
    id: 'profitability',
    value: 30,
    isActive: false,
  },
  'radar-rating': {
    id: 'radar-rating',
    value: 'all',
    isActive: false,
    dropdownValues: {
      all: {
        label: 'Все',
        value: 'all',
      },
      '0-1': {
        label: 'До 1%',
        value: '0-1',
      },
      '0-5': {
        label: 'До 5%',
        value: '0-5',
      },
      '0-10': {
        label: 'До 10%',
        value: '0-10',
      },
      '0-20': {
        label: 'До 20%',
        value: '0-20',
      },
      '0-30': {
        label: 'До 30%',
        value: '0-30',
      },
      '1-100': {
        label: 'Более 1%',
        value: '1-100',
      },
      '5-100': {
        label: 'Более 5%',
        value: '5-100',
      },
      '10-100': {
        label: 'Более 10%',
        value: '10-100',
      },
      '20-100': {
        label: 'Более 20%',
        value: '20-100',
      },
      '30-100': {
        label: 'Более 30%',
        value: '30-100',
      },
    },
  },
  shares_all_sectors: {
    id: 'shares_all_sectors',
    value: false,
    isActive: false,
  },
  'three-year-increase': {
    id: 'three-year-increase',
    value: 'all',
    isActive: false,
    dropdownValues: {
      all: {
        label: 'Все',
        value: 'all',
      },
      down50: {
        label: 'Падение более 50%',
        value: 'down50',
      },
      down25: {
        label: 'Падение более 25%',
        value: 'down25',
      },
      down10: {
        label: 'Падение более 10%',
        value: 'down10',
      },
      down: {
        label: 'Падение',
        value: 'down',
      },
      up: {
        label: 'Рост',
        value: 'up',
      },
      up10: {
        label: 'Рост более 10%',
        value: 'up10',
      },
      up25: {
        label: 'Рост более 25%',
        value: 'up25',
      },
      up50: {
        label: 'Рост более 50%',
        value: 'up50',
      },
    },
  },
  turnover_week: {
    id: 'turnover_week',
    value: true,
    isActive: false,
    fromApi: {
      Y: true,
      N: false,
    },
    toApi: {
      true: 'Y',
      false: 'N',
    },
  },
  'year-increase': {
    id: 'year-increase',
    value: 'all',
    isActive: false,
    dropdownValues: {
      all: {
        label: 'Все',
        value: 'all',
      },
      down50: {
        label: 'Падение более 50%',
        value: 'down50',
      },
      down25: {
        label: 'Падение более 25%',
        value: 'down25',
      },
      down10: {
        label: 'Падение более 10%',
        value: 'down10',
      },
      down: {
        label: 'Падение',
        value: 'down',
      },
      up: {
        label: 'Рост',
        value: 'up',
      },
      up10: {
        label: 'Рост более 10%',
        value: 'up10',
      },
      up25: {
        label: 'Рост более 25%',
        value: 'up25',
      },
      up50: {
        label: 'Рост более 50%',
        value: 'up50',
      },
    },
  },
};
