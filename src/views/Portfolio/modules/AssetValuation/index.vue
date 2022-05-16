<template>
  <div class="valuation">
    <div class="valuation__title">Оценка активов</div>
    <PagePortfolioGeneralvaluationItem class="valuation__item" title="Облигации" />
    <PagePortfolioGeneralvaluationItem class="valuation__item" title="Акции" />
    <PagePortfolioGeneralvaluationItem class="valuation__item" title="ETF" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PagePortfolioGeneralvaluationItem from '@/views/Portfolio/modules/AssetValuation/modules/Item/index.vue';

export default defineComponent({
  name: 'PagePortfolioAssetValuation',
  components: { PagePortfolioGeneralvaluationItem },
});
</script>

<style scoped lang="scss">
.valuation {
  &__title {
    margin-top: 30px;
    margin-bottom: 20px;
    font-weight: 500;
    font-size: 14px;
    line-height: 150%;
  }

  &__item {
    margin-bottom: 40px;
  }

  @include respond-to(900) {
    &__title {
      margin-top: 90px;
      margin-bottom: 55px;
      font-size: 36px;
    }
  }
}
</style>
