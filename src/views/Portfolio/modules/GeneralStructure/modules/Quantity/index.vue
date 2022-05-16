<template>
  <div class="quantity">
    <div class="quantity__grid">
      <PagePortfolioGeneralStructureQuantityItem
        title="Американские акции"
        level="Хороший уровень"
        quantity="34"
      />
      <PagePortfolioGeneralStructureQuantityItem
        title="Российские акции"
        level="Хороший уровень"
        quantity="2"
      />
      <PagePortfolioGeneralStructureQuantityItem
        title="Российские облигации"
        level="Хороший уровень"
        quantity="5"
      />
      <PagePortfolioGeneralStructureQuantityItem
        title="Еврооблигации"
        level="Хороший уровень"
        quantity="42"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PagePortfolioGeneralStructureQuantityItem from '@/views/Portfolio/modules/GeneralStructure/modules/Quantity/modules/Item/index.vue';

export default defineComponent({
  name: 'PagePortfolioGeneralStructureQuantity',
  components: { PagePortfolioGeneralStructureQuantityItem },
});
</script>

<style scoped lang="scss">
.quantity {
  &__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px 4%;
  }

  @include respond-to(1200) {
    &__grid {
      grid-template-columns: repeat(4, 1fr);
      row-gap: 0;
    }
  }
}
</style>
