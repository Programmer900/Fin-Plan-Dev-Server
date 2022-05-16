<template>
  <div class="headerActives">
    <ListHeaderTopTitle title="Параметры для сравнения" />
    <ListHeaderCompareParams class="headerActives__params" />
    <div class="headerActives__wrap">
      <ListHeaderChangeView class="headerActives__item" v-model:current-view="currentViewModel" />
      <ListHeaderActivesTypes class="headerActives__item" />
      <div class="headerActives__gridSearchAdd">
        <ListHeaderSearch class="headerActives__search" />
        <ListHeaderAddNewAsset class="headerActives__addNewAsset" />
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
import ListHeaderActivesTypes from '@/components/Lists/RadarPortfolio/modules/Header/modules/ActivesTypes/index.vue';
import ListHeaderAddNewAsset from '@/components/Lists/RadarPortfolio/modules/Header/modules/AddNewAsset/index.vue';
import ListHeaderCompareParams from '@/components/Lists/RadarPortfolio/modules/Header/modules/CompareParams/index.vue';

export default defineComponent({
  name: 'ListHeaderPortfolioDefault',
  components: {
    ListHeaderCompareParams,
    ListHeaderAddNewAsset,
    ListHeaderActivesTypes,
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
    return {
      currentViewModel: useVModel(props, 'currentView'),
    };
  },
});
</script>

<style scoped lang="scss">
.headerActives {
  &__wrap {
    margin-top: 22px;
  }

  &__item {
    margin-top: 20px;
  }

  &__selectedCount {
    margin-left: 2%;
  }

  &__params {
    margin-top: 20px;
  }

  &__gridSearchAdd {
    display: flex;
    flex-direction: column;
  }

  &__addNewAsset {
    order: 1;
    margin: 25px 0;
  }

  &__search {
    order: 2;
  }

  @include respond-to($container-media--big-tablet) {
    &__wrap {
      display: grid;
      grid-template-columns: 1fr 3fr;
      align-items: center;
      width: 100%;
    }

    &__gridSearchAdd {
      flex-direction: row;
      grid-column: span 2;
      align-items: center;
      margin-top: 50px;
    }

    &__addNewAsset {
      order: 2;
      margin: 0;
    }

    &__search {
      order: 1;
      width: 70%;
      margin-right: 4%;
    }
  }

  @include respond-to(1200) {
    &__wrap {
      grid-column-gap: 4%;
      grid-template-columns: minmax(60px, 70px) 3fr 4fr;
      align-items: center;
      margin-top: 70px;
    }

    &__gridSearchAdd {
      grid-column: unset;
      margin: 0;
    }

    &__item {
      margin: 0;
    }

    &__params {
      margin-top: 50px;
      padding-bottom: 50px;
    }
  }
}
</style>
