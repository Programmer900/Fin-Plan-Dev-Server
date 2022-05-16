<template>
  <div class="indicatorsPage">
    <div class="greyBg">
      <div class="flexWrapperColumn">
        <button class="resetBtn" v-if="hasBeenChanged" @click="onCLickResetBtn()">Сбросить график</button>
        <div class="checkboxes flexRowCenter">
          <DocumentIndicatorsChartCheckboxes
            v-for="item in getChartDataKeys"
            :key="item"
            :id="item"
            :item="getIndicators[item]"
            @onClick="onChangeChartDataView"
          />
        </div>
        <ChartDynamic v-if="isInit" :data="getChartDataValues" :categories="getChartCategories" />
        <h1 v-else>Информация о показателях компании не найдена</h1>
      </div>
    </div>
    <DocumentIndicatorsTable
      :isInit="isInit"
      :data="getIndicators"
      :categories="getChartCategories"
      :quarters="getQuarters"
      @onChangeParam="onChangeParam"
      @onChangeChartDataView="onChangeChartDataView"
    />
  </div>
</template>

<script lang="ts">
import {
  computed, defineComponent, onMounted, onUnmounted, ref, watch,
} from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import ChartDynamic from '@/components/Charts/Dynamic/index.vue';
import DocumentIndicatorsTable from '@/views/Document/modules/Views/modules/IndicatorsTable/index.vue';
import DocumentIndicatorsChartCheckboxes from '@/views/Document/modules/Views/modules/Pages/CompanyIndicators/modules/ChartCheckboxes/index.vue';

export default defineComponent({
  name: 'DocumentCompanyIndicatorsPage',
  components: { DocumentIndicatorsChartCheckboxes, DocumentIndicatorsTable, ChartDynamic },
  setup() {
    const route = useRoute();
    const store = useStore();
    const isInit = ref<boolean>(false);
    const hasBeenChanged = ref<boolean>(false);

    const init = async () => {
      isInit.value = await store.dispatch('documentStore/initIndicatorsChart');
    };

    const reset = () => {
      isInit.value = false;
      hasBeenChanged.value = false;
      store.commit('documentStore/resetIndicatorsChart');
      store.commit('documentStore/resetTableProp');
    };

    const onCLickResetBtn = async () => {
      isInit.value = false;
      isInit.value = await store.dispatch('documentStore/resetIndicatorsChartToDefault');
      hasBeenChanged.value = false;
    };

    const onChangeChartDataView = (key: string): void => {
      hasBeenChanged.value = true;
      store.getters['documentStore/getIndicatorsChart'][key].visible = !store.getters['documentStore/getIndicatorsChart'][key].visible;
    };

    const onChangeParam = async (paramName: string) => {
      hasBeenChanged.value = false;
      store.commit('documentStore/resetIndicatorsChart');
      await init();
    };

    const getChartDataValues = computed(() =>
      Object.values(store.getters['documentStore/getIndicatorsChart']));

    const getChartCategories = computed(
      () => store.getters['documentStore/getIndicatorsChartCategories'],
    );

    const getChartDataKeys = computed(() =>
      Object.keys(store.getters['documentStore/getIndicatorsChart']));

    const getIndicators = computed(() => store.getters['documentStore/getIndicatorsChart']);

    const getQuarters = computed(() => store.getters['documentStore/getIndicatorsQuarter']);

    onMounted(async () => {
      await init();
    });

    onUnmounted(() => {
      reset();
    });

    watch(
      () => route.params.name,
      () => {
        reset();
      },
    );

    return {
      isInit,
      onChangeChartDataView,
      onChangeParam,
      onCLickResetBtn,
      getChartDataKeys,
      getIndicators,
      getChartCategories,
      getChartDataValues,
      getQuarters,
      hasBeenChanged,
    };
  },
});
</script>

<style scoped lang="scss">
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
