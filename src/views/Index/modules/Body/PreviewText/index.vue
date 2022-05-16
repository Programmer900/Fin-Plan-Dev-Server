<template>
  <div class="previewText" v-html="getPreviewText" />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'IndexPagePreviewText',
  setup() {
    const store = useStore();

    const getPreviewText = computed(() => store.getters['indexPageStore/getPreviewText']);

    return {
      getPreviewText,
    };
  },
});
</script>

<style scoped lang="scss">
.previewText {
  line-height: 140%;
}
</style>
