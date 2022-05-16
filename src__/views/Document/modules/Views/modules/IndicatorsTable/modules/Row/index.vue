<template>
  <div
    ref="root"
    class="tableRow flexRowCenter"
    :class="[{ pickedRow: getItem.visible && !isReportPage }]"
    @click="onClick"
  >
    <div class="rowIndex flexRowCenter tableValue tableRowName" style="max-width: 220px">
      <img v-if="getItem.alert" alt="!!!" :src="alertIcon" />
      <p style="width: 220px">{{ getItem.name }}</p>
    </div>
    <div class="rowValue flexRowCenter tableValue" style="position: relative">
      <p v-for="(value, index) in getReverseData" :key="index" class="tableValueItem">
        {{ makeNumFormat(value) }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import {
 computed, defineComponent, onMounted, onUnmounted, ref
} from 'vue';
import { useEmitter } from '@/use/useEmitter';
import alertIcon from '@/assets/icons/alert-circle.svg';

export default defineComponent({
  name: 'DocumentIndicatorsTableRow',
  emits: ['onChangeChartDataView'],
  props: {
    item: {
      type: Object,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    isReportPage: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const root = ref<any>(null);
    const emitter = useEmitter();

    const itemsArr = ref<any[]>([]);
    const itemWidth = ref<number>(0);
    const scrollValue = ref<number>(0);

    const getItem = computed(() => props.item);

    const init = () => {
      itemsArr.value = root.value.querySelectorAll('.rowValue.flexRowCenter.tableValue');
      itemWidth.value = root.value.querySelector('.tableValueItem').offsetWidth;
      itemsArr.value.forEach((item: any) => {
        item.style.left = 0;
      });
    };

    const reset = () => {
      itemsArr.value = [];
      itemWidth.value = 0;
      scrollValue.value = 0;
    };

    const scrollToLeft = (): void => {
      if (scrollValue.value === 0) return;
      scrollValue.value -= itemWidth.value;
      itemsArr.value.forEach((item: any) => {
        item.style.left = `-${scrollValue.value}px`;
      });
    };

    const scrollToRight = (): void => {
      const maxWidth = root.value.querySelector('.rowValue.flexRowCenter.tableValue').offsetWidth;
      if (scrollValue.value >= maxWidth - 200) return;
      scrollValue.value += itemWidth.value;
      itemsArr.value.forEach((item: any) => {
        item.style.left = `-${scrollValue.value}px`;
      });
    };

    const makeNumFormat = (value: string | number): number => {
      const _value = Number(value);
      if (Number.isInteger(_value)) {
        return _value;
      }
      return Number(_value.toFixed(2));
    };

    const onClick = () => {
      emit('onChangeChartDataView', props.id);
    };

    const getReverseData = computed(() => Object.values(props.item.data).reverse());

    emitter.on('scrollIndicatorsTableToLeft', () => {
      scrollToLeft();
    });

    emitter.on('scrollIndicatorsTableToRight', () => {
      scrollToRight();
    });

    emitter.on('onChangeDocumentTableProp', () => {
      reset();
      init();
    });

    onMounted(() => {
      init();
    });

    onUnmounted(() => {
      emitter.off('scrollIndicatorsTableToLeft');
      emitter.off('scrollIndicatorsTableToRight');
      reset();
    });

    return {
      root,
      alertIcon,
      getItem,
      getReverseData,
      onClick,
      makeNumFormat,
    };
  },
});
</script>

<style scoped lang="scss"></style>
