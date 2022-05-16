<template>
  <div class="listActives">
    <div class="listActives__container">
      <ListHeaderRadarPortfolio v-model:currentView="currentView" :header-type="headerType" />
      <Loader v-if="!getRadarInit || getUpdateFilters" />
      <template v-else>
        <template v-if="getActivesList.length > 0">
          <template v-if="currentView === 'max'">
            <ListItemViewMaxRadarPortfolio
              v-for="active in getActivesList"
              :key="active.ID"
              :active="active"
            />
          </template>
          <template v-if="currentView === 'min'">
            <ListItemViewMinRadarPortfolio
              v-for="active in getActivesList"
              :key="active.ID"
              :active="active"
            />
          </template>
          <ListActivesRadarPortfolioTable v-if="currentView === 'min'" />
          <RadarActivesListLoadMore />
        </template>
        <h1 v-else>Ничего не найдено</h1>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import ListItemRadarPortfolio from '@/components/Lists/RadarPortfolio/modules/Item/index.vue';
import ListHeaderRadarPortfolio from '@/components/Lists/RadarPortfolio/modules/Header/index.vue';
import ListActivesRadarPortfolioTable from '@/components/Lists/RadarPortfolio/modules/Table/index.vue';
import ListItemViewMaxRadarPortfolio from '@/components/Lists/RadarPortfolio/modules/Item/modules/ViewTypes/Max/index.vue';
import ListItemViewMinRadarPortfolio from '@/components/Lists/RadarPortfolio/modules/Item/modules/ViewTypes/Min/index.vue';
import {
  profitStats,
  cancellationPeriodStats,
  repaymentPriceStats,
} from '@/components/Lists/RadarPortfolio/modules/Item/data';
import { radarStore } from '@/store/pinia/radar';
import Loader from '@/components/Loader/index.vue';
import RadarActivesListLoadMore from '@/views/Radar/modules/ActivesList/LoadMore/index.vue';

export default defineComponent({
  name: 'ListActivesRadarPortfolio',
  components: {
    RadarActivesListLoadMore,
    Loader,
    ListItemViewMinRadarPortfolio,
    ListItemViewMaxRadarPortfolio,
    ListActivesRadarPortfolioTable,
    ListHeaderRadarPortfolio,
    ListItemRadarPortfolio,
  },
  props: {
    headerType: {
      type: String,
      required: true,
    },
  },
  setup() {
    const radar = radarStore();
    const currentView = ref(radar.activesViewMode);

    watch(
      () => currentView.value,
      () => {
        radar.$patch({
          activesViewMode: currentView.value,
        });
      },
    );

    return {
      currentView,
      profitStats,
      cancellationPeriodStats,
      repaymentPriceStats,
      getActivesList: computed(() => radar.actives[radar.currentTab]),
      getRadarInit: computed(() => radar.isInit),
      getUpdateFilters: computed(() => radar.processes.updateFilters),
    };
  },
});
</script>

<style scoped lang="scss">
.listActives {
  &__container {
    @include wrap-pad();
  }
}
</style>
