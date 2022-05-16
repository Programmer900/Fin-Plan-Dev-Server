<template>
  <div class="indicatorsPage">
    <p v-html="industryItemStore.previewTextHtml" />
    <div class="greyBg">
      <div class="flexWrapperColumn">
        <button v-if="hasBeenChanged" class="resetBtn" @click="onCLickResetBtn()">
          Сбросить график
        </button>
        <div class="checkboxes flexRowCenter">
          <DocumentIndicatorsChartCheckboxes
            v-for="item in getChartDataKeys"
            :id="item"
            :key="item"
            :item="getChart[item]"
            @onClick="onChangeChartDataView"
          />
        </div>
        <ChartDynamic :categories="getChartCategories" :data="getChartDataValues" />
      </div>
    </div>
    <DocumentIndicatorsTable
      :categories="getChartCategories"
      :data="getChart"
      :is-init="isInit"
      :quarters="[]"
      @onChangeChartDataView="onChangeChartDataView"
      @onChangeParam="onChangeParam"
    />
  </div>
</template>

<script lang="ts">
import { useIndustryItemStore } from '@/store/pinia/industryItem';
import ChartDynamic from '@/components/Charts/Dynamic/index.vue';
import DocumentIndicatorsTable from '@/views/Document/modules/Views/modules/IndicatorsTable/index.vue';
import DocumentIndicatorsChartCheckboxes from '@/views/Document/modules/Views/modules/Pages/CompanyIndicators/modules/ChartCheckboxes/index.vue';
import Loader from '@/components/Loader/index.vue';

export default defineComponent({
  name: 'ListWrapAboutBody',
  components: {
    Loader,
    DocumentIndicatorsChartCheckboxes,
    DocumentIndicatorsTable,
    ChartDynamic,
  },
  setup() {
    const industryItemStore = useIndustryItemStore();

    const isInit = ref<boolean>(false);
    const hasBeenChanged = ref<boolean>(false);

    const getChartDataValues = computed(() => industryItemStore.getChartValues);
    const getChartCategories = computed(() => industryItemStore.getChartCategories);
    const getChartDataKeys = computed(() => industryItemStore.getChartDataKeys);
    const getChart = computed(() => industryItemStore.getChart);

    const onCLickResetBtn = () => {
      isInit.value = false;
      hasBeenChanged.value = false;
      industryItemStore.resetChart();
      isInit.value = true;
    };

    const onChangeChartDataView = (key: string): void => {
      hasBeenChanged.value = true;
      industryItemStore.toggleChartItemView(key);
    };

    const onChangeParam = () => {};

    onMounted(() => {
      isInit.value = true;
    });

    return {
      onCLickResetBtn,
      onChangeChartDataView,
      onChangeParam,
      getChart,
      industryItemStore,
      isInit,
      hasBeenChanged,
      getChartDataValues,
      getChartCategories,
      getChartDataKeys,
    };
  },
});
</script>

<style scoped lang="scss">
::v-deep(.flexWrapperColumn) {
  padding-right: 0 !important;
  padding-left: 0 !important;
}

::v-deep(.rowIndex.flexRowCenter.tableValue.tableRowName) {
  max-width: 300px !important;

  p {
    width: 300px !important;
  }
}

::v-deep(.rowValue.flexRowCenter.tableValue) {
  p {
    min-width: 150px !important;
    max-width: 150px !important;
  }
}

::v-deep(.period) {
  display: none;
}

::v-deep(.switcher.flexRowCenter) {
  display: none !important;
}

::v-deep(.arrows.flexRowCenter) {
  img {
    margin: 0 30px 20px 0 !important;
  }
}

.indicatorsPage {
  .flexWrapperColumn {
    margin: auto;
  }

  .resetBtn {
    width: max-content;
    margin-bottom: 10px;
    padding: 8px 10px;
    color: #fff;
    background: #2a8634;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background: #0f4319;
    }
  }

  .graph {
    width: 100%;
    height: 800px;
    background-color: lightblue;
  }

  .checkboxes {
    display: flex;
    flex-wrap: wrap;
    width: 70%;
    margin-bottom: 20px;

    .checkbox {
      width: max-content;
      cursor: pointer;

      > p {
        margin-left: 20px;
        font-size: 18px;
        line-height: 150%;
      }

      &:not(:last-child) {
        margin-right: 35px;
      }

      .checkboxRound {
        justify-content: center;
        width: 50px;
        min-width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;

        .clicked {
          width: 20px;
          height: 20px;
          background-color: white;
          border-radius: 50%;
        }
      }
    }
  }

  @media (max-width: 1600px) {
    .checkboxes {
      width: 80%;
    }
  }

  @media (max-width: 1400px) {
    .checkboxes {
      .checkbox {
        > p {
          font-size: 16px;
        }

        .checkboxRound {
          width: 35px;
          min-width: 35px;
          height: 35px;

          .clicked {
            width: 15px;
            height: 15px;
          }
        }
      }
    }
  }

  @media (max-width: 1200px) {
    .checkboxes {
      width: 90%;
    }
  }

  @media (max-width: 1100px) {
    .checkboxes {
      width: 100%;
    }
  }

  @media (max-width: 900px) {
    .graph {
      height: 300px;
    }

    .checkboxes {
      flex-direction: column;
      align-items: flex-start;
      margin-top: -20px;
      margin-left: 0;

      .checkbox {
        display: flex;
        width: 100%;
        margin-top: 10px;

        > p {
          width: 100%;
        }

        .checkboxRound {
          margin-left: 0;
        }
      }
    }
  }

  @media (max-width: 600px) {
    .flexWrapperColumn {
      padding: 20px;

      .graph {
        height: 300px;
      }

      .checkboxes {
        flex-direction: column;
        align-items: flex-start;
        margin-top: -20px;
        margin-left: 0;

        .checkbox {
          display: flex;
          width: 100%;
          margin-top: 10px;

          > p {
            width: 100%;
          }

          .checkboxRound {
            margin-left: 0;
          }
        }
      }
    }
  }
}
</style>
