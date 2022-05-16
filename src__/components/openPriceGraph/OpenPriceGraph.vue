<template>
  <div v-if="getStockInfoFull" class="openPriceGraph">
    <template>{{ setPreviousClose() }}</template>
    <template v-if="getPreviousClosePrice">
      <template v-if="!isReady">{{ init() }}</template>
      <template v-else>
        <button class="openPriceGraph__change-btn" @click="onChangeGraphType">
          Сменить вид графика
        </button>
        <VueHighcharts
          v-if="!isCandleChart"
          type="stockChart"
          :options="{
            ...options,
            chart: {
              ...otherChartOptions,
              type: chartType,
              height: '600px',
            },
          }"
          :redrawOnUpdate="true"
          :oneToOneUpdate="false"
          :animateOnUpdate="true"
        />
        <VueHighcharts
          v-else
          type="stockChart"
          :options="{
            ...chartOptions,
            chart: {
              ...otherChartOptions,
              type: chartType,
              height: '600px',
            },
          }"
          :redrawOnUpdate="true"
          :oneToOneUpdate="false"
          :animateOnUpdate="true"
        />
      </template>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { mapGetters, mapActions, useStore } from 'vuex';
import VueHighcharts from 'vue3-highcharts';
import HighCharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import StockCharts from 'highcharts/modules/stock';
import axios from 'axios';

// HighchartsMore(HighCharts);
//
// HighCharts.setOptions({
//   lang: {
//     noData: 'Check your options please',
//     resetZoom: '╳',
//   },
// });

