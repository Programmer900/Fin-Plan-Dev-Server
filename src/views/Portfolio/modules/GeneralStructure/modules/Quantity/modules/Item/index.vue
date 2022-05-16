<template>
  <div class="quantityItem">
    <div class="quantityItem__count">{{ quantity }} шт</div>
    <div class="quantityItem__title">{{ title }}</div>
    <div class="quantityItem__level">{{ level }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PagePortfolioGeneralStructureQuantityItem',
  props: {
    quantity: {
      type: [Number, String],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped lang="scss">
.quantityItem {
  &__count {
    margin-bottom: 5px;
    font-weight: 600;
    font-size: 20px;
    line-height: 150%;
  }

  &__title {
    margin-bottom: 15px;
    color: #797979;
    font-weight: 500;
    font-size: 12px;
    line-height: 150%;
  }

  &__level {
    font-weight: 500;
    font-size: 12px;
  }

  @include respond-to(1200) {
    &__count {
      font-size: 28px;
    }

    &__title {
      font-size: 14px;
    }

    &__level {
      font-size: 14px;
    }
  }
}
</style>
