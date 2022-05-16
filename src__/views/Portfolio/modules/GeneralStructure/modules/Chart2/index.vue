<template>
  <div class="structureChart">
    <div class="structureChart__wrap">
      <div class="structureChart__text">
        Слишком высокая концентрация инвестиций в одной отрасли
      </div>
      <div class="structureChart__list">
        <div class="structureChart__item structureChart__item--error">Название облигации</div>
        <div class="structureChart__item structureChart__item--success">Название облигации</div>
        <div class="structureChart__item structureChart__item--warning">Название облигации</div>
      </div>
    </div>
    <div class="structureChart__chart"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PagePortfolioGeneralStructureChart2',
});
</script>

<style scoped lang="scss">
.structureChart {
  display: grid;
  grid-template-columns: 1fr;

  &__chart {
    $_size: 230px;

    width: $_size;
    height: $_size;
    margin: auto;
    margin-top: 40px;
    border: 40px solid #fec006;
    border-radius: 100%;
  }

  &__text {
    color: #747474;
    font-weight: 500;
    font-size: 14px;
    line-height: 150%;
  }

  &__list {
    margin-top: 40px;
  }

  &__item {
    $_icon-size: 15px;

    position: relative;
    margin-bottom: 15px;
    padding-left: $_icon-size + 8px;
    font-weight: 500;
    font-size: 12px;

    &::before {
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      width: $_icon-size;
      height: $_icon-size;
      border-radius: 100%;
      content: '';
    }

    &--error {
      color: #ed1d1d;

      &::before {
        background: #ed1d1d;
      }
    }

    &--warning {
      color: #fec006;

      &::before {
        background: #fec006;
      }
    }

    &--success {
      color: #2a8634;

      &::before {
        background: #2a8634;
      }
    }
  }

  @include respond-to(900) {
    grid-template-columns: 3fr 1fr;
    align-items: center;
    column-gap: 5%;

    &__text {
      margin-top: 0;
      font-size: 20px;
    }

    &__list {
      margin-top: 70px;
    }

    &__item {
      $_icon-size: 22px;

      margin-bottom: 20px;
      padding-left: $_icon-size + 20px;
      font-size: 20px;

      &::before {
        width: $_icon-size;
        height: $_icon-size;
      }
    }

    &__chart {
      margin-left: auto;
    }
  }

  @include respond-to($container-media--desktop) {
    &__chart {
      $_size: 300px;

      width: $_size;
      height: $_size;
      margin: 0;
      border: 70px solid #fec006;
    }
  }
}
</style>
