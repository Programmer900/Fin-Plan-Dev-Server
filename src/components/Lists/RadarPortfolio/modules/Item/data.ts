export interface IStat {
  title: string;
  value: string;
}

export const profitStats: IStat[] = [
  {
    title: 'Годовая',
    value: '16,52%',
  },
  {
    title: 'Общая',
    value: '76,08%',
  },
  {
    title: 'По оферте',
    value: '7,1%',
  },
];

export const cancellationPeriodStats: IStat[] = [
  {
    title: 'Общий',
    value: '15.05.2021',
  },
  {
    title: 'По оферте',
    value: '28.05.2021',
  },
];

export const repaymentPriceStats: IStat[] = [
  {
    title: 'Общий',
    value: '1843,68 ₽',
  },
  {
    title: 'С купонами',
    value: '1093,74 ₽',
  },
];
