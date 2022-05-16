<template>
  <div class="tools">
    <div class="tools__top">
      <div class="tools__baseAsset">
        <TechnicalAnalysisPageSelectField :selected="getBasicAsset" title="Базовый актив:" />
        <TechnicalAnalysisPageClearBtn
          v-if="getSelectedAssets.length > 0"
          class="tools__clearBtn tools__clearBtn--baseAssetMobile"
          @click="onClickResetBaseAsset"
        />
      </div>
      <div class="tools__toCompare">
        <TechnicalAnalysisPageSelectField
          selected="Выбрать актив"
          title="Активы к сравнению:"
          @onSelect="onToggleToCompareModal"
        />
      </div>
    </div>
    <div
      v-if="getSelectedAssets.length > 0"
      class="tools__itemsGrid tools__itemsGrid--compareItems"
    >
      <template v-for="asset in getSelectedAssets" :key="asset.ID">
        <div class="tools__item" @click="selectBaseAsset(asset)">
          <div
            :class="[
              'tools__itemContainer',
              { 'tools__itemContainer--selected': asset.ID === getBasicAsset.ID },
            ]"
          >
            {{ asset.NAME }}
            <svg
              fill="none"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
              @click="onClickDeleteCompareItem(asset)"
            >
              <path
                clip-rule="evenodd"
                d="M11.8536 12.5607L16 16.7071L16.7071 16L12.5607 11.8536L16.7071 7.70711L16 7L11.8536 11.1464L7.70711 7L7 7.70711L11.1464 11.8536L7 16L7.70711 16.7071L11.8536 12.5607Z"
                fill="white"
                fill-rule="evenodd"
              />
            </svg>
          </div>
        </div>
      </template>
    </div>
    <div
      v-if="getSelectedAssets.length > 0"
      class="tools__resetActivesDesktop"
      @click="onClickResetBaseAsset"
    >
      <span>Сбросить активы</span>
      <TechnicalAnalysisPageClearBtn />
    </div>
    <div class="tools__addIndicator">
      <TechnicalAnalysisPageSelectField
        selected="Выбрать индикатор"
        title="Добавить индикатор"
        @onSelect="onToggleIndicatorsModal"
      />
      <TechnicalAnalysisPageClearBtn
        v-if="getSelectedIndicators.length > 0"
        class="tools__clearBtn tools__clearBtn--baseAssetMobile"
        @click="onClickResetIndicators"
      />
    </div>
    <div
      v-if="getSelectedIndicators.length > 0"
      class="tools__itemsGrid tools__itemsGrid--indicatorsItems"
    >
      <div v-for="indicator in getSelectedIndicators" :key="indicator.ID" class="tools__item">
        <div class="tools__itemContainer">
          {{ indicator.NAME }}
          <svg
            fill="none"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
            @click="onClickDeleteIndicatorItem(indicator)"
          >
            <path
              clip-rule="evenodd"
              d="M11.8536 12.5607L16 16.7071L16.7071 16L12.5607 11.8536L16.7071 7.70711L16 7L11.8536 11.1464L7.70711 7L7 7.70711L11.1464 11.8536L7 16L7.70711 16.7071L11.8536 12.5607Z"
              fill="white"
              fill-rule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
    <div
      v-if="getSelectedIndicators.length > 0"
      class="tools__resetIndicatorsDesktop"
      @click="onClickResetIndicators"
    >
      <span>Сбросить индикаторы</span>
      <TechnicalAnalysisPageClearBtn />
    </div>
  </div>
  <TechnicalAnalysisPageToCompareModal
    v-if="isShowCompareModal"
    @onClose="onToggleToCompareModal"
  />
  <TechnicalAnalysisPageIndicatorsModal
    v-if="isShowIndicatorsModal"
    @onClose="onToggleIndicatorsModal"
  />
</template>

<script lang="ts">
import TechnicalAnalysisPageSelectField from '@/views/TechnicalAnalysis/modules/SelectField/index.vue';
import TechnicalAnalysisPageClearBtn from '@/views/TechnicalAnalysis/modules/ClearBtn/index.vue';
import TechnicalAnalysisPageToCompareModal from '@/views/TechnicalAnalysis/modules/Body/modules/Settings/modules/Tools/ToCompareModal/index.vue';
import { DynamicObject } from '@/interfaces';
import { useTechAnalysisStore } from '@/store/pinia/technicalAnalysis';
import TechnicalAnalysisPageIndicatorsModal from '@/views/TechnicalAnalysis/modules/Body/modules/Settings/modules/Tools/IndicatorsModal/index.vue';

