<template>
  <div class="coefficients">
    <div class="coefficients__title">Информация по коэффициентам</div>
    <div class="coefficients__grid">
      <div class="coefficients__containerItems">
        <PagePortfolioCoefficientsItem
          class="coefficients__item"
          title="Потенциал портфеля:"
          :value="14.52"
          value-type="common"
          value-symbol="%"
        />
        <PagePortfolioCoefficientsItem
          class="coefficients__item"
          title="Потенциальный риск по акциям:"
          :value="-45.52"
          value-type="common"
          value-symbol="%"
        />
        <PagePortfolioCoefficientsItem
          class="coefficients__item"
          title="Общий риск портфеля:"
          :value="-14.52"
          value-type="common"
          value-symbol="%"
        />
        <PagePortfolioCoefficientsItem
          class="coefficients__item"
          title="Доля акции РФ:"
          :value="20.52"
          value-type="common"
          value-symbol="%"
        />
        <PagePortfolioCoefficientsItem
          class="coefficients__item"
          title="Доля акции США:"
          :value="14.52"
          value-type="common"
          value-symbol="%"
        />
        <PagePortfolioCoefficientsItem
          class="coefficients__item"
          title="Доля облигаций:"
          :value="44.52"
          value-type="common"
          value-symbol="%"
        />
        <PagePortfolioCoefficientsItem
          class="coefficients__item"
          title="Доля ETF:"
          :value="0.0"
          value-type="common"
          value-symbol="%"
        />
        <PagePortfolioCoefficientsItem
          class="coefficients__item"
          title="Средняя P/E портфеля акций:"
          :value="10.9"
          value-type="common"
          value-symbol="%"
        />
        <PagePortfolioCoefficientsItem
          class="coefficients__item"
          title="Кеш:"
          :value="0.0"
          value-type="common"
          value-symbol="%"
        />
      </div>
      <div class="coefficients__containerItems">
        <PagePortfolioCoefficientsItem
          class="coefficients__item"
          title="Средняя Бета акций РФ:"
          :value="0.97"
          value-type="common"
          value-symbol="%"
        />
        <PagePortfolioCoefficientsItem
          class="coefficients__item"
          title="Средняя Бета акций США:"
          :value="1.97"
          value-type="common"
          value-symbol="%"
        />
        <PagePortfolioCoefficientsItem
          class="coefficients__item"
          title="Шарп (РФ):"
          :value-compression="valueCompression"
          value-type="compression"
        />
        <PagePortfolioCoefficientsItem
          class="coefficients__item"
          title="Шарп (США):"
          :value-compression="valueCompression"
          value-type="compression"
        />
        <PagePortfolioCoefficientsItem
          class="coefficients__item"
          title="Трейнор (РФ):"
          :value-compression="valueCompression"
          value-type="compression"
        />
        <PagePortfolioCoefficientsItem
          class="coefficients__item"
          title="Трейнор (США):"
          :value-compression="valueCompression"
          value-type="compression"
        />
        <PagePortfolioCoefficientsItem
          class="coefficients__item"
          title="Сортино (РФ):"
          :value-compression="valueCompression"
          value-type="compression"
        />
        <PagePortfolioCoefficientsItem
          class="coefficients__item"
          title="Сортино (США):"
          :value-compression="valueCompression"
          value-type="compression"
        />
      </div>
    </div>
    <div class="coefficients__recalculate">Пересчитать коэффициенты</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import PagePortfolioCoefficientsItem from '@/views/Portfolio/modules/Coefficients/modules/Item/index.vue';

export default defineComponent({
  name: 'PagePortfolioCoefficients',
  components: { PagePortfolioCoefficientsItem },
  setup() {
    const valueCompression = ref([0.0698, 0.0423, 0]);

    return {
      valueCompression,
    };
  },
});
</script>

<style scoped lang="scss">
.coefficients {
  margin-top: 55px;
  padding: 20px 20px 0;
  background: #fff;

  &__title {
    margin-bottom: 20px;
    font-weight: 500;
    font-size: 14px;
    line-height: 150%;
  }

  &__item {
    margin-bottom: 10px;
  }

  &__recalculate {
    margin-top: 20px;
    padding: 30px 0;
    color: #2a8634;
    font-weight: 600;
    font-size: 14px;
    line-height: 150%;
    text-align: center;
    text-transform: uppercase;
    border-top: 1px solid #e7e7e7;
    cursor: pointer;
    transition: 0.1s all ease;

    &:hover {
      color: #fec006;
    }
  }

  @include respond-to($container-media--tablet) {
    &__title {
      font-size: 20px;
    }
  }

  @include respond-to(900) {
    padding: 40px 40px 0;

    &__title {
      font-size: 28px;
    }

    &__recalculate {
      margin-top: 40px;
      padding-top: 40px;
      padding-bottom: 40px;
    }
  }

  @include respond-to(1100) {
    &__grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      column-gap: 4%;
    }

    &__title {
      margin-bottom: 40px;
    }
  }
}
</style>
