<template>
  <div class="utils flexRowCenter">
    <div class="switcher flexRowCenter">
      <Switcher />
      <p>{{ $t('tableTexts.switcherText') }}</p>
    </div>
    <div class="arrows flexRowCenter">
      <img :src="arrow" alt="< scroll to left" @click="onScrollTableTo('left')" />
      <img
        :src="arrow"
        alt="scroll to right >"
        class="arrow-right"
        @click="onScrollTableTo('right')"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Switcher from '@/components/switcher/Switcher.vue';
import { useEmitter } from '@/use/useEmitter';

export default defineComponent({
  name: 'TableUtils',
  components: {
    Switcher,
  },
  setup() {
    const emitter = useEmitter();

    const arrow = require('../../../../assets/icons/arrow-right.svg');

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
