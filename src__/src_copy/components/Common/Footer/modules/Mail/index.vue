<template>
  <a :href="link" class="footerMail">
    <div class="footerMail__title">{{ title }}</div>
    <div class="footerMail__linkText">{{ linkText }}</div>
  </a>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PageFooterMail',
  props: {
    title: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    linkText: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped lang="scss">
.footerMail {
  display: block;
  color: #000;
  font-size: 10px;
  text-decoration: none;
  transition: all 0.1s ease;

  &__title {
    margin-bottom: 5px;
    font-weight: 600;
  }

  &__linkText {
    font-weight: 500;
  }

  &:hover {
    color: #fec006;
  }

  &:not(:last-child) {
    margin-right: 4%;
  }

  @include respond-to(800) {
    font-size: 14px;
  }
}
</style>
