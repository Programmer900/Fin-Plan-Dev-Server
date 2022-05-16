<template>
  <div class="companies">
    <div v-if="getSelectedAssetsDetails.length > 0" class="companies__container">
      <div class="companies__utils">
        <div class="companies__util">
          <svg
            fill="none"
            height="15"
            viewBox="0 0 15 15"
            width="15"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect height="2" stroke="black" width="14" x="0.5" y="0.5" />
            <rect height="2" stroke="black" width="14" x="0.5" y="6.5" />
            <rect height="2" stroke="black" width="14" x="0.5" y="12.5" />
          </svg>
        </div>
        <div class="companies__util">
          <svg
            fill="none"
            height="15"
            viewBox="0 0 15 15"
            width="15"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect fill="#2A8634" height="6" width="15" />
            <rect fill="#2A8634" height="6" width="15" y="9" />
          </svg>
        </div>
      </div>
      <div class="companies__list">
        <TechnicalAnalysisPageCompany
          v-for="asset in getSelectedAssetsDetails"
          :key="asset.ID"
          :asset="asset"
        />
        <Loader v-if="getIsRequestSelectedAssetsDetails" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TechnicalAnalysisPageCompany from '@/views/TechnicalAnalysis/modules/Body/modules/Companies/modules/Company/index.vue';
import { useTechAnalysisStore } from '@/store/pinia/technicalAnalysis';
import Loader from '@/components/Loader/index.vue';

export default defineComponent({
  name: 'TechnicalAnalysisPageCompanies',
  components: { Loader, TechnicalAnalysisPageCompany },
  setup() {
    const techStore = useTechAnalysisStore();

    return {
      getSelectedAssetsDetails: computed(() => techStore.selectedAssetsDetails),
      getIsRequestSelectedAssetsDetails: computed(() => techStore.isRequestSelectedAssetsDetails),
    };
  },
});
</script>

<style scoped lang="scss">
.companies {
  @include container-paddings();

  padding-top: 100px;

  &__utils {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 22px;
  }

  &__util {
    cursor: pointer;
  }

  @include respond-to($media-min-page-analysis--tablet) {
    &__utils {
      justify-content: flex-start;
    }

    &__util {
      &:not(:last-child) {
        margin-right: 15px;
      }
    }
  }
}
</style>
