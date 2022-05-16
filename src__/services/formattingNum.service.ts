export const formattingNum = (number: number | string, toFixed = 0): string => {
  if (!number) return '';

  const _number = Number(number).toFixed(toFixed);
  return new Intl.NumberFormat('ru-RU').format(Number(_number));
};

export const formattingNumPlaceholder = (number: number | string): string => {
  if (String(number) === '------') {
    return '------';
  }

  return formattingNum(number);
};

export const formattingToShort = (num: number, digits = 0): string => {
  if (num < 1) {
    return num.toFixed(2);
  }

  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: ' тыс.' },
    { value: 1e6, symbol: ' млн.' },
    { value: 1e9, symbol: ' млрд.' },
    { value: 1e12, symbol: ' трлн.' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ];

  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;

  const item = lookup
    .slice()
    .reverse()
    .find((item) => num >= item.value);

  return item ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol : '0';
};
