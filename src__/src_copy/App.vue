<template>
  <div>
    <component :is="$route.meta.layout || MainLayout">
      <router-view />
    </component>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MainLayout from '@/layouts/MainLayout.vue';

export default defineComponent({
  name: 'App',
  setup() {
    return {
      MainLayout,
    };
  },
});
</script>

<style scoped lang="scss"></style>
