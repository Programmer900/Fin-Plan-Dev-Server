import { DynamicObject } from '@/interfaces';
import { defaultOptions } from '@/views/Lists/modules/Pages/All/modules/Charts/Column/helpers/defaultOptions';

export const useChartTools = () => {
  const chartOptions = ref<DynamicObject>({});

  const init = (series: DynamicObject[], categories: string[]) => {
    chartOptions.value = {
      ...defaultOptions,
      series: [...series],
      xAxis: {
        categories: [...categories],
        // labels: {
        //   formatter() {
        //     return categories[this.value];
        //   },
        // },
      },
    };
  };

  const updateSeries = (series: DynamicObject[]) => {
    chartOptions.value.series = [];
    chartOptions.value.series = [...series];
  };

  const updateCategories = (categories: string[]) => {
    chartOptions.value.xAxis.categories = categories;
  };

  return {
    getChartOptions: computed(() => chartOptions.value),
    init,
    updateSeries,
    updateCategories,
  };
};
