<template>
  <div class="summary">
    <div class="summary__container">
      <div class="summary__title">Общее резюме по портфелю</div>
      <div class="summary__grid">
        <div class="summary__wrapText">
          <div class="summary__text">
            При анализе портфеля программа исходит из того, что портфель должен быть защищённым (то
            есть все риски в портфеле должны быть перекрыты и сбалансированны). При этом мы
            понимаем, что есть разные типы инвесторов, и есть те, для кого избыточные риски
            приемлемы. Тем не менее, мы считаем важным сообщить вам все подвожные камни портфеля
            которые мы заметили.
          </div>
          <div class="summary__text">
            Если вы хотите привести свой портфель к более защищённому и сбалансированному состоянию,
            тогда изучите все красные замечания и по каждому из них примите индивидуальное решение,
            соглашаться с ним или нет.
          </div>
          <div class="summary__text">
            Также в блоке 2 вы можете перейти в анализ каждого отдельного актива и более детально
            изучить показатели по каждому активу, прочитать описание и даже расширенную аналитику
            (по некоторым активам).
          </div>
        </div>
        <a class="summary__improve" href="#">
          <img alt="icon" class="summary__improveIcon" :src="iconQuestion" />
          <div class="summary__improveTitle">Как улучшить свой портфель?</div>
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import iconQuestion from '@/assets/icons/portfolio/question.svg';

export default defineComponent({
  name: 'PagePortfolioGeneralSummary',
  setup() {
    return {
      iconQuestion,
    };
  },
});
</script>

<style scoped lang="scss">
.summary {
  background: #fff;

  &__container {
    @include wrap-pad();

    padding-top: 40px;
    padding-bottom: 40px;
  }

  &__title {
    margin-bottom: 20px;
    font-weight: 500;
    font-size: 14px;
    line-height: 150%;
  }

  &__text {
    margin-bottom: 20px;
    color: #797979;
    font-weight: 500;
    font-size: 12px;
  }

  &__improve {
    display: block;
    max-height: 140px;
    padding: 20px;
    text-decoration: none;
    border: 1px solid #c4c4c4;
    border-radius: 10px;

    &:hover {
      background: #f6f6f6;
    }
  }

  &__improveTitle {
    margin-top: 10px;
    font-weight: 600;
    font-size: 14px;
  }

  &__improveIcon {
    width: 40px;
  }

  @include respond-to(900) {
    &__title {
      margin-bottom: 50px;
      font-size: 36px;
    }

    &__text {
      font-size: 20px;
    }

    &__improveTitle {
      font-size: 18px;
    }
  }

  @include respond-to(1200) {
    &__grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      column-gap: 4%;
    }
  }
}
</style>
