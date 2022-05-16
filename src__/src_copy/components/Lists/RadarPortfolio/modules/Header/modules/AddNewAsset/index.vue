<template>
  <div class="add">
    <div class="add__icon"></div>
    <div class="add__text">Добавить актив</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ListHeaderAddNewAsset',
});
</script>

<style scoped lang="scss">
.add {
  $blockname: &;

  display: flex;
  align-items: center;
  cursor: pointer;
  transition: 0.1s all ease;

  &__text {
    color: #2a8634;
    font-weight: 600;
    font-size: 14px;
    line-height: 150%;
    white-space: nowrap;
    text-transform: uppercase;
  }

  &__icon {
    $_size: 24px;

    @mixin _line {
      position: absolute;
      top: 50%;
      left: 25%;
      display: block;
      width: 50%;
      height: 1px;
      background: #2a8634;
      content: '';
    }

    position: relative;
    width: $_size;
    height: $_size;
    margin-right: 10px;
    border: 1px solid #2a8634;
    border-radius: 100%;

    &::before {
      @include _line();
    }

    &::after {
      @include _line();

      transform: rotate(90deg);
    }
  }

  &:hover {
    #{$blockname} {
      &__text {
        color: #fec006;
      }

      &__icon {
        border-color: #fec006;

        &::before {
          background: #fec006;
        }

        &::after {
          background: #fec006;
        }
      }
    }
  }
}
</style>
