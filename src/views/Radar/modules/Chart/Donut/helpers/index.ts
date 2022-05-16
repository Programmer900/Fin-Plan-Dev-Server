import type { DynamicObject } from '@/interfaces';
import { useError } from '@/use/useError';

export const helpersDonut = () => {
  const { _catch } = useError();

  const options = ref<DynamicObject>({});
  const hc = ref<DynamicObject>({});
  const chart = ref<DynamicObject>({});

  const init = (_hc) => {
    hc.value = _hc;

    options.value = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        events: {
          load() {
            chart.value = this;
          },
        },
      },
      title: {
        text: '',
      },
      legend: {
        enabled: false,
      },
      credits: {
        enabled: false,
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
      },
      accessibility: {
        point: {
          valueSuffix: '%',
        },
      },
      plotOptions: {
        series: {
          turboThreshold: 0,
          trackByArea: false,
          dataGrouping: {
            enabled: false,
          },
          animation: false,
          states: {
            inactive: {
              opacity: 1,
            },
          },
        },
        pie: {
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          },
        },
      },
      series: [
        {
          name: 'Доля',
          colorByPoint: true,
          innerSize: '20%',
          data: [
            {
              name: 'Chrome',
              y: 61.41,
            },
            {
              name: 'Internet Explorer',
              y: 11.84,
            },
            {
              name: 'Firefox',
              y: 10.85,
            },
            {
              name: 'Edge',
              y: 4.67,
            },
            {
              name: 'Safari',
              y: 4.18,
            },
            {
              name: 'Sogou Explorer',
              y: 1.64,
            },
            {
              name: 'Opera',
              y: 1.6,
            },
            {
              name: 'QQ',
              y: 1.2,
            },
            {
              name: 'Other',
              y: 2.61,
            },
          ],
        },
      ],
    };
  };

  const updateSeries = () => {};

  return {
    init,
    updateSeries,
    getOptions: computed(() => options.value),
  };
};
