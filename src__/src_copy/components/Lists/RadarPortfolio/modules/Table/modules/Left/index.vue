<template>
  <div class="tableLeft">
    <table>
      <tr>
        <th>Название</th>
      </tr>
      <tr v-for="active in getCurrentActives" :key="active.ID">
        <TableLeftCellTitle :active="active" />
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { radarStore } from '@/store/pinia/radar';
import TableLeftCellTitle from '@/components/Lists/RadarPortfolio/modules/Table/modules/Left/CellTitle/index.vue';

export default defineComponent({
  name: 'ListActivesRadarPortfolioTableLeft',
  components: { TableLeftCellTitle },
  setup() {
    const radar = radarStore();

    return {
      getCurrentActives: computed(() => radar.getCurrentActives),
    };
  },
});
</script>

<style scoped lang="scss">
.tableLeft {
}
</style>
