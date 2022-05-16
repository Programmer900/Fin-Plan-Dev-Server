<template>
  <ListsWrapHeader />
  <ListsWrapBody>
    <ListWrapAllBody />
  </ListsWrapBody>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ListsWrapHeader from '@/views/Lists/modules/Header/index.vue';
import ListsWrapBody from '@/views/Lists/modules/Body/index.vue';
import ListWrapAllBody from '@/views/Lists/modules/Pages/All/modules/Body/index.vue';

export default defineComponent({
  name: 'ListsWrapAll',
  components: {
    ListWrapAllBody,
    ListsWrapBody,
    ListsWrapHeader,
  },
});
</script>

<style scoped lang="scss"></style>
