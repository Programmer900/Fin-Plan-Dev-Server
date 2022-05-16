interface IOption {
  value: number;
  text: string;
}

export const options: IOption[] = [
  {
    value: 1,
    text: '1',
  },
  {
    value: 2,
    text: '2',
  },
  {
    value: 3,
    text: '3',
  },
];

export const optionsFinancialAnalysis: IOption[] = [
  {
    value: 1,
    text: 'Корпоративные облигации',
  },
  {
    value: 2,
    text: 'Банковские облигации',
  },
];
