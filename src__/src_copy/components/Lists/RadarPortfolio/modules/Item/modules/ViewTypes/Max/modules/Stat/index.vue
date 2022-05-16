<template>
  <div class="stat">
    <div class="stat__title">{{ title }}</div>
    <div class="stat__fields">
      <div class="stat__field" v-for="(item, index) in items" :key="index">
        <div class="stat__value">{{ item.value }}</div>
        <div class="stat__subtitle">{{ item.title }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ListItemStatRadarPortfolio',
  props: {
    title: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
  },
});
</script>

<style scoped lang="scss">
.stat {
  border-bottom: 1px solid #f9f9f9;

  &__title {
    padding-top: 16px;
    padding-bottom: 14px;
    color: #797979;
    font-size: 12px;
  }

  &__fields {
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    padding-bottom: 22px;
  }

  &__value {
    padding-bottom: 3px;
    font-size: 14px;
  }

  &__subtitle {
    color: #797979;
    font-size: 10px;
  }

  @include respond-to(1000) {
    border-bottom: none;

    //&__field {
    //  display: flex;
    //  align-items: center;
    //}
  }
}
</style>
