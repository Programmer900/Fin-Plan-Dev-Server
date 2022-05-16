import { DynamicObject } from '@/interfaces';
import { defaultOptions } from '@/views/Lists/modules/Pages/All/modules/Charts/UpDown/helpers/defaultOptions';

export const useChartTools = () => {
  const chartOptions = ref<DynamicObject>({});

  const init = (series: DynamicObject[], categories: string[]) => {
    console.log('series:', series)
    console.log('categories:', categories)

    chartOptions.value = {
      ...defaultOptions,
      series: [...series],
      xAxis: {
        categories: [...categories],
      },
    };
  };

  const updateSeries = (series: DynamicObject[]) => {
    chartOptions.value.series = series;
  };

  const updateCategories = (categories: string[]) => {};

  return {
    getChartOptions: computed(() => chartOptions.value),
    init,
    updateSeries,
    updateCategories,
  };
};
