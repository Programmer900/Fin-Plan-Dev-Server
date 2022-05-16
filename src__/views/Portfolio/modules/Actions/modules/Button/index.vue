<template>
  <button class="actionBtn" :style="{ '--bg-color-portfolio-action-btn': color }">
    <img v-if="icon" :src="icon" alt="icon" class="actionBtn__icon" />
    <span class="actionBtn__title">{{ title }}</span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PagePortfolioActionBtn',
  props: {
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: '#2A8634',
    },
  },
});
</script>

<style scoped lang="scss">
.actionBtn {
  $bg-color: var(--bg-color-portfolio-action-btn);

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  color: #fff;
  font-weight: 500;
  font-size: 10px;
  line-height: 150%;
  text-transform: uppercase;
  background: $bg-color;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.1s all ease;

  img {
    position: relative;
    bottom: 1px;
    display: block;
    margin-right: 5px;
    object-fit: cover;
  }

  &:hover {
    background: #fec006;
  }

  @include respond-to(450) {
    font-size: 12px;

    img {
      $_size: 20px;

      width: $_size;
      height: $_size;
    }
  }

  @include respond-to(1200) {
    padding: 15px 30px;
  }

  @include respond-to(1300) {
    padding: 23px 40px;
    font-size: 14px;

    img {
      $_size: 25px;

      width: $_size;
      height: $_size;
      margin-right: 20px;
    }
  }
}
</style>
