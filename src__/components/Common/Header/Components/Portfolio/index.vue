<template>
  <div class="headerPortfolio">
    <div class="headerPortfolio__grid">
      <div class="headerPortfolio__how">
        <HelpHow>
          <HelpHowItem
            color="#F3C243"
            :icon="iconService"
            link="#"
            title="Как пользоваться сервисом?"
          />
          <HelpHowItem
            color="#2A8634"
            :icon="iconSelectActives"
            link="#"
            title="Как выбрать активы для своего портфеля?"
          />
        </HelpHow>
      </div>
      <div class="headerPortfolio__slider">
        <HelpSlider :items="sliderItems" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import HelpHow from '@/components/Help/How/index.vue';
import HelpHowItem from '@/components/Help/How/modules/Item/index.vue';
import HelpSlider from '@/components/Help/Slider/index.vue';
import { sliderItems } from '@/components/Common/Header/Components/Portfolio/data/sliderItems';
import iconService from '@/assets/icons/use-service.svg';
import iconSelectActives from '@/assets/icons/select-actives-portfel.svg';

export default defineComponent({
  name: 'HeaderPortfolio',
  components: { HelpSlider, HelpHowItem, HelpHow },
  setup() {
    return {
      iconService,
      iconSelectActives,
      sliderItems,
    };
  },
});
</script>

<style scoped lang="scss">
.headerPortfolio {
  background: #fff;

  &__how {
    @include wrap-pad();

    padding-top: 30px;
  }

  @include respond-to(900) {
    &__how {
      padding-right: 0;
      padding-left: 0;
    }

    &__grid {
      @include wrap-pad--left();

      position: relative;
      display: grid;
      grid-template-columns: 20% 78%;
      column-gap: 2%;
    }
  }
}
</style>
