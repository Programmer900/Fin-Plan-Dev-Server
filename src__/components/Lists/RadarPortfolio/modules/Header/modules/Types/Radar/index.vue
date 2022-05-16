<template>
  <div class="headerRadar">
    <ListHeaderTopTitle :count="getTotalActives" title="Список активов" />
    <div class="headerRadar__wrap">
      <div class="headerRadar__inner">
        <ListHeaderChangeView v-model:current-view="currentViewModel" />
        <ListHeaderSelectedCount
          class="headerRadar__selectedCount"
          :max="getTotalActives"
          :min="getShownActives"
        />
      </div>
      <div class="headerRadar__inner headerRadar__inner--between">
        <ListHeaderSelectAll />
        <ListHeaderResetAll />
      </div>
      <div class="headerRadar__inner headerRadar__inner--between">
        <ListHeaderSearch class="headerRadar__search" />
        <ListHeaderOptions />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ListHeaderTopTitle from '@/components/Lists/RadarPortfolio/modules/Header/modules/TopTitle/index.vue';
import ListHeaderChangeView from '@/components/Lists/RadarPortfolio/modules/Header/modules/ChangeView/index.vue';
import ListHeaderSelectedCount from '@/components/Lists/RadarPortfolio/modules/Header/modules/SelectedCount/index.vue';
import ListHeaderSelectAll from '@/components/Lists/RadarPortfolio/modules/Header/modules/SelectAll/index.vue';
import ListHeaderResetAll from '@/components/Lists/RadarPortfolio/modules/Header/modules/ResetAll/index.vue';
import ListHeaderSearch from '@/components/Lists/RadarPortfolio/modules/Header/modules/Search/index.vue';
import ListHeaderOptions from '@/components/Lists/RadarPortfolio/modules/Header/modules/Options/index.vue';
import { useVModel } from '@/use/useVModel';
import { radarStore } from '@/store/pinia/radar';

export default defineComponent({
  name: 'ListHeaderPortfolioDefault',
  components: {
    ListHeaderOptions,
    ListHeaderSearch,
    ListHeaderResetAll,
    ListHeaderSelectAll,
    ListHeaderSelectedCount,
    ListHeaderChangeView,
    ListHeaderTopTitle,
  },
  props: {
    currentView: {
      type: String,
    },
  },
  setup(props) {
    const radar = radarStore();

    return {
      getTotalActives: computed(() => radar.getCurrentActivesTotalItems),
      getShownActives: computed(() => radar.getCurrentActivesShownItems),
      currentViewModel: useVModel(props, 'currentView'),
    };
  },
});
</script>

<style scoped lang="scss">
.headerRadar {
  &__wrap {
    margin-top: 22px;
  }

  &__inner {
    display: flex;
    align-items: center;

    &:not(:first-child) {
      margin-top: 20px;
    }

    &--between {
      justify-content: space-between;
    }
  }

  &__selectedCount {
    margin-left: 2%;
  }

  @include respond-to($container-media--big-tablet) {
    &__wrap {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      align-items: center;
      width: 100%;
    }

    &__selectedCount {
      margin-left: 6%;
    }

    &__inner {
      &:not(:first-child) {
        margin-top: 30px;
      }
    }

    &__search {
      width: 85%;
    }
  }

  @include respond-to(1100) {
    &__inner {
      &:not(:first-child) {
        margin-top: 0;
      }
    }

    &__wrap {
      grid-column-gap: 4%;
      grid-template-columns: 3fr 3fr 4fr;
      align-items: center;
    }
  }

  @include respond-to(1500) {
    &__wrap {
      grid-template-columns: 2fr 2fr 4fr;
      margin-top: 66px;
    }
  }
}
</style>
