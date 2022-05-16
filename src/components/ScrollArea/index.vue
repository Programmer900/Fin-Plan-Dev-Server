<template>
  <template v-if="masonryX">
    <div
      ref="root"
      class="scrollArea scrollArea--masonryX"
      @mousedown="startDragging($event)"
      @mouseleave="stopDragging($event)"
      @mousemove="onScroll($event)"
      @mouseup="stopDragging($event)"
    >
      <div class="scrollArea__wrap" :class="[{ 'scrollArea__disable-click': isScroll }]">
        <slot />
      </div>
    </div>
  </template>
  <template v-else>
    <div
      ref="root"
      class="scrollArea"
      @mousedown="startDragging($event)"
      @mouseleave="stopDragging($event)"
      @mousemove="onScroll($event)"
      @mouseup="stopDragging($event)"
    >
      <div class="scrollArea__wrap" :class="[{ 'scrollArea__disable-click': isScroll }]">
        <slot />
      </div>
    </div>
  </template>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'ScrollArea',
  props: {
    masonryX: {
      type: Boolean,
      default: false,
    },
    disableDesktop: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const isMouseDown = ref<boolean>(false);
    const isScroll = ref<boolean>(false);

    const startX = ref<number>(0);
    const scrollLeft = ref<number>(0);
    const root = ref<any>(null);

    const isMobile = () =>
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    const startDragging = (event) => {
      if (props.disableDesktop && !isMobile()) return;
      isMouseDown.value = true;
      startX.value = event.pageX - root.value.offsetLeft;
      scrollLeft.value = root.value.scrollLeft;
    };

    const stopDragging = (event) => {
      isMouseDown.value = false;
      isScroll.value = false;
    };

    const onScroll = (event) => {
      event.preventDefault();
      if (isMouseDown.value) {
        isScroll.value = true;

        const x = event.pageX - root.value.offsetLeft;
        const scroll = x - startX.value;

        root.value.scrollLeft = scrollLeft.value - scroll;
      }
    };

    return {
      root,
      isMouseDown,
      isScroll,
      startDragging,
      stopDragging,
      onScroll,
    };
  },
});
</script>

<style scoped lang="scss">
.scrollArea {
  $block: &;

  width: 100%;
  height: 100%;
  //overflow-x: scroll;
  overflow-y: hidden;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  &__wrap {
    position: relative;
    //display: flex;
    //justify-content: center;
    height: 100%;
  }

  &__disable-click {
    pointer-events: none;
  }

  &--masonryX {
    #{$block} {
      &__wrap {
        display: grid;
        grid-auto-columns: 170px;
        grid-auto-flow: column dense;
        grid-gap: 5px;
        grid-template-rows: 15% 5% 15% 16% 18% 8% 18%;

        &::v-deep > * {
          &:first-child {
            grid-row: span 3;
          }

          &:nth-child(7n) {
            grid-row: span 2;
          }

          &:nth-child(2n) {
            grid-row: span 3;
          }

          &:nth-child(3n) {
            grid-row: span 2;
          }

          &:nth-child(4n + 3) {
            grid-row: span 2;
          }

          &:nth-child(7n + 5) {
            grid-row: span 3;
          }
        }
      }
    }
  }
}
</style>
