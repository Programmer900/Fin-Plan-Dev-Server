<template>
  <div class="technicalAnalysisSettings">
    <div class="technicalAnalysisSettings__container">
      <TechnicalAnalysisPageTools />
      <TechnicalAnalysisPageHelp />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TechnicalAnalysisPageTools from '@/views/TechnicalAnalysis/modules/Body/modules/Settings/modules/Tools/index.vue';
import TechnicalAnalysisPageHelp from '@/views/TechnicalAnalysis/modules/Body/modules/Settings/modules/Help/index.vue';

export default defineComponent({
  name: 'TechnicalAnalysisPageSettings',
  components: { TechnicalAnalysisPageHelp, TechnicalAnalysisPageTools },
});
</script>

<style scoped lang="scss">
.technicalAnalysisSettings {
  @include container-paddings();

  padding-top: 32px;
  padding-bottom: 64px;

  &__container {
    @include respond-to($media-min-page-analysis--big-tablet) {
      display: grid;
      grid-column-gap: 30px;
      grid-template-columns: 3fr 1fr;
    }
  }
}
</style>
