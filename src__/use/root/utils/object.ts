import { DynamicObject } from '@/interfaces';
import { useError } from '@/use/useError';

export const useObjectUtils = () => {
  const { _catch } = useError('useObjectUtils');

  return {
    hasKey: (object: DynamicObject, key: string): boolean => {
      try {
        if (typeof object === 'object') {
          return key in object;
        }
        return false;
      } catch (e) {
        _catch(e, 'hasKey');
        return false;
      }
    },
  };
};
