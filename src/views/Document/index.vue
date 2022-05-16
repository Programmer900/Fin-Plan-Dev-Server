<template>
  <section class="document">
    <template v-if="isInit">
      <DocumentHeader />
      <DocumentBody />
      <DocumentViews />
    </template>
    <Loader v-else class="document__loader" />
  </section>
</template>

<script lang="ts">
import {
  defineComponent, onMounted, onServerPrefetch, onUnmounted, ref, watch,
} from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import DocumentHeader from '@/views/Document/modules/Header/index.vue';
import DocumentBody from '@/views/Document/modules/Body/index.vue';
import DocumentViews from '@/views/Document/modules/Views/index.vue';
import Loader from '@/components/Loader/index.vue';

export default defineComponent({
  name: 'Document',
  components: {
    Loader,
    DocumentViews,
    DocumentBody,
    DocumentHeader,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const isInit = ref<boolean>(false);

    const init = async () => {
      isInit.value = await store.dispatch('documentStore/initData', {
        region: route.params.region,
        id: route.params.id,
        type: route.params.type,
      });
    };

    onServerPrefetch(async () => {
      await init();
    });

    onMounted(async () => {
      if (!isInit.value) {
        await init();
      }
    });

    onUnmounted(() => {
      store.commit('documentStore/resetState');
      isInit.value = false;
    });

    watch(
      () => route.params.id,
      async () => {
        store.commit('documentStore/resetState');
        isInit.value = false;
        await init();
      },
    );

    return {
      isInit,
    };
  },
});
</script>

<style scoped lang="scss">
.document {
  &__loader {
    margin-top: 40px;
  }
}
</style>
