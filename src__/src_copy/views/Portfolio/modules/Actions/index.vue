<template>
  <div class="actions">
    <div class="actions__grid">
      <PagePortfolioActionBtn color="#CE0E07" :icon="iconNewAsset" title="Новый актив" />
      <PagePortfolioActionBtn :icon="iconDuplicate" title="Дублировать" />
      <PagePortfolioActionBtn :icon="iconAddNew" title="Добавить новый" />
      <PagePortfolioActionBtn :icon="iconLoad" title="Загрузить новый" />
    </div>
  </div>
</template>

<script lang="ts">
import PagePortfolioActionBtn from '@/views/Portfolio/modules/Actions/modules/Button/index.vue';
import iconNewAsset from '@/assets/icons/portfolio/new-asset.svg';
import iconDuplicate from '@/assets/icons/portfolio/duplicate.svg';
import iconAddNew from '@/assets/icons/portfolio/add-new.svg';
import iconLoad from '@/assets/icons/portfolio/load.svg';

export default defineComponent({
  name: 'PagePortfolioActions',
  components: { PagePortfolioActionBtn },
  setup() {
    return {
      iconNewAsset,
      iconDuplicate,
      iconAddNew,
      iconLoad,
    };
  },
});
</script>

<style scoped lang="scss">
.actions {
  &__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px 4%;
  }

  @include respond-to(1000) {
    &__grid {
      grid-template-columns: repeat(4, 1fr);
      row-gap: 0;
    }
  }
}
</style>
