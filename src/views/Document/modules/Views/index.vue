<template>
  <DocumentPageSwitcher />
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DocumentPageSwitcher from '@/views/Document/modules/Views/modules/Switcher/index.vue';

export default defineComponent({
  name: 'DocumentViews',
  components: { DocumentPageSwitcher },
});
</script>

<style scoped lang="scss"></style>
