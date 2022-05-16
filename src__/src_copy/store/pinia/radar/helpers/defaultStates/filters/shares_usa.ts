export const sharesUsaFilters = {
  analitics: {
    id: 'analitics',
    value: 'shares_company_tab',
    isActive: false,
    dropdownValues: {
      shares_company_tab: {
        label: 'Предприятие',
        value: 'shares_company_tab',
      },
    },
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
  cagr: {
    id: 'cagr',
    value: 'all',
    isActive: false,
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
      '0-300000000': {
        label: 'До 300 млн.$',
        value: '0-300000000',
      },
      '300000000-2000000000': {
        label: 'От 300 млн.$ до 2 млрд.$',
        value: '300000000-2000000000',
      },
      '2000000000-10000000000': {
        label: 'От 2 до 10 млрд.$',
        value: '2000000000-10000000000',
      },
      '10000000000-100000000000': {
        label: 'От 10 до 100 млрд.$',
        value: '10000000000-100000000000',
      },
      '1000000000-999000000000000': {
        label: 'Более 1 млрд.$',
        value: '1000000000-999000000000000',
      },
      '10000000000-999000000000000': {
        label: 'Более 10 млрд.$',
        value: '10000000000-999000000000000',
      },
      '100000000000-999000000000000': {
        label: 'Более 100 млрд.$',
        value: '100000000000-999000000000000',
      },
    },
  },
  country: {
    id: 'country',
    value: 'all',
    isActive: false,
    dropdownValues: {
      all: {
        label: 'Не учитывать',
        value: 'all',
      },
      Австралия: {
        label: 'Австралия',
        value: 'Австралия',
      },
      Аргентина: {
        label: 'Аргентина',
        value: 'Аргентина',
      },
      Бермуды: {
        label: 'Бермуды',
        value: 'Бермуды',
      },
      Бразилия: {
        label: 'Бразилия',
        value: 'Бразилия',
      },
    },
  },
  currency: {
    id: 'currency',
    value: 'all',
    isActive: false,
    dropdownValues: {
      all: {
        label: 'Не учитывать',
        value: 'all',
      },
      EUR: {
        label: 'EUR',
        value: 'EUR',
      },
      RUR: {
        label: 'RUR',
        value: 'RUR',
      },
      USD: {
        label: 'USD',
        value: 'USD',
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
  estimates_net_profit: {
    id: 'estimates_net_profit',
    value: 'all',
    isActive: false,
  },
  estimates_net_profit_year: {
    id: 'estimates_net_profit_year',
    value: 'all',
    isActive: false,
  },
  estimates_rel_net_profit: {
    id: 'estimates_rel_net_profit',
    value: 'all',
    isActive: false,
  },
  estimates_rel_net_profit_period: {
    id: 'estimates_rel_net_profit_period',
    value: 'no',
    isActive: false,
  },
  estimates_rel_net_profit_year: {
    id: 'estimates_rel_net_profit_year',
    value: 'all',
    isActive: false,
  },
  estimates_rel_revenue: {
    id: 'estimates_rel_revenue',
    value: 'all',
    isActive: false,
  },
  estimates_rel_revenue_period: {
    id: 'estimates_rel_revenue_period',
    value: 'no',
    isActive: false,
  },
  estimates_rel_revenue_year: {
    id: 'estimates_rel_revenue_year',
    value: 'all',
    isActive: false,
  },
  estimates_revenue: {
    id: 'estimates_revenue',
    value: 'all',
    isActive: false,
  },
  estimates_revenue_year: {
    id: 'estimates_revenue_year',
    value: 'all',
    isActive: false,
  },
  fund: {
    id: 'fund',
    value: 'all',
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
    value: 'all',
    isActive: false,
    dropdownValues: {
      all: {
        label: 'Не учитывать',
        value: 'all',
      },
      'NASDAQ-100': {
        label: 'NASDAQ-100',
        value: 'NASDAQ-100',
      },
      SP500: {
        label: 'SP500',
        value: 'SP500',
      },
    },
  },
  industry: {
    id: 'industry',
    value: 'all',
    isActive: false,
    dropdownValues: {
      all: {
        label: 'Не учитывать',
        value: 'all',
      },
      'IT-услуги и консультации': {
        label: 'IT-услуги и консультации',
        value: 'IT-услуги и консультации',
      },
      Авиакомпании: {
        label: 'Авиакомпании',
        value: 'Авиакомпании',
      },
      'Авиакосмическая и оборонная промышленность': {
        label: 'Авиакосмическая и оборонная промышленность',
        value: 'Авиакосмическая и оборонная промышленность',
      },
      'Авиаперевозки и курьерские услуги': {
        label: 'Авиаперевозки и курьерские услуги',
        value: 'Авиаперевозки и курьерские услуги',
      },
      'Автотранспорт. запчасти и обслуживание - розница': {
        label: 'Автотранспорт. запчасти и обслуживание - розница',
        value: 'Автотранспорт. запчасти и обслуживание - розница',
      },
      Алюминий: {
        label: 'Алюминий',
        value: 'Алюминий',
      },
      Банки: {
        label: 'Банки',
        value: 'Банки',
      },
      'Безалкогольные напитки': {
        label: 'Безалкогольные напитки',
        value: 'Безалкогольные напитки',
      },
      'Биотехнологии и медицинские исследования': {
        label: 'Биотехнологии и медицинские исследования',
        value: 'Биотехнологии и медицинские исследования',
      },
      'Бумажная упаковка': {
        label: 'Бумажная упаковка',
        value: 'Бумажная упаковка',
      },
      'Бумажные изделия': {
        label: 'Бумажные изделия',
        value: 'Бумажные изделия',
      },
      'Бурение нефтяных и газовых скважин': {
        label: 'Бурение нефтяных и газовых скважин',
        value: 'Бурение нефтяных и газовых скважин',
      },
      'Бытовая техника. инструменты и товары для дома': {
        label: 'Бытовая техника. инструменты и товары для дома',
        value: 'Бытовая техника. инструменты и товары для дома',
      },
      'Бытовая электроника': {
        label: 'Бытовая электроника',
        value: 'Бытовая электроника',
      },
      'Бытовые товары': {
        label: 'Бытовые товары',
        value: 'Бытовые товары',
      },
      'Бытовые услуги': {
        label: 'Бытовые услуги',
        value: 'Бытовые услуги',
      },
      'Вино-водочные заводы': {
        label: 'Вино-водочные заводы',
        value: 'Вино-водочные заводы',
      },
      'Возобновляемое топливо': {
        label: 'Возобновляемое топливо',
        value: 'Возобновляемое топливо',
      },
      'Возобновляемые источники энергии - оборудование и услуги': {
        label: 'Возобновляемые источники энергии - оборудование и услуги',
        value: 'Возобновляемые источники энергии - оборудование и услуги',
      },
      Газоснабжение: {
        label: 'Газоснабжение',
        value: 'Газоснабжение',
      },
      'Дисконтные магазины': {
        label: 'Дисконтные магазины',
        value: 'Дисконтные магазины',
      },
      'Добыча полезных ископаемых и металлов': {
        label: 'Добыча полезных ископаемых и металлов',
        value: 'Добыча полезных ископаемых и металлов',
      },
      'Закрытые инвестиционные фонды': {
        label: 'Закрытые инвестиционные фонды',
        value: 'Закрытые инвестиционные фонды',
      },
      'Запчасти для легковых. грузовых автомобилей и мотоциклов': {
        label: 'Запчасти для легковых. грузовых автомобилей и мотоциклов',
        value: 'Запчасти для легковых. грузовых автомобилей и мотоциклов',
      },
      Золото: {
        label: 'Золото',
        value: 'Золото',
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
    value: 30,
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
    value: 50,
    isActive: false,
    symbol: '%',
  },
  'period[Доля собственного капитала в активах][use]': 'Y',
  // %
  'period[Рентабельность собственного капитала][percent]': {
    id: 'period[Рентабельность собственного капитала][percent]',
    value: 10,
    isActive: false,
    symbol: '%',
  },
  'period[Рентабельность собственного капитала][use]': 'Y',
  // %
  'period[Темп прироста выручки][percent]': {
    id: 'period[Темп прироста выручки][percent]',
    value: 10,
    isActive: false,
    symbol: '%',
  },
  'period[Темп прироста выручки][use]': 'Y',
  // %
  'period[Темп роста активов][percent]': {
    id: 'period[Темп роста активов][percent]',
    value: 10,
    isActive: false,
    symbol: '%',
  },
  'period[Темп роста активов][use]': 'Y',
  // %
  'period[Темп роста прибыли][percent]': {
    id: 'period[Темп роста прибыли][percent]',
    value: 10,
    isActive: false,
    symbol: '%',
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
  price: {
    id: 'price',
    value: 'all',
    isActive: false,
    dropdownValues: {
      all: {
        label: 'Все',
        value: 'all',
      },
      '0-20': {
        label: 'До 20$',
        value: '0-20',
      },
      '0-50': {
        label: 'До 50$',
        value: '0-50',
      },
      '0-100': {
        label: 'До 100$',
        value: '0-100',
      },
      '0-300': {
        label: 'До 300$',
        value: '0-300',
      },
      '0-1000': {
        label: 'До 1000$',
        value: '0-1000',
      },
      '0-5000': {
        label: 'До 5000$',
        value: '0-5000',
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
  'sector[]': {
    id: 'sector[]',
    value: '',
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
  top: {
    id: 'top',
    value: 'all',
    isActive: false,
    dropdownValues: {
      all: {
        label: 'Не учитывать',
        value: 'all',
      },
      '3Д-печать': {
        label: '3Д-печать',
        value: '3Д-печать',
      },
      'Big data': {
        label: 'Big data',
        value: 'Big data',
      },
      'Money 2.0': {
        label: 'Money 2.0',
        value: 'Money 2.0',
      },
      REIT: {
        label: 'REIT',
        value: 'REIT',
      },
      'X-future': {
        label: 'X-future',
        value: 'X-future',
      },
    },
  },
  turnover_week: {
    id: 'turnover_week',
    value: false,
    isActive: false,
  },
  into_gs_usa_portfolio: {
    id: 'into_gs_usa_portfolio',
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
  use_esg: {
    id: 'use_esg',
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
  use_halal: {
    id: 'use_halal',
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
