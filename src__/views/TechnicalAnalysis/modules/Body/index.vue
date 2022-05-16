<template>
  <div class="technicalAnalysisBody">
    <TechnicalAnalysisPageSettings />
    <TechnicalAnalysisPageChart />
    <TechnicalAnalysisPageCompanies />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TechnicalAnalysisPageSettings from '@/views/TechnicalAnalysis/modules/Body/modules/Settings/index.vue';
import TechnicalAnalysisPageChart from '@/views/TechnicalAnalysis/modules/Body/modules/Chart/index.vue';
import TechnicalAnalysisPageCompanies from '@/views/TechnicalAnalysis/modules/Body/modules/Companies/index.vue';

export default defineComponent({
  name: 'TechnicalAnalysisPageBody',
  components: {
    TechnicalAnalysisPageCompanies,
    TechnicalAnalysisPageChart,
    TechnicalAnalysisPageSettings,
  },
});
</script>

<style scoped lang="scss">
.technicalAnalysisBody {
  background: #f7f7f7;
}
</style>
