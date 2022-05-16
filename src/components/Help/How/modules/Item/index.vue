<template>
  <a class="howItem" :href="link" :style="{ '--v-color': color }">
    <div class="howItem__icon">
      <img :src="icon" :alt="title" />
    </div>
    <h3 class="howItem__title">{{ title }}</h3>
  </a>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HelpHowItem',
  props: {
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped lang="scss">
.howItem {
  $blockname: &;

  display: block;
  padding: 20px;
  color: #000;
  text-decoration: none;
  border: 1px solid var(--v-color);
  border-radius: 10px;
  transition: all 0.1s ease;

  &__title {
    margin-top: 10px;
    margin-bottom: 0;
    font-weight: 600;
    font-size: 14px;
  }

  &__icon {
    $_size: 40px;

    width: $_size;
    height: $_size;
    background: transparent;
    border-radius: 100%;
    transition: all 0.1s ease;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &:not(:last-child) {
    margin-bottom: 20px;
  }

  &:hover {
    color: #fff;
    background: var(--v-color);

    #{$blockname} {
      &__icon {
        background: #fff;
      }
    }
  }

  @include respond-to($container-media--desktop) {
    &__title {
      font-size: 20px;
    }

    &__icon {
      $_size: 70px;

      width: $_size;
      height: $_size;
    }
  }
}
</style>
