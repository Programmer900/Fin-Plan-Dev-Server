<template>
  <div class="tableRow flexRowCenter tableRowHeader">
    <div class="rowIndex flexRowCenter tableValue tableRowName" style="max-width: 220px">
      <p style="width: 220px">{{ $t('tableTexts.index') }}</p>
    </div>
    <div
      class="rowValue flexRowCenter tableValue"
      style="position: relative"
      :style="`left: ${currentTableScroll}px`"
    >
      <p v-for="(item, index) in getReverseCategories" :key="index" class="tableValueItem">
        <template v-if="getReverseQuarters"> {{ item }} {{ getReverseQuarters[index] }}</template>
        <template v-else>{{ item }}</template>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'ChartDynamicProTableHeader',
  props: {
    data: {
      type: Object,
      required: true,
    },
    categories: {
      type: Object,
      required: true,
    },
    quarters: {
      type: Array,
      required: true,
    },
    currentTableScroll: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const getReverseCategories = computed(() => Object.values(props.categories).reverse());
    const getReverseQuarters = computed(() => Array.from(props.quarters).reverse());

    return {
      getReverseCategories,
      getReverseQuarters,
    };
  },
});
</script>

<style scoped lang="scss">
.tableRowHeader {
  background-color: white !important;

  p {
    font-weight: 400;
  }

  .rowIndex {
    background-color: white !important;
  }

  &:hover {
    background-color: white !important;
    cursor: default !important;

    .rowIndex {
      padding-left: 0 !important;
      background-color: white !important;
    }
  }
}
</style>
