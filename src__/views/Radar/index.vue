<template>
  <section class="pageRadar">
    <HeaderPortfolio />
    <!--    <button style="padding: 20px" @click="onClickReset">CБРОСИТЬ ФИЛЬТРЫ</button>-->
    <template v-if="isInit">
      <TabsPresetRadarPortfolio
        go-to-link="Portfolio"
        go-to-title="Перейти к портфелю"
        :tabs="tabs"
        :title="'Подбор активов для портфеля'"
      />
      <PageRadarChart />
      <PageRadarActivesList />
      <div v-if="getUpdateActive" class="pageRadar__block" />
    </template>
    <Loader v-else />
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HeaderPortfolio from '@/components/Common/Header/Components/Portfolio/index.vue';
import { tabs } from '@/views/Radar/data/tabs';
import TabsPresetRadarPortfolio from '@/components/Tabs/modules/Presets/RadarPortfolio/index.vue';
import { radarStore } from '@/store/pinia/radar';
import Loader from '@/components/Loader/index.vue';
import PageRadarActivesList from '@/views/Radar/modules/ActivesList/index.vue';
import PageRadarChart from '@/views/Radar/modules/Chart/index.vue';

export default defineComponent({
  name: 'PageRadar',
  components: {
    PageRadarChart,
    PageRadarActivesList,
    Loader,
    TabsPresetRadarPortfolio,
    HeaderPortfolio,
  },
  setup() {
    const radar = radarStore();

    const onClickReset = () => {
      radar.resetFilters();
    };

    onMounted(async () => {
      await radar.init();
      radar.loadStateFromStorage();
      await radar.updateActives();
      // radar.logState();
      console.log(radar.filters.bonds);
      console.log(radar.actives);
    });

    onServerPrefetch(async () => {
      await radar.init();
    });

    return {
      tabs,
      isInit: computed(() => radar.isInit),
      getUpdateActive: computed(() => radar.processes.updateActives),
      onClickReset,
    };
  },
});
</script>

<style scoped lang="scss">
.pageRadar {
  position: relative;

  &__block {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100vw;
    height: 100vh;
    background: rgb(203 203 203 / 53%);
    cursor: not-allowed;
  }
}
</style>
