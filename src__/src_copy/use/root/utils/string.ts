import { useError } from '@/use/useError';

/**
 * Инструменты для работы со строками
 */
export const useStringUtils = () => {
  const { _catch } = useError();

  return {
    /**
     * Удалить последний символ строки
     * @param str Строка
     */
    removeLast: (str: string): string => String(str).slice(0, -1),

    /**
     * Получить последний символ строки
     * @param str Строка
     */
    getLast: (str: string): string => String(str).slice(-1),

    /**
     * Получить query параметр из строки
     * @param str Строка
     * @param removeValueSpecialSymbol Убрать специальный символ в конце значения (например, символ %)
     */
    getQueryObject: (str: string, removeValueSpecialSymbol = false) => {
      const queryVars = String(str).split('&');
      const result = {};
      queryVars.forEach((queryVar) => {
        const pair = queryVar.split('=');
        const queryName = pair[0];
        const queryValue = pair[1];

        if (removeValueSpecialSymbol) {
          result[queryName] = queryValue.replace(/[&/\\#,+()$~%.'":*?<>{}]/g, '');
        } else {
          result[queryName] = queryValue;
        }
      });
      return result;
    },

    /**
     * Перевести camel case в snake case
     * @param str
     */
    camelToSnake: (str: string): string => {
      try {
        return str
          .split('')
          .map((letter, idx) =>
            letter.toUpperCase() === letter
              ? `${idx !== 0 ? '_' : ''}${letter.toLowerCase()}`
              : letter,
          )
          .join('');
      } catch (e) {
        _catch(e, 'camelToSnake');
        return '';
      }
    },

    /**
     * Перевести camel case в kebab case
     * @param str
     */
    camelToKebab: (str: string): string => {
      try {
        return str
          .split('')
          .map((letter, idx) =>
            letter.toUpperCase() === letter
              ? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}`
              : letter,
          )
          .join('');
      } catch (e) {
        _catch(e, 'camelToKebab');
        return '';
      }
    },
  };
};
