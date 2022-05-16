import { useContext } from 'vite-ssr/vue';
import { useError } from '@/use/useError';
import type { ICookieSetOptions, ICookieRemoveOptions } from '@/use/root/cookie/types';

export const useCookie = () => {
  const ctx = useContext();
  const { _catch } = useError('useCookie');

  /**
   * Получить из массива опций строку
   * @param options Опции
   */
  const serializeOptions = (options: ICookieRemoveOptions | ICookieSetOptions): string => {
    try {
      let result = '';

      for (const optionsKey in options) {
        const optionsItem = options[optionsKey];
        let key = optionsKey;

        if (key === 'maxAge') {
          key = 'max-age';
        }

        result += `${key}=${optionsItem};`;
      }

      return result;
    } catch (e) {
      _catch(e, 'serializeOptions');
      return '';
    }
  };

  /**
   * Установить cookie
   * @param name Название
   * @param value Значение
   * @param options Опции
   */
  const set = (
    name: string,
    value: any,
    options: ICookieSetOptions = {
      path: '/',
      maxAge: 600000,
    },
  ): boolean => {
    try {
      if (typeof window === 'undefined') return false;
      document.cookie = `${name}=${JSON.stringify(value)}; ${serializeOptions(options)}`;
      return true;
    } catch (e) {
      _catch(e, 'set');
      return false;
    }
  };

  /**
   * Получить cookie по названию
   * @param name Название
   */
  const get = (name: string): any => {
    try {
      // Если SSR
      if (typeof window === 'undefined') {
        for (const cookieKey in ctx.initialState?.cookies) {
          const key = cookieKey.trim();
          if (key === name) {
            return JSON.parse(ctx.initialState?.cookies[cookieKey]);
          }
        }
        return undefined;
      }

      // Если клиентская часть
      let result = document.cookie.match(new RegExp(`${name}=([^;]+)`));
      result && (result = JSON.parse(result[1]));
      return result;
    } catch (e) {
      _catch(e, 'get');
      return undefined;
    }
  };

  /**
   * Удалить cookie по названию
   * @param name Название cookie
   * @param options Настройки
   */
  const remove = (name: string, options: ICookieRemoveOptions = {}): boolean => {
    try {
      set(name, '', {
        ...options,
        maxAge: -1,
      });
      return true;
    } catch (e) {
      _catch(e, 'remove');
      return false;
    }
  };

  return {
    set,
    get,
    remove,
  };
};
