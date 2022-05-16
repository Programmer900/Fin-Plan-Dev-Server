<template>
  <div class="selectAll">
    <span class="selectAll__icon">
      <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect y="3" width="6" height="2" fill="#FEC006" />
        <path d="M8 4L4.25 7.4641L4.25 0.535898L8 4Z" fill="#FEC006" />
      </svg>
    </span>
    <span class="selectAll__text">Выбрать все</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ListHeaderSelectAll',
});
</script>

<style scoped lang="scss">
.selectAll {
  $blockname: &;

  display: flex;
  align-items: center;
  cursor: pointer;

  &__text {
    display: inline-block;
    color: #747474;
    font-weight: 500;
    font-size: 14px;
    line-height: 150%;
    transition: padding-left 0.1s ease;
  }

  &__icon {
    position: relative;
    bottom: 2px;
    left: 4px;
    display: none;

    &::before {
      $_size: 15px;

      position: absolute;
      bottom: 0;
      left: -4px;
      display: block;
      width: $_size;
      height: $_size;
      border: 1px solid #fec006;
      border-radius: 100%;
      content: '';
    }
  }

  &:hover {
    #{$blockname} {
      &__text {
        padding-left: 15px;
        color: #fec006;
      }

      &__icon {
        display: inline-block;
      }
    }
  }
}
</style>
