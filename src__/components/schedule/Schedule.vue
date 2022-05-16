<template>
  <div class="schedule greyBg">
    <div class="flexWrapperRow" v-if="getStockInfo">
      <OpenPriceGraph />
      <div class="graphParameters">
        <h1>Параметры и показатели</h1>
        <Progress />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import OpenPriceGraph from '@/components/openPriceGraph/OpenPriceGraph.vue';
import Progress from '@/components/schedule/elements/progress/Progress.vue';

export default defineComponent({
  name: 'Schedule',
  components: { Progress, OpenPriceGraph },
  computed: {
    ...mapGetters({
      getStockInfo: 'stockInfoStore/fullInfo',
    }),
  },
});
</script>

<style lang="scss" src="./style.scss" />
