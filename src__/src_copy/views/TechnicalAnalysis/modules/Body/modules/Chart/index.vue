<template>
  <div id="labelTextForm">
    <input id="labelTextInput" />
    <button id="labelTextButton">Добавить</button>
  </div>
  <div :class="['overflow-disable', { 'overflow-disable--active': getIsDisablePage }]">
    <Loader />
  </div>
  <div
    class="technicalAnalysisChart"
    :class="[{ 'technicalAnalysisChart--dark-mode': getDarkModeStatus }]"
  >
    <div
      v-if="isInit"
      :class="[
        'technicalAnalysisChart__container',
        {
          'technicalAnalysisChart__container--disable':
            getSelectedAssets.length === 0 || getIsNeedUpdateChart,
        },
      ]"
    >
      <TechnicalAnalysisPageChartTopUtils />
      <TechnicalAnalysisPageChartLeftUtils />
      <TechnicalAnalysisPageChartBottomUtils />
      <highcharts
        v-show="getSelectedChartMode === 'ohlc'"
        class="technicalAnalysisChart__graph"
        :constructor-type="'stockChart'"
        :options="getChartSettings"
        :style="{ height: getCurrentChartHeight + 200 + 'px' }"
      />
      <TechAnCandleChart v-show="getSelectedChartMode === 'candle'" />
      <TechAnLineChart v-show="getSelectedChartMode === 'line'" />
      <!--      <div class="highcharts-popup highcharts-popup-annotations">-->
      <!--        <div class="highcharts-popup-wrapper">-->
      <!--          <div id="font-text-container">-->
      <!--            <label for="font-text">Text</label>-->
      <!--            <input name="font-text" type="text" value="" />-->
      <!--          </div>-->
      <!--          <div id="font-color-container">-->
      <!--            <label for="font-color">Font Color</label>-->
      <!--            <input name="font-color" type="color" value="#000000" />-->
      <!--          </div>-->
      <!--          <div id="font-background-color-container">-->
      <!--            <label for="font-background-color">Background Color1</label>-->
      <!--            <input name="font-background-color" type="color" value="#ffffff" />-->
      <!--          </div>-->
      <!--          <div id="font-size-container">-->
      <!--            <label for="font-size">Font Size (px)</label>-->
      <!--            <input min="0" name="font-size" step="1" style="width: 100%" type="number" value="14" />-->
      <!--          </div>-->
      <!--        </div>-->
      <!--        <button class="savebutton">Save</button>-->
      <!--        <button class="deletebutton">Delete</button>-->
      <!--      </div>-->
      <!--      <div class="highcharts-popup highcharts-popup-annotations">-->
      <!--        <div class="highcharts-popup-wrapper">-->
      <!--          <label for="line-width">Line Width</label>-->
      <!--          <input min="0" name="line-width" step="1" style="width: 100%" type="number" value="1" />-->
      <!--        </div>-->
      <!--        <button class="button">Save</button>-->
      <!--      </div>-->
    </div>
    <Loader v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DragPanes from 'highcharts/modules/drag-panes.js';
import AnnotationsAdvanced from 'highcharts/modules/annotations-advanced.js';
import PriceIndicator from 'highcharts/modules/price-indicator.js';
import FullScreen from 'highcharts/modules/full-screen.js';
import StockTools from 'highcharts/modules/stock-tools.js';
import HighCharts from 'highcharts';
import StockCharts from 'highcharts/modules/stock';
import loadIndicatorsAll from 'highcharts/indicators/indicators-all';
import TechnicalAnalysisPageChartLeftUtils from '@/views/TechnicalAnalysis/modules/Body/modules/Chart/modules/LeftUtils/index.vue';
import TechnicalAnalysisPageChartTopUtils from '@/views/TechnicalAnalysis/modules/Body/modules/Chart/modules/TopUtils/index.vue';
import TechnicalAnalysisPageChartBottomUtils from '@/views/TechnicalAnalysis/modules/Body/modules/Chart/modules/BottomUtils/index.vue';
import { useChartSettings } from '@/views/TechnicalAnalysis/modules/Body/modules/Chart/settings';
import Loader from '@/components/Loader/index.vue';
import { useTechAnalysisStore } from '@/store/pinia/technicalAnalysis';
import TechAnCandleChart from '@/views/TechnicalAnalysis/modules/Body/modules/Chart/Candle/index.vue';
import TechAnLineChart from '@/views/TechnicalAnalysis/modules/Body/modules/Chart/Line/index.vue';

