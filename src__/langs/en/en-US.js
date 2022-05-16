import { documentPage } from '@/langs/en/pages/document';

export default {
  stock: 'Stock',
  stocksDynamic: 'Stocks dynamic',
  monthlyIncrease: 'Monthly increase',
  yearIncrease: 'Annual growth',
  yearThreeIncrease: 'Growth in 3 years',
  assetsList: {
    stockRu: 'List of Mosbirzhi shares',
    stockEn: 'List of American stocks on the St. Petersburg Stock Exchange',
    bond: 'List of bonds',
    etf: 'List of Moscow Exchange ETFs',
    indexes: 'List of indexes',
  },
  page: {
    document: {
      ...documentPage,
    },
  },
  progresses: {
    revenue: 'Revenue',
    profit: 'Profit',
    profitability: 'Profitability',
    fraction: 'Fraction',
    profitRatio: 'P/E',
    beta: 'Beta',
    capitalization: 'Capitalization',
    dividends: 'Dividends',
  },
  sitenav: {
    training: 'Training',
    services: 'Services',
    blog: 'Blog',
    assets: 'Assets',
    about: 'About us',
  },
  securityHeader: {
    bond: {
      name: 'Obligation',
      date: 'is using since',
      emitent: 'Emitent of obligation is',
    },
    stock: {
      name: 'Stock',
      ticker: 'stock ticker',
      date: 'is using since',
      emitent: 'Emitent of obligation is',
      dynamics: {
        text: 'Stock dynamics:',
        month: 'Month increase',
        year: 'Year increase',
        three_years: 'Three years increase',
      },
    },
  },
  tableTexts: {
    alertText: 'The data in the table are indicated in million rubles.',
    switcherText: 'Industry average indicators',
    index: 'Indicator',
  },
  aboutCompany: {
    newsText:
      'Конечно, выбор акций для инвестирования прежде всего зависит от целей самого инвестора. Кто-то стремится к максимально агрессивному росту портфеля и готов терпеть соответствующие этому риски, кто-то, наоборот, предельно консервативен и готов идти только на очень выверенный и небольшой риск, а для какого-то инвестора важен денежный поток, который будет генерировать инвестиционный портфель, который можно будет выводить на текущее потребление в виде «живого» кэша.',
  },
  aboutStock: [
    {
      name: 'Stock type:',
      path: 'PROP_TIP_AKTSII',
    },
    {
      name: 'Sector:',
      path: 'PROP_SEKTOR',
    },
    {
      name: 'ISIN-code:',
      path: 'ISIN',
    },
    {
      name: 'Number of shares in the slot:',
      path: 'LOTSIZE',
    },
    {
      name: 'Export share:',
      path: 'PROP_EXPORT_SHARE',
    },
    {
      name: 'Operations Short:',
      path: 'PROP_SHORT',
    },
  ],
  bonds: {
    isin: 'ISIN:',
    currentPrice: 'Current price:',
    totalValue: 'Total profitability:',
  },
  discussion: {
    commentText:
      'Значит, когда решили пересадить население на безнал это получилось за каких-то 10 лет. И мировая история карт никак не повлияла на цифровизацию финансов. Так же отсутствие института биржевой торговли никак не помешало за каких-то 5-7 лет в 90-ых перейти от торговли в "ямах" в ручном режиме на полностью цифровую торговлю. А вот ETF оказывается очень сложная тема. Маленький спрос, непродолжительная история, ну-ну. Суть в том, что ПИФы кратно дороже для конечного потребителя чем ETF, а пока финансовая грамотность на нуле можно легально продавать непонятные продукты с огромной маржой. Если завести на московскую биржу нормальные ETF с мизерными комиссиями, то никто не будет покупать дичь от брокеров. Более того, та самая история зарубежных рынков играет только против местных провайдеров, так как они не могут конкурировать ни по истории, ни по политической стабильности, ни по стоимости владения. В общем текущая ситуация это самый обычный протекционизм, который прикрывается надуманными поводами.',
    comments: 'Commentaries',
    showMore: 'Show more',
    reply: 'Answer',
    send: 'Send',
  },
  dividends: {
    methodLabel: 'Methodology for dividends calculating:',
    methodText:
      'Не менее 25% от ЧП по МСФО. Если соотношение «Чистый долг/ скорректир. EBITDA» менее или равно 5.5, при этом EBITDA скорректирована на курсовые разницы. Изменения в резервах и прочие неденежные и нерегулярные статьи.',
    tableHeaders: [
      'Closing the registry',
      'Closing the registry Т-2',
      'Price for closing the registry Т-2',
      'Dividends (₽)',
      'Dividends (%)',
    ],
    currentValue: 'Текущая цена',
  },
  companyIndicators: {
    quarter: 'Q',
    tableRows: {
      quotes: {
        name: 'Quotes',
      },
      assets: {
        name: 'Actives',
        alert: 'true',
      },
      currentAssets: {
        name: 'Current actives',
        alert: '',
      },
      equityCapital: {
        name: 'Equity capital',
        alert: 'true',
      },
      revenueLastYear: {
        name: 'Revenue last year',
        alert: 'true',
      },
      revenueYearRolling: {
        name: 'Revenue for the year (rolling)',
        alert: '',
      },
      pastCapitalization: {
        name: 'Past capitalization',
        alert: '',
      },
      currentRevenue: {
        name: 'Current revenue',
        alert: 'true',
      },
      quarterlyRevenue: {
        name: 'Quarterly revenue',
        alert: '',
      },
      shareEquityAssets: {
        name: 'Share of equity in assets',
        alert: '',
      },
      profit: {
        name: 'Profit',
        alert: '',
      },
      profitYearRolling: {
        name: 'Profit for the year (moving average)',
        alert: '',
      },
      quarterlyProfit: {
        name: 'Quarterly profit',
        alert: '',
      },
      returnOnEquity: {
        name: 'Return on equity',
        alert: '',
      },
      revenueGrowthRate: {
        name: 'Revenue growth rate',
        alert: '',
      },
      assetGrowthRate: {
        name: 'Asset growth rate',
        alert: '',
      },
      profitGrowthRate: {
        name: 'Profit growth rate',
        alert: '',
      },
    },
    tableProps: {
      year: {
        name: 'Year',
        default: true,
      },
      quarter: {
        name: 'Quarter',
      },
    },
  },
};