export default defineComponent({
  name: 'OpenPriceGraph',
  components: {
    VueHighcharts,
  },
  data() {
    return {
      stockCandle: [],
      stockSeries: [],
      stockCategories: [],
      options: {},
      isReady: false,
      ohlc: [],
      volume: [],
      groupingUnits: [],
      chartOptions: {},
      otherChartOptions: {
        // spacingTop: 40,
        backgroundColor: '',
        // zoomType: 'x',
        // resetZoomButton: {
        //   position: {
        //     x: 30,
        //     y: -40,
        //   },
        //   theme: {
        //     fill: '#2a8634',
        //     stroke: 'none',
        //     style: {
        //       color: 'white',
        //       fontSize: '15px',
        //       fontFamily: 'Montserrat',
        //       fontWeight: '400',
        //     },
        //     r: 4,
        //     states: {
        //       hover: {
        //         fill: '#2f6c3a',
        //         style: {
        //           color: 'white',
        //         },
        //       },
        //     },
        //   },
        // },
      },
      chartType: 'line',
      isCandleChart: false,
    };
  },
  computed: {
    ...mapGetters([
      'stockInfoStore/fullInfo',
      'stockInfoStore/monthCandle',
      'previousCloseStore/closePrice',
    ]),
  },
  methods: {
    ...mapActions(['previousCloseStore/init']),

    async setPreviousClose() {
      await this['previousCloseStore/init']('AAPL');
    },

    getPreviousClosePrice() {
      return this['previousCloseStore/closePrice'];
    },

    getStockInfoFull() {
      return this['stockInfoStore/fullInfo'];
    },

    getStockMonthCandle() {
      return this['stockInfoStore/monthCandle'];
    },

    onChangeGraphType() {
      this.isCandleChart = !this.isCandleChart;
    },

    async init() {
      StockCharts(HighCharts);
      const stockMonthCandleArr: any = Object.values(this.getStockMonthCandle());
      // this.stockCandle = stockMonthCandleArr.slice(
      //   stockMonthCandleArr.length / 1.13,
      //   stockMonthCandleArr.length,
      // );

      this.stockCandle = stockMonthCandleArr;

      const seriesData: any = [];
      const categories: any = [];

      const candleChartData: any = [];

      this.stockCandle.forEach((item: any, index: number) => {
        seriesData.push(Number(item.UF_CLOSE));

        // console.log(new Date(item.UF_DATE_TO).getTime());
        // console.log(new Date(item.UF_DATE_TO).getMilliseconds());

        candleChartData.push([
          Number(new Date(item.UF_DATE_TO).getTime()),
          Number(item.UF_OPEN),
          Number(item.UF_HIGH),
          Number(item.UF_LOW),
          Number(item.UF_CLOSE),
        ]);

        let dateSlice: any = item.UF_DATE_TO.slice(0, -3);

        let month = String(dateSlice.substr(dateSlice.length - 2));

        dateSlice = dateSlice.slice(0, -3);

        switch (month) {
          case '01': {
            month = 'Сен.';
            break;
          }
          case '02': {
            month = 'Окт.';
            break;
          }
          case '03': {
            month = 'Нояб.';
            break;
          }
          case '04': {
            month = 'Дек.';
            break;
          }
          case '05': {
            month = 'Янв.';
            break;
          }
          case '06': {
            month = 'Фев.';
            break;
          }
          case '07': {
            month = 'Март';
            break;
          }
          case '08': {
            month = 'Апр.';
            break;
          }
          case '09': {
            month = 'Май';
            break;
          }
          case '10': {
            month = 'Июнь';
            break;
          }
          case '11': {
            month = 'Июль';
            break;
          }
          case '12': {
            month = 'Авг.';
            break;
          }
          default: {
            break;
          }
        }

        categories.push(`${month} ${dateSlice}`);
      });

      // console.log(this.stockCandle);

      const { data } = await axios.get('https://demo-live-data.highcharts.com/aapl-ohlcv.json');
      // console.log(data);
      const groupingUnits = [
        [
          'week', // unit name
          [1], // allowed multiples
        ],
        ['month', [1, 2, 3, 4, 6]],
      ];

      const dataLength = data.length / 10;
      const ohlc: any = [];
      const volume: any = [];

      // for (let i = 0; i < dataLength; i += 1) {
      //   ohlc.push([
      //     data[i][0], // the date
      //     data[i][1], // open
      //     data[i][2], // high
      //     data[i][3], // low
      //     data[i][4], // close
      //   ]);

      // volume.push([
      //   data[i][0], // the date
      //   data[i][5], // the volume
      // ]);
      // }

      // console.log(candleChartData);
      // console.log(ohlc);

      this.chartOptions = {
        rangeSelector: {
          // inputEnabled: false,
          // buttons: [],
          // selected: 4,
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
          // maskFill: 'rgba(115, 113, 115, 0)',
          // maskInside: false,
          outlineWidth: 0,
          handles: {
            backgroundColor: '#FFFFFF',
            borderColor: '#D1D1D1',
          },
          // series: {
          //   type: 'areaspline',
          //   fillOpacity: 1,
          //   lineWidth: 0,
          // },
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
          // min: 1000,
          // max: 2000,
          // categories,
          lineColor: '#c2c2c2',
          // tickInterval: 1,
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

        // tooltip: {
        //   split: true,
        // },

        series: [
          {
            type: 'candlestick',
            name: 'Газпром',
            data: candleChartData,
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

      this.options = {
        rangeSelector: {
          // inputEnabled: false,
          // buttons: [],
          // selected: 1,
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
          // maskFill: 'rgba(115, 113, 115, 0)',
          // maskInside: false,
          outlineWidth: 0,
          handles: {
            backgroundColor: '#FFFFFF',
            borderColor: '#D1D1D1',
          },
          // series: {
          //   type: 'areaspline',
          //   fillOpacity: 1,
          //   lineWidth: 0,
          // },
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
          // min: 100,
          // max: 125,
          // categories,
          lineColor: '#c2c2c2',
          // tickInterval: 1,
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
            data: seriesData,
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

        // plotOptions: {
        //   series: {
        //     pointPlacement: 'on',
        //   },
        // },
      };

      this.isReady = true;
    },
  },
});
</script>

<style scoped lang="scss">
.openPriceGraph {
  width: 100%;

  & canvas {
    display: block;
  }

  @include respond-to(1000) {
    width: 65%;
    margin-right: 20px;
  }

  &__change-btn {
    margin-bottom: 10px;
    padding: 8px 10px;
    color: $color-white;
    font-family: $ff-default;
    background: #2a8634;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background: #2f6c3a;
    }
  }
}
</style>
