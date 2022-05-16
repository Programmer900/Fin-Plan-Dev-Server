<template>
  <div class="indicatorsPage">
    <div class="greyBg">
      <div class="flexWrapperColumn">
        <div class="checkboxes flexRowCenter">
          <GraphCheckboxes />
        </div>
        <IndicatorsGraph />
      </div>
    </div>
    <Table :isReporting="false" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import Table from '../../../components/table/Table.vue';
import IndicatorsGraph from '../../../components/indicatorsGraph/IndicatorsGraph.vue';
import GraphCheckboxes from '@/views/stock/indicators/elements/GraphCheckboxes.vue';

export default defineComponent({
  name: 'Indicators',
  components: { GraphCheckboxes, IndicatorsGraph, Table },

  created() {
    this.stock = this.$store.getters.stock;
  },
});
</script>

<style lang="scss" src="./style.scss" />
