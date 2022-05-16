<template>
  <div class="changeView">
    <div
      @click="$emit('update:currentView', 'min')"
      :class="[
        'changeView__item',
        'changeView__item--mini',
        { 'changeView__item--active': currentView === 'min' },
      ]"
    >
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div
      @click="$emit('update:currentView', 'max')"
      :class="[
        'changeView__item',
        'changeView__item--max',
        { 'changeView__item--active': currentView === 'max' },
      ]"
    >
      <span></span>
      <span></span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ListHeaderChangeView',
  props: {
    currentView: String,
  },
});
</script>

<style scoped lang="scss">
.changeView {
  $_bg-common: #747474;
  $_bg-common--hover: #fec006;
  $_bg-active: #2a8634;
  $_width: 20px;

  display: flex;
  align-items: center;

  &__item {
    display: flex;
    flex-direction: column;
    cursor: pointer;

    span {
      display: inline-block;
      width: $_width;
      background: $_bg-common;
    }

    &:hover {
      span {
        background: $_bg-common--hover;
      }
    }

    &--mini {
      span {
        height: 5px;

        &:not(:last-child) {
          margin-bottom: 3px;
        }
      }
    }

    &--max {
      margin-left: 8px;

      span {
        height: 8px;

        &:not(:last-child) {
          margin-bottom: 5px;
        }
      }
    }

    &--active {
      cursor: auto;

      span {
        background: $_bg-active;
      }

      &:hover {
        span {
          background: $_bg-active;
        }
      }
    }
  }
}
</style>