export default defineComponent({
  name: 'TechnicalAnalysisPageChart',
  components: {
    TechAnLineChart,
    TechAnCandleChart,
    Loader,
    TechnicalAnalysisPageChartBottomUtils,
    TechnicalAnalysisPageChartTopUtils,
    TechnicalAnalysisPageChartLeftUtils,
  },
  setup() {
    const latestBasicAssetId = ref('');
    const isInit = ref(false);
    const isLoad = ref(false);
    const chartSettings = useChartSettings();
    const techStore = useTechAnalysisStore();

    const init = async () => {
      try {
        if (isInit.value) return;
        DragPanes(HighCharts);
        AnnotationsAdvanced(HighCharts);
        PriceIndicator(HighCharts);
        FullScreen(HighCharts);
        StockTools(HighCharts);
        StockCharts(HighCharts);
        loadIndicatorsAll(HighCharts);

        await chartSettings.setup(HighCharts);

        isInit.value = true;
      } catch (e) {
        console.error('init tech chart');
        console.error(e);
      }
    };

    const initChart = async () => {
      await init();
    };

    const updateChart = () => {
      chartSettings.updateMainYAxis();
      chartSettings.updateIndicators();
      chartSettings.updateChartHeight();
      chartSettings.load();
      techStore.$patch({ isNeedUpdateChart: false, isDisablePage: false });
    };

    onMounted(async () => {
      await initChart();
    });

    watch(
      () => [techStore.isNeedUpdateChart, techStore.basicAsset.ID],
      () => {
        if (techStore.isNeedUpdateChart) {
          updateChart();
        }
        if (techStore.basicAsset.ID !== latestBasicAssetId.value) {
          latestBasicAssetId.value = techStore.basicAsset.ID;
          // chartSettings.updateBasicAsset();
        }
      },
    );

    watch(
      () => techStore.isNeedUpdateBasicAsset,
      () => {
        chartSettings.updateBasicAsset();
      },
    );

    return {
      isInit,
      isLoad,
      getChartSettings: chartSettings.getSettings,
      getAnnotationStrokeColor: computed(() => techStore.selectedAnnotationsColors.stroke),
      getAnnotationFillColor: computed(() => techStore.selectedAnnotationsColors.fill),
      getChartMainYAxis: computed(() => techStore.chartMainYAxis),
      getSelectedAssets: computed(() => techStore.selectedAssets),
      getIsDisablePage: computed(() => techStore.isDisablePage),
      getIsNeedUpdateChart: computed(() => techStore.isNeedUpdateChart),
      getCurrentChartHeight: computed(() => techStore.getCurrentChartHeight),
      getDarkModeStatus: computed(() => techStore.isDarkMode),
      getSelectedChartMode: computed(() => techStore.selectedChartMode),
    };
  },
});
</script>

<style scoped lang="scss">
.overflow-disable {
  display: none;
  background: rgba(255, 255, 255, 0.7);
  top: 0;
  left: 0;
  z-index: 999;

  &--active {
    position: fixed;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
  }
}

.highcharts-popup-annotations {
  display: none;
  position: absolute;
  //left: calc(50% - 50px);
  width: 150px;
  background-color: white;
  border: 2px grey solid;
  padding: 10px;
  //top: 150px;
  z-index: 10;
  color: black;
}
.button {
  border: none;
  color: white;
  padding: 5px 15px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 10px;
  background-color: #4caf50;
  color: white;
  border: 2px solid #4caf50;
}
.button:hover,
button.active {
  background-color: white;
  color: black;
}

#labelTextForm {
  position: absolute;
  z-index: 10;
  display: none;

  input {
    font-family: $ff-montserrat;
    font-size: 14px;
    padding: 8px 4px;
    border: 2px solid #1e5f25;
    outline: none;
  }

  button {
    font-size: 14px;
    font-family: $ff-montserrat;
    cursor: pointer;
    background: #1e5f25;
    border: none;
    color: #fff;
    padding: 10px;

    &:hover {
      background: #fec006;
    }
  }
}

.technicalAnalysisChart {
  $block: &;

  position: relative;

  &__container {
    position: relative;
    padding: 0;

    &--disable {
      &::before {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.42);
        z-index: 1;
      }
    }
  }

  &__graph {
    width: 100%;
    //height: 700px;
    padding-top: 80px;
    padding-bottom: 80px;
    padding-left: 60px;
    background: #fff;
  }

  @include respond-to($media-min-page-analysis--tablet) {
    &__container {
      margin-right: $page-analysis-pad-side--tablet;
      margin-left: $page-analysis-pad-side--tablet;
    }
  }

  @include respond-to($media-min-page-analysis--desktop) {
    &__container {
      margin-right: $page-analysis-pad-side--desktop;
      margin-left: $page-analysis-pad-side--desktop;
    }
  }

  &--dark-mode {
    #{$block} {
      &__graph {
        background: #000;
      }
    }
  }
}
</style>
