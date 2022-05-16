import { DynamicObject } from '@/interfaces';
import { useEmitter, emitEvents } from '@/use/useEmitter';
import { useTechAnalysisStore } from '@/store/pinia/technicalAnalysis';

export const useChartSettings = () => {
  const isInitLoad = ref(false);
  const techStore = useTechAnalysisStore();
  const emitter = useEmitter();
  const settings = ref<DynamicObject>({});
  const _highcharts = ref<any>({});
  const selectedAnnotation = ref<any>(undefined);
  const _chart = ref<any>(undefined);

  const getSettings = computed(() => settings.value);

  emitter.on(emitEvents.updateCurrentTypeTechAn, () => {
    try {
      if (techStore.currentType === 'proc') {
        _chart.value.update({
          plotOptions: {
            series: {
              compare: 'percent',
            },
          },
          tooltip: {
            changeDecimals: 2,
            valueDecimals: 2,
            formatter() {
              let html = '';
              this.points.forEach((point) => {
                html += `<span style="color:${point.color}">${point.series.name}</span>: <b>${
                  point.y
                }</b> (${point.point.change.toFixed(2)}%)<br/>`;
              });
              return html;
            },
          },
        });
      } else if (techStore.currentType === 'line') {
        _chart.value.update({
          plotOptions: {
            series: {
              compare: undefined,
            },
          },
          tooltip: {
            valueDecimals: undefined,
            formatter() {
              return this.points[0].series.chart.tooltip.defaultFormatter.call(
                this,
                this.points[0].series.chart.tooltip,
              );
            },
          },
        });
      }
    } catch (e) {
      console.error('updateCurrentType settings');
      console.error(e);
    } finally {
      techStore.changeIsDisablePage(false);
    }
  });

  emitter.on(emitEvents.changeAnnotationStrokeColor, () => {
    try {
      if (!selectedAnnotation.value) return;
      selectedAnnotation.value.shapes.forEach((shape) => {
        shape.update({
          stroke: techStore.selectedAnnotationsColors.stroke,
        });
      });
      if (selectedAnnotation.value.userOptions.typeOptions) {
        selectedAnnotation.value.userOptions.typeOptions.line = {
          stroke: techStore.selectedAnnotationsColors.stroke,
        };
        selectedAnnotation.value.userOptions.typeOptions.background = {
          stroke: techStore.selectedAnnotationsColors.stroke,
        };
        selectedAnnotation.value.userOptions.typeOptions.innerBackground = {
          stroke: techStore.selectedAnnotationsColors.stroke,
        };
        selectedAnnotation.value.userOptions.typeOptions.outerBackground = {
          stroke: techStore.selectedAnnotationsColors.stroke,
        };
      } else {
        selectedAnnotation.value.userOptions.shapes.forEach((shape) => {
          shape.stroke = techStore.selectedAnnotationsColors.stroke;
        });
      }
      save(_chart.value);
    } catch (e) {
      console.error('change stroke color error');
      console.error(e);
    }
  });

  emitter.on(emitEvents.changeAnnotationFillColor, () => {
    try {
      if (!selectedAnnotation.value) return;
      selectedAnnotation.value.shapes.forEach((shape) => {
        shape.update({
          fill: techStore.selectedAnnotationsColors.fill,
        });
      });
      if (selectedAnnotation.value.userOptions.typeOptions) {
        selectedAnnotation.value.userOptions.typeOptions.line = {
          fill: techStore.selectedAnnotationsColors.fill,
        };
        selectedAnnotation.value.userOptions.typeOptions.background = {
          fill: techStore.selectedAnnotationsColors.fill,
        };
        selectedAnnotation.value.userOptions.typeOptions.innerBackground = {
          fill: techStore.selectedAnnotationsColors.fill,
        };
        selectedAnnotation.value.userOptions.typeOptions.outerBackground = {
          fill: techStore.selectedAnnotationsColors.fill,
        };
      } else {
        selectedAnnotation.value.userOptions.shapes.forEach((shape) => {
          shape.fill = techStore.selectedAnnotationsColors.fill;
        });
      }
      save(_chart.value);
    } catch (e) {
      console.error('change fill color error');
      console.error(e);
    }
  });

  emitter.on(emitEvents.clickAnnotationChangeColor, () => {});

  const updateMainYAxis = () => {
    try {
      if (!Array.isArray(techStore.chartMainYAxis) || !_chart.value) return;
      // @ts-ignore
      if (techStore.selectedAssets.length === 0) {
        // @ts-ignore
        _chart.value.series.forEach((series, index) => {
          const { type } = series;
          if (type === 'ohlc') {
            // @ts-ignore
            _chart.value.series[index].remove();
          }
        });
        return;
      }
      // @ts-ignore
      if (_chart.value.series.length > techStore.chartMainYAxis.length) {
        if (techStore.chartMainYAxis.length === 0) {
          // @ts-ignore
          for (let i = 0; i < _chart.value.series.length; i++) {
            // @ts-ignore
            _chart.value.series[i].remove();
          }
          return;
        }
        // @ts-ignore
        _chart.value.series.forEach((seriesChart) => {
          const { type } = seriesChart;
          if (type !== 'ohlc') return;
          let deleteId = seriesChart.userOptions.id;
          techStore.chartMainYAxis.forEach((seriesMainYAxis) => {
            if (seriesChart.userOptions.id === seriesMainYAxis.id) {
              deleteId = -1;
            }
          });
          if (deleteId !== -1) {
            // @ts-ignore
            _chart.value.get(deleteId).remove();
          }
        });
      }
      techStore.chartMainYAxis.forEach((series) => {
        // @ts-ignore
        if (!_chart.value.get(series.id)) {
          // @ts-ignore
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
        }
      });
      // _chart.value.get(techStore.chartMainYAxis[0].id).remove();
    } catch (e) {
      console.error('updateMainYAxis settings');
      console.error(e);
    }
  };

  const deleteLastIndicator = () => {
    if (techStore.selectedIndicators.length === 0) {
      // @ts-ignore
      _chart.value.series.forEach((series, index) => {
        const { type } = series;
        if (type !== 'ohlc' && type !== 'areaspline') {
          // @ts-ignore
          _chart.value.series[index].remove();
          _chart.value.yAxis.forEach((axis, axisIndex) => {
            if (axis.userOptions.relatedIndicator === type) {
              _chart.value.yAxis[axisIndex].remove();
            }
          });
          techStore.decreaseCountAxis();
        }
      });
      return true;
    }
    return false;
  };

  const updateIndicators = () => {
    try {
      if (deleteLastIndicator()) return;

      _chart.value.series.forEach((chartSeries, chartSeriesIndex) => {
        const { type } = chartSeries;
        if (type !== 'ohlc' && type !== 'areaspline') {
          let isExist = false;
          const { userOptions } = chartSeries;
          const { id } = userOptions;
          if (id) {
            techStore.selectedIndicators.forEach((indicator) => {
              if (indicator.ID === id) {
                isExist = true;
              }
            });
          }
          if (!isExist) {
            _chart.value.series[chartSeriesIndex].remove();
            _chart.value.yAxis.forEach((axis, axisIndex) => {
              if (axis.userOptions.relatedIndicator === type) {
                _chart.value.yAxis[axisIndex].remove();
              }
            });
            techStore.decreaseCountAxis();
          }
        }
      });

      if (deleteLastIndicator()) return;

      if (techStore.selectedAssets.length === 0) return;

      techStore.selectedIndicators.forEach((indicator) => {
        let isExist = false;

        _chart.value.series.forEach((chartSeries, chartSeriesIndex) => {
          const { type } = chartSeries;
          if (type !== 'ohlc' && type !== 'areaspline') {
            const { userOptions } = chartSeries;
            const { id } = userOptions;
            if (id) {
              if (indicator.ID === id) {
                isExist = true;
              }
            }
          }
        });

        if (!isExist) {
          let type = indicator.CODE.toLowerCase();

          let params = {};

          if (type === 'adl') {
            type = 'ad';
            params = {
              period: 0,
              volumeSeriesID: techStore.basicAsset.ID,
            };
          }

          if (type === 'atr') {
            params = {
              period: 10,
            };
          }

          _chart.value.addAxis({
            crosshair: {
              snap: false,
              label: {
                enabled: true,
                format: '{value:.2f}',
              },
            },
            labels: {
              align: 'left',
              x: 10,
              style: {
                fontSize: '10px',
                color: '#838383',
                fontFamily: 'Montserrat',
              },
            },
            offset: 0,
            endOnTick: false,
            opposite: true,
            lineColor: '#c2c2c2',
            gridLineColor: '#c2c2c2',
            lineWidth: 1,
            title: {
              text: '',
            },
            relatedIndicator: type,
            id: techStore.getNextAxisId,
            top: `${100 - _chart.value.yAxis.length - 15}%`,
            // top: `${100 - techStore.selectedIndicators.length - 15}%`,
            height: `${15 - _chart.value.yAxis.length}%`,
            // height: `${15 - techStore.selectedIndicators.length}%`,
            isIndicator: true,
            // top:
            //   techStore.topAxisHeight + techStore.defaultAdditionalAxisHeight * techStore.countAxis,
          });

          // @ts-ignore
          _chart.value.addSeries({
            type,
            params,
            linkedTo: techStore.basicAsset.ID,
            yAxis: techStore.getNextAxisId,
            id: indicator.ID,
          });

          techStore.increaseNextAxisId();
          techStore.increaseCountAxis();
        }
      });
      // updateChartHeight();
      // _chart.value.setSize(undefined, techStore.getCurrentChartHeight);
    } catch (e) {
      console.error('updateIndicators settings');
      console.error(e);
    }
  };

  const deleteIndicatorsByIndexes = (indexes: number[]) => {
    try {
      if (indexes.length !== 0) {
        _chart.value.yAxis[indexes[0]].remove();
        indexes.splice(0, 1);
        indexes.forEach((item, indexOfItem) => {
          indexes[indexOfItem] = item - 1;
        });
        deleteIndicatorsByIndexes(indexes);
      } else {
        return;
      }
    } catch (e) {
      console.error('deleteIndicatorsByIndexes');
      console.error(e);
    }
  };

  const updateBasicAsset = () => {
    try {
      if (!techStore.isNeedUpdateBasicAsset) return;
      const indexes: number[] = [];
      techStore.$patch({ isNeedUpdateBasicAsset: false });
      _chart.value.yAxis.forEach((axis, axisIndex) => {
        if (axis.userOptions.isIndicator) {
          indexes.push(axisIndex);
          // _chart.value.yAxis[axisIndex].remove();
        }
      });
      deleteIndicatorsByIndexes(indexes);
      _chart.value.colorCounter = _chart.value.yAxis.length;
      updateIndicators();
      updateChartHeight();
      console.log(_chart.value);
      // console.log('---');
    } catch (e) {
      console.error('updateBasicAsset settings');
      console.error(e);
    }
  };

  const updateChartHeight = () => {
    try {
      _chart.value.setSize(null, techStore.getCurrentChartHeight);
      let countAdditionalAxis = 0;
      let rootIndex = -1;
      _chart.value.yAxis.forEach((axis, axisIndex) => {
        const { id } = axis.userOptions;
        if (id === 'root') {
          rootIndex = axisIndex;
        } else if (id !== 'navigator-y-axis') {
          axis.update({
            top: `${70 - (countAdditionalAxis - 1) * 10}%`,
            height: `${10}%`,
          });
          countAdditionalAxis += 1;
        }
      });
      // console.log(countAdditionalAxis);
      _chart.value.yAxis[rootIndex].update({
        height: `${70 - (countAdditionalAxis - 1) * 10}%`,
      });
      _chart.value.redraw();
    } catch (e) {
      console.error('updateChartHeight settings');
      console.error(e);
    }
  };

  const getOptions = (elements) => {
    const options = [];
    elements.forEach((element) => {
      const { userOptions } = element;
      const { type } = element.userOptions;
      if (!userOptions.isInternal) {
        try {
          if (userOptions.draggable && userOptions.labels) {
            userOptions.labels.forEach((label) => {
              label.controlPoints = null;
            });
          }
          // console.log(element)
          if (type === 'measure') {
            const { selectType } = userOptions.typeOptions;
            if (selectType === 'y') {
              // Если растягивается по высоте
              userOptions.typeOptions.point.y =
                element.startYMin || userOptions.typeOptions.point.y;
              userOptions.typeOptions.background.height = element.startYMin - element.startYMax;
            } else if (selectType === 'x') {
              // Если растягивается по ширине
              userOptions.typeOptions.point.x =
                element.startXMin || userOptions.typeOptions.point.x;
              userOptions.typeOptions.background.width = element.startXMax - element.startXMin;
            }
          }
          // @ts-ignore
          options.push(userOptions);
        } catch (e) {
          console.error('getOptions error');
          console.error(e);
        }
      }
    });

    return options;
  };

  const load = () => {
    try {
      if (isInitLoad.value) return;
      if (Array.isArray(techStore.annotations)) {
        techStore.annotations.forEach((annotation) => {
          if (annotation.typeOptions) {
            if (annotation.typeOptions.points) {
              annotation.typeOptions.points.forEach((point) => {
                if (!point.controlPoint) return;
                point.controlPoint.visible = false;
              });
            }
          }
          _chart.value.addAnnotation(annotation);
        });
      }
      isInitLoad.value = true;
    } catch (e) {
      console.error('load error');
      console.error(e);
    }
  };

  const save = (chart) => {
    try {
      const { userOptions } = chart;
      if (Array.isArray(chart.annotations)) {
        userOptions.annotations = getOptions(chart.annotations);
      }

      localStorage.setItem(
        'customStockToolsChart',
        JSON.stringify({
          presetName: techStore.selectedPreset,
          annotations: userOptions.annotations,
        }),
      );
    } catch (e) {
      console.error('save chart error');
      console.error(e);
    }
  };

  const clearChart = (chart) => {
    try {
      if (Array.isArray(chart.annotations)) {
        if (chart.annotations.length > 0) {
          chart.annotations.forEach((annotation) => {
            chart.removeAnnotation(annotation);
            clearChart(chart);
          });
        }
      }
    } catch (e) {
      console.error('clearChart error');
      console.error(e);
    }
  };

  const changeAnnotationColor = (chart) => {
    try {
      selectedAnnotation.value = chart.navigationBindings.activeAnnotation;
      if (selectedAnnotation.value) {
        if (selectedAnnotation.value.userOptions.typeOptions) {
          if (selectedAnnotation.value.userOptions.typeOptions.line) {
            techStore.initColors(selectedAnnotation.value.userOptions.typeOptions.line);
          } else if (selectedAnnotation.value.userOptions.typeOptions.background) {
            techStore.initColors(selectedAnnotation.value.userOptions.typeOptions.background);
          }
        } else if (selectedAnnotation.value.userOptions.shapes) {
          techStore.initColors(selectedAnnotation.value.userOptions.shapes[0]);
        }
      } else {
        selectedAnnotation.value = undefined;
        techStore.resetColors();
        emitter.emit(emitEvents.closeAnnotationChangeColor);
      }
    } catch (e) {
      console.error('change color error');
      console.error(e);
    }
  };

  const isOhcl = () => techStore.selectedChartMode === 'ohlc';

  const addEvents = (chart) => {
    try {
      _chart.value = chart;

      const today = Date.now();
      const day = 86400e3;
      const year = day * 365;
      const min = today - year * 1;
      const max = today + year * 1;

      _highcharts.value.addEvent(chart.container, 'click', (e) => {
        save(chart);
        changeAnnotationColor(chart);
        techStore.updateAddAnnotation();
      });

      chart.rectangles = [];

      // @ts-ignore
      document.querySelector('#techAnDeleteBtn').addEventListener('click', () => {
        if (!chart.navigationBindings.activeAnnotation || !isOhcl()) return;
        chart.removeAnnotation(chart.navigationBindings.activeAnnotation);
        save(chart);
      });

      // @ts-ignore
      document.querySelector('#techAnClearBtn').addEventListener('click', () => {
        if (!isOhcl()) return;
        clearChart(chart);
        save(chart);
      });

      // @ts-ignore
      document.querySelector('#techAnRangeOneMonth').addEventListener('click', () => {
        if (!isOhcl()) return;
        chart.xAxis[0].setExtremes(today - year / 12, today + year / 12);
        // chart.xAxis[0].update({
        //   dateTimeLabelFormats: {
        //     month: '%b',
        //   },
        // });
      });

      // @ts-ignore
      document.querySelector('#techAnRangeThreeMonth').addEventListener('click', () => {
        if (!isOhcl()) return;
        chart.xAxis[0].setExtremes(today - year / 6, today + year / 6);
        // chart.xAxis[0].update({
        //   dateTimeLabelFormats: {
        //     month: '%b',
        //   },
        // });
      });

      // @ts-ignore
      document.querySelector('#techAnRangeSixMonth').addEventListener('click', () => {
        if (!isOhcl()) return;
        chart.xAxis[0].setExtremes(today - year / 3, today + year / 3);
        // chart.xAxis[0].update({
        //   dateTimeLabelFormats: {
        //     month: '%b',
        //   },
        // });
      });

      // @ts-ignore
      document.querySelector('#techAnRangeOneYear').addEventListener('click', () => {
        if (!isOhcl()) return;
        chart.xAxis[0].setExtremes(today - year, today + year);
        // chart.xAxis[0].update({
        //   dateTimeLabelFormats: {
        //     month: '%b',
        //   },
        // });
      });

      // @ts-ignore
      document.querySelector('#techAnRangeTwoYear').addEventListener('click', () => {
        if (!isOhcl()) return;
        chart.xAxis[0].setExtremes(today - year * 2, today + year * 2);
        // chart.xAxis[0].update({
        //   dateTimeLabelFormats: {
        //     month: '%Y',
        //     year: '%Y',
        //   },
        // });
      });

      // @ts-ignore
      document.querySelector('#techAnRangeMax').addEventListener('click', () => {
        if (!isOhcl()) return;
        chart.xAxis[0].setExtremes(chart.xAxis.dataMin, chart.xAxis.dataMax);
        // chart.xAxis[0].update({
        //   dateTimeLabelFormats: {
        //     month: '%Y',
        //     year: '%Y',
        //   },
        // });
      });
    } catch (e) {
      console.error('addEvents chart error');
      console.error(e);
    }
  };

  const setup = async (HighCharts) => {
    try {
      _highcharts.value = HighCharts;

      settings.value = {
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
              addEvents(this);
            },
            redraw() {},
            render() {},
          },
        },
        rangeSelector: {
          // enabled: false,
          // labelStyle: {
          //   display: 'none',
          // },
          buttons: [],
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
          // {
          //   labels: {
          //     align: 'left',
          //     x: 10,
          //     style: {
          //       fontSize: '18px',
          //       color: '#838383',
          //       fontFamily: 'Montserrat',
          //     },
          //   },
          //   top: '80%',
          //   height: '20%',
          //   offset: 0,
          //   endOnTick: false,
          //   opposite: true,
          //   lineColor: '#c2c2c2',
          //   gridLineColor: '#c2c2c2',
          //   lineWidth: 1,
          //   title: {
          //     text: '',
          //   },
          // },
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
        // responsive: {
        //   rules: [
        //     {
        //       condition: {
        //         maxWidth: 800,
        //       },
        //       chartOptions: {
        //         rangeSelector: {
        //           inputEnabled: false,
        //         },
        //       },
        //     },
        //   ],
        // },
      };
    } catch (e) {
      console.error('setup chart settings');
      console.error(e);
    }
  };

  return {
    setup,
    load,
    updateMainYAxis,
    updateIndicators,
    updateBasicAsset,
    updateChartHeight,
    getSettings,
    settings: settings.value,
  };
};
