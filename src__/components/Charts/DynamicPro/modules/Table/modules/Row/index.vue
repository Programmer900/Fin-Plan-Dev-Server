<template>
  <div
    class="tableRow flexRowCenter"
    :class="[{ pickedRow: getItem.visible && !isReportPage }]"
    @click="onClick"
  >
    <div class="rowIndex flexRowCenter tableValue tableRowName" style="max-width: 220px">
      <img v-if="getItem.alert" alt="!!!" :src="alertIcon" />
      <p style="width: 220px">{{ getItem.name }}</p>
    </div>
    <div
      class="rowValue flexRowCenter tableValue"
      style="position: relative"
      :style="`left: ${currentTableScroll}px`"
    >
      <p v-for="(value, index) in getReverseData" :key="index" class="tableValueItem">
        {{ makeNumFormat(value) }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import alertIcon from '@/assets/icons/alert-circle.svg';

export default defineComponent({
  name: 'ChartDynamicProTableRow',
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
    currentTableScroll: {
      type: Number,
      required: true,
    },
  },
  setup(props, { emit }) {
    const getItem = computed(() => props.item);

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

    return {
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
