<template>
  <div class="structureChart">
    <div class="structureChart__chart"></div>
    <div class="structureChart__text">
      У Вас слишком рисковая структура портфеля. Добавьте надежных облигаций, чтобы повысить защиту
      своего портфеля. Как выбрать надежные облигации можете прочитать в статье
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PagePortfolioGeneralStructureChart',
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
    border: 40px solid #fec006;
    border-radius: 100%;
  }

  &__text {
    margin-top: 40px;
    color: #747474;
    font-weight: 500;
    font-size: 14px;
    line-height: 150%;
  }

  @include respond-to(900) {
    grid-template-columns: 1fr 3fr;
    align-items: center;
    column-gap: 5%;

    &__text {
      margin-top: 0;
      font-size: 20px;
    }
  }

  @include respond-to($container-media--desktop) {
    &__chart {
      $_size: 300px;

      width: $_size;
      height: $_size;
      border: 70px solid #fec006;
    }
  }
}
</style>
