<template>
  <section class="pagePortfolio">
    <HeaderPortfolio />
    <TabsPresetRadarPortfolio
      :title="'Оценка портфеля'"
      :tabs="tabs"
      goToLink="Radar"
      goToTitle="Перейти в Radar"
    />
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HeaderPortfolio from '@/components/Common/Header/Components/Portfolio/index.vue';
import TabsPresetRadarPortfolio from '@/components/Tabs/modules/Presets/RadarPortfolio/index.vue';
import { tabs } from '@/views/Portfolio/data/tabs';

export default defineComponent({
  name: 'PagePortfolio',
  components: { TabsPresetRadarPortfolio, HeaderPortfolio },
  setup() {
    return {
      tabs,
    };
  },
});
</script>

<style scoped lang="scss"></style>
