<template>
  <div class="topTitle">
    <span class="topTitle__title">{{ title }}</span>
    <span class="topTitle__count" v-if="count">{{ count }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ListHeaderTopTitle',
  props: {
    title: {
      type: String,
      required: true,
    },
    count: {
      type: [String, Number],
      default: '',
    },
  },
});
</script>

<style scoped lang="scss">
.topTitle {
  padding-bottom: 15px;
  vertical-align: center;
  border-bottom: 1px solid #e8e8e8;

  &__title {
    font-weight: 600;
    font-size: 14px;
    line-height: 150%;
  }

  &__count {
    display: inline-block;
    padding-left: 10px;
    color: #acacac;
    font-weight: 500;
    font-size: 14px;
    line-height: 150%;
  }

  @include respond-to($container-media--tablet) {
    &__title {
      font-size: 20px;
    }

    &__count {
      padding-left: 60px;
      font-size: 20px;
    }
  }
}
</style>
