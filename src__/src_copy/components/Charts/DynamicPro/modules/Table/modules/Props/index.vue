<template>
  <div class="period">
    <span :class="{ picked: getProp === 'year' }" @click="changeParam('year')">{{
      $t('companyIndicators.tableProps.year.name')
    }}</span>
    <span :class="{ picked: getProp === 'quarter' }" @click="changeParam('quarter')">{{
      $t('companyIndicators.tableProps.quarter.name')
    }}</span>
  </div>
</template>

<script lang="ts">
import {
  computed, defineComponent, onUnmounted, ref,
} from 'vue';
import { useStore } from 'vuex';
import { useEmitter } from '@/use/useEmitter';

export default defineComponent({
  name: 'ChartDynamicProTableProps',
  emits: ['onChangeParam'],
  props: {
    onChangeIntervalHook: {
      type: String,
      required: true,
    },
    getIntervalHook: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const emitter = useEmitter();
    const store = useStore();

    const getProp = computed(() => store.getters[props.getIntervalHook]);

    const changeParam = (paramName: string) => {
      if (getProp.value !== paramName) {
        store.commit(props.onChangeIntervalHook, paramName);
        emit('onChangeParam', paramName);
        emitter.emit('onChangeDocumentTableProp');
      }
    };

    onUnmounted(() => {
      emitter.off('onChangeDocumentTableProp');
    });

    return {
      getProp,
      changeParam,
    };
  },
});
</script>

<style scoped lang="scss"></style>
