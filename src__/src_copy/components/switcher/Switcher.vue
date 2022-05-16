<template>
  <div class="switcher">
    <span
      class="toggle-wrapper"
      role="checkbox"
      :aria-checked="checked.toString()"
      tabindex="0"
      @click="toggle"
      @keydown.space.prevent="toggle"
    >
      <span class="toggle-background" :class="backgroundStyles" />
      <span class="toggle-indicator" :style="indicatorStyles" />
    </span>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Switcher',

  data() {
    return { checked: false };
  },

  computed: {
    backgroundStyles() {
      return {
        'gold-mid': this.checked,
        'gray-lighter': !this.checked,
      };
    },
    indicatorStyles() {
      return { transform: this.checked ? 'translateX(20px)' : 'translateX(0)' };
    },
  },

  methods: {
    toggle() {
      this.checked = !this.checked;
    },
  },
});
</script>

<style scoped lang="scss" src="./style.scss" />
