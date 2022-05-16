<template>
  <GraphCheckbox
    :name="$t('companyIndicators.tableRows.quotes.name')"
    :color="getGraphSeriesData.quotes.color"
    :show="getGraphSeriesData.quotes.show"
    :permanent="getGraphSeriesData.quotes.permanent"
    @click="getGraphSeriesData.quotes.show = !getGraphSeriesData.quotes.show"
  />
  <GraphCheckbox
    :name="$t('companyIndicators.tableRows.assets.name')"
    :color="getGraphSeriesData.actives.color"
    :show="getGraphSeriesData.actives.show"
    :permanent="getGraphSeriesData.actives.permanent"
    @click="setGraphSeriesReverseValue(getGraphSeriesData.actives.id)"
  />
  <GraphCheckbox
    :name="$t('companyIndicators.tableRows.currentAssets.name')"
    :color="getGraphSeriesData.currentActives.color"
    :show="getGraphSeriesData.currentActives.show"
    @click="setGraphSeriesReverseValue(getGraphSeriesData.currentActives.id)"
  />
  <GraphCheckbox
    :name="$t('companyIndicators.tableRows.equityCapital.name')"
    :color="getGraphSeriesData.equityCapital.color"
    :show="getGraphSeriesData.equityCapital.show"
    @click="setGraphSeriesReverseValue(getGraphSeriesData.equityCapital.id)"
  />
  <GraphCheckbox
    :name="$t('companyIndicators.tableRows.revenueLastYear.name')"
    :color="getGraphSeriesData.revenueLastYear.color"
    :show="getGraphSeriesData.revenueLastYear.show"
    @click="setGraphSeriesReverseValue(getGraphSeriesData.revenueLastYear.id)"
  />
  <GraphCheckbox
    :name="$t('companyIndicators.tableRows.revenueYearRolling.name')"
    :color="getGraphSeriesData.revenueYearRolling.color"
    :show="getGraphSeriesData.revenueYearRolling.show"
    @click="setGraphSeriesReverseValue(getGraphSeriesData.revenueYearRolling.id)"
  />
  <GraphCheckbox
    :name="$t('companyIndicators.tableRows.pastCapitalization.name')"
    :color="getGraphSeriesData.pastCapitalization.color"
    :show="getGraphSeriesData.pastCapitalization.show"
    @click="setGraphSeriesReverseValue(getGraphSeriesData.pastCapitalization.id)"
  />
  <GraphCheckbox
    :name="$t('companyIndicators.tableRows.currentRevenue.name')"
    :color="getGraphSeriesData.currentRevenue.color"
    :show="getGraphSeriesData.currentRevenue.show"
    @click="setGraphSeriesReverseValue(getGraphSeriesData.currentRevenue.id)"
  />
  <GraphCheckbox
    :name="$t('companyIndicators.tableRows.quarterlyRevenue.name')"
    :color="getGraphSeriesData.quarterlyRevenue.color"
    :show="getGraphSeriesData.quarterlyRevenue.show"
    @click="setGraphSeriesReverseValue(getGraphSeriesData.quarterlyRevenue.id)"
  />
  <GraphCheckbox
    :name="$t('companyIndicators.tableRows.shareEquityAssets.name')"
    :color="getGraphSeriesData.shareEquityAssets.color"
    :show="getGraphSeriesData.shareEquityAssets.show"
    @click="setGraphSeriesReverseValue(getGraphSeriesData.shareEquityAssets.id)"
  />
  <GraphCheckbox
    :name="$t('companyIndicators.tableRows.profit.name')"
    :color="getGraphSeriesData.profit.color"
    :show="getGraphSeriesData.profit.show"
    @click="setGraphSeriesReverseValue(getGraphSeriesData.profit.id)"
  />
  <GraphCheckbox
    :name="$t('companyIndicators.tableRows.profitYearRolling.name')"
    :color="getGraphSeriesData.profitYearRolling.color"
    :show="getGraphSeriesData.profitYearRolling.show"
    @click="setGraphSeriesReverseValue(getGraphSeriesData.profitYearRolling.id)"
  />
  <GraphCheckbox
    :name="$t('companyIndicators.tableRows.quarterlyProfit.name')"
    :color="getGraphSeriesData.quarterlyProfit.color"
    :show="getGraphSeriesData.quarterlyProfit.show"
    @click="setGraphSeriesReverseValue(getGraphSeriesData.quarterlyProfit.id)"
  />
  <GraphCheckbox
    :name="$t('companyIndicators.tableRows.returnOnEquity.name')"
    :color="getGraphSeriesData.returnOnEquity.color"
    :show="getGraphSeriesData.returnOnEquity.show"
    @click="setGraphSeriesReverseValue(getGraphSeriesData.returnOnEquity.id)"
  />
  <GraphCheckbox
    :name="$t('companyIndicators.tableRows.revenueGrowthRate.name')"
    :color="getGraphSeriesData.revenueGrowthRate.color"
    :show="getGraphSeriesData.revenueGrowthRate.show"
    @click="setGraphSeriesReverseValue(getGraphSeriesData.revenueGrowthRate.id)"
  />
  <GraphCheckbox
    :name="$t('companyIndicators.tableRows.assetGrowthRate.name')"
    :color="getGraphSeriesData.assetGrowthRate.color"
    :show="getGraphSeriesData.assetGrowthRate.show"
    @click="setGraphSeriesReverseValue(getGraphSeriesData.assetGrowthRate.id)"
  />
  <GraphCheckbox
    :name="$t('companyIndicators.tableRows.profitGrowthRate.name')"
    :color="getGraphSeriesData.profitGrowthRate.color"
    :show="getGraphSeriesData.profitGrowthRate.show"
    @click="setGraphSeriesReverseValue(getGraphSeriesData.profitGrowthRate.id)"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters, mapMutations } from 'vuex';
import GraphCheckbox from '@/views/stock/indicators/elements/GraphCheckbox.vue';

export default defineComponent({
  name: 'GraphCheckboxes',

  components: {
    GraphCheckbox,
  },

  computed: {
    ...mapGetters({
      getGraphSeriesData: 'financialStore/getGraphSeriesData',
    }),
  },

  methods: {
    ...mapMutations({
      setGraphSeriesReverseValue: 'financialStore/setGraphSeriesReverseValue',
    }),
  },
});
</script>

<style scoped lang="scss"></style>
