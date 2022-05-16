<template>
  <div class="tableIndicatorsScroller">
    <TableHeader />
    <div class="greyBg">
      <div class="flexWrapperColumn">
        <TableRow
          id="actives"
          color="#97b3de"
          :name="$t('companyIndicators.tableRows.assets.name')"
          :alert="$t('companyIndicators.tableRows.assets.alert')"
          :data="getActives"
          :chartSeries="getGraphSeriesData.actives"
        />
        <TableRow
          id="currentActives"
          color="#fec006"
          :name="$t('companyIndicators.tableRows.currentAssets.name')"
          :alert="$t('companyIndicators.tableRows.currentAssets.alert')"
          :data="getCurrentActives"
        />
        <TableRow
          id="equityCapital"
          color="#F27362"
          :name="$t('companyIndicators.tableRows.equityCapital.name')"
          :alert="$t('companyIndicators.tableRows.equityCapital.alert')"
          :data="getEquityCapital"
        />
        <TableRow
          id="revenueLastYear"
          color="#2a8634"
          :name="$t('companyIndicators.tableRows.revenueLastYear.name')"
          :alert="$t('companyIndicators.tableRows.revenueLastYear.alert')"
          :data="getRevenueLastYear"
        />
        <TableRow
          id="revenueYearRolling"
          color="#AC5BBE"
          :name="$t('companyIndicators.tableRows.revenueYearRolling.name')"
          :alert="$t('companyIndicators.tableRows.revenueYearRolling.alert')"
          :data="getRevenueYearRolling"
        />
        <TableRow
          id="pastCapitalization"
          color="#5FC0F0"
          :name="$t('companyIndicators.tableRows.pastCapitalization.name')"
          :alert="$t('companyIndicators.tableRows.pastCapitalization.alert')"
          :data="getPastCapitalization"
        />
        <TableRow
          id="currentRevenue"
          color="#F5DD50"
          :name="$t('companyIndicators.tableRows.currentRevenue.name')"
          :alert="$t('companyIndicators.tableRows.currentRevenue.alert')"
          :data="getCurrentRevenue"
        />
        <TableRow
          id="quarterlyRevenue"
          color="#E1953C"
          :name="$t('companyIndicators.tableRows.quarterlyRevenue.name')"
          :alert="$t('companyIndicators.tableRows.quarterlyRevenue.alert')"
          :data="getQuarterlyRevenue"
        />
        <TableRow
          id="shareEquityAssets"
          color="#EFB068"
          :name="$t('companyIndicators.tableRows.shareEquityAssets.name')"
          :alert="$t('companyIndicators.tableRows.shareEquityAssets.alert')"
          :data="getShareEquityActives"
        />
        <TableRow
          id="profit"
          color="#ff4495"
          :name="$t('companyIndicators.tableRows.profit.name')"
          :alert="$t('companyIndicators.tableRows.profit.alert')"
          :data="getProfit"
        />
        <TableRow
          id="profitYearRolling"
          color="#d211fe"
          :name="$t('companyIndicators.tableRows.profitYearRolling.name')"
          :alert="$t('companyIndicators.tableRows.profitYearRolling.alert')"
          :data="getProfitYearRolling"
        />
        <TableRow
          id="quarterlyProfit"
          color="#48ac99"
          :name="$t('companyIndicators.tableRows.quarterlyProfit.name')"
          :alert="$t('companyIndicators.tableRows.quarterlyProfit.alert')"
          :data="getQuarterlyProfit"
        />
        <TableRow
          id="returnOnEquity"
          color="#ffd900"
          :name="$t('companyIndicators.tableRows.returnOnEquity.name')"
          :alert="$t('companyIndicators.tableRows.returnOnEquity.alert')"
          :data="getReturnOnEquity"
        />
        <TableRow
          id="revenueGrowthRate"
          color="#40c4ff"
          :name="$t('companyIndicators.tableRows.revenueGrowthRate.name')"
          :alert="$t('companyIndicators.tableRows.revenueGrowthRate.alert')"
          :data="getRevenueGrowthRate"
        />
        <TableRow
          id="assetGrowthRate"
          color="#ff4b12"
          :name="$t('companyIndicators.tableRows.assetGrowthRate.name')"
          :alert="$t('companyIndicators.tableRows.assetGrowthRate.alert')"
          :data="getActivesGrowthRate"
        />
        <TableRow
          id="profitGrowthRate"
          color="#52e3c2"
          :name="$t('companyIndicators.tableRows.profitGrowthRate.name')"
          :alert="$t('companyIndicators.tableRows.profitGrowthRate.alert')"
          :data="getProfitGrowthRate"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import TableRow from '@/components/table/elements/tableRow/TableRow.vue';
import TableHeader from '@/components/table/elements/tableHeader/TableHeader.vue';

export default defineComponent({
  name: 'TableRows',
  components: {
    TableHeader,
    TableRow,
  },
  computed: {
    ...mapGetters({
      getActives: 'financialStore/getActives',
      getCurrentActives: 'financialStore/getCurrentActives',
      getEquityCapital: 'financialStore/getEquityCapital',
      getRevenueLastYear: 'financialStore/getRevenueLastYear',
      getRevenueYearRolling: 'financialStore/getRevenueYearRolling',
      getPastCapitalization: 'financialStore/getPastCapitalization',
      getCurrentRevenue: 'financialStore/getCurrentRevenue',
      getQuarterlyRevenue: 'financialStore/getQuarterlyRevenue',
      getShareEquityActives: 'financialStore/getShareEquityActives',
      getProfit: 'financialStore/getProfit',
      getProfitYearRolling: 'financialStore/getProfitYearRolling',
      getQuarterlyProfit: 'financialStore/getQuarterlyProfit',
      getReturnOnEquity: 'financialStore/getReturnOnEquity',
      getRevenueGrowthRate: 'financialStore/getRevenueGrowthRate',
      getActivesGrowthRate: 'financialStore/getActivesGrowthRate',
      getProfitGrowthRate: 'financialStore/getProfitGrowthRate',
      getGraphSeriesData: 'financialStore/getGraphSeriesData',
    }),
  },
});
</script>
