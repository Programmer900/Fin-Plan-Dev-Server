export const defaultOptions = {
  chart: {
    type: 'column',
    backgroundColor: '',
    zoomType: 'x',
  },
  title: {
    text: '',
  },
  legend: {
    enabled: false,
    verticalAlign: 'top',
    itemStyle: {
      fontSize: '16px',
      fontFamily: 'Montserrat',
    },
  },
  credits: {
    enabled: false,
  },
  // navigator: {
  //   adaptToUpdatedData: true,
  //   outlineWidth: 0,
  //   handles: {
  //     backgroundColor: '#FFFFFF',
  //     borderColor: '#D1D1D1',
  //   },
  //   xAxis: {
  //     gridLineWidth: 0,
  //     labels: {
  //       enabled: false,
  //     },
  //   },
  //   yAxis: {
  //     plotBands: [
  //       {
  //         color: 'rgba(115, 113, 115, 0.2)',
  //         from: 0,
  //         to: 1,
  //       },
  //     ],
  //   },
  // },
  rangeSelector: {
    enabled: false,
  },
  yAxis: [
    {
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
      },
    },
  ],
};
