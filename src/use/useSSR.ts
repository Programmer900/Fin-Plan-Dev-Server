import { onMounted, onServerPrefetch, onUnmounted } from 'vue';
import { appStore } from '@/store/app';

const isAsync = (_f) => {
  if (!_f || !(_f instanceof Function)) throw new TypeError('!_f of _f not Function');
  if (_f[Symbol.toStringTag] === 'AsyncFunction') throw new TypeError('AsyncFunction');

  const isPromiseOrAsync = (_f) => _f === Promise.resolve(_f);

  let result = null;
  try {
    result = _f();

    if (isPromiseOrAsync(result)) {
      result = null;
      // throw new TypeError('PromiseOrAsync');
      return true;
    }
  } catch (_e) {
    return true;
  }

  return false;
};

export const useSSR = (callback: () => void): boolean => {
  const isInitSSR = ref(false);

  onMounted(async () => {
    if (!isInitSSR.value) {
      await callback();
    }
  });

  onServerPrefetch(async () => {
    await callback();
    isInitSSR.value = true;
  });

  return isInitSSR.value;
};
