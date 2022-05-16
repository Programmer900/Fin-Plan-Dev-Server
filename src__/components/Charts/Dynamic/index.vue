<template>
  <VueHighchart
    v-if="isInit"
    type="chart"
    :options="{
      ...options,
      series: [...data],
      xAxis: {
        categories: categories,
        lineColor: '#c2c2c2',
      },
    }"
    :redrawOnUpdate="true"
    :oneToOneUpdate="false"
    :animateOnUpdate="true"
  />
</template>

<script lang="ts">
import {
  defineComponent, onMounted, onServerPrefetch, onUnmounted, ref, watch,
} from 'vue';
import VueHighcharts from 'vue3-highcharts';
import { useRoute } from 'vue-router';
import { DynamicObject } from '@/interfaces';
import { meUtils } from '@/components/Charts/Dynamic/utils/meUtils';

export default defineComponent({
  name: 'ChartDynamic',
  props: {
    data: {
      type: Array,
      required: true,
    },
    categories: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const route = useRoute();
    const options = ref<DynamicObject | null>(null);
    const isInit = ref<boolean>(false);

    const init = () => {
      options.value = meUtils.init(props.data);
      isInit.value = true;
    };

    const reset = () => {
      isInit.value = false;
      options.value = null;
    };

    onMounted(() => {
      init();
    });

    onUnmounted(() => {
      reset();
    });

    watch(
      () => route.params.id,
      () => {
        reset();
      },
    );

    return {
      options,
      isInit,
    };
  },
});
</script>

<style scoped lang="scss"></style>
