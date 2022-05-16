<template>
  <div :class="['typeItem', { 'typeItem--selected': isSelected }]">
    <div class="typeItem__text">
      {{ title }} <span v-if="count">({{ count }})</span>
    </div>
    <div class="typeItem__icon" v-if="showIcon"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ListHeaderActivesTypesItem',
  props: {
    title: {
      type: String,
      required: true,
    },
    isSelected: {
      type: Boolean,
      default: false,
    },
    showIcon: {
      type: Boolean,
      default: false,
    },
    count: {
      type: [Number, String],
      default: 0,
    },
  },
});
</script>

<style scoped lang="scss">
.typeItem {
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: 0.1s all ease;

  &__text {
    color: #747474;
    font-weight: 500;
    font-size: 14px;
    line-height: 150%;
    white-space: nowrap;
  }

  &__icon {
    $_size: 6px;

    position: relative;
    bottom: 2px;
    width: $_size;
    height: $_size;
    margin-left: 10px;
    border-bottom: 1px solid #747474;
    border-left: 1px solid #747474;
    transform: rotate(-45deg);
  }

  &:hover > &__text {
    color: #fec006;
  }

  &:hover > &__icon {
    border-color: #fec006;
  }

  &--selected > &__text {
    color: #2a8634;
  }
}
</style>
