export const useError = (defaultText = '') => {
  const _catch = (e: any = '', text = '') => {
    if (!defaultText && !text && !e) console.error('Возникла ошибка');
    if (defaultText || text) console.error(`${defaultText} ${text}`);
    if (e) console.error(e);
  };

  return {
    _catch,
  };
};
