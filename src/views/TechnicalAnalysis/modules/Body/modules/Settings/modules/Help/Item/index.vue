<template>
  <a class="helpItem" :href="link">
    <div class="helpItem__icon" v-if="icon">
      <img :src="icon" :alt="title" />
    </div>
    <div class="helpItem__title">{{ title }}</div>
  </a>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TechnicalAnalysisPageHelpItem',
  props: {
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: '',
    },
    link: {
      type: String,
      default: '#',
    },
  },
});
</script>

<style scoped lang="scss">
.helpItem {
  display: block;
  padding: 18px 25px 30px;
  text-decoration: none;
  background: #fff;
  border-radius: 15px;

  &__icon {
    margin-bottom: 50px;

    img {
      width: 64px;
      height: 64px;
      object-fit: cover;
    }
  }

  &__title {
    color: #000;
    font-weight: 700;
    font-size: 14px;
    font-family: $ff-montserrat;
  }

  &:not(:last-child) {
    margin-bottom: 12px;
  }
}
</style>
