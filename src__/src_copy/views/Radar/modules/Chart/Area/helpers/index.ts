import { DynamicObject } from '@/interfaces';

export const radarChartArea = () => {
  const options = ref<DynamicObject>({});
  const hc = ref<DynamicObject>({});
  const chart = ref<DynamicObject>({});

  const init = (_hc) => {
    hc.value = _hc;

    options.value = {
      chart: {
        type: 'area',
        events: {
          load() {
            chart.value = this;
          },
        },
      },

      yAxis: [
        {
          title: {
            text: '',
          },
        },
      ],

      xAxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
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
        area: {
          marker: {
            enabled: false,
            symbol: 'circle',
            radius: 2,
            states: {
              hover: {
                enabled: true,
              },
            },
          },
        },
        line: {
          dashStyle: 'longdash',
          marker: {
            enabled: false,
            symbol: 'circle',
            radius: 2,
            states: {
              hover: {
                enabled: true,
              },
            },
          },
        },
      },

      series: [
        {
          data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
        },
        {
          type: 'line',
          data: [32, 50, 120.4, 99.2, 100.0, 42.0, 235.6, 248.5, 116.4, 94.1, 195.6, 154.4],
        },
      ],
    };
  };

  return {
    init,
    getOptions: computed(() => options.value),
  };
};
