<template>
  <a class="socialItem" :href="link">
    <div class="socialItem__icon">
      <img :src="icon" :alt="alt" />
    </div>
    <div class="socialItem__icon--active">
      <img :src="iconActive" :alt="alt" />
    </div>
  </a>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PageFooterSocialItem',
  props: {
    icon: {
      type: String,
      required: true,
    },
    iconActive: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped lang="scss">
.socialItem {
  display: block;

  &__icon {
    &--active {
      display: none;
    }
  }

  &:hover &__icon {
    display: none;

    &--active {
      display: unset;
    }
  }
}
</style>
