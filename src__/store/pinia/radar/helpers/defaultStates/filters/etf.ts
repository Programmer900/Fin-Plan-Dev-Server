export const etfFilters = {
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
  EMITENT_ID: {
    id: 'EMITENT_ID',
    value: 'all',
    isActive: false,
    dropdownValues: {
      all: {
        label: 'Все',
        value: 'all',
      },
      263877: {
        label: 'FinEx Funds plc',
        value: 263877,
      },
      263879: {
        label: 'ITI Funds',
        value: 263879,
      },
      263881: {
        label: 'Сбербанк Управление Активами АО',
        value: 263881,
      },
      263887: {
        label: 'Газпромбанк - Управление активами АО',
        value: 263887,
      },
      264265: {
        label: 'ВТБ Капитал Управление активами АО',
        value: 264265,
      },
      264267: {
        label: 'FinEx Physically Backed Funds plc',
        value: 264267,
      },
      264269: {
        label: 'УК Альфа-Капитал ООО',
        value: 264269,
      },
      264275: {
        label: 'УК Восток-Запад',
        value: 264275,
      },
      264277: {
        label: 'УК Тинькофф Капитал',
        value: 264277,
      },
      298887: {
        label: 'УК Система Капитал',
        value: 298887,
      },
      306748: {
        label: 'УК Райффайзен Капитал',
        value: 306748,
      },
      368293: {
        label: 'УК РСХБ Управление Активами',
        value: 368293,
      },
      381372: {
        label: 'УК РЕГИОН Инвестиции АО',
        value: 381372,
      },
      381374: {
        label: 'Открытие УК',
        value: 381374,
      },
      430425: {
        label: 'УК ДОХОДЪ ООО',
        value: 430425,
      },
      439050: {
        label: 'УК Финам Менеджмент',
        value: 439050,
      },
      459517: {
        label: 'УК БКС',
        value: 459517,
      },
      473236: {
        label: 'УК Атон-менеджмент',
        value: 473236,
      },
      511745: {
        label: 'БСПБ Капитал ООО',
        value: 511745,
      },
      517305: {
        label: 'УК Ингосстрах - Инвестиции АО',
        value: 517305,
      },
      517307: {
        label: 'УК МКБ Инвестиции',
        value: 517307,
      },
    },
  },
  ETF_AVG_ICNREASE: {
    id: 'ETF_AVG_ICNREASE',
    value: 0,
    isActive: false,
  },
  ETF_BASE_CURRENCY: {
    id: 'ETF_BASE_CURRENCY',
    value: 'all',
    isActive: false,
    dropdownValues: {
      all: {
        label: 'Все',
        value: 'all',
      },
      all_not_rub: {
        label: 'Не рубль',
        value: 'all_not_rub',
      },
      EUR: {
        label: 'EUR',
        value: 'EUR',
      },
      KZT: {
        label: 'KZT',
        value: 'KZT',
      },
      RUB: {
        label: 'RUB',
        value: 'RUB',
      },
      'RUB/USD': {
        label: 'RUB/USD',
        value: 'RUB/USD',
      },
      USD: {
        label: 'USD',
        value: 'USD',
      },
    },
  },
  ETF_COMISSION: {
    id: 'ETF_COMISSION',
    value: 1.5,
    isActive: false,
  },
  ETF_COUNTRY: {
    id: 'ETF_COUNTRY',
    value: 'all',
    isActive: false,
    dropdownValues: {
      all: {
        label: 'Все',
        value: 'all',
      },
      'Азиатско-Тихоокеанский регион': {
        label: 'Азиатско-Тихоокеанский регион',
        value: 'Азиатско-Тихоокеанский регион',
      },
      Германия: {
        label: 'Германия',
        value: 'Германия',
      },
      Европа: {
        label: 'Европа',
        value: 'Европа',
      },
      Казахстан: {
        label: 'Казахстан',
        value: 'Казахстан',
      },
      Китай: {
        label: 'Китай',
        value: 'Китай',
      },
      Мир: {
        label: 'Мир',
        value: 'Мир',
      },
      'Развивающиеся страны': {
        label: 'Развивающиеся страны',
        value: 'Развивающиеся страны',
      },
      'Развитые рынки': {
        label: 'Развитые рынки',
        value: 'Развитые рынки',
      },
      'Развитые рынки (без США)': {
        label: 'Развитые рынки (без США)',
        value: 'Развитые рынки (без США)',
      },
      Россия: {
        label: 'Россия',
        value: 'Россия',
      },
      США: {
        label: 'США',
        value: 'США',
      },
    },
  },
  ETF_CURRENCY: {
    id: 'ETF_CURRENCY',
    value: 'all',
    isActive: false,
    dropdownValues: {
      all: {
        label: 'Все',
        value: 'all',
      },
      EUR: {
        label: 'EUR',
        value: 'EUR',
      },
      RUB: {
        label: 'RUB',
        value: 'RUB',
      },
      USD: {
        label: 'USD',
        value: 'USD',
      },
    },
  },
  ETF_DIVIDENDS: {
    id: 'ETF_DIVIDENDS',
    value: 'all',
    isActive: false,
    dropdownValues: {
      all: {
        label: 'Все',
        value: 'all',
      },
      'Не применимо': {
        label: 'Не применимо',
        value: 'Не применимо',
      },
      'Нет выплат': {
        label: 'Нет выплат',
        value: 'Нет выплат',
      },
      Предусмотрено: {
        label: 'Предусмотрено',
        value: 'Предусмотрено',
      },
      Реинвестирование: {
        label: 'Реинвестирование',
        value: 'Реинвестирование',
      },
    },
  },
  ETF_EXCHANGE: {
    id: 'ETF_EXCHANGE',
    value: 'all',
    isActive: false,
    dropdownValues: {
      all: {
        label: 'Все',
        value: 'all',
      },
      Мосбиржа: {
        label: 'Мосбиржа',
        value: 'Мосбиржа',
      },
    },
  },
  ETF_INDUSTRY: {
    id: 'ETF_INDUSTRY',
    value: 'all',
    isActive: false,
    dropdownValues: {
      all: {
        label: 'Все',
        value: 'all',
      },
      REIT: {
        label: 'REIT',
        value: 'REIT',
      },
      Биотехнологии: {
        label: 'Биотехнологии',
        value: 'Биотехнологии',
      },
      Блокчейн: {
        label: 'Блокчейн',
        value: 'Блокчейн',
      },
      Видеоигры: {
        label: 'Видеоигры',
        value: 'Видеоигры',
      },
      'Гос. сектор': {
        label: 'Гос. сектор',
        value: 'Гос. сектор',
      },
      Золотодобытчики: {
        label: 'Золотодобытчики',
        value: 'Золотодобытчики',
      },
      Космос: {
        label: 'Космос',
        value: 'Космос',
      },
      Полупроводники: {
        label: 'Полупроводники',
        value: 'Полупроводники',
      },
      Промышленность: {
        label: 'Промышленность',
        value: 'Промышленность',
      },
      Разное: {
        label: 'Разное',
        value: 'Разное',
      },
      Технологии: {
        label: 'Технологии',
        value: 'Технологии',
      },
    },
  },
  ETF_REPLICATION: {
    id: 'ETF_REPLICATION',
    value: 'all',
    isActive: false,
    dropdownValues: {
      all: {
        label: 'Все',
        value: 'all',
      },
      Двойная: {
        label: 'Двойная',
        value: 'Двойная',
      },
      Синтетическая: {
        label: 'Синтетическая',
        value: 'Синтетическая',
      },
      Физическая: {
        label: 'Физическая',
        value: 'Физическая',
      },
    },
  },
  ETF_TYPE: {
    id: 'ETF_TYPE',
    value: 'all',
    isActive: false,
    dropdownValues: {
      all: {
        label: 'Все',
        value: 'all',
      },
      ETF: {
        label: 'ETF',
        value: 'ETF',
      },
      БПИФ: {
        label: 'БПИФ',
        value: 'БПИФ',
      },
    },
  },
  ETF_TYPE_OF_ACTIVES: {
    id: 'ETF_TYPE_OF_ACTIVES',
    value: 'all',
    isActive: false,
    dropdownValues: {
      all: {
        label: 'Все',
        value: 'all',
      },
      Акции: {
        label: 'Акции',
        value: 'Акции',
      },
      'Денежный рынок': {
        label: 'Денежный рынок',
        value: 'Денежный рынок',
      },
      Недвижимость: {
        label: 'Недвижимость',
        value: 'Недвижимость',
      },
      Облигации: {
        label: 'Облигации',
        value: 'Облигации',
      },
      'Смешанные активы': {
        label: 'Смешанные активы',
        value: 'Смешанные активы',
      },
      Товар: {
        label: 'Товар',
        value: 'Товар',
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
  'radar-rating': {
    id: 'radar-rating',
    value: 'all',
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
