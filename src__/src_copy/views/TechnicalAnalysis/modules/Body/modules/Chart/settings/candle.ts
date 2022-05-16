import { useTechAnalysisStore } from '@/store/pinia/technicalAnalysis';
import { useEmitter } from '@/use/useEmitter';
import { useError } from '@/use/useError';

export const candleChart = () => {
  const techStore = useTechAnalysisStore();
  const emitter = useEmitter();
  const { _catch } = useError('candle settings');

  const _chart = ref<any>({});
  const _highcharts = ref<any>({});

  const isInit = ref(false);
  const isInitSeries = ref(false);
  const chartSettings = ref<any>({});

  const isCandle = () => techStore.selectedChartMode === 'candle';

  const addSeries = (series: any) => {
    try {
      _chart.value.addSeries({
        ...series,
        tooltip: {
          customPointFormatter() {
            let html = '';

            // @ts-ignore
            this.points.forEach((point) => {
              if (html === '') {
                // @ts-ignore
                html = `<b>${_highcharts.value.dateFormat('%b %e, %Y', this.x)}</b><br />`;
              }
              if (point.point.close) {
                html += `<b><span style = "color:${point.series.color};">${point.series.name}</b><br />`;
                html += `<span style ="color:${point.series.color};">Open</span>: ${point.point.open}<br/><span style ="color:${point.series.color};">High</span>: ${point.point.high}<br/><span style ="color:${point.series.color};">Low</span>: ${point.point.low}<br/><span style ="color:${point.series.color};">Close</span>: ${point.point.close}<br/>`;
              }
            });

            return html;
          },
        },
      });
    } catch (e) {
      _catch(e, 'addSeries');
    }
  };

  const initEvents = () => {};

  const initSeries = () => {
    if (isInitSeries.value) return;
    techStore.candleChart.mainSeries.forEach((series) => addSeries(series));
    isInitSeries.value = true;
    console.log(techStore.candleChart.mainSeries);
  };

  const init = async (highchart) => {
    try {
      _highcharts.value = highchart;

      chartSettings.value = {
        annotations: [],
        navigation: {
          annotationsOptions: {
            shapeOptions: {
              fill: 'rgba(30,204,30,0.2)',
              stroke: 'rgba(51,199,32,0.8)',
              strokeWidth: 2,
              borderWidth: 2,
            },
          },
          bindings: {
            inputText: {
              className: 'highcharts-inputText-annotation',
              start(e) {
                document.body.style.cursor = 'default';

                // @ts-ignore
                const xvalueAn = e.chartX - this.chart.plotLeft;
                // @ts-ignore
                const yvalueAn = e.chartY - this.chart.plotTop;
                // @ts-ignore
                const coords = this.chart.pointer.getCoordinates(e);
                const x = coords.xAxis[0].value;
                const y = coords.yAxis[0].value;
                // @ts-ignore
                const { navigation } = this.chart.options;

                const controlPoints = [
                  {
                    positioner(target) {
                      if (!target.graphic.placed) {
                        return {
                          x: 0,
                          y: -9e7,
                        };
                      }
                      return {
                        // @ts-ignore
                        x: x - this.graphic.width / 2,
                        // @ts-ignore
                        y: y - this.graphic.height / 2,
                      };
                    },
                    events: {
                      drag(e, target) {
                        // @ts-ignore
                        const xy = this.mouseMoveToTranslation(e);
                        target.translate(xy.x, xy.y);
                        target.annotation.labels[0].options = target.options;
                        target.redraw(false);
                      },
                    },
                  },
                ];

                // eslint-disable-next-line @typescript-eslint/no-this-alias
                const _self = this;
                const labelTextForm = document.getElementById('labelTextForm');

                const onclick = function () {
                  // @ts-ignore
                  _self.chart.addAnnotation(
                    _highcharts.value.merge(
                      {
                        animation: { defer: 0 },
                        type: 'basicAnnotation',
                        langKey: 'label',
                        labelOptions: {
                          backgroundColor: 'rgba(0,0,0,0.75)',
                          // @ts-ignore
                          format: labelTextForm.querySelector('#labelTextInput').value,
                          style: {
                            fontSize: '14px',
                            color: 'contrast',
                          },
                        },
                        labels: [
                          {
                            point: {
                              xAxis: 0,
                              yAxis: 0,
                              x,
                              y,
                            },
                            padding: 8,
                            overflow: 'none',
                            crop: true,
                            // @ts-ignore
                            text: labelTextForm.querySelector('#labelTextInput').value,
                            controlPoints,
                          },
                        ],
                      },
                      navigation.annotationsOptions,
                      navigation.bindings.labelAnnotation.annotationsOptions,
                    ),
                  );
                };

                _highcharts.value.css(labelTextForm, {
                  top: `${e.pageY - 10}px`,
                  left: `${e.pageX - 10}px`,
                  display: 'block',
                });

                const unbinder = _highcharts.value.addEvent(
                  // @ts-ignore
                  labelTextForm.querySelector('#labelTextButton'),
                  'click',
                  () => {
                    onclick();

                    _highcharts.value.css(labelTextForm, {
                      display: 'none',
                    });

                    unbinder();
                  },
                );
                // @ts-ignore
                labelTextForm.querySelector('#labelTextInput').value = '';
                return true;
              },
            },
          },
        },
        chart: {
          backgroundColor: '',
          animation: false,
          events: {
            load() {
              _chart.value = this;
              initEvents();
            },
            redraw() {},
            render() {},
          },
        },
        rangeSelector: {
          enabled: false,
          // labelStyle: {
          //   display: 'none',
          // },
          // buttons: [],
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
        xAxis: {
          crosshair: {
            snap: false,
            // label: {
            //   enabled: true,
            //   format: '{value:.2f}',
            // },
          },
          lineColor: '#c2c2c2',
          type: 'datetime',
          labels: {
            formatter() {
              // @ts-ignore
              return _highcharts.value.dateFormat('%e-%b-%Y', this.value);
            },
          },
        },
        yAxis: [
          {
            crosshair: {
              snap: false,
              label: {
                enabled: true,
                format: '{value:.2f}',
              },
            },
            id: 'root',
            labels: {
              align: 'left',
              x: 10,
              style: {
                fontSize: '14px',
                color: '#838383',
                fontFamily: 'Montserrat',
              },
            },
            height: '100%',
            // height: techStore.topAxisHeight,
            resize: {
              enabled: false,
            },
            endOnTick: false,
            opposite: true,
            lineColor: '#c2c2c2',
            gridLineColor: '#c2c2c2',
            lineWidth: 1,
            title: {
              text: '',
            },
          },
        ],
        tooltip: {
          xDateFormat: '%d %b 20%y г.',
          backgroundColor: '#666666',
          style: {
            color: '#fff',
          },
          useHTML: true,
          shape: 'square',
          headerShape: 'callout',
          borderWidth: 0,
          shadow: false,
          positioner(width, height, point) {
            // @ts-ignore
            const { chart } = this;
            let position;

            if (point.isHeader) {
              position = {
                x: Math.max(
                  // Left side limit
                  chart.plotLeft,
                  Math.min(
                    point.plotX + chart.plotLeft - width / 2,
                    // Right side limit
                    chart.chartWidth - width - chart.marginRight,
                  ),
                ),
                y: point.plotY,
              };
            } else {
              position = {
                x: point.series.chart.plotLeft,
                y: point.series.yAxis.top - chart.plotTop,
              };
            }

            return position;
          },
        },
        stockTools: {
          gui: {
            enabled: false,
          },
        },
        scrollbar: {
          liveRedraw: false,
        },
        plotOptions: {
          series: {
            showInNavigator: true,
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
        series: [],
      };
    } catch (e) {
      _catch(e, 'init');
    }
  };

  return {
    init,
    initSeries,
    getSettings: computed(() => chartSettings.value),
    getIsInit: isInit.value,
  };
};
