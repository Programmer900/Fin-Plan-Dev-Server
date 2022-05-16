import { defineStore, acceptHMRUpdate } from 'pinia';
import { ApiStatusCode, useApiFinplan } from '@/use/api/useApiFinplan';
import { useUserStore } from '@/store/pinia/user';
import { DynamicObject } from '@/interfaces';

export const useTechAnalysisStore = defineStore('technicalAnalysis', {
  state: () => ({
    selectedPreset: '',
    userId: 7307,
    topAxisHeight: 500,
    defaultAdditionalAxisHeight: 70,
    countAxis: 1,
    nextAxisId: 2,
    annotations: [] as any[],
    isNeedUpdateChart: false,
    isDisablePage: false,
    allAssets: [] as any[],
    allAssetsBackup: [] as any[],
    selectedAssets: [] as any[],
    basicAsset: {
      ID: '',
      NAME: '',
    },
    allIndicators: [] as any[],
    allIndicatorsBackup: [] as any[],
    selectedIndicators: [] as any[],
    existIndicators: [] as any[],
    saveList: [] as { label: string; id: string }[],
    selectedChartName: null as { label: string; id: string } | null,
    selectedAssetsDetails: [] as any[],
    chartMainYAxis: [] as any[],
    isRequestSelectedAssetsDetails: false,
    currentRange: 'max',
    currentType: 'line',
    selectedAnnotationsColors: {
      stroke: 'rgba(51,199,32,0.8)',
      fill: 'rgba(30,204,30,0.2)',
    },
    fontOptions: {
      size: 14,
    },
    isAnnotationSelected: false,
    isDarkMode: false,
    isNeedUpdateBasicAsset: false,
    selectedChartMode: 'ohlc' as 'ohlc' | 'line' | 'candle',
    lineChart: {
      mainSeries: [] as any[],
      categories: [] as any[],
    },
    candleChart: {
      mainSeries: [] as any[],
    },
  }),
  getters: {
    getDefaultChart: (state) => {
      for (let i = 0; i < state.saveList.length - 1; i++) {
        if (state.saveList[i].label === 'По-умолчанию') {
          return state.saveList[i];
        }
      }
    },
    getNextAxisId: (state) => `axis-${state.nextAxisId}`,
    getCurrentChartHeight: (state) =>
      state.topAxisHeight + state.defaultAdditionalAxisHeight * state.countAxis,
  },
  actions: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
    },

    changeSelectedAnnotationsColors(type: 'stroke' | 'fill', selected) {
      const { r, g, b, a } = selected.rgba;
      const color = `rgba(${r},${g},${b},${a})`;
      if (type === 'stroke') {
        this.selectedAnnotationsColors.stroke = color;
      } else if (type === 'fill') {
        this.selectedAnnotationsColors.fill = color;
      }
    },

    initColors(colors) {
      this.selectedAnnotationsColors.stroke = colors.stroke;
      this.selectedAnnotationsColors.fill = colors.fill;
    },

    resetColors() {
      this.selectedAnnotationsColors.stroke = 'rgba(51,199,32,0.8)';
      this.selectedAnnotationsColors.fill = 'rgba(30,204,30,0.2)';
    },

    addExistIndicator(indicator: DynamicObject) {
      this.existIndicators.push(indicator);
    },

    increaseNextAxisId() {
      this.nextAxisId += 1;
    },

    increaseCountAxis() {
      this.countAxis += 1;
    },

    decreaseCountAxis() {
      this.countAxis -= 1;
    },

    changeIsDisablePage(value: boolean) {
      this.isDisablePage = value;
    },

    changeCurrentRange(selected: string) {
      this.currentRange = selected;
    },

    changeCurrentType(selected: string) {
      this.currentType = selected;
    },

    async changeSelectedAssets(asset: DynamicObject) {
      try {
        const isExist = this.isSelectedAsset(asset);
        if (!isExist) {
          this.selectedAssets.push(asset);
          if (this.basicAsset.ID === '') {
            Object.assign(this.basicAsset, asset);
          }
        } else {
          this.deleteSelectedAsset(asset);
          if (this.basicAsset.ID === asset.ID) {
            if (this.selectedAssets.length > 0) {
              Object.assign(this.basicAsset, this.selectedAssets[0]);
            }
          }
        }
        await this.savePreset();
      } catch (e) {
        console.error('changeSelectedAssets');
        console.error(e);
      }
    },

    async changeSelectedIndicators(indicator: DynamicObject) {
      const isExist = this.isSelectedIndicator(indicator);
      if (!isExist) {
        this.selectedIndicators.push(indicator);
      } else {
        this.deleteSelectedIndicator(indicator);
      }
      await this.savePreset();
    },

    deleteSelectedAsset(asset: DynamicObject) {
      let index = -1;

      for (const [indexSelectedAsset, selectedAsset] of this.selectedAssets.entries()) {
        if (selectedAsset.ID === asset.ID) {
          index = indexSelectedAsset;
          break;
        }
      }

      if (index !== -1) {
        this.selectedAssets.splice(index, 1);
        this.selectedAssetsDetails.splice(index, 1);
        this.chartMainYAxis.splice(index, 1);
        this.isNeedUpdateChart = true;
        if (this.selectedAssets.length > 0) {
          Object.assign(this.basicAsset, this.selectedAssets[0]);
        } else {
          if (asset.ID === this.basicAsset.ID) {
            this.basicAsset = {
              ID: '',
              NAME: '',
            };
          }
        }
      }
    },

    deleteSelectedIndicator(indicator: DynamicObject) {
      const index = this.selectedIndicators.indexOf(indicator);
      if (index !== -1) {
        this.selectedIndicators.splice(index, 1);
      }
    },

    redrawChart() {
      this.isNeedUpdateChart = true;
      this.isDisablePage = true;
    },

    resetSelectedAssets() {
      this.selectedAssets = [];
      this.basicAsset = {
        ID: '',
        NAME: '',
      };
      this.isNeedUpdateChart = true;
    },

    resetSelectedIndicators() {
      this.selectedIndicators = [];
      this.isNeedUpdateChart = true;
    },

    isSelectedAsset(asset: DynamicObject) {
      try {
        if (!this.selectedAssets.length) return false;
        for (const assetElement of this.selectedAssets) {
          if (!assetElement.ID) return false;
          if (assetElement.ID === asset.ID) {
            return true;
          }
        }
        return false;
      } catch (e) {
        console.error('techStore isSelectedAsset');
        console.error(e);
        return false;
      }
    },

    isSelectedIndicator(indicator: DynamicObject) {
      try {
        if (!this.selectedIndicators.length) return false;
        for (const indicatorElement of this.selectedIndicators) {
          if (!indicatorElement.ID) return false;
          if (indicatorElement.ID === indicator.ID) {
            return true;
          }
        }
        return false;
      } catch (e) {
        console.error('techStore isSelectedIndicator');
        console.error(e);
        return false;
      }
    },

    selectBasicAsset(asset: DynamicObject) {
      if (this.basicAsset.ID === asset.ID) return;
      Object.assign(this.basicAsset, asset);
    },

    async setSaveList() {
      const userStore = useUserStore();
      this.saveList = [];
      const api = useApiFinplan();
      const response = await api.getSaveListExt(userStore.getId);
      try {
        if (!Array.isArray(response.data)) return;
        response.data.forEach((item) => {
          this.saveList.push({
            label: item.UF_SAVENAME,
            id: item.UF_TEMPLATE_ID,
          });
        });
        // console.log(this.saveList);
      } catch (e) {
        console.error('setSaveList error');
        console.error(e);
      }
    },

    async initAssets() {
      try {
        const today = new Date().getTime();
        const lsKey = 'assetsToCompare';
        this.allAssets = [];

        // Кеш активов
        if (localStorage.getItem(lsKey)) {
          // @ts-ignore
          const lsData = JSON.parse(localStorage.getItem(lsKey));
          const dayCompare = today - lsData.date;
          if (dayCompare < 86400000) {
            this.allAssets = lsData.allAssets;
            return;
          }
          localStorage.removeItem(lsKey);
        }

        const api = useApiFinplan();
        const resRusAssets = await api.getActionList();
        const resUsaAssets = await api.getActionListUsa();
        let rusAssets: any[] = [];
        let usaAssets: any[] = [];

        if (resRusAssets.data) {
          rusAssets = Object.values(resRusAssets.data);
        }
        if (resUsaAssets.data) {
          usaAssets = Object.values(resUsaAssets.data);
        }

        this.allAssets = [...rusAssets, ...usaAssets];

        localStorage.setItem(
          lsKey,
          JSON.stringify({
            date: today,
            allAssets: this.allAssets,
          }),
        );
      } catch (e) {
        console.error('techAn store');
        console.error(e);
      }
    },

    async initIndicators() {
      try {
        this.allIndicators = [];
        const api = useApiFinplan();
        const res = await api.getIndicatorsList('full');
        if (Array.isArray(res.data)) {
          this.allIndicators = [...res.data];
        }
      } catch (e) {
        console.error('techAn store initIndicators');
        console.error(e);
      }
    },

    async initSelectedAssetsDetails() {
      try {
        this.isRequestSelectedAssetsDetails = true;
        const api = useApiFinplan();
        if (!this.selectedAssets.length) return;
        for (const asset of this.selectedAssets) {
          const find = this.selectedAssetsDetails.find(
            (assetDetail) => assetDetail.ID === asset.ID,
          );
          if (!find) {
            const res = await api.getDetailInfo(`${asset.ISIN}_${asset.REGION}`, 'min', 'ISIN');
            if (res.data) {
              this.selectedAssetsDetails.push(res.data);
            }
          }
        }
        this.isRequestSelectedAssetsDetails = false;
        // console.log(this.selectedAssetsDetails);
      } catch (e) {
        console.error('techStore initSelectedAssetsDetails');
        console.error(e);
      }
    },

    initChart() {
      try {
        this.isNeedUpdateChart = false;
        if (Array.isArray(this.chartMainYAxis)) {
          this.selectedAssetsDetails.forEach((asset, assetIndex) => {
            let isExist = false;
            if (this.chartMainYAxis.length > 0) {
              for (const assetElement of this.chartMainYAxis) {
                if (assetElement.id === asset.ID) {
                  isExist = true;
                  break;
                }
              }
            }
            if (!isExist) {
              this.chartMainYAxis.push({
                type: 'ohlc',
                name: asset.NAME,
                id: asset.ID,
                yAxis: 0,
                data: [],
              });
              this.candleChart.mainSeries.push({
                type: 'candlestick',
                yAxis: 0,
                name: asset.NAME,
                id: asset.ID,
                data: [],
              });
              this.lineChart.mainSeries.push({
                type: 'line',
                yAxis: 0,
                name: asset.NAME,
                id: asset.ID,
                data: [],
              });
              Object.values(asset.MOEX_ACTION_DATA).forEach((data: any) => {
                const date = new Date(data.UF_DATE).getTime();
                this.chartMainYAxis[assetIndex].data.push({
                  x: date,
                  y: Number(data.UF_CLOSE),
                  high: Number(data.UF_HIGH),
                  low: Number(data.UF_LOW),
                  close: Number(data.UF_CLOSE),
                  open: Number(data.UF_OPEN),
                });
                this.candleChart.mainSeries[assetIndex].data.push([
                  date,
                  Number(data.UF_OPEN),
                  Number(data.UF_HIGH),
                  Number(data.UF_LOW),
                  Number(data.UF_CLOSE),
                ]);
                this.lineChart.mainSeries[assetIndex].data.push(Number(data.UF_CLOSE));
                this.lineChart.categories.push(date);
              });
              // this.chartMainYAxis[assetIndex].data.sort((x, y) => {
              //   if (x[0] === y[0]) {
              //     return 0;
              //   }
              //   return x[0] < y[0] ? -1 : 1;
              // });
            }
          });
        }

        this.isNeedUpdateChart = true;
        // console.log(this.chartMainYAxis);
      } catch (e) {
        console.error('techAn initChart');
        console.error(e);
      }
    },

    async savePreset() {
      try {
        if (!this.selectedPreset) return;
        const api = useApiFinplan();
        let annotations = [];
        if (localStorage.customStockToolsChart) {
          const lsData = JSON.parse(localStorage.customStockToolsChart);
          if (lsData.presetName === this.selectedPreset) {
            annotations = lsData.annotations;
          }
        }
        const preset = {
          selectedAssets: this.selectedAssets,
          selectedIndicators: this.selectedIndicators,
          basicAsset: this.basicAsset,
          annotations,
        };
        await api.setGraphData(this.userId, this.selectedPreset, {
          data: {
            ...preset,
          },
        });
      } catch (e) {
        console.error('savePreset pinia');
        console.error(e);
      }
    },

    async loadPreset(selectedPreset: any = '') {
      try {
        const api = useApiFinplan();
        // console.log(selectedPreset);

        if (selectedPreset.label !== this.selectedPreset) {
          await this.savePreset();
          this.selectedPreset = selectedPreset;
        }

        this.isDisablePage = true;
        this.selectedPreset = selectedPreset.label;
        const res = await api.getGraphData(this.userId, this.selectedPreset);

        this.basicAsset = {
          ID: '',
          NAME: '',
        };
        this.selectedAssets = [];
        this.selectedIndicators = [];
        this.annotations = [];

        if (res.data.data) {
          const saveData = JSON.parse(res.data.data);

          this.basicAsset = saveData.basicAsset;
          this.selectedAssets = [...saveData.selectedAssets];

          await this.initSelectedAssetsDetails();
          this.initChart();

          this.selectedIndicators = [...saveData.selectedIndicators];
          this.annotations = [...saveData.annotations];
        }
        this.isDisablePage = false;
      } catch (e) {
        console.error('loadPreset pinia');
        console.error(e);
        this.isDisablePage = false;
      }
    },

    async resetPreset() {
      try {
        if (this.selectedPreset) {
          this.isDisablePage = true;

          this.basicAsset = {
            ID: '',
            NAME: '',
          };
          this.selectedAssets = [];
          this.selectedIndicators = [];
          this.selectedAssetsDetails = [];
          this.annotations = [];

          await this.savePreset();

          this.isNeedUpdateChart = true;
          this.isDisablePage = false;
        }
      } catch (e) {
        console.error('resetPreset pinia');
        console.error(e);
      }
    },

    async createNewPreset(newPresetName: string) {
      try {
        if (newPresetName) {
          this.isDisablePage = true;
          this.selectedPreset = newPresetName;

          await this.savePreset();
          await this.setSaveList();

          this.isDisablePage = false;
        }
      } catch (e) {
        console.error('createNewPost pinia');
        console.error(e);
      }
    },

    async deletePreset() {
      try {
        if (this.selectedPreset !== '') {
          this.isDisablePage = true;
          const api = useApiFinplan();
          await api.deleteGraphData(this.userId, this.selectedPreset);

          this.basicAsset = {
            ID: '',
            NAME: '',
          };
          this.selectedAssets = [];
          this.selectedIndicators = [];
          this.selectedAssetsDetails = [];
          this.annotations = [];

          this.selectedPreset = '';

          await this.setSaveList();

          this.isNeedUpdateChart = true;
        }
      } catch (e) {
        console.error('deletePreset pinia');
        console.error(e);
      } finally {
        this.isDisablePage = false;
      }
    },

    addAnnotationToggle() {
      this.isAnnotationSelected = !this.isAnnotationSelected;
      if (this.isAnnotationSelected) {
        document.body.style.cursor = 'crosshair';
      } else {
        document.body.style.cursor = 'default';
      }
    },

    updateAddAnnotation() {
      if (this.isAnnotationSelected) {
        this.addAnnotationToggle();
      }
    },

    inputAssetSearch(value: string) {
      const _value = value.toLowerCase();

      if (_value === '') {
        this.allAssets = [];
        this.allAssets = [...this.allAssetsBackup];
        this.allAssetsBackup = [];
        return;
      }

      if (this.allAssetsBackup.length === 0) {
        this.allAssetsBackup = [...this.allAssets];
      }

      this.allAssets = [];

      this.allAssets = this.allAssetsBackup.filter((el) => {
        if (el.NAME.toLowerCase().includes(_value)) {
          return el;
        }
      });
    },

    inputIndicatorSearch(value: string) {
      const _value = value.toLowerCase();

      if (_value === '') {
        this.allIndicators = [];
        this.allIndicators = [...this.allIndicatorsBackup];
        this.allIndicatorsBackup = [];
        return;
      }

      if (this.allIndicatorsBackup.length === 0) {
        this.allIndicatorsBackup = [...this.allIndicators];
      }

      this.allIndicators = [];

      this.allIndicators = this.allIndicatorsBackup.filter((el) => {
        if (el.NAME.toLowerCase().includes(_value)) {
          return el;
        }
      });
    },
  },
});

if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useTechAnalysisStore, import.meta.hot));
