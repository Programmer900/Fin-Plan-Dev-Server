<template>
  <div>
    <div class="greyBg">
      <div class="flexWrapperRow tableValue">
        <p
          @click="handleClick(button)"
          v-for="button in reportSwitches"
          :key="button.name"
          :class="{ isClicked: button.clicked }"
        >
          {{ button.name }}
        </p>
      </div>
    </div>
    <DocumentIndicatorsTable
      :isInit="isInit"
      :data="getIndicators"
      :categories="getChartCategories"
      :quarters="getQuarters"
      :isReportPage="true"
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
import DocumentIndicatorsTable from '@/views/Document/modules/Views/modules/IndicatorsTable/index.vue';

export default defineComponent({
  name: 'DocumentReportPage',
  components: {
    DocumentIndicatorsTable,
  },
  setup() {
    const route = useRoute();
    const store = useStore();
    const isInit = ref<boolean>(false);

    const reportSwitches = ref<any[]>([
      { name: 'Баланс', clicked: true },
      { name: 'Прибыль и убытки', clicked: false },
      { name: 'Движение денежных средств', clicked: false },
      { name: 'Фин оценка', clicked: false },
    ]);

    const handleClick = (button) => {
      reportSwitches.value.forEach((prop) => {
        prop.clicked = false;
      });
      button.clicked = !button.clicked;
    };

    const init = async () => {
      isInit.value = await store.dispatch('documentStore/initIndicatorsChart');
    };

    const reset = () => {
      isInit.value = false;
      store.commit('documentStore/resetIndicatorsChart');
      store.commit('documentStore/resetTableProp');
    };

    const onChangeChartDataView = (key: string): void => {
      store.getters['documentStore/getIndicatorsChart'][key].visible = !store.getters['documentStore/getIndicatorsChart'][key].visible;
    };

    const onChangeParam = async (paramName: string) => {
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
      reportSwitches,
      handleClick,
      isInit,
      onChangeChartDataView,
      onChangeParam,
      getChartDataKeys,
      getIndicators,
      getChartCategories,
      getChartDataValues,
      getQuarters,
    };
  },
});
</script>

<style scoped lang="scss">
.flexWrapperRow {
  width: 80%;
  margin: auto;

  > p {
    width: max-content;
    margin-right: 30px;
    padding: 15px 45px;
    color: #797979;
    font-weight: 500;
    white-space: nowrap;
    background-color: white;
    border-radius: 30px;
    cursor: pointer;
  }

  :hover {
    color: white;
    background-color: #fec006;
  }

  .isClicked {
    color: white;
    background-color: #2a8634;
    border-radius: 30px;
  }
}

@media (max-width: 1800px) {
  .flexWrapperRow {
    width: 90%;
  }
}

@media (max-width: 1600px) {
  .flexWrapperRow {
    width: 100%;
  }
}

@media (max-width: 1100px) {
  .flexWrapperRow {
    width: 100%;

    > p {
      padding: 12px 25px;
    }
  }
}

@media (max-width: 1000px) {
  .flexWrapperRow {
    width: 100%;
    overflow: scroll;

    > p {
      margin-right: 10px;
      padding: 12px 25px;
    }
  }
}

@media (max-width: 600px) {
  .greyBg {
    overflow-x: scroll;
    .flexWrapperRow {
      width: 100%;
      padding: 20px;
      overflow: scroll;
    }
    .tableValue {
      width: 1000px;
    }
  }
}
</style>
