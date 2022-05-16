<template>
  <ListItemViewMaxRadarPortfolio
    v-if="currentView === 'max'"
    price="1 047,05"
    :quantity="quantity"
    :profit-stats="profitStats"
    :repayment-price-stats="repaymentPriceStats"
    :cancellation-period-stats="cancellationPeriodStats"
  />
  <ListItemViewMinRadarPortfolio
    v-if="currentView === 'min'"
    price="1 047,05"
    :quantity="quantity"
    :profit-stats="profitStats"
    :repayment-price-stats="repaymentPriceStats"
    :cancellation-period-stats="cancellationPeriodStats"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import {
  profitStats,
  cancellationPeriodStats,
  repaymentPriceStats,
} from '@/components/Lists/RadarPortfolio/modules/Item/data';
import ListItemViewMaxRadarPortfolio from '@/components/Lists/RadarPortfolio/modules/Item/modules/ViewTypes/Max/index.vue';
import ListItemViewMinRadarPortfolio from '@/components/Lists/RadarPortfolio/modules/Item/modules/ViewTypes/Min/index.vue';

export default defineComponent({
  name: 'ListItemRadarPortfolio',
  components: { ListItemViewMinRadarPortfolio, ListItemViewMaxRadarPortfolio },
  props: {
    currentView: {
      type: String,
      required: true,
    },
  },
  setup() {
    const quantity = ref<number>(0);

    return {
      quantity,
      profitStats,
      cancellationPeriodStats,
      repaymentPriceStats,
    };
  },
});
</script>

<style scoped lang="scss"></style>
