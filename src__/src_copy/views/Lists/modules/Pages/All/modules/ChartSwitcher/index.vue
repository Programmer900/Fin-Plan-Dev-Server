<template>
  <div class="chartSwitcher">
    <ScrollArea>
      <div
        v-for="chart in chartLinks"
        :key="chart.id"
        class="chartSwitcher__item"
        :class="{ chartSwitcher__selected: chart.selected }"
        @click="onChangeChart(chart)"
      >
        {{ chart.title }}
      </div>
    </ScrollArea>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { DynamicObject } from '@/interfaces';
import ScrollArea from '@/components/ScrollArea/index.vue';

export default defineComponent({
  name: 'ListsWrapChartSwitcher',
  components: { ScrollArea },
  emits: ['onChangeChart'],
  setup(props, { emit }) {
    const chartLinks = ref<DynamicObject[]>([
      {
        id: 1,
        title: 'Прир-ст капит., %',
        selected: true,
      },
      {
        id: 2,
        title: 'Средний P/E по отраслям',
        selected: false,
      },
    ]);

    const onChangeChart = (selectedChart: DynamicObject): void => {
      chartLinks.value.forEach((item) => {
        if (item.selected === true) {
          item.selected = false;
        }
        if (item.id === selectedChart.id) {
          item.selected = true;
        }
      });
      emit('onChangeChart', selectedChart.id);
    };

    return {
      onChangeChart,
      chartLinks,
    };
  },
});
</script>

<style scoped lang="scss">
.chartSwitcher {
  &__item {
    display: inline-block;
    padding-bottom: 15px;
    margin-right: 20px;
    cursor: pointer;
  }

  //ul {
  //  display: flex;
  //  align-items: center;
  //  margin: 0 0 30px 0;
  //  padding: 0;
  //  overflow-x: auto;
  //  list-style: none;
  //
  //  li {
  //    padding: 20px 20px;
  //    cursor: pointer;
  //  }
  //}

  &__selected {
    position: relative;

    &::before {
      position: absolute;
      bottom: 0;
      left: 0;
      display: block;
      width: 100%;
      height: 4px;
      background: #2a8634;
      content: '';
    }
  }
}
</style>