export default defineComponent({
  name: 'TechnicalAnalysisPageTools',
  components: {
    TechnicalAnalysisPageIndicatorsModal,
    TechnicalAnalysisPageToCompareModal,
    TechnicalAnalysisPageClearBtn,
    TechnicalAnalysisPageSelectField,
  },
  setup() {
    const techStore = useTechAnalysisStore();

    const isClickDelete = ref(false);
    const isShowIndicatorsModal = ref(false);
    const isShowCompareModal = ref<boolean>(false);

    const selectBaseAsset = (asset: DynamicObject) => {
      if (isClickDelete.value) {
        isClickDelete.value = false;
        return;
      }
      techStore.selectBasicAsset(asset);
      techStore.$patch({ isNeedUpdateBasicAsset: true });
      // techStore.redrawChart();
    };

    const onClickResetBaseAsset = () => {
      techStore.resetSelectedAssets();
      techStore.redrawChart();
    };

    const onClickResetIndicators = () => {
      techStore.resetSelectedIndicators();
      techStore.redrawChart();
    };

    const onClickDeleteIndicatorItem = (indicator: DynamicObject) => {
      techStore.deleteSelectedIndicator(indicator);
      techStore.redrawChart();
    };

    const onToggleToCompareModal = async () => {
      isShowCompareModal.value = !isShowCompareModal.value;
      document.body.classList.toggle('stop-scrolling-analysis');
      if (!isShowCompareModal.value) {
        techStore.changeIsDisablePage(true);
        await techStore.initSelectedAssetsDetails();
        techStore.initChart();
        techStore.changeIsDisablePage(false);
      }
    };

    const onToggleIndicatorsModal = () => {
      isShowIndicatorsModal.value = !isShowIndicatorsModal.value;
      document.body.classList.toggle('stop-scrolling-analysis');
      if (!isShowIndicatorsModal.value) {
        techStore.redrawChart();
      }
    };

    const onClickDeleteCompareItem = async (asset: DynamicObject) => {
      isClickDelete.value = true;
      techStore.deleteSelectedAsset(asset);
      await techStore.savePreset();
    };

    const reset = () => {
      if (isShowCompareModal.value) {
        onToggleToCompareModal();
      }
      if (isShowIndicatorsModal.value) {
        onToggleIndicatorsModal();
      }
    };

    onUnmounted(() => {
      reset();
    });

    return {
      onClickResetBaseAsset,
      onToggleToCompareModal,
      onToggleIndicatorsModal,
      onClickDeleteCompareItem,
      onClickResetIndicators,
      onClickDeleteIndicatorItem,
      selectBaseAsset,
      getSelectedAssets: computed(() => techStore.selectedAssets),
      getSelectedIndicators: computed(() => techStore.selectedIndicators),
      getBasicAsset: computed(() => techStore.basicAsset),
      isShowCompareModal,
      isShowIndicatorsModal,
    };
  },
});
</script>

<style scoped lang="scss">
.tools {
  &__baseAsset {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
  }

  &__toCompare {
    margin-bottom: 40px;
  }

  &__resetActivesDesktop {
    display: none;
    margin-bottom: 40px;
    cursor: pointer;

    span {
      display: inline-block;
      margin-right: 8px;
      color: #797979;
      font-size: 18px;
      font-family: $ff-montserrat;
      line-height: 22px;
    }
  }

  &__resetIndicatorsDesktop {
    display: none;
    margin-bottom: 40px;
    cursor: pointer;

    span {
      display: inline-block;
      margin-right: 8px;
      color: #797979;
      font-size: 18px;
      font-family: $ff-montserrat;
      line-height: 22px;
    }
  }

  &__itemsGrid {
    &--compareItems {
      margin-bottom: 64px;
    }

    &--indicatorsItems {
      margin-bottom: 64px;
    }
  }

  &__item {
    &:not(:last-child) {
      margin-bottom: 12px;
    }
  }

  &__itemContainer {
    position: relative;
    padding: 15px 20px;
    color: #fff;
    font-size: 14px;
    font-family: $ff-montserrat;
    text-align: center;
    background: #2a8634;
    border: 2px solid #2a8634;
    border-radius: 75px;
    cursor: pointer;

    svg {
      position: absolute;
      top: 22%;
      right: 10px;
      cursor: pointer;
    }

    &:hover {
      background: #fec006;
      border-color: #fec006;
    }

    &--selected {
      background: #22562b;
      border-color: #fec006;

      &:hover {
        background: #22562b;
      }
    }
  }

  &__addIndicator {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 40px;
  }

  @include respond-to($media-min-page-analysis--big-tablet) {
    &__top {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__resetActivesDesktop {
      display: flex;
      align-items: center;
    }

    &__resetIndicatorsDesktop {
      display: flex;
      align-items: center;
    }

    &__clearBtn {
      &--baseAssetMobile {
        display: none;
      }

      &--indicators {
        display: none;
      }
    }

    &__itemsGrid {
      display: grid;
      grid-auto-rows: auto;
      grid-auto-columns: auto;
      grid-gap: 10px;
      grid-template-columns: repeat(auto-fill, 200px);

      &--compareItems {
        margin-bottom: 28px;
      }

      &--indicatorsItems {
        margin-bottom: 28px;
      }
    }

    &__item {
      &:not(:last-child) {
        margin-bottom: 0;
      }
    }
  }
}
</style>
