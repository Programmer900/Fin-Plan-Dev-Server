<template>
  <div class="logoFinplan">
    <div class="logoFinplan__wrapImg">
      <div class="logoFinplan__iconArrow">
        <img alt="icon" :src="iconArrow" />
      </div>
      <div class="logoFinplan__iconCircle">
        <img alt="icon" :src="iconCircle" />
      </div>
    </div>
    <div class="logoFinplan__wrapText">
      <div class="logoFinplan__title">
        <img alt="Fin-Plan" :src="textTitle" />
      </div>
      <div class="logoFinplan__subtitle">
        <img alt="Learning" :src="textSubtitle" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import iconCircle from '@/assets/icons/logo/finplan-logo-circle.svg';
import iconArrow from '@/assets/icons/logo/finplan-logo-arrow.svg';
import textTitle from '@/assets/icons/logo/finplan-logo-title.svg';
import textSubtitle from '@/assets/icons/logo/finplan-logo-subtitle.svg';

export default defineComponent({
  name: 'LogoFinPlan',
  setup() {
    return {
      iconCircle,
      iconArrow,
      textTitle,
      textSubtitle,
    };
  },
});
</script>

<style scoped lang="scss">
.logoFinplan {
  display: flex;
  cursor: pointer;

  &__wrapImg {
    position: relative;
  }

  &__iconArrow {
    position: absolute;
    top: 3px;
    left: 0;
    transition: all 0.1s ease;
  }

  &__iconCircle {
    margin-left: 6px;
  }

  &__wrapText {
    padding-top: 8px;
    padding-left: 8px;
  }

  &__subtitle {
    position: relative;
    bottom: 4px;
  }

  &:hover &__iconArrow {
    left: 5px;
  }
}
</style>
