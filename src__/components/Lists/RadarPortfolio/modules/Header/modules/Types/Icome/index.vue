<template>
  <div class="headerActives">
    <ListHeaderTopTitle title="История доходов" />
    <div class="headerActives__wrap">
      <ListHeaderRadarPortfolioDate title="Период:" />
      <ListHeaderRadarPortfolioNavigation class="headerActives__nav" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ListHeaderTopTitle from '@/components/Lists/RadarPortfolio/modules/Header/modules/TopTitle/index.vue';
import { useVModel } from '@/use/useVModel';
import ListHeaderRadarPortfolioDate from '@/components/Lists/RadarPortfolio/modules/Header/modules/Date/index.vue';
import InputToggle from '@/components/Inputs/Toggle/index.vue';
import ListHeaderRadarPortfolioNavigation from '@/components/Lists/RadarPortfolio/modules/Header/modules/Navigation/index.vue';

export default defineComponent({
  name: 'ListHeaderPortfolioIncome',
  components: {
    ListHeaderRadarPortfolioNavigation,
    InputToggle,
    ListHeaderRadarPortfolioDate,
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

  &__toggle {
    display: flex;
    align-items: center;
    margin-top: 15px;
    white-space: nowrap;
  }

  &__toggleTitle {
    margin-right: 5px;
    color: #747474;
    font-weight: 500;
    font-size: 12px;
    line-height: 150%;
  }

  &__nav {
    justify-content: flex-end;
    margin-top: 15px;
    margin-bottom: 10px;
  }

  @include respond-to($container-media--big-tablet) {
    &__wrap {
      display: grid;
      grid-column-gap: 4%;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      width: 100%;
    }

    &__toggle {
      margin: 0;
    }
  }

  @include respond-to(1200) {
    &__wrap {
      margin: 50px 0;
    }

    &__toggleTitle {
      font-size: 20px;
    }
  }
}
</style>
