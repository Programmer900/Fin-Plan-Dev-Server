<template>
  <vue-highcharts
    type="chart"
    :options="options"
    :redrawOnUpdate="true"
    :oneToOneUpdate="false"
    :animateOnUpdate="true"
  />
</template>

<script>
  import VueHighcharts from 'vue3-highcharts';
  export default {
    components: { VueHighcharts },
    props: ['options']
  }
</script>

<style scoped>

</style>
