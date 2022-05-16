<template>
  <div class="selectedCount">Показано {{ min }} из {{ max }}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ListHeaderSelectedCount',
  props: {
    min: {
      type: [String, Number],
      required: true,
    },
    max: {
      type: [String, Number],
      required: true,
    },
  },
});
</script>

<style scoped lang="scss">
.selectedCount {
  color: #acacac;
  font-weight: 500;
  font-size: 14px;
  line-height: 150%;
}
</style>
