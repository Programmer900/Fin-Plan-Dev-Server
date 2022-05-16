<template>
  <div class="indexPage">
    <template v-if="isInit">
      <IndexPageHeader />
      <IndexPageBody />
    </template>
    <Loader class="indexPage__loader" v-else />
  </div>
</template>

<script lang="ts">
import {
  defineComponent, onMounted, onServerPrefetch, ref, watch,
} from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import Loader from '@/components/Loader/index.vue';
import IndexPageHeader from '@/views/Index/modules/Header/index.vue';
import IndexPageBody from '@/views/Index/modules/Body/index.vue';

export default defineComponent({
  name: 'IndexPage',
  components: {
    IndexPageBody,
    IndexPageHeader,
    Loader,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const isInit = ref<boolean>(false);

    const init = async () => {
      isInit.value = await store.dispatch('indexPageStore/init');
    };

    const reset = () => {
      isInit.value = false;
      store.commit('indexPageStore/reset');
    };

    onServerPrefetch(async () => {
      await init();
    });

    onMounted(async () => {
      if (!isInit.value) {
        await init();
      }
    });

    watch(
      () => route.name,
      () => {
        reset();
      },
    );

    return {
      isInit,
    };
  },
});
</script>

<style scoped lang="scss">
.indexPage {
  &__loader {
    margin-top: 30px;
  }
}
</style>
