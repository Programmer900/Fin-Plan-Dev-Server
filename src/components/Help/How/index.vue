<template>
  <div class="how">
    <div class="how__inner">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HelpHow',
});
</script>

<style scoped lang="scss"></style>
