<template>
  <div class="linkList">
    <router-link
      v-if="meUtils.isExistItem(item)"
      class="linkList__link"
      :to="{ name: 'Index', params: { name: item.NAME, ticker: item.TICKER } }"
    >
      <span>{{ item.NAME }}</span>
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { meUtils } from '../../utils/meUtils';

export default defineComponent({
  name: 'LinkIndex',
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  setup() {
    return {
      meUtils,
    };
  },
});
</script>

<style scoped lang="scss"></style>
