<template>
  <div class="utils flexRowCenter">
    <div class="switcher flexRowCenter">
      <Switcher />
      <p>{{ $t('tableTexts.switcherText') }}</p>
    </div>
    <div class="arrows flexRowCenter">
      <img alt="< scroll to left" :src="arrow" @click="onScrollTableTo('left')" />
      <img
        alt="scroll to right >"
        class="arrow-right"
        :src="arrow"
        @click="onScrollTableTo('right')"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Switcher from '@/components/switcher/Switcher.vue';
import arrow from '@/assets/icons/arrow-right.svg';

export default defineComponent({
  name: 'ChartDynamicProTableUtils',
  components: {
    Switcher,
  },
  emits: ['onScrollTable'],
  setup(props, { emit }) {
    const onScrollTableTo = (to: string): void => {
      emit('onScrollTable', to);
    };

    return {
      arrow,
      onScrollTableTo,
    };
  },
});
</script>

<style scoped lang="scss"></style>
