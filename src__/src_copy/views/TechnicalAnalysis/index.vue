<template>
  <div class="technicalAnalysis">
    <template v-if="isInit">
      <TechnicalAnalysisPageHeader />
      <TechnicalAnalysisPageBody />
    </template>
    <Loader v-else />
  </div>
</template>

<script lang="ts">
import TechnicalAnalysisPageHeader from '@/views/TechnicalAnalysis/modules/Header/index.vue';
import TechnicalAnalysisPageBody from '@/views/TechnicalAnalysis/modules/Body/index.vue';
import { useTechAnalysisStore } from '@/store/pinia/technicalAnalysis';
import { useSSR } from '@/use/useSSR';
import { useUserStore } from '@/store/pinia/user';
import Loader from '@/components/Loader/index.vue';

export default defineComponent({
  name: 'TechnicalAnalysisPage',
  components: { Loader, TechnicalAnalysisPageBody, TechnicalAnalysisPageHeader },
  setup() {
    const isInit = ref(false);
    const userStore = useUserStore();
    const techAnalysisStore = useTechAnalysisStore();

    const init = async () => {
      await userStore.setCurrentUser(true);
      await techAnalysisStore.setSaveList();
      isInit.value = true;
    };

    useSSR(async () => {
      await init();
    });

    return {
      isInit,
    };
  },
});
</script>

<style scoped lang="scss"></style>
