<template>
  <div class="resetAll">Сбросить все <span class="resetAll__icon"></span></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ListHeaderResetAll',
});
</script>

<style scoped lang="scss">
.resetAll {
  $blockname: &;
  $_size-icon: 14px;
  $_color: #747474;
  $_color--hover: #fec006;

  display: flex;
  align-items: center;
  color: $_color;
  font-weight: 500;
  font-size: 14px;
  line-height: 150%;
  cursor: pointer;

  &__icon {
    position: relative;
    display: inline-block;
    width: $_size-icon;
    height: $_size-icon;
    margin-left: 5px;
    border: 1px solid $_color;
    border-radius: 100%;

    @mixin _line() {
      position: absolute;
      top: 5px;
      left: 2px;
      display: block;
      width: 70%;
      height: 1px;
      background: $_color;
      content: '';
    }

    &::before {
      @include _line();

      transform: rotate(45deg);
    }

    &::after {
      @include _line();

      transform: rotate(-45deg);
    }
  }

  &:hover {
    color: $_color--hover;

    #{$blockname} {
      &__icon {
        border-color: $_color--hover;

        &::before {
          background: $_color--hover;
        }

        &::after {
          background: $_color--hover;
        }
      }
    }
  }
}
</style>
