<template>
  <template v-if="getMinMax">
    <DocumentProgressItem
      v-if="getRevenue"
      color="#2A8634"
      :line-max="Number(getRevenue)"
      name="Выручка за год (макс.), $"
      :value="getRevenue"
    />
    <DocumentProgressItem
      v-if="getCurrentFinancialData.profit"
      color="#2A8634"
      :line-max="Number(getMinMax['Выручка за год (скользящая)'].MAX)"
      name="Прибыль"
      :value="getCurrentFinancialData.profit"
    />
    <DocumentProgressItem
      v-if="getCurrentFinancialData.returnOnEquity"
      color="#FEC006"
      :line-max="Number(getMinMax['Рентабельность собственного капитала'].MAX)"
      name="Рентабельность"
      symbol="%"
      :value="getCurrentFinancialData.returnOnEquity"
    />
    <DocumentProgressItem
      v-if="getCurrentFinancialData.shareOfEquityInAssets"
      color="#FEC006"
      :line-max="Number(getMinMax['Доля собственного капитала в активах'].MAX)"
      name="Доля СК"
      symbol="%"
      :value="getCurrentFinancialData.shareOfEquityInAssets"
    />
    <DocumentProgressItem
      v-if="getCurrentFinancialData.PE"
      color="#FEC006"
      :line-max="Number(getMinMax['P/E'].MAX)"
      name="P/E"
      symbol="%"
      :value="getCurrentFinancialData.PE"
    />
    <DocumentProgressItem
      v-if="getBeta"
      color="#FEC006"
      :line-max="Number(getMinMax.BETTA.MAX)"
      name="Бета"
      :value="getBeta"
    />
    <DocumentProgressItem
      v-if="getCurrentFinancialData.capitalization"
      color="#FEC006"
      :line-max="Number(getMinMax['Прошлая капитализация'].MAX)"
      name="Капитализация, $"
      :value="getCurrentFinancialData.capitalization"
    />
    <DocumentProgressItem
      v-if="getDividends"
      color="#FEC006"
      :line-max="Number(getMinMax['Дивиденды %'].MAX)"
      name="Дивиденды, %"
      symbol="%"
      :value="getDividends"
    />
  </template>
</template>

<script lang="ts">
import DocumentProgressItem from '@/views/Document/modules/Body/modules/Progress/Item/index.vue';

export default defineComponent({
  name: 'DocumentProgress',
  components: { DocumentProgressItem },
  setup() {
    const store = useStore();

    return {
      getBeta: store.getters['documentStore/getBeta'],
      getDividends: store.getters['documentStore/getDividends'],
      getPE: store.getters['documentStore/getPE'],
      getEquityCapital: store.getters['documentStore/getEquityCapital'],
      getCapitalization: store.getters['documentStore/getCapitalization'],
      getRevenue: store.getters['documentStore/getRevenue'],
      getMinMax: store.getters['documentStore/getMinMax'],
      getCurrentFinancialData: store.getters['documentStore/getCurrentFinancialData'],
    };
  },
});
</script>

<style scoped lang="scss"></style>
