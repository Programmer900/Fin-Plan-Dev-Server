<template>
  <div class="tab-panel">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TabPanel',
  props: {
    modelValue: {
      default: null,
      type: [String, Number],
    },
  },
});
</script>

<style scoped>
.tab-panel {
  display: inline-block;
  width: 100%;
  white-space: initial;
  vertical-align: top;
}
</style>
