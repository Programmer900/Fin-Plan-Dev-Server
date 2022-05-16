<template>
  <div class="headerNav">
    <div class="headerNav__arrow headerNav__arrow--prev"></div>
    <div class="headerNav__pages">1 ... 10</div>
    <div class="headerNav__arrow headerNav__arrow--next"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ListHeaderRadarPortfolioNavigation',
});
</script>

<style scoped lang="scss">
.headerNav {
  display: flex;
  align-items: center;

  &__pages {
    margin: 0 10px;
    color: #747474;
    font-weight: 500;
    font-size: 14px;
    line-height: 150%;
  }

  &__arrow {
    $_size: 20px;

    position: relative;
    width: $_size;
    height: $_size;
    cursor: pointer;

    &::before {
      $_size: 14px;

      position: absolute;
      top: 0;
      left: 0;
      display: block;
      width: $_size;
      height: $_size;
      content: '';
    }

    &::after {
      $_width: 14px;
      $_height: 2px;

      position: absolute;
      top: 6px;
      left: 0;
      display: block;
      width: $_width;
      height: $_height;
      background: #2a8634;
      border-radius: 2px;
      content: '';
    }

    &--prev {
      &::before {
        border-bottom: 2px solid #2a8634;
        border-left: 2px solid #2a8634;
        transform: rotate(45deg);
      }
    }

    &--next {
      &::before {
        border-right: 2px solid #2a8634;
        border-bottom: 2px solid #2a8634;
        transform: rotate(-45deg);
      }
    }

    &:hover {
      &::before {
        border-color: #fec006;
      }

      &::after {
        background: #fec006;
      }
    }
  }

  @include respond-to(1200) {
    &__pages {
      margin: 0 20px;
      font-size: 14px;
    }
  }
}
</style>
