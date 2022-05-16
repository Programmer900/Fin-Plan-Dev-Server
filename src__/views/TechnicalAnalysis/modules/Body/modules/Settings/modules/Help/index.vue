<template>
  <div class="help">
    <TechnicalAnalysisPageHelpItem :icon="iconService" title="Как пользоваться сервисом?" />
    <TechnicalAnalysisPageHelpItem :icon="iconAnalysis" title="Как пользоваться теханализом?" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TechnicalAnalysisPageHelpItem from '@/views/TechnicalAnalysis/modules/Body/modules/Settings/modules/Help/Item/index.vue';
import iconService from '@/assets/img/iconService.svg';
import iconAnalysis from '@/assets/img/iconAnalysis.svg';

export default defineComponent({
  name: 'TechnicalAnalysisPageHelp',
  components: { TechnicalAnalysisPageHelpItem },
  setup() {
    return {
      iconService,
      iconAnalysis,
    };
  },
});
</script>

<style scoped lang="scss"></style>
