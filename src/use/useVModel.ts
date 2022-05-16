import { computed, getCurrentInstance, WritableComputedRef } from 'vue';

export const useVModel = (
  props: any,
  propName: string,
  toNum = false,
): WritableComputedRef<string> => {
  const vm = getCurrentInstance()?.proxy || '';

  if (!vm) {
    throw new Error('vm is null');
  }

  return computed({
    get() {
      return props[propName];
    },
    set(value) {
      if (toNum) {
        vm.$emit(`update:${propName}`, Number(value));
      } else {
        vm.$emit(`update:${propName}`, value);
      }
    },
  });
};
