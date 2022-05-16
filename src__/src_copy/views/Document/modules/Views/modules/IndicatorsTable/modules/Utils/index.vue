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
import { defineComponent } from 'vue';
import { useEmitter } from '@/use/useEmitter';
import Switcher from '@/components/switcher/Switcher.vue';
import arrow from '@/assets/icons/arrow-right.svg';

export default defineComponent({
  name: 'DocumentIndicatorsTableUtils',
  components: {
    Switcher,
  },
  setup() {
    const emitter = useEmitter();

    const onScrollTableTo = (to: string): void => {
      switch (to) {
        case 'left': {
          emitter.emit('scrollIndicatorsTableToLeft');
          break;
        }
        case 'right': {
          emitter.emit('scrollIndicatorsTableToRight');
          break;
        }
        default: {
          break;
        }
      }
    };

    return {
      arrow,
      onScrollTableTo,
    };
  },
});
</script>

<style scoped lang="scss"></style>
