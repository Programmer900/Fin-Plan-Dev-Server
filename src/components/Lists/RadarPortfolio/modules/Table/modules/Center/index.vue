<template>
  <ScrollArea class="tableCenter">
    <table>
      <tr>
        <th v-for="(title, titleIndex) in getCurrentStatTitles" :key="titleIndex">
          <div>{{ title }}</div>
        </th>
      </tr>
      <tr v-for="(active, activeIndex) in getCurrentActives" :key="active.ID">
        <td
          v-for="(valueTitles, valueTitlesIndex) in getCurrentStatValueTitles"
          :key="valueTitlesIndex"
        >
          <ListItemViewMinStatRadarPortfolio
            :active="active"
            :titles="valueTitles"
            :value-keys="getCurrentStatValueActiveKeys[valueTitlesIndex]"
          />
        </td>
      </tr>
    </table>
  </ScrollArea>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ScrollArea from '@/components/ScrollArea/index.vue';
import ListItemViewMinStatRadarPortfolio from '@/components/Lists/RadarPortfolio/modules/Item/modules/ViewTypes/Min/modules/Stat/index.vue';
import { radarStore } from '@/store/pinia/radar';

export default defineComponent({
  name: 'ListActivesRadarPortfolioTableCenter',
  components: { ListItemViewMinStatRadarPortfolio, ScrollArea },
  setup() {
    const radar = radarStore();

    return {
      getCurrentActives: computed(() => radar.getCurrentActives),
      getCurrentStatTitles: computed(() => radar.getCurrentStatTitles),
      getCurrentStatValueTitles: computed(() => radar.getCurrentStatValueTitles),
      getCurrentStatValueActiveKeys: computed(() => radar.getCurrentStatValueActiveKeys),
    };
  },
});
</script>

<style scoped lang="scss">
.tableCenter {
  ::v-deep .stat {
    //min-width: 220px;
    &:first-child {
      //min-width: 300px;
    }

    &__fields {
      padding: 0;
      margin: 0;
      column-gap: 20px;
      grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
    }

    &__value {
      font-size: 20px;
    }

    &__subtitle {
      font-size: 14px;
    }
  }

  &__profitStats {
    padding-right: 35px;
  }

  th {
    div {
      min-width: max-content;
    }
  }
}
</style>
