<template>
  <div class="params">
    <h1 class="params__title">Параметры индекса "{{ getName }}"</h1>
    <ul class="params__list">
      <li class="params__item" v-if="getFullName">Полное название: {{ getFullName }}</li>
      <li class="params__item" v-if="getTicker">Тикер: {{ getTicker }}</li>
      <li class="params__item" v-if="getCurrency.value">Валюта: {{ getCurrency.value }}</li>
      <li class="params__item" v-if="getDynamics.current">
        Текущее значение: {{ Number(getDynamics.current).toFixed(2) }}
      </li>
      <li
        class="params__item"
        v-if="getDynamics.month && getDynamics.year && getDynamics.threeYears"
      >
        Динамика индекса: прирост за месяц =
        <span :class="getPercentClass(increaseMonth)"> {{ increaseMonth }}%, </span>
        прирост за год =
        <span :class="getPercentClass(increaseYear)"> {{ increaseYear }}%, </span>
        прирост за три года =
        <span :class="getPercentClass(increaseThreeYears)"> {{ increaseThreeYears }}% </span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {
  computed, defineComponent, onMounted, onServerPrefetch, ref,
} from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'IndexPageParams',
  setup() {
    const store = useStore();

    const isInit = ref<boolean>(false);

    const increaseMonth = ref<number | null>(null);
    const increaseYear = ref<number | null>(null);
    const increaseThreeYears = ref<number | null>(null);

    const getPercent = (value1: string | number, value2: string | number): number => {
      const _val1 = Number(value1);
      const _val2 = Number(value2);

      const percent = (_val1 / _val2) * 100;

      return Number((percent - 100).toFixed(2));
    };

    const getPercentClass = (value: string | number): string => {
      const _val = Number(value);
      if (_val > 0) {
        return 'params__item--increase';
      }
      return 'params__item--decrease';
    };

    const getName = computed(() => store.getters['indexPageStore/getName']);
    const getFullName = computed(() => store.getters['indexPageStore/getFullName']);
    const getTicker = computed(() => store.getters['indexPageStore/getTicker']);
    const getCurrency = computed(() => store.getters['indexPageStore/getCurrency']);
    const getDynamics = computed(() => store.getters['indexPageStore/getDynamics']);

    const init = (): boolean => {
      increaseMonth.value = getPercent(getDynamics.value.current, getDynamics.value.month);
      increaseYear.value = getPercent(getDynamics.value.current, getDynamics.value.year);
      increaseThreeYears.value = getPercent(
        getDynamics.value.current,
        getDynamics.value.threeYears,
      );
      return true;
    };

    onServerPrefetch(() => {
      isInit.value = init();
    });

    onMounted(() => {
      if (!isInit.value) {
        isInit.value = init();
      }
    });

    return {
      getName,
      getFullName,
      getTicker,
      getCurrency,
      getDynamics,
      increaseMonth,
      increaseYear,
      increaseThreeYears,
      getPercent,
      getPercentClass,
    };
  },
});
</script>

<style scoped lang="scss">
.params {
  &__title {
    margin-bottom: 30px;
    font-weight: 500;
    font-size: 28px;
  }

  &__list {
    margin: 0;
    padding: 0 0 0 20px;
    list-style: none;
  }

  &__item {
    position: relative;
    margin-bottom: 15px;
    padding-left: 30px;
    font-size: 16px;
    line-height: 20px;

    &::before {
      position: absolute;
      top: 35%;
      left: 0;
      display: inline-block;
      color: #2a8634;
      font-weight: bold;
      font-size: 50px;
      line-height: 0;
      content: '\2022';
    }

    &--increase {
      color: #2a8634;
    }

    &--decrease {
      color: red;
    }
  }
}
</style>
