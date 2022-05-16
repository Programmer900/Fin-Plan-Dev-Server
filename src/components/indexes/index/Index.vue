<template>
  <div class="index flexRowCenter">
    <span :class="{ colorRed: type === 'down', colorGreen: type === 'up' }">
      <img v-if="type === 'up'" alt="arrow" :src="arrow" />
      <img v-if="type === 'down'" alt="arrow" :src="arrowdown" />
      {{ index }}
    </span>
    <p class="text">{{ text }}</p>
  </div>
</template>

<script>
import arrow from '@/assets/icons/arrowup.svg';
import arrowdown from '@/assets/icons/arrowdown.svg';

export default defineComponent({
  name: 'Index',
  props: {
    index: {
      type: [String, Number],
      required: true,
    },
    text: {
      type: [String, Number],
      required: true,
    },
    type: {
      type: [String, Number],
      required: true,
    },
  },

  data() {
    return {
      arrow,
      arrowdown,
    };
  },
});
</script>

<style scoped lang="scss" src="./style.scss" />
