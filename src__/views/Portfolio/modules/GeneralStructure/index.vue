<template>
  <div class="generalStructure">
    <div class="generalStructure__title">Общая структура</div>
    <PagePortfolioGeneralStructureItem
      class="generalStructure__item"
      title="Структура портфеля"
      subtitle="Общий риск портфеля: < -10%"
      type="error"
    >
      <template v-slot:content>
        <PagePortfolioGeneralStructureChart />
      </template>
    </PagePortfolioGeneralStructureItem>
    <PagePortfolioGeneralStructureItem
      class="generalStructure__item"
      title="Общий риск портфеля < -10%"
      subtitle="Доля активов в долларах  > 40% и < 60%"
      type="success"
    >
      <template v-slot:content>
        <PagePortfolioGeneralStructureChart />
      </template>
    </PagePortfolioGeneralStructureItem>
    <PagePortfolioGeneralStructureItem
      class="generalStructure__item"
      title="Отраслевая диверсификация"
      subtitle="Доля акций в одной отрасли РФ или США > 30% "
      type="error"
    >
      <template v-slot:content>
        <PagePortfolioGeneralStructureChart2 />
      </template>
    </PagePortfolioGeneralStructureItem>
    <PagePortfolioGeneralStructureItem
      class="generalStructure__item"
      title="Количество активов"
      subtitle="Слишком низкий уровень диверсификации"
      type="warning"
    >
      <template v-slot:content>
        <PagePortfolioGeneralStructureQuantity />
      </template>
    </PagePortfolioGeneralStructureItem>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PagePortfolioGeneralStructureItem from '@/views/Portfolio/modules/GeneralStructure/modules/Item/index.vue';
import PagePortfolioGeneralStructureChart from '@/views/Portfolio/modules/GeneralStructure/modules/Chart/index.vue';
import PagePortfolioGeneralStructureChart2 from '@/views/Portfolio/modules/GeneralStructure/modules/Chart2/index.vue';
import PagePortfolioGeneralStructureQuantity from '@/views/Portfolio/modules/GeneralStructure/modules/Quantity/index.vue';

export default defineComponent({
  name: 'PagePortfolioGeneralStructure',
  components: {
    PagePortfolioGeneralStructureQuantity,
    PagePortfolioGeneralStructureChart2,
    PagePortfolioGeneralStructureChart,
    PagePortfolioGeneralStructureItem,
  },
});
</script>

<style scoped lang="scss">
.generalStructure {
  &__title {
    margin-top: 30px;
    font-weight: 500;
    font-size: 14px;
    line-height: 150%;
  }

  &__item {
    margin-top: 20px;
  }

  @include respond-to($container-media--tablet) {
    &__title {
      margin-top: 40px;
      font-size: 30px;
    }
  }

  @include respond-to(1200) {
    &__title {
      margin-top: 50px;
      margin-bottom: 20px;
      font-size: 36px;
    }
  }
}
</style>
