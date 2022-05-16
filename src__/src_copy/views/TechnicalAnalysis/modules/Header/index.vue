<template>
  <div class="technicalAnalysisHeader">
    <div class="technicalAnalysisHeader__container">
      <h1 class="technicalAnalysisHeader__title">Технический анализ</h1>
      <div class="technicalAnalysisHeader__wrap-field">
        <!--        <TechnicalAnalysisPageSelectField-->
        <!--          title="Шаблон графика:"-->
        <!--          selected="Растущий миллион"-->
        <!--          :show-corner="true"-->
        <!--          @onSelect="onClickSelect"-->
        <!--        />-->
        <InputDropdown
          v-model:selected="selectedChartName"
          class="radarBonds__dropdown"
          :items="getSaveList"
          placeholder="Не выбран"
          title="Шаблон графика:"
        />
        <div
          v-if="getSelectedPreset"
          class="technicalAnalysisHeader__wrapClear"
          @click="onClickReset"
        >
          <span>Очистить шаблон</span>
          <TechnicalAnalysisPageClearBtn />
        </div>
      </div>
      <form class="technicalAnalysisHeader__new-template" @submit.prevent="createNewPreset">
        <label for="newTemplateName">Новый шаблон</label>
        <input id="newTemplateName" v-model="newPresetName" placeholder="Название" type="text" />
        <button>Создать</button>
      </form>
      <button
        v-if="getSelectedPreset !== 'По-умолчанию'"
        class="technicalAnalysisHeader__delete-preset"
        @click="deletePreset"
      >
        Удалить шаблон
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import TechnicalAnalysisPageClearBtn from '@/views/TechnicalAnalysis/modules/ClearBtn/index.vue';
import InputDropdown from '@/components/Inputs/Dropdown/index.vue';
import { useTechAnalysisStore } from '@/store/pinia/technicalAnalysis';
import { useApiFinplan } from '@/use/api/useApiFinplan';

export default defineComponent({
  name: 'TechnicalAnalysisPageHeader',
  components: { TechnicalAnalysisPageClearBtn, InputDropdown },
  setup() {
    const api = useApiFinplan();
    const techAnStore = useTechAnalysisStore();
    const getSaveList = computed(() => techAnStore.saveList);
    const selectedChartName = ref(null);
    const isInitAutoSave = ref(false);
    const pointInterval = ref<any>(undefined);
    const newPresetName = ref('');

    const onClickSelect = () => {
      console.log('select');
    };

    const onClickReset = async () => {
      const isDelete = confirm('Вы уверены что хотите очистить шаблон?');
      if (isDelete) {
        await techAnStore.resetPreset();
      }
    };

    const deletePreset = async () => {
      const isDelete = confirm('Вы уверены что хотите удалить шаблон?');
      if (isDelete) {
        await techAnStore.deletePreset();
        selectedChartName.value = {
          label: '',
          id: String(Math.random()),
        };
      }
    };

    const createNewPreset = async () => {
      if (newPresetName.value !== '') {
        await techAnStore.createNewPreset(newPresetName.value);
        newPresetName.value = '';
        selectedChartName.value = {
          label: techAnStore.selectedPreset,
          id: String(Math.random()),
        };
      }
    };

    const updateChart = async () => {
      techAnStore.selectedChartName = selectedChartName.value;
      // console.log(techAnStore.selectedChartName);
      // console.log(await api.getUser(true));
      console.log(
        await api.setGraphData(7307, techAnStore.selectedChartName.label, {
          data: {
            value: ['privet'],
            other: {
              hello: 'world',
            },
          },
        }),
      );
      console.log(await api.getGraphData(7307, techAnStore.selectedChartName.label));
    };

    const initAutoSave = async () => {
      if (isInitAutoSave.value) return;
      pointInterval.value = setInterval(async () => {
        await techAnStore.savePreset();
      }, 10000);
    };

    onBeforeUnmount(async () => {
      if (pointInterval.value) {
        clearInterval(pointInterval.value);
      }
      await techAnStore.savePreset();
    });

    onBeforeMount(() => {
      selectedChartName.value = techAnStore.getDefaultChart;
    });

    watch(
      () => selectedChartName.value,
      async () => {
        // await updateChart();
        await techAnStore.loadPreset(selectedChartName.value);
        await initAutoSave();
        // await techAnStore.savePreset();
        // techAnStore.selectedChartName = selectedChartName.value;
        // console.log(
        //   await api.setGraphData(7307, techAnStore.selectedChartName.label, {
        //     data: {
        //       value: ['privet'],
        //       other: {
        //         hello: 'world',
        //       },
        //     },
        //   }),
        // );
        // console.log(await api.getGraphData(7307, techAnStore.selectedChartName.label));
      },
    );

    return {
      onClickSelect,
      onClickReset,
      createNewPreset,
      selectedChartName,
      getSaveList,
      newPresetName,
      deletePreset,
      getSelectedPreset: computed(() => techAnStore.selectedPreset),
    };
  },
});
</script>

<style scoped lang="scss">
.technicalAnalysisHeader {
  @include container-paddings();

  padding-top: 80px;
  padding-bottom: 25px;
  background: #fff;

  &__delete-preset {
    margin-top: 20px;
    color: red;
    background: none;
    border: none;
    padding-left: 0;
    cursor: pointer;

    &:hover {
      color: #b00909;
    }
  }

  &__new-template {
    margin-top: 15px;
    display: flex;
    align-items: center;

    label {
      font-size: 14px;
      margin-right: 10px;
      font-family: $ff-montserrat;
    }

    input {
      width: 150px;
      border: 1px solid #7a7a7a;
      padding: 6px;
      font-size: 14px;
    }

    button {
      border: none;
      padding: 7px;
      cursor: pointer;
      background: #2a8634;
      color: #fff;
      font-family: $ff-montserrat;
      font-size: 14px;

      &:hover {
        background: #fec006;
      }
    }
  }

  &__title {
    margin: 0;
    padding-bottom: 50px;
    color: #000;
    font-weight: 400;
    font-size: 20px;
    font-family: $ff-montserrat;
    line-height: 24px;
  }

  &__wrap-field {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__wrapClear {
    display: flex;
    cursor: pointer;
    align-items: center;

    span {
      display: none;
      padding-right: 10px;
      color: #797979;
      font-size: 18px;
      font-family: $ff-montserrat;
    }
  }

  @include respond-to($media-min-page-analysis--tablet) {
    &__wrapClear {
      span {
        display: inline-block;
      }
    }

    &__title {
      font-size: 38px;
    }
  }
}
</style>
