<template>
  <div class="tableRow flexRowCenter">
    <div class="rowIndex flexRowCenter tableValue tableRowName" style="max-width: 220px">
      <p style="width: 220px">{{ rowTitle }}</p>
    </div>
    <div
      class="rowValue flexRowCenter tableValue"
      style="position: relative"
      :style="`left: ${currentTableScroll}px`"
    >
      <p v-for="(value, index) in values" :key="index" class="tableValueItem">
        {{ value }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'TableCommonRow',
  props: {
    rowTitle: {
      type: String,
      required: true,
    },
    values: {
      type: Array as () => number[],
      required: true,
    },
    currentTableScroll: {
      type: Number,
      required: true,
    },
  },
});
</script>

<style scoped></style>
