export const bondsFilters = {
  bonds_guarantor: {
    id: 'bonds_guarantor',
    value: 'all',
    symbol: '',
    isActive: false,
    dropdownValues: {
      all: {
        label: 'Все',
        value: 'all',
      },
      y: {
        label: 'Есть',
        value: 'y',
      },
      n: {
        label: 'Нет',
        value: 'n',
      },
      full: {
        label: 'Полное',
        value: 'full',
      },
      part: {
        label: 'Частичное',
        value: 'part',
      },
    },
  },
  coupon_type: {
    id: 'coupon_type',
    value: 'all',
    symbol: '',
    isActive: false,
    dropdownValues: {
      all: {
        label: 'Все',
        value: 'all',
      },
      float: {
        label: 'Плавающий',
        value: 'float',
      },
      fix: {
        label: 'Фиксированный',
        value: 'fix',
      },
      variable: {
        label: 'Переменный',
        value: 'variable',
      },
    },
  },
  coupons_more: {
    id: 'coupons_more',
    value: 0,
    symbol: '%',
    isActive: false,
  },
  coupons_in_year: {
    id: 'coupons_in_year',
    value: 'all',
    isActive: false,
    dropdownValues: {
      all: {
        label: 'Все',
        value: 'all',
      },
      1: {
        label: '1',
        value: '1',
      },
      2: {
        label: '2',
        value: '2',
      },
      3: {
        label: '3',
        value: '3',
      },
      4: {
        label: '4',
        value: '4',
      },
      '5-10': {
        label: 'от 5 до 10',
        value: '5-10',
      },
      '10-999': {
        label: 'Более 10',
        value: '10-999',
      },
    },
  },
  date_cancel_first: {
    id: 'date_cancel_first',
    value: '',
    isActive: false,
  },
  date_cancel_last: {
    id: 'date_cancel_last',
    value: '',
    isActive: false,
  },
  date_soon_coupon_first: {
    id: 'date_soon_coupon_first',
    value: '',
    isActive: false,
  },
  date_soon_coupon_last: {
    id: 'date_soon_coupon_last',
    value: '',
    isActive: false,
  },
  date_start_first: {
    id: 'date_start_first',
    value: '',
    isActive: false,
  },
  date_start_last: {
    id: 'date_start_last',
    value: '',
    isActive: false,
  },
  debstock_rus_only: {
    id: 'debstock_rus_only',
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
  deprecation: {
    id: 'deprecation',
    value: false,
    isActive: false,
    fromApi: {
      all: false,
      no: false,
      yes: true,
    },
    toApi: {
      false: 'no',
      true: 'yes',
    },
  },
  duration: {
    id: 'duration',
    value: 21,
    isActive: false,
  },
  duration_period: {
    id: 'duration_period',
    value: 'all',
    isActive: false,
    dropdownValues: {
      all: {
        label: 'Все',
        value: 'all',
      },
      '6m': {
        label: 'До 6 мес.',
        value: '6m',
      },
      '12m': {
        label: '6-12 мес.',
        value: '12m',
      },
      '24m': {
        label: '1-2 года',
        value: '24m',
      },
      '36m': {
        label: '2-3 года',
        value: '36m',
      },
      '60m': {
        label: '3-5 лет',
        value: '60m',
      },
      '84m': {
        label: '5-7 лет',
        value: '84m',
      },
      '120m': {
        label: '7-10 лет',
        value: '120m',
      },
      more: {
        label: 'Более 10 лет',
        value: 'more',
      },
    },
  },
  fin_analysis: {
    id: 'fin_analysis',
    value: 'corporate',
    isActive: false,
    radioValues: {
      corporate: {
        label: 'Корпоративные облигации',
        value: 'corporate',
      },
      banks: {
        label: 'Банковские облигации',
        value: 'banks',
      },
    },
  },
  listlevel: {
    id: 'listlevel',
    value: 'all',
    isActive: false,
    radioValues: {
      all: {
        label: 'Все',
        value: 'all',
      },
      1: {
        label: 1,
        value: 1,
      },
      2: {
        label: 2,
        value: 2,
      },
      3: {
        label: 3,
        value: 3,
      },
    },
  },
  // %
  'month[Доля просрочки, %][percent]': {
    id: 'month[Доля просрочки, %][percent]',
    value: 10,
    isActive: false,
  },
  'month[Доля просрочки, %][use]': {
    id: 'month[Доля просрочки, %][use]',
    value: 'N',
    isActive: false,
  },
  // %
  'month[Н1,%][percent]': {
    id: 'month[Н1,%][percent]',
    value: 10,
    isActive: false,
  },
  'month[Н1,%][use]': {
    id: 'month[Н1,%][use]',
    value: 'N',
    isActive: false,
  },
  'month[Рейтинг по активам, номер][top]': {
    id: 'month[Рейтинг по активам, номер][top]',
    value: 20,
    isActive: false,
  },
  'month[Рейтинг по активам, номер][use]': {
    id: 'month[Рейтинг по активам, номер][use]',
    value: 'N',
    isActive: false,
  },
  // %
  'month[Рентабельность собственного капитала, %][percent]': {
    id: 'month[Рентабельность собственного капитала, %][percent]',
    value: 10,
    symbol: '%',
    isActive: false,
  },
  'month[Рентабельность собственного капитала, %][use]': {
    id: 'month[Рентабельность собственного капитала, %][use]',
    value: 'N',
    isActive: false,
  },
  month_value: {
    id: 'month_value',
    value: 'last',
    isActive: false,
  },
  offerdate: {
    id: 'offerdate',
    value: false,
    isActive: false,
    fromApi: {
      all: false,
      no: false,
      yes: true,
    },
    toApi: {
      false: 'no',
      true: 'yes',
    },
  },
  payment_order: {
    id: 'payment_order',
    value: false,
    isActive: false,
    fromApi: {
      all: false,
      no: false,
      yes: true,
    },
    toApi: {
      false: 'no',
      true: 'yes',
    },
  },
  // %
  'period[Доля собственного капитала в активах][percent]': {
    id: 'period[Доля собственного капитала в активах][percent]',
    value: 50,
    symbol: '%',
    isActive: false,
  },
  'period[Доля собственного капитала в активах][use]': {
    id: 'period[Доля собственного капитала в активах][use]',
    value: 'Y',
    isActive: false,
  },
  // %
  'period[Рентабельность собственного капитала][percent]': {
    id: 'period[Рентабельность собственного капитала][percent]',
    value: 10,
    symbol: '%',
    isActive: false,
  },
  'period[Рентабельность собственного капитала][use]': {
    id: 'period[Рентабельность собственного капитала][use]',
    value: 'Y',
    isActive: false,
  },
  // %
  'period[Темп прироста выручки][percent]': {
    id: 'period[Темп прироста выручки][percent]',
    value: 10,
    symbol: '%',
    isActive: false,
  },
  'period[Темп прироста выручки][use]': {
    id: 'period[Темп прироста выручки][use]',
    value: 'Y',
    isActive: false,
  },
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
        label: '3 квартал 2021',
        value: '3-2021',
      },
      '2-2021': {
        label: '2 квартал 2021',
        value: '2-2021',
      },
      '1-2021': {
        label: '1 квартал 2021',
        value: '1-2021',
      },
      '4-2020': {
        label: '4 квартал 2020',
        value: '4-2020',
      },
    },
  },
  price_bonds: {
    id: 'price_bonds',
    value: 'all',
    isActive: false,
  },
  quality_bonds: {
    id: 'quality_bonds',
    value: 'all',
    isActive: false,
    dropdownValues: {
      all: {
        label: 'Все облигации',
        value: 'all',
      },
      without_default: {
        label: 'Без дефолтных',
        value: 'without_default',
      },
      only_blue_chips: {
        label: 'Только голубые фишки',
        value: 'only_blue_chips',
      },
      no_risk: {
        label: 'Без рисковых',
        value: 'no_risk',
      },
      only_default: {
        label: 'Только дефолтные',
        value: 'only_default',
      },
    },
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
  rate: {
    id: 'rate',
    value: 15,
    isActive: false,
  },
  structural: {
    id: 'structural',
    value: false,
    isActive: false,
    fromApi: {
      all: false,
      no: false,
      yes: true,
    },
    toApi: {
      false: 'no',
      true: 'yes',
    },
  },
  tax: {
    id: 'tax',
    value: 'all',
    isActive: false,
  },
  turnover_week: {
    id: 'turnover_week',
    value: true,
    isActive: false,
    toApi: {
      // Key - текущее значение, Value - что отправить на апи
      true: 'Y',
      false: 'N',
    },
    fromApi: {
      N: false,
      Y: true,
    },
  },
  'type[]': {
    id: 'type[]',
    // TODO: Добавить в UI, убрать value и добавить обработку при получении фильтра по апи и отправке фильтра на сервер
    value: '',
    isActive: false,
    values: {
      корпоративные: {
        label: 'Корпоративные',
        value: 'корпоративные',
      },
      банковские: {
        label: 'Банковские',
        value: 'банковские',
      },
      федеральные: {
        label: 'Федеральные',
        value: 'федеральные',
      },
      муниципальные: {
        label: 'Муниципальные',
        value: 'муниципальные',
      },
    },
  },
  valute: {
    id: 'valute',
    value: 'all',
    isActive: false,
    dropdownValues: {
      all: {
        label: 'Все',
        value: 'all',
      },
      SUR: {
        label: 'Руб',
        value: 'SUR',
      },
      USD: {
        label: 'USD',
        value: 'USD',
      },
      EUR: {
        label: 'EUR',
        value: 'EUR',
      },
    },
  },
};
