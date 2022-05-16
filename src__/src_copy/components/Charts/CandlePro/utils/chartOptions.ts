import { DynamicObject } from '@/interfaces';

export const getChartOptions = (
  values: any[],
  categories: any[],
  height: string,
): DynamicObject => ({
  chart: {
    backgroundColor: '',
    type: 'line',
    height: '600px',
  },
  rangeSelector: {
    enabled: false,
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
  navigator: {
    adaptToUpdatedData: true,
    outlineWidth: 0,
    handles: {
      backgroundColor: '#FFFFFF',
      borderColor: '#D1D1D1',
    },
    xAxis: {
      gridLineWidth: 0,
      labels: {
        enabled: false,
      },
    },
    yAxis: {
      plotBands: [
        {
          color: 'rgba(115, 113, 115, 0.2)',
          from: 0,
          to: 1,
        },
      ],
    },
  },
  xAxis: {
    lineColor: '#c2c2c2',
    type: 'linear',
    labels: {
      formatter() {
        // @ts-ignore
        return categories[this.value];
      },
    },
  },
  yAxis: {
    endOnTick: false,
    opposite: true,
    lineColor: '#c2c2c2',
    gridLineColor: '#c2c2c2',
    lineWidth: 1,
    title: {
      text: '',
    },
    labels: {
      align: 'left',
      x: 10,
      style: {
        fontSize: '18px',
        color: '#838383',
        fontFamily: 'Montserrat',
      },
      formatter() {
        // @ts-ignore
        return `${this.pos} ₽`;
      },
    },
  },
  series: [
    {
      type: 'candlestick',
      name: '',
      data: [...values],
      // data: ohlc,
      // dataGrouping: {
      //   units: groupingUnits,
      // },
    },
  ],
  plotOptions: {
    area: {
      fillColor: {
        linearGradient: {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 1,
        },
      },
      marker: {
        radius: 2,
      },
      lineWidth: 1,
      states: {
        hover: {
          lineWidth: 1,
        },
      },
      threshold: null,
    },
  },
});
