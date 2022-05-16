<template>
  <ProgressItem
    color="#2A8634"
    :line-max="Number(getRevenue)"
    name="Выручка за год (макс.), $"
    :value="getRevenue"
  />
  <ProgressItem
    color="#2A8634"
    :line-max="Number(getMinMax['Прибыль за год (скользящая)'].MAX)"
    name="Прибыль"
    :value="curFinData.profit"
  />
  <ProgressItem
    color="#FEC006"
    :line-max="Number(getMinMax['Рентабельность собственного капитала'].MAX)"
    name="Рентабельность"
    symbol="%"
    :value="curFinData.returnOnEquity"
  />
  <ProgressItem
    color="#FEC006"
    :line-max="Number(getMinMax['Доля собственного капитала в активах'].MAX)"
    name="Доля СК"
    symbol="%"
    :value="curFinData.shareOfEquityInAssets"
  />
  <ProgressItem
    color="#FEC006"
    :line-max="Number(getMinMax['P/E'].MAX)"
    name="P/E"
    symbol="%"
    :value="curFinData.PE"
  />
  <ProgressItem
    color="#FEC006"
    :line-max="Number(getMinMax.BETTA.MAX)"
    name="Бета"
    :value="getBeta"
  />
  <ProgressItem
    color="#FEC006"
    :line-max="Number(getMinMax['Прошлая капитализация'].MAX)"
    name="Капитализация, $"
    :value="curFinData.capitalization"
  />
  <ProgressItem
    color="#FEC006"
    :line-max="Number(getMinMax['Дивиденды %'].MAX)"
    name="Дивиденды, %"
    symbol="%"
    :value="getDividends"
  />
</template>

<script lang="ts">
import {
 computed, defineComponent, onMounted, onServerPrefetch, ref
} from 'vue';
import { mapGetters, useStore } from 'vuex';
import ProgressItem from '@/components/schedule/elements/progress/ProgressItem.vue';
import { useApiFinplan } from '@/use/api/useApiFinplan';

export default defineComponent({
  name: 'Progress',
  components: { ProgressItem },
  computed: {
    ...mapGetters({
      getProfit: 'stockInfoStore/getProfit',
      getBeta: 'stockInfoStore/getBeta',
      getDividends: 'stockInfoStore/getDividends',
      getPE: 'stockInfoStore/getPE',
      getPB: 'stockInfoStore/getPB',
      getEquityCapital: 'stockInfoStore/getEquityCapital',
      getCapitalization: 'stockInfoStore/getCapitalization',
      getRevenue: 'stockInfoStore/getRevenue',
    }),
  },
  setup() {
    const api = useApiFinplan();
    const store = useStore();

    const curFinData = ref<any>({});

    onMounted(async () => {
      const response = await api.getCurrentFinancialData();
      curFinData.value = response.data;
    });

    onServerPrefetch(async () => {
      curFinData.value = await api.getCurrentFinancialData();
    });

    return {
      curFinData,
      getMinMax: computed(() => store.getters['stockInfoStore/getMinMax']),
    };
  },
});
</script>

<style scoped lang="scss"></style>
