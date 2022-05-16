<template>
  <div class="copyright">{{ text }}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PageFooterCopyright',
  props: {
    text: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped lang="scss">
.copyright {
  color: #959595;
  font-weight: 500;
  font-size: 10px;
  line-height: 150%;
}
</style>
