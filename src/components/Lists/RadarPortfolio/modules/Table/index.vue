<template>
  <div class="assetsTable">
    <ListActivesRadarPortfolioTableLeft />
    <ListActivesRadarPortfolioTableCenter />
    <ListActivesRadarPortfolioTableRight />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ListActivesRadarPortfolioTableLeft from '@/components/Lists/RadarPortfolio/modules/Table/modules/Left/index.vue';
import ListActivesRadarPortfolioTableRight from '@/components/Lists/RadarPortfolio/modules/Table/modules/Right/index.vue';
import ListActivesRadarPortfolioTableCenter from '@/components/Lists/RadarPortfolio/modules/Table/modules/Center/index.vue';
import { radarStore } from '@/store/pinia/radar';

export default defineComponent({
  name: 'ListActivesRadarPortfolioTable',
  components: {
    ListActivesRadarPortfolioTableCenter,
    ListActivesRadarPortfolioTableRight,
    ListActivesRadarPortfolioTableLeft,
  },
  setup() {
    const radar = radarStore();
    const numEl = ref<number>(10);

    return {
      numEl,
      getActives: computed(() => radar.actives[radar.currentTab]),
    };
  },
});
</script>

<style scoped lang="scss">
.assetsTable {
  display: none;

  ::v-deep .scrollArea__wrap {
    padding: 0;
  }

  ::v-deep table {
    width: 100%;
    background: #fff;
    border-collapse: collapse;
  }

  ::v-deep tr {
    &:first-child {
      border-bottom: 4px solid #f8f8f8;
    }

    &:not(:first-child) {
      height: 110px;
      overflow-y: auto;
      border-bottom: 1px solid #f8f8f8;
    }
  }

  ::v-deep th {
    padding: 20px 30px;
    color: #797979;
    font-weight: 500;
    font-size: 16px;
    text-align: left;
  }

  ::v-deep td {
    padding: 30px;
  }

  ::v-deep table,
  th,
  td {
    border: 1px solid #f8f8f8;
  }

  @include respond-to(1300) {
    display: grid;
    grid-template-columns: 1fr minmax(400px, 2fr) 1fr;
  }
}
</style>
