<template>
  <section>
    <router-view v-if="isInit" />
    <Loader v-else />
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted, onServerPrefetch, onUnmounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import Loader from '@/components/Loader/index.vue';

export default defineComponent({
  name: 'ListsWrapPage',
  components: { Loader },
  setup() {
    const route = useRoute();
    const store = useStore();
    const isInit = ref<boolean>(false);

    const reset = () => {
      isInit.value = false;
      // store.commit('listsStore/setDefaultState');
    };

    const init = async () => {
      const routeName = String(route.name);
      const routeTypeParam = String(route.params.type);

      if (routeName === 'ListsWrapAbout') {
        if (routeTypeParam === 'industries') {
          isInit.value = await store.dispatch('listsStore/initAbout', {
            title: 'Финансовая отрасль РФ',
          });
        } else if (routeTypeParam === 'sectors') {
          isInit.value = await store.dispatch('listsStore/initAbout', {
            title: 'Технологический сектор США',
          });
        } else {
          console.warn('Неизвестный тип роута');
        }
      }

      if (routeName === 'ListsWrapAll') {
        if (routeTypeParam === 'industries') {
          isInit.value = await store.dispatch('listsStore/initAbout', {
            title: 'Список отраслей РФ',
          });
        } else if (routeTypeParam === 'sectors') {
          isInit.value = await store.dispatch('listsStore/initAbout', {
            title: 'Список секторов США',
          });
        } else {
          console.warn('Неизвестный тип роута');
        }
      }
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
      reset();
    });

    watch(
      () => route.params.type,
      async () => {
        reset();
        await init();
      },
    );

    return {
      isInit,
    };
  },
});
</script>

<style scoped lang="scss"></style>
