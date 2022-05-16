<template>
  <div class="radarChart">
    <div class="radarChart__container">
      <ChartPresetRadarPortfolio :chart-type="chartType">
        <template #stats v-if="chartType !== 'portfolio'">
          <ChartPresetRadarPortfolioStat
            v-model:value="money.totalInvestment"
            :is-active="true"
            title="Сумма инвестиций"
          />
          <ChartPresetRadarPortfolioStat
            v-model:value="money.distributed"
            right-text="₽"
            title="Распределено"
          />
          <ChartPresetRadarPortfolioStat
            v-model:value="money.notDistributed"
            right-text="₽"
            title="Не распределено"
          />
          <ChartPresetRadarPortfolioStat
            v-model:value="money.fixedIncome"
            right-text="₽"
            title="Фиксированный доход"
          />
        </template>
      </ChartPresetRadarPortfolio>
    </div>
  </div>
</template>

<script lang="ts">
import { cloneDeep } from 'lodash';
import ChartPresetRadarPortfolio from '@/components/Charts/Presets/RadarPortfolio/index.vue';
import ChartPresetRadarPortfolioStat from '@/components/Charts/Presets/RadarPortfolio/modules/Stat/index.vue';
import { radarStore } from '@/store/pinia/radar';

export default defineComponent({
  name: 'PageRadarChart',
  components: { ChartPresetRadarPortfolioStat, ChartPresetRadarPortfolio },
  props: {
    chartType: {
      type: String,
      default: '',
    },
  },
  setup() {
    const radar = radarStore();

    watch(
      () => cloneDeep(radar.money),
      () => {
        console.log('here');
      },
    );

    return {
      money: radar.money,
    };
  },
});
</script>

<style scoped lang="scss">
.radarChart {
  margin-top: 50px;
  padding-top: 40px;
  background: #fff;
}
</style>
