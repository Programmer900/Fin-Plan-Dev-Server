<template>
  <div class="period">
    <span :class="{ picked: isYear }" @click="changeParam('year')">{{
      $t('companyIndicators.tableProps.year.name')
    }}</span>
    <span :class="{ picked: !isYear }" @click="changeParam('quarter')">{{
      $t('companyIndicators.tableProps.quarter.name')
    }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, onUnmounted, ref } from 'vue';
import { mapActions, useStore } from 'vuex';
import { useEmitter } from '@/use/useEmitter';

export default defineComponent({
  name: 'TableProps',
  setup() {
    const emitter = useEmitter();
    const store = useStore();

    const isYear = ref<boolean>(true);

    const changeParam = (paramName: string): void => {
      isYear.value = !isYear.value;
      store.dispatch('financialStore/onChangeProp', paramName);
      emitter.emit('onChangeTableParam', paramName);
    };

    onUnmounted(() => {
      emitter.off('onChangeTableParam');
    });

    return {
      isYear,
      changeParam,
    };
  },
});
</script>
