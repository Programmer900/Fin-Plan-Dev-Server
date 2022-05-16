<template>
  <div class="headerDate">
    <div class="headerDate__title">{{ title }}</div>
    <div class="headerDate__date">01.02.2020</div>
    <div class="headerDate__separator"></div>
    <div class="headerDate__date">01.03.2021</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ListHeaderRadarPortfolioDate',
  props: {
    title: {
      type: String,
      default: 'Дата:',
    },
  },
});
</script>

<style scoped lang="scss">
.headerDate {
  display: flex;
  align-items: center;
  white-space: nowrap;

  &__title {
    margin-right: 10px;
    font-weight: 600;
    font-size: 12px;
    line-height: 150%;
  }

  &__date {
    color: #2a8634;
    font-weight: 500;
    font-size: 12px;
    line-height: 150%;
    cursor: pointer;
    transition: 0.1s all ease;

    &:hover {
      color: #fec006;
    }
  }

  &__separator {
    width: 10px;
    height: 1px;
    margin: 0 5px;
    background: #000;
  }

  @include respond-to(1200) {
    &__title {
      font-size: 20px;
    }

    &__date {
      font-size: 20px;
    }
  }
}
</style>
