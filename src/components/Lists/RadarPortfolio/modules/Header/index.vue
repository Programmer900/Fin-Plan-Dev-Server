<template>
  <div class="listHeader">
    <ListHeaderRadar v-if="headerType === 'radar'" v-model:current-view="currentViewModel" />
    <ListHeaderPortfolioDefault
      v-if="headerType === 'portfolio-default'"
      v-model:current-view="currentViewModel"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ListHeaderRadar from '@/components/Lists/RadarPortfolio/modules/Header/modules/Types/Radar/index.vue';
import { useVModel } from '@/use/useVModel';
import ListHeaderPortfolioDefault from '@/components/Lists/RadarPortfolio/modules/Header/modules/Types/PortfolioDefault/index.vue';
import { radarStore } from '@/store/pinia/radar';

export default defineComponent({
  name: 'ListHeaderRadarPortfolio',
  components: { ListHeaderPortfolioDefault, ListHeaderRadar },
  props: {
    headerType: {
      type: String,
      required: true,
    },
    currentView: {
      type: String,
    },
  },
  setup(props) {
    return {
      currentViewModel: useVModel(props, 'currentView'),
    };
  },
});
</script>

<style scoped lang="scss">
.listHeader {
  margin-top: 30px;
  margin-bottom: 40px;

  @include respond-to($container-media--tablet) {
    margin-top: 100px;
    margin-bottom: 70px;
  }
}
</style>
