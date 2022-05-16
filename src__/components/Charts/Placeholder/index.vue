<template>
  <div class="chartPlaceholder">
    <div class="absoluteCenter">Placeholder</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ChartPlaceholder',
});
</script>

<style scoped lang="scss">
.chartPlaceholder {
  position: relative;
  height: 215px;
  border: solid 1px #e5e5e5;

  .absoluteCenter {
    width: max-content;
    height: max-content;
    color: #afafaf;
  }

  @include respond-to($container-media--desktop) {
    height: 500px;
  }
}
</style>
