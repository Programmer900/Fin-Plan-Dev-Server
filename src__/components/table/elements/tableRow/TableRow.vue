<template>
  <div
    class="tableRow flexRowCenter"
    :class="[{ pickedRow: getChartSeriesData.show }]"
    @click="onCLickRow"
  >
    <div class="rowIndex flexRowCenter tableValue">
      <img v-if="alert" alt="alert" :src="alertIcon" />
      <p>{{ name }}</p>
    </div>
    <div class="rowValue flexRowCenter tableValue">
      <p v-for="(item, index) in data" :key="index" class="tableValueItem">
        {{ formattingNumPlaceholder(item) }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import {
 computed, defineComponent, onMounted, ref
} from 'vue';
import { useStore } from 'vuex';
import { formattingNumPlaceholder } from '@/services/formattingNum.service';
import { useEmitter } from '@/use/useEmitter';

export default defineComponent({
  name: 'TableRow',
  props: {
    id: {
      type: String || Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    name: {
      default: '',
      type: String,
    },
    alert: {
      default: '',
      type: String,
    },
    data: {
      required: true,
      type: Array,
    },
    // eslint-disable-next-line vue/require-prop-types
    chartSeries: {
      default: {
        show: false,
      },
    },
  },
  data() {
    return {
      formattingNumPlaceholder,
      alertIcon: require('../../../../assets/icons/alert-circle.svg'),
    };
  },
  setup(props) {
    const emitter = useEmitter();
    const store = useStore();

    const $data = ref<any>('');
    const itemWidth = ref<any>('');

    const initDOM = (): void => {
      if (!$data.value) {
        $data.value = document.querySelectorAll('.rowValue') || '';

        const $item: any = document.querySelector('.rowValue .tableValueItem') || '';
        itemWidth.value = $item.offsetWidth / 16;
      }
    };

    const scrollToLeft = (): void => {
      $data.value.forEach((item: any) => {
        item.scrollLeft -= itemWidth.value;
      });
    };

    const scrollToRight = (): void => {
      $data.value.forEach((item: any) => {
        item.scrollLeft += itemWidth.value;
      });
    };

    emitter.on('scrollIndicatorsTableToLeft', () => {
      initDOM();
      scrollToLeft();
    });

    emitter.on('scrollIndicatorsTableToRight', () => {
      initDOM();
      scrollToRight();
    });

    const getChartSeriesData = computed(
      (): any => store.getters['financialStore/getGraphSeriesData'][props.id],
    );

    const onCLickRow = (): void => {
      store.commit('financialStore/setGraphSeriesReverseValue', props.id);
    };

    return {
      onCLickRow,
      getChartSeriesData,
    };
  },
});
</script>
