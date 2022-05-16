<template>
  <div class="overlay" @click="onClickClose" />
  <div class="toCompareModal">
    <div class="toCompareModal__container">
      <div class="toCompareModal__header">
        <div class="toCompareModal__title">Список индикаторов</div>
        <svg
          fill="none"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
          @click="onClickClose"
        >
          <path d="M7.5 7.5L12 12M16.5 16.5L12 12M12 12L16.5 7.5M12 12L7.5 16.5" stroke="black" />
        </svg>
      </div>
      <div class="toCompareModal__search">
        <input v-model="searchModel" placeholder="Поиск" type="text" @input="onInputSearch" />
      </div>
    </div>
    <div v-if="isInit" class="toCompareModal__wrap">
      <div
        v-if="getAllIndicators.length > 0"
        class="toCompareModal__items toCompareModal__container"
      >
        <div v-for="indicator in getAllIndicators" :key="indicator.ID" class="toCompareModal__item">
          {{ indicator.NAME }}
          <svg
            v-if="isSelectedIndicator(indicator) === false"
            fill="none"
            height="34"
            viewBox="0 0 34 34"
            width="34"
            xmlns="http://www.w3.org/2000/svg"
            @click="onChangeSelect(indicator)"
          >
            <circle cx="17" cy="17" fill="#FEC006" r="13" />
            <path
              clip-rule="evenodd"
              d="M16.381 17.9727V23.8095H17.381V17.9727H23.8095V16.9727H17.381V10.1904L16.381 10.1904V16.9727H10.1904V17.9727H16.381Z"
              fill="white"
              fill-rule="evenodd"
            />
          </svg>
          <svg
            v-else
            fill="none"
            height="34"
            viewBox="0 0 34 34"
            width="34"
            xmlns="http://www.w3.org/2000/svg"
            @click="onChangeSelect(indicator)"
          >
            <path
              clip-rule="evenodd"
              d="M28.6358 17C28.6358 23.4263 23.4263 28.6358 17 28.6358C10.5737 28.6358 5.3642 23.4263 5.3642 17C5.3642 10.5737 10.5737 5.3642 17 5.3642C23.4263 5.3642 28.6358 10.5737 28.6358 17ZM30 17C30 24.1797 24.1797 30 17 30C9.8203 30 4 24.1797 4 17C4 9.8203 9.8203 4 17 4C24.1797 4 30 9.8203 30 17ZM10.9335 17.8666H23.0669V16.5024H10.9335V17.8666Z"
              fill="#797979"
              fill-rule="evenodd"
            />
          </svg>
        </div>
      </div>
      <div
        v-if="getAllIndicators.length > 0"
        class="toCompareModal__toCompareBtn"
        @click="onClickClose"
      >
        Добавить к сравнению
      </div>
    </div>
    <Loader v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { DynamicObject } from '@/interfaces';
import { useTechAnalysisStore } from '@/store/pinia/technicalAnalysis';
import Loader from '@/components/Loader/index.vue';

export default defineComponent({
  name: 'TechnicalAnalysisPageIndicatorsModal',
  components: { Loader },
  emits: ['onClose'],
  setup(props, { emit }) {
    const techStore = useTechAnalysisStore();

    const isInit = ref(false);
    const searchModel = ref('');

    const onClickClose = () => {
      techStore.inputIndicatorSearch('');
      emit('onClose');
    };

    const onChangeSelect = async (indicator: DynamicObject) => {
      await techStore.changeSelectedIndicators(indicator);
    };

    const isSelectedIndicator = (indicator: DynamicObject) =>
      techStore.isSelectedIndicator(indicator);

    const onInputSearch = () => {
      techStore.inputIndicatorSearch(searchModel.value);
    };

    const init = async () => {
      if (techStore.allIndicators.length > 0) {
        isInit.value = true;
      } else {
        await techStore.initIndicators();
        isInit.value = true;
      }
    };

    onMounted(async () => {
      await init();
    });

    return {
      onClickClose,
      onChangeSelect,
      isSelectedIndicator,
      onInputSearch,
      getAllIndicators: computed(() => techStore.allIndicators),
      isInit,
      searchModel,
    };
  },
});
</script>

<style scoped lang="scss">
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 998;
  width: 100vw;
  height: 6000px;
  background: rgb(0 0 0 / 30%);
}

.toCompareModal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  width: 100vw;
  height: 100vh;
  margin: auto;
  padding-top: 20px;
  background: #fff;

  &__wrap {
    position: relative;
    height: 94%;
    overflow-y: auto;
  }

  &__container {
    padding: 0 14px;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 16px;
    border-bottom: 1px solid #f1f1f1;

    svg {
      cursor: pointer;
    }
  }

  &__title {
    color: #000;
    font-weight: 500;
    font-size: 18px;
    font-family: $ff-montserrat;
    line-height: 22px;
  }

  &__items {
    height: 84%;
    padding: 28px 8px;
    overflow-y: auto;
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 16px;
    color: #000;
    font-weight: 600;
    font-size: 14px;
    font-family: $ff-montserrat;
    line-height: 140%;

    svg {
      cursor: pointer;
    }
  }

  &__toCompareBtn {
    //position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 28px 0;
    color: #fff;
    text-align: center;
    background: #2a8634;
    cursor: pointer;
  }

  &__search {
    padding-bottom: 10px;
    border-bottom: 1px solid #f1f1f1;

    input {
      font-size: 14px;
      width: 100%;
      padding: 4px;
    }
  }

  @include respond-to(600) {
    max-width: 600px;
    max-height: 520px;
  }
}
</style>
