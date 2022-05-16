<template>
  <ListActivesRadarPortfolio :header-type="headerType" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ListActivesRadarPortfolio from '@/components/Lists/RadarPortfolio/index.vue';

export default defineComponent({
  name: 'PageRadarActivesList',
  components: { ListActivesRadarPortfolio },
  props: {
    headerType: {
      type: String,
      default: 'radar',
    },
  },
});
</script>

<style scoped lang="scss"></style>
