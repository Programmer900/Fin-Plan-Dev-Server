<template>
  <div v-if="isInit" class="chart">
    <h1 class="chart__title">График индекса "{{ getName }}"</h1>
    <ChartCandlePro :categories="categories" :values="values" />
  </div>
</template>

<script lang="ts">
import {
 computed, defineComponent, onMounted, ref
} from 'vue';
import { useStore } from 'vuex';
import { meUtils } from '@/views/Index/modules/Body/Chart/utils/meUtils';
import { DynamicObject } from '@/interfaces';
import ChartCandlePro from '@/components/Charts/CandlePro/index.vue';

export default defineComponent({
  name: 'IndexPageChart',
  components: { ChartCandlePro },
  setup() {
    const store = useStore();

    const isInit = ref<boolean>(false);
    const values = ref<DynamicObject[]>([]);
    const categories = ref<string[]>([]);

    const getName = computed(() => store.getters['indexPageStore/getName']);

    const init = () => {
      const data = store.getters['indexPageStore/getChartData'];
      const isInitUtils = meUtils.init(data);

      if (isInitUtils) {
        values.value = meUtils.getValues();
        categories.value = meUtils.getCategories();
        isInit.value = true;
      }
    };

    onMounted(() => {
      init();
    });

    return {
      isInit,
      getName,
      values,
      categories,
    };
  },
});
</script>

<style scoped lang="scss">
.chart {
  padding-top: 20px;

  &__title {
    margin-bottom: 30px;
    font-weight: 500;
    font-size: 28px;
  }
}
</style>
