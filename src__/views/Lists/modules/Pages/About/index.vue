<template>
  <ListsWrapHeader />
  <ListsWrapBody v-if="isInit">
    <ListWrapAboutBody />
  </ListsWrapBody>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ListsWrapHeader from '@/views/Lists/modules/Header/index.vue';
import ListsWrapBody from '@/views/Lists/modules/Body/index.vue';
import ListWrapAboutBody from '@/views/Lists/modules/Pages/About/modules/Body/index.vue';
import { useIndustryItemStore } from '@/store/pinia/industryItem';
import { useSSR } from '@/use/useSSR';
import Loader from '@/components/Loader/index.vue';

export default defineComponent({
  name: 'ListsWrapAbout',
  components: {
    Loader,
    ListWrapAboutBody,
    ListsWrapBody,
    ListsWrapHeader,
  },
  setup() {
    const route = useRoute();
    const industryItemStore = useIndustryItemStore();

    const isInit = ref(false);

    const init = async () => {
      await industryItemStore.init(String(route.params.id), String(route.params.type));
      isInit.value = true;
    };

    onMounted(async () => {
      if (!isInit.value) {
        await init();
      }
    });

    onBeforeUnmount(() => {
      isInit.value = false;
      industryItemStore.reset();
    });

    return {
      isInit,
    };
  },
});
</script>

<style scoped lang="scss"></style>
