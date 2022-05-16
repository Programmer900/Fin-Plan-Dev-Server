<template>
  <div class="tableRow flexRowCenter tableRowHeader">
    <div class="rowIndex flexRowCenter tableValue tableRowName" style="max-width: 220px">
      <p style="width: 220px">{{ indexTitle }}</p>
    </div>
    <div
      class="rowValue flexRowCenter tableValue"
      style="position: relative"
      :style="`left: ${currentTableScroll}px`"
    >
      <p v-for="(item, index) in colTitles" :key="index" class="tableValueItem">
        {{ item }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'TableCommonColTitles',
  props: {
    colTitles: {
      type: Array as () => string[],
      required: true,
    },
    currentTableScroll: {
      type: Number,
      required: true,
    },
    indexTitle: {
      type: String,
      default: '',
    },
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
