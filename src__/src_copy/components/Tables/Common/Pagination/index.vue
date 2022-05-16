<template lang="pug">
.table-pagination(v-if='isShow')
  template(v-if='!useDevice().isMobile()')
    img.table-pagination__arrow(
      alt='< scroll to left',
      :src='arrow',
      @click='onScrollTableTo("left")'
    )
    img.table-pagination__arrow.table-pagination__arrow--right(
      alt='scroll to right >',
      :src='arrow',
      @click='onScrollTableTo("right")'
    )
</template>

<script lang="ts">
import arrow from '@/assets/icons/arrow-right.svg';
import { useDevice } from '@/use/useDevice';

export default defineComponent({
  name: 'TableCommonPagination',
  emits: ['onScrollTable'],
  setup(props, { emit }) {
    const isShow = ref(false);

    const onScrollTableTo = (to: string): void => {
      emit('onScrollTable', to);
    };

    onMounted(() => {
      isShow.value = true;
    });

    return {
      arrow,
      onScrollTableTo,
      isShow,
      useDevice,
    };
  },
});
</script>

<style scoped lang="scss">
.table-pagination {
  display: inline-block;

  &__arrow {
    $_size: 35px;

    width: $_size;
    height: $_size;
    padding: 8px;
    object-fit: cover;
    cursor: pointer;

    &--right {
      margin-left: 20px;
      transform: rotate(180deg);
    }
  }
}
</style>
