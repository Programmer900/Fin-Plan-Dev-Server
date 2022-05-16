import { useError } from '@/use/useError';

export const useArrayUtils = () => {
  const { _catch } = useError('useArrayUtils');

  return {
    /**
     * Имеет ли массив объект. Поиск осуществляется по ключу
     * @param collection Массив
     * @param target Целевой объект
     * @param key Ключ объекта
     */
    hasObjectByKey: (collection: any[], target: any, key: string): boolean => {
      try {
        return collection.find((item) => item[key] === target[key]);
      } catch (e) {
        _catch(e, 'include');
        return false;
      }
    },
  };
};
