<template>
  <div class="portfolioTab">
    <div class="portfolioTab__container">
      <div class="portfolioTab__text">
        Вы можете оценить один из ваших сохраненных портфелей или добавить к оценке новый
      </div>
      <div class="portfolioTab__wrapSelect">
        <div class="portfolioTab__selectTitle">Ваш портфель:</div>
        <InputDropdown
          class="radarBonds__fieldSlot"
          :items="dropdownItems"
          placeholder="Растущий миллион"
          v-model:selected="portfolio.value"
        />
      </div>
      <div class="portfolioTab__text">
        Ограничить ввод комментария по ширине и количеству символов. Редактировать по тапу в область
      </div>
      <PagePortfolioActions />
    </div>
    <PageRadarChart chart-type="portfolio" />
    <PageRadarActivesList header-type="portfolio-default" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import PageRadarChart from '@/views/Radar/modules/Chart/index.vue';
import { dropdownItems } from '@/views/Portfolio/data/dropdown';
import InputDropdown from '@/components/Inputs/Dropdown/index.vue';
import PagePortfolioActions from '@/views/Portfolio/modules/Actions/index.vue';
import PageRadarActivesList from '@/views/Radar/modules/ActivesList/index.vue';

export default defineComponent({
  name: 'PagePortfolioTabBekTest',
  components: {
    PageRadarActivesList,
    PagePortfolioActions,
    InputDropdown,
    PageRadarChart,
  },
  setup() {
    const stateDropdown = reactive({
      portfolio: {
        isActive: true,
        value: null,
      },
    });

    return {
      dropdownItems,
      ...toRefs(stateDropdown),
    };
  },
});
</script>

<style scoped lang="scss">
.portfolioTab {
  &__container {
    @include wrap-pad();
  }

  &__wrapSelect {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
  }

  &__selectTitle {
    font-weight: 500;
    font-size: 14px;
    line-height: 150%;
  }

  &__text {
    margin-bottom: 30px;
    color: #afafaf;
    font-weight: 500;
    font-size: 10px;
    line-height: 150%;
  }

  @include respond-to($container-media--tablet) {
    &__text {
      font-size: 14px;
    }
  }

  @include respond-to(1200) {
    &__text {
      margin-bottom: 40px;
      font-size: 20px;
    }

    &__wrapSelect {
      margin-bottom: 40px;
    }

    &__selectTitle {
      margin-right: 50px;
      font-size: 26px;
    }
  }
}
</style>
