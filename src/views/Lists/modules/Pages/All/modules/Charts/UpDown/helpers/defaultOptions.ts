export const defaultOptions = {
  chart: {
    type: 'column',
    backgroundColor: '',
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
  yAxis: [
    {
      gridLineColor: '#c2c2c2',
      title: {
        text: '',
      },
      labels: {
        style: {
          fontSize: '16px',
          color: '#838383',
          fontFamily: 'Montserrat',
        },
      },
    },
    {
      opposite: true,
      gridLineColor: '#c2c2c2',
      title: {
        text: '',
      },
      labels: {
        style: {
          fontSize: '16px',
          color: '#838383',
          fontFamily: 'Montserrat',
        },
      },
    },
  ],
};
