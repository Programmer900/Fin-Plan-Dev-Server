<template>
  <div class="tableRight">
    <table>
      <tr>
        <th>
          <div>Количество</div>
        </th>
        <th>
          <div>Сумма</div>
        </th>
      </tr>
      <tr v-for="(active, activeIndex) in getCurrentActives" :key="active.ID">
        <td style="max-width: 250px; vertical-align: top">
          <ListItemViewMinCountRadarPortfolio
            v-model:count="active.count"
            style="min-width: max-content; overflow-x: auto"
          />
        </td>
        <td style="max-width: 250px; vertical-align: top">
          <ScrollArea>
            <div class="tableRight__sum">{{ active.ID }} ₽</div>
          </ScrollArea>
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import ListItemViewMinCountRadarPortfolio from '@/components/Lists/RadarPortfolio/modules/Item/modules/ViewTypes/Min/modules/Counter/index.vue';
import ScrollArea from '@/components/ScrollArea/index.vue';
import { radarStore } from '@/store/pinia/radar';

export default defineComponent({
  name: 'ListActivesRadarPortfolioTableRight',
  components: { ScrollArea, ListItemViewMinCountRadarPortfolio },
  setup() {
    const radar = radarStore();

    return {
      getCurrentActives: computed(() => radar.getCurrentActives),
    };
  },
});
</script>

<style scoped lang="scss">
.tableRight {
  :deep .counter {
    margin: 0;

    &__value {
      margin: 0 30px;
      line-height: unset;
    }
  }

  &__sum {
    min-width: max-content;
    font-weight: 700;
    font-size: 20px;
  }
}
</style>
