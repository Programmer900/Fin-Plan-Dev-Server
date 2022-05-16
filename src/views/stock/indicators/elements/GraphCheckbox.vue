<template>
  <div class="checkbox flexRowCenter" :class="{ displayNone: isDisplayNone }">
    <div class="checkboxRound flexRowCenter" :style="[{ background: color }]">
      <div class="clicked" v-if="show" />
    </div>
    <p class="default-w-bold">{{ name }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'GraphCheckbox',
  props: {
    name: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: '',
    },
    show: {
      type: Boolean,
      default: false,
    },
    permanent: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isDisplayNone() {
      return !this.show && !this.permanent;
    },
  },
});
</script>

<style scoped lang="scss">
.displayNone {
  display: none !important;
}
</style>
