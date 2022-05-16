<template>
  <div class="dynamicChart">
    <div class="greyBg">
      <div class="flexWrapperColumn">
        <div class="checkboxes flexRowCenter">
          <template v-if="showCheckboxes">
            <ChartDynamicProCheckbox
              v-for="item in getChartDataKeys"
              :key="item"
              :id="item"
              :item="getChartData[item]"
              @onClick="onChangeChartDataView"
            />
          </template>
        </div>
        <ChartDynamicProGraph
          v-if="isInit && showGraph"
          :data="getChartDataValues"
          :categories="getChartCategories"
        />
        <h1 v-else-if="showGraph">Информация о показателях компании не найдена</h1>
      </div>
    </div>
    <ChartDynamicProTable
      v-if="showTable"
      :isInit="isInit"
      :data="getChartData"
      :categories="getChartCategories"
      :quarters="getChartQuarters"
      :onChangeParamHooks="onChangeParamHooks"
      :onChangeIntervalHook="onChangeIntervalHook"
      :getIntervalHook="getIntervalHook"
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
import ChartDynamicProTable from '@/components/Charts/DynamicPro/modules/Table/index.vue';
import ChartDynamicProGraph from '@/components/Charts/DynamicPro/modules/Graph/index.vue';
import ChartDynamicProCheckbox from '@/components/Charts/DynamicPro/modules/Checkbox/index.vue';

export default defineComponent({
  name: 'ChartDynamicPro',
  components: {
    ChartDynamicProCheckbox,
    ChartDynamicProGraph,
    ChartDynamicProTable,
  },
  emits: ['init', 'reset'],
  props: {
    onInitHooks: {
      type: Array,
      required: true,
    },
    onResetHooks: {
      type: Array,
      required: true,
    },
    onChangeParamHooks: {
      type: Array,
      required: true,
    },
    onChangeIntervalHook: {
      type: String,
      required: true,
    },
    getDataHook: {
      type: String,
      required: true,
    },
    getCategoriesHook: {
      type: String,
      required: true,
    },
    getQuartersHook: {
      type: String,
      required: true,
    },
    getIntervalHook: {
      type: String,
      required: true,
    },
    showGraph: {
      type: Boolean,
      default: true,
    },
    showCheckboxes: {
      type: Boolean,
      default: true,
    },
    showTable: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const route = useRoute();
    const store = useStore();
    const isInit = ref<boolean>(false);

    const storeDispatchCycle = async (arr: any[]): Promise<boolean> => {
      let flag = false;
      try {
        for (let i = 0; i < arr.length; i++) {
          const item = arr[i];
          flag = await store.dispatch(String(item));
          if (!flag) {
            console.error(`Ключ ${String(item)} вызвал ошибку`);
            break;
          }
        }
      } catch (e) {
        console.error(e);
        flag = false;
      }
      return flag;
    };

    const init = async () => {
      isInit.value = false;
      isInit.value = await storeDispatchCycle(props.onInitHooks);
    };

    const reset = async () => {
      isInit.value = false;
      await storeDispatchCycle(props.onResetHooks);
    };

    const onChangeChartDataView = (key: string): void => {
      store.getters[props.getDataHook][key].visible = !store.getters[props.getDataHook][key].visible;
    };

    const onChangeParam = async (paramName: string) => {
      await reset();
      await storeDispatchCycle(props.onChangeParamHooks);
      await init();
    };

    const getChartData = computed(() => store.getters[props.getDataHook]);
    const getChartDataValues = computed(() => Object.values(store.getters[props.getDataHook]));
    const getChartDataKeys = computed(() => Object.keys(store.getters[props.getDataHook]));
    const getChartCategories = computed(() => store.getters[props.getCategoriesHook]);
    const getChartQuarters = computed(() => store.getters[props.getQuartersHook]);

    onMounted(async () => {
      await init();
    });

    onUnmounted(async () => {
      await reset();
    });

    watch(
      () => route.params.name,
      async () => {
        await reset();
      },
    );

    return {
      isInit,
      onChangeChartDataView,
      onChangeParam,
      getChartDataKeys,
      getChartData,
      getChartCategories,
      getChartDataValues,
      getChartQuarters,
    };
  },
});
</script>

<style scoped lang="scss">
.dynamicChart {
  .flexWrapperColumn {
    //margin: auto;
    padding: 0;
  }

  .graph {
    width: 100%;
    height: 800px;
    background-color: lightblue;
  }

  .checkboxes {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 20px;

    .checkbox {
      width: max-content;
      cursor: pointer;

      > p {
        margin-left: 20px;
        font-size: 16px;
      }

      &:not(:last-child) {
        margin-right: 35px;
      }

      .checkboxRound {
        justify-content: center;
        width: 50px;
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

  @media (max-width: 1400px) {
    .checkboxes {
      .checkbox {
        > p {
          font-size: 16px;
        }

        .checkboxRound {
          width: 35px;
          height: 35px;

          .clicked {
            width: 15px;
            height: 15px;
          }
        }
      }
    }
  }

  @media (max-width: 900px) {
    .graph {
      height: 300px;
    }

    .checkboxes {
      margin-left: 0;

      .checkbox {
        display: flex;
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
      //padding: 20px;

      .graph {
        height: 300px;
      }

      .checkboxes {
        .checkbox {
          display: flex;
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
