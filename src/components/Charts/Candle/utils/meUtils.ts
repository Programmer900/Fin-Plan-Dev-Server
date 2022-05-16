import { DynamicObject } from '@/interfaces';

class MeUtils {
  private seriesData: number[] = [];

  private candleChartData: number[][] = [];

  private categoriesData: number[] = [];

  private initData(data: DynamicObject): void {
    this.seriesData = [];
    this.candleChartData = [];
    this.categoriesData = [];

    const dataArr = Object.values(data);

    dataArr.forEach((item: DynamicObject) => {
      this.seriesData.push(Number(item.UF_CLOSE));
      this.categoriesData.push(Number(new Date(item.UF_DATE_TO).getFullYear()));

      this.candleChartData.push([
        Number(new Date(item.UF_DATE_TO).getTime()),
        Number(item.UF_OPEN),
        Number(item.UF_HIGH),
        Number(item.UF_LOW),
        Number(item.UF_CLOSE),
      ]);
    });
  }

  private getDefaultChart(): DynamicObject {
    const categories = [...this.categoriesData];
    return {
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
          name: 'Цена',
          data: this.seriesData,
          dataGrouping: {
            units: [],
          },
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
    };
  }

  private getCandleChart(): DynamicObject {
    return {
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
        // labels: {
        //   formatter() {
        //     // @ts-ignore
        //     return categories[this.value];
        //   },
        // },
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
          data: this.candleChartData,
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
    };
  }

  public init(data: DynamicObject): DynamicObject {
    this.initData(data);
    return {
      defaultChart: this.getDefaultChart(),
      candleChart: this.getCandleChart(),
    };
  }
}

export const meUtils = new MeUtils();
