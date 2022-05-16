<template>
  <div class="chart-wrapper">
    <div
      class="highcharts-stocktools-wrapper highcharts-bindings-container highcharts-bindings-wrapper"
    >
      <div class="highcharts-menu-wrapper">
        <!--        <div class="utils">-->
        <!--          <div class="utils__item">-->
        <!--            <svg-->
        <!--              fill="none"-->
        <!--              height="18"-->
        <!--              viewBox="0 0 19 18"-->
        <!--              width="19"-->
        <!--              xmlns="http://www.w3.org/2000/svg"-->
        <!--            >-->
        <!--              <path-->
        <!--                d="M2.5 11H1.5V15H9.75M2.5 11V1H6M2.5 11H17M17 11H18V15H9.75M17 11V1H6M9.75 15V17.5M6 1V7.5"-->
        <!--                stroke="black"-->
        <!--                stroke-width="2"-->
        <!--              />-->
        <!--            </svg>-->
        <!--          </div>-->
        <!--          <div class="utils__item">-->
        <!--            <svg-->
        <!--              fill="none"-->
        <!--              height="16"-->
        <!--              viewBox="0 0 16 16"-->
        <!--              width="16"-->
        <!--              xmlns="http://www.w3.org/2000/svg"-->
        <!--            >-->
        <!--              <path d="M1 1L14.5 14.5" stroke="black" stroke-width="2" />-->
        <!--            </svg>-->
        <!--          </div>-->
        <!--          <div class="utils__item">-->
        <!--            <svg-->
        <!--              fill="none"-->
        <!--              height="17"-->
        <!--              viewBox="0 0 18 17"-->
        <!--              width="18"-->
        <!--              xmlns="http://www.w3.org/2000/svg"-->
        <!--            >-->
        <!--              <path-->
        <!--                d="M1.5 14V15.5H3M8 9.5L11.5 6M3 11L4.5 8L11 1.5L13.5 3.75L16 6L9.5 12.5L6 14L3 11Z"-->
        <!--                stroke="black"-->
        <!--                stroke-width="2"-->
        <!--              />-->
        <!--            </svg>-->
        <!--          </div>-->
        <!--          <div class="utils__item">-->
        <!--            <svg-->
        <!--              fill="none"-->
        <!--              height="15"-->
        <!--              viewBox="0 0 13 15"-->
        <!--              width="13"-->
        <!--              xmlns="http://www.w3.org/2000/svg"-->
        <!--            >-->
        <!--              <path d="M6.5 14.5V1M6.5 1H0.5M6.5 1H12.5" stroke="black" stroke-width="2" />-->
        <!--            </svg>-->
        <!--          </div>-->
        <!--          <div class="utils__item">-->
        <!--            <svg-->
        <!--              fill="none"-->
        <!--              height="19"-->
        <!--              viewBox="0 0 19 19"-->
        <!--              width="19"-->
        <!--              xmlns="http://www.w3.org/2000/svg"-->
        <!--            >-->
        <!--              <path-->
        <!--                clip-rule="evenodd"-->
        <!--                d="M5.79285 1.70708L7.08574 2.99998L0.792847 9.29287L0.0857407 9.99998L0.792847 10.7071L7.79285 17.7071L8.49995 18.4142L9.20706 17.7071L16.2071 10.7071L16.9142 9.99998L16.2071 9.29287L9.20706 2.29287L8.49995 1.58576L7.20706 0.29287L5.79285 1.70708ZM2.91417 9.99998L8.49995 4.41419L14.0857 9.99998L8.49995 15.5858L2.91417 9.99998ZM17 19C18.1045 19 19 18.1045 19 17C19 15.8954 18.1045 15 17 15C15.8954 15 15 15.8954 15 17C15 18.1045 15.8954 19 17 19Z"-->
        <!--                fill="black"-->
        <!--                fill-rule="evenodd"-->
        <!--              />-->
        <!--            </svg>-->
        <!--          </div>-->
        <!--          <div class="utils__item utils__item&#45;&#45;eye">-->
        <!--            <svg-->
        <!--              fill="none"-->
        <!--              height="13"-->
        <!--              viewBox="0 0 15 13"-->
        <!--              width="15"-->
        <!--              xmlns="http://www.w3.org/2000/svg"-->
        <!--            >-->
        <!--              <path-->
        <!--                d="M7.32615 1.44849C3.47545 1.44849 1.52542 4.90424 1.03174 6.63212C1.402 8.36 3.17924 11.8158 7.32615 11.8158C11.4731 11.8158 13.2503 8.36 13.6206 6.63212C13.1269 4.90424 11.1769 1.44849 7.32615 1.44849Z"-->
        <!--                stroke="black"-->
        <!--                stroke-width="1.48104"-->
        <!--              />-->
        <!--            </svg>-->
        <!--          </div>-->
        <!--          <div class="utils__item utils__item&#45;&#45;timeInterval">-->
        <!--            <select>-->
        <!--              <option selected value="0">1м</option>-->
        <!--              <option value="1">3м</option>-->
        <!--              <option value="2">6м</option>-->
        <!--              <option value="3">1г</option>-->
        <!--              <option value="4">2г</option>-->
        <!--              <option value="5">max</option>-->
        <!--            </select>-->
        <!--          </div>-->
        <!--        </div>-->

        <ul
          class="utils highcharts-stocktools-toolbar stocktools-toolbar"
          :class="[{ 'utils--dark-mode': getDarkModeStatus }]"
        >
          <li class="utils__item" title="Цвета">
            <!--            <span class="highcharts-menu-item-btn" />-->
            <!--            <span class="highcharts-submenu-item-arrow highcharts-arrow-right" />-->
            <svg
              fill="none"
              height="18"
              viewBox="0 0 19 18"
              width="19"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.5 11H1.5V15H9.75M2.5 11V1H6M2.5 11H17M17 11H18V15H9.75M17 11V1H6M9.75 15V17.5M6 1V7.5"
                stroke="black"
                stroke-width="2"
              />
            </svg>
            <div class="utils__menu">
              <div class="utils__wrap-title">Цвет линии</div>
              <ColorPicker
                :class="[
                  'utils__color-picker',
                  { 'utils__color-picker--active': isStrokeColorActive },
                ]"
                :color="getAnnotationStrokeColor"
                style="width: 220px"
                theme="light"
                @changeColor="onChangeAnnotationStrokeColor"
              />
              <div
                :class="[
                  'utils__color-field',
                  { 'utils__color-field--active': isStrokeColorActive },
                ]"
                title="Изменить цвет линии"
                @click="onClickAnnotationStrokeColor"
              >
                <div class="utils__color" :style="`background: ${getAnnotationStrokeColor}`" />
              </div>
              <div class="utils__wrap-title">Цвет заливки</div>
              <ColorPicker
                :class="[
                  'utils__color-picker',
                  { 'utils__color-picker--active': isFillColorActive },
                ]"
                :color="getAnnotationStrokeColor"
                style="width: 220px"
                theme="light"
                @changeColor="onChangeAnnotationFillColor"
              />
              <div
                :class="['utils__color-field', { 'utils__color-field--active': isFillColorActive }]"
                title="Изменить цвет заливки"
                @click="onClickAnnotationFillColor"
              >
                <div class="utils__color" :style="`background: ${getAnnotationFillColor}`" />
              </div>
            </div>
          </li>
          <li class="utils__item" title="Элементы">
            <!--            <span class="highcharts-menu-item-btn" />-->
            <!--            <span class="highcharts-submenu-item-arrow highcharts-arrow-right" />-->
            <svg
              fill="none"
              height="16"
              viewBox="0 0 16 16"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1 1L14.5 14.5" stroke="black" stroke-width="2" />
            </svg>
            <div class="utils__menu">
              <div class="utils__wrap-title">Линии</div>
              <ul class="utils__grid">
                <li class="highcharts-segment" title="Отрезок" @click="onClickAnnotation">
                  <span class="highcharts-menu-item-btn" />
                </li>
                <li
                  class="highcharts-horizontal-line"
                  title="Горизонтальная прямая"
                  @click="onClickAnnotation"
                >
                  <span class="highcharts-menu-item-btn" />
                </li>
                <li
                  class="highcharts-vertical-line"
                  title="Вертикальная прямая"
                  @click="onClickAnnotation"
                >
                  <span class="highcharts-menu-item-btn" />
                </li>
                <!--                <li class="highcharts-arrow-segment" title="Arrow segment">-->
                <!--                  <span class="highcharts-menu-item-btn" />-->
                <!--                </li>-->
                <!--                <li class="highcharts-ray" title="Ray">-->
                <!--                  <span class="highcharts-menu-item-btn" />-->
                <!--                </li>-->
                <li class="highcharts-infinity-line" title="Прямая" @click="onClickAnnotation">
                  <span class="highcharts-menu-item-btn" />
                </li>
                <li class="highcharts-arrow-ray" title="Луч" @click="onClickAnnotation">
                  <span class="highcharts-menu-item-btn" />
                </li>
                <!--                <li class="highcharts-arrow-infinity-line" title="Arrow line">-->
                <!--                  <span class="highcharts-menu-item-btn" />-->
                <!--                </li>-->
              </ul>
              <div class="utils__wrap-title">Области</div>
              <ul class="utils__grid">
                <li
                  class="highcharts-parallel-channel"
                  title="Параллельные каналы"
                  @click="onClickAnnotation"
                >
                  <span class="highcharts-menu-item-btn" />
                </li>
                <li class="highcharts-measure-y" title="Область Y" @click="onClickAnnotation">
                  <span class="highcharts-menu-item-btn" />
                </li>
                <li class="highcharts-measure-x" title="Область X" @click="onClickAnnotation">
                  <span class="highcharts-menu-item-btn" />
                </li>
              </ul>
              <!--              <ul class="utils__grid">-->
              <!--                <li class="highcharts-elliott3" title="Elliott 3 line">-->
              <!--                  <span class="highcharts-menu-item-btn" />-->
              <!--                </li>-->
              <!--                <li class="highcharts-elliott5" title="Elliott 5 line">-->
              <!--                  <span class="highcharts-menu-item-btn" />-->
              <!--                </li>-->
              <!--                <li class="highcharts-crooked3" title="Crooked 3 line">-->
              <!--                  <span class="highcharts-menu-item-btn" />-->
              <!--                </li>-->
              <!--                <li class="highcharts-crooked5" title="Crooked 5 line">-->
              <!--                  <span class="highcharts-menu-item-btn" />-->
              <!--                </li>-->
              <!--              </ul>-->
              <div class="utils__wrap-title">Каналы</div>
              <ul class="utils__grid">
                <li class="highcharts-pitchfork" title="Вилы" @click="onClickAnnotation">
                  <span class="highcharts-menu-item-btn" />
                </li>
              </ul>
              <div class="utils__wrap-title">Фигуры</div>
              <ul class="utils__grid">
                <li class="highcharts-circle-annotation" title="Круг" @click="onClickAnnotation">
                  <span class="highcharts-menu-item-btn" />
                </li>
                <li
                  class="highcharts-rectangle-annotation"
                  title="Прямоугольник"
                  @click="onClickAnnotation"
                >
                  <span class="highcharts-menu-item-btn" />
                </li>
                <li class="highcharts-ellipse-annotation" title="Эллипс" @click="onClickAnnotation">
                  <span class="highcharts-menu-item-btn" />
                </li>
              </ul>
              <div class="utils__wrap-title">Фибоначчи</div>
              <ul class="utils__grid">
                <li class="highcharts-fibonacci" title="Фибоначчи" @click="onClickAnnotation">
                  <span class="highcharts-menu-item-btn" />
                </li>
                <li
                  class="highcharts-fibonacci-time-zones"
                  title="Часовые пояса Фибоначчи"
                  @click="onClickAnnotation"
                >
                  <span class="highcharts-menu-item-btn" />
                </li>
              </ul>
            </div>
          </li>
          <li class="utils__item" title="Маркеры">
            <!--            <span class="highcharts-menu-item-btn" />-->
            <!--            <span class="highcharts-submenu-item-arrow highcharts-arrow-right" />-->
            <svg
              fill="none"
              height="17"
              viewBox="0 0 18 17"
              width="18"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.5 14V15.5H3M8 9.5L11.5 6M3 11L4.5 8L11 1.5L13.5 3.75L16 6L9.5 12.5L6 14L3 11Z"
                stroke="black"
                stroke-width="2"
              />
            </svg>
            <div class="utils__menu">
              <div class="utils__wrap-title">Маркеры</div>
              <ul class="utils__grid">
                <li class="highcharts-circle-annotation" title="Круг" @click="onClickAnnotation">
                  <span class="highcharts-menu-item-btn" />
                </li>
                <li
                  class="highcharts-rectangle-annotation"
                  title="Прямоугольник"
                  @click="onClickAnnotation"
                >
                  <span class="highcharts-menu-item-btn" />
                </li>
                <li class="highcharts-ellipse-annotation" title="Эллипс" @click="onClickAnnotation">
                  <span class="highcharts-menu-item-btn" />
                </li>
              </ul>
            </div>
          </li>
          <li class="utils__item" title="Настройки текста">
            <!--            <span class="highcharts-menu-item-btn" />-->
            <!--            <span class="highcharts-submenu-item-arrow highcharts-arrow-right" />-->
            <svg
              fill="none"
              height="15"
              viewBox="0 0 13 15"
              width="13"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6.5 14.5V1M6.5 1H0.5M6.5 1H12.5" stroke="black" stroke-width="2" />
            </svg>
            <div class="utils__menu">
              <div class="utils__wrap-title">Заметка</div>
              <div class="utils__tools-grid">
                <div class="utils__tool" title="Добавить">
                  <div
                    class="utils__tool-icon highcharts-inputText-annotation"
                    @click="onClickAddText"
                  >
                    <img alt="Добавить" src="@/assets/icons/techAn/plus.svg" />
                  </div>
                </div>
                <!--                <div class="utils__tool" title="Стилизация">-->
                <!--                  <div class="utils__tool-icon">-->
                <!--                    <img alt="Стилизация" src="@/assets/icons/techAn/brush.svg" />-->
                <!--                  </div>-->
                <!--                </div>-->
              </div>
              <!--              <div class="utils__input-field">-->
              <!--                <label for="labelText">Текст</label>-->
              <!--                <textarea id="labelText" v-model="fontSize" type="text" />-->
              <!--              </div>-->
              <div class="utils__input-field utils__input-field--number">
                <label for="fontSize">Размер шрифта</label>
                <input id="fontSize" v-model="fontSize" type="number" />
              </div>
              <!--              <div class="utils__text-style">-->
              <!--                <div class="utils__wrap-title">Цвет шрифта</div>-->
              <!--                <div class="utils__input-field utils__input-field&#45;&#45;number">-->
              <!--                  <label for="fontPadding">Отступы</label>-->
              <!--                  <input id="fontPadding" v-model="fontSize" type="number" />-->
              <!--                </div>-->
              <!--              </div>-->
              <!--              <button class="dropdown-item highcharts-inputText-annotation">Text</button>-->
            </div>
          </li>
          <li
            class="utils__item utils__item--color-mode"
            title="Цвет фона"
            @click="onClickColorMode"
          >
            <!--            <span class="highcharts-menu-item-btn" />-->
            <!--            <span class="highcharts-submenu-item-arrow highcharts-arrow-right" />-->
            <svg
              fill="none"
              height="19"
              viewBox="0 0 19 19"
              width="19"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clip-rule="evenodd"
                d="M5.79285 1.70708L7.08574 2.99998L0.792847 9.29287L0.0857407 9.99998L0.792847 10.7071L7.79285 17.7071L8.49995 18.4142L9.20706 17.7071L16.2071 10.7071L16.9142 9.99998L16.2071 9.29287L9.20706 2.29287L8.49995 1.58576L7.20706 0.29287L5.79285 1.70708ZM2.91417 9.99998L8.49995 4.41419L14.0857 9.99998L8.49995 15.5858L2.91417 9.99998ZM17 19C18.1045 19 19 18.1045 19 17C19 15.8954 18.1045 15 17 15C15.8954 15 15 15.8954 15 17C15 18.1045 15.8954 19 17 19Z"
                fill="black"
                fill-rule="evenodd"
              />
            </svg>
          </li>
          <li class="utils__item utils__item--chart-mode" title="Сменить вид графика">
            <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5 19h-4v-8h4v8zm6 0h-4v-18h4v18zm6 0h-4v-12h4v12zm6 0h-4v-4h4v4zm1 2h-24v2h24v-2z"
              />
            </svg>
            <div class="utils__menu">
              <div class="utils__wrap-title">Вид графика</div>
              <div
                :class="[
                  'utils__chart-mode-item',
                  { 'utils__chart-mode-item--active': getSelectedChartMode === 'ohlc' },
                ]"
                @click="changeChartMode('ohlc')"
              >
                OHLC
              </div>
              <div
                :class="[
                  'utils__chart-mode-item',
                  { 'utils__chart-mode-item--active': getSelectedChartMode === 'candle' },
                ]"
                @click="changeChartMode('candle')"
              >
                Свечи
              </div>
              <div
                :class="[
                  'utils__chart-mode-item',
                  { 'utils__chart-mode-item--active': getSelectedChartMode === 'line' },
                ]"
                @click="changeChartMode('line')"
              >
                Линии
              </div>
            </div>
          </li>
          <li
            class="utils__item utils__item--eye highcharts-toggle-annotations right"
            title="Скрыть аннотации"
          >
            <!--            <span class="highcharts-menu-item-btn" />-->
            <svg
              fill="none"
              height="13"
              viewBox="0 0 15 13"
              width="15"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.32615 1.44849C3.47545 1.44849 1.52542 4.90424 1.03174 6.63212C1.402 8.36 3.17924 11.8158 7.32615 11.8158C11.4731 11.8158 13.2503 8.36 13.6206 6.63212C13.1269 4.90424 11.1769 1.44849 7.32615 1.44849Z"
                stroke="black"
                stroke-width="1.48104"
              />
            </svg>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ColorPicker } from 'vue-color-kit';
import { useEmitter, emitEvents } from '@/use/useEmitter';
import 'vue-color-kit/dist/vue-color-kit.css';
import { useTechAnalysisStore } from '@/store/pinia/technicalAnalysis';

export default defineComponent({
  name: 'TechnicalAnalysisPageChartLeftUtils',
  components: {
    ColorPicker,
  },
  setup() {
    const techStore = useTechAnalysisStore();
    const emitter = useEmitter();

    const isStrokeColorActive = ref(false);
    const isFillColorActive = ref(false);

    const fontSize = ref(14);

    emitter.on(emitEvents.closeAnnotationChangeColor, () => {
      isStrokeColorActive.value = false;
      isFillColorActive.value = false;
    });

    const onClickColorMode = () => {
      techStore.toggleDarkMode();
    };

    const onClickAddText = () => {
      document.body.style.cursor = 'crosshair';
    };

    const onClickChangeColors = () => {
      emitter.emit(emitEvents.clickAnnotationChangeColor);
    };

    const onClickAnnotationStrokeColor = () => {
      isFillColorActive.value = false;
      isStrokeColorActive.value = !isStrokeColorActive.value;
    };

    const onClickAnnotationFillColor = () => {
      isStrokeColorActive.value = false;
      isFillColorActive.value = !isFillColorActive.value;
    };

    const onChangeAnnotationStrokeColor = (color) => {
      techStore.changeSelectedAnnotationsColors('stroke', color);
      emitter.emit(emitEvents.changeAnnotationStrokeColor);
    };

    const onChangeAnnotationFillColor = (color) => {
      techStore.changeSelectedAnnotationsColors('fill', color);
      emitter.emit(emitEvents.changeAnnotationFillColor);
    };

    const onClickAnnotation = () => {
      techStore.addAnnotationToggle();
    };

    const changeChartMode = (mode: 'ohlc' | 'candle' | 'line') => {
      techStore.$patch({
        selectedChartMode: mode,
      });
    };

    return {
      onClickAnnotation,
      onClickAddText,
      onClickChangeColors,
      onChangeAnnotationStrokeColor,
      onChangeAnnotationFillColor,
      onClickAnnotationStrokeColor,
      onClickAnnotationFillColor,
      onClickColorMode,
      changeChartMode,
      getAnnotationStrokeColor: computed(() => techStore.selectedAnnotationsColors.stroke),
      getAnnotationFillColor: computed(() => techStore.selectedAnnotationsColors.fill),
      getDarkModeStatus: computed(() => techStore.isDarkMode),
      getSelectedChartMode: computed(() => techStore.selectedChartMode),
      isStrokeColorActive,
      isFillColorActive,
      fontSize,
    };
  },
});
</script>

<style scoped lang="scss">
.utils {
  $block: &;

  position: absolute;
  top: 80px;
  display: flex;
  flex-direction: column;
  padding-left: 15px;

  &__chart-mode-item {
    cursor: pointer;
    background: #fff;
    padding: 10px 4px;
    margin-top: 10px;
    margin-bottom: 5px;

    &:hover {
      background: #fec006;
    }

    &:last-child {
      margin-bottom: 10px;
    }

    &--active {
      cursor: default;
      background: #2a8634;
      color: #fff;

      &:hover {
        background: #2a8634;
      }
    }
  }

  &__input-field {
    padding-bottom: 15px;
    color: #797979;
    font-size: 14px;
    font-family: $ff-montserrat;

    label {
      display: block;
      margin-bottom: 10px;
      font-weight: 500;
      letter-spacing: -1px;
    }

    input {
      padding: 10px 6px;
      border: none;
    }

    textarea {
      min-width: 130px;
    }

    &--number {
      display: flex;
      align-items: center;

      label {
        margin-right: 10px;
        margin-bottom: 0;
      }

      input {
        width: 70px;
        height: 40px;
      }
    }
  }

  &__tool {
    $_size: 35px;

    display: flex;
    align-items: center;
    justify-content: center;
    width: $_size;
    height: $_size;
    background: #fff;
    cursor: pointer;

    &:hover {
      background: #fec006;
    }
  }

  &__tool-icon {
    $_size: 15px;

    width: $_size;
    height: $_size;

    img {
      width: $_size;
      height: $_size;
      object-fit: cover;
    }
  }

  &__color-field {
    margin-top: 10px;
    margin-bottom: 10px;
    //position: relative;
    //display: inline-block;
    padding: 5px;
    background: #fff;
    cursor: pointer;

    &:hover {
      background: #fec006;
    }

    &--active {
      background: #deaa0a;
    }
  }

  &__color {
    $_size: 30px;

    height: $_size;
  }

  &__color-picker {
    position: absolute;
    left: 60px;
    display: none;

    &--active {
      display: block;
    }
  }

  &__wrap-title {
    color: #797979;
    font-weight: 500;
    font-size: 14px;
    letter-spacing: -1px;
  }

  &__grid {
    display: grid !important;
    grid-gap: 1px;
    grid-template-columns: repeat(3, 1fr);
    padding-top: 10px;
    padding-bottom: 15px;
    padding-left: 0;

    li {
      &:hover {
        background: #fec006;
      }
    }
  }

  &__tools-grid {
    display: grid;
    grid-gap: 1px;
    grid-template-columns: repeat(3, 35px);
    padding-top: 10px;
    padding-bottom: 15px;
    padding-left: 0;
  }

  &__menu {
    top: -1px;
    min-width: 120px;
    padding: 10px 10px 0;
    background: #f7f7f7;
  }

  &__item {
    $_size: 42px;

    display: flex;
    align-items: center;
    justify-content: center;
    width: $_size;
    height: $_size;
    border: 1px solid #ececec;

    &:hover {
      background: #f7f7f7;
      border-color: #f7f7f7;
    }

    &--eye {
      position: relative;
      cursor: pointer;

      &::before {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 3px;
        height: 3px;
        margin: auto;
        background: #000;
        border-radius: 100%;
        content: '';
      }
    }

    &--color-mode {
      cursor: pointer;
    }

    &--timeInterval {
      margin-top: 38px;
      background: #2a8634;

      select {
        padding: 8px 0;
        color: #fff;
        font-size: 12px;
        font-family: $ff-montserrat;
        text-align: center;
        text-transform: uppercase;
        background: none;
        border: 0;
        outline: 0;
        cursor: pointer;
        appearance: none;

        option {
          color: #000;
          font-size: 12px;
          font-family: $ff-montserrat;
          text-transform: uppercase;
        }

        &:focus {
          outline: none;
        }

        &::-ms-expand {
          display: none;
        }
      }
    }
  }

  @include respond-to(1220) {
    top: 100px;

    &__item {
      &--timeInterval {
        display: none;
      }
    }
  }

  &--dark-mode {
    #{$block} {
      $_color-softdark: #fff;

      &__item {
        background: #000;
        border-color: #2e2e2e;

        & path {
          stroke: #fff;
        }

        &--eye::before {
          background: #fff;
        }

        &:hover {
          background: #2e2e2e;
        }
      }

      &__menu {
        background: #2e2e2e;
      }

      &__grid li {
        background: $_color-softdark;

        & path {
          stroke: #fff;
        }

        &:hover {
          background: #fec006;
        }
      }

      &__tool {
        background: $_color-softdark;

        &:hover {
          background: #fec006;
        }
      }

      &__wrap-title {
        color: #fff;
      }

      &__input-field {
        &--number {
          input {
            background: $_color-softdark;
          }
        }
      }
    }
  }
}

// ---------------------
.highcharts-stocktools-toolbar li .utils__menu {
  position: absolute;
  left: 0;
  z-index: 1;
  display: none;
}

.highcharts-stocktools-toolbar li:hover .utils__menu {
  left: 40px;
  display: block;
}

.highcharts-stocktools-toolbar li > span.highcharts-menu-item-btn {
  display: block;
  width: 40px;
  height: 100%;
  background-repeat: no-repeat;
  background-position: 50% 50%;
}

.highcharts-menu-wrapper {
  position: absolute;
  top: 0;
  left: 0;
}

.highcharts-bindings-wrapper .highcharts-submenu-wrapper {
  //position: absolute;
  //top: -1px;
  //left: 40px;
  //z-index: 10;
  display: none;
  //width: 40px;
  //background: #fff;
}

.highcharts-bindings-wrapper .highcharts-stocktools-toolbar li {
  position: relative;
  height: 40px;
  list-style: none;
}

.highcharts-bindings-wrapper li {
  background: #fff;
}

.highcharts-bindings-wrapper li > span.highcharts-menu-item-btn {
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 32px 32px;
  cursor: pointer;
}

.highcharts-label-annotation > .highcharts-menu-item-btn {
  background-image: url('https://code.highcharts.com/gfx/stock-icons/label.svg');
}

.highcharts-circle-annotation > .highcharts-menu-item-btn {
  background-image: url('https://code.highcharts.com/gfx/stock-icons/circle.svg');
}

.highcharts-rectangle-annotation > .highcharts-menu-item-btn {
  background-image: url('https://code.highcharts.com/gfx/stock-icons/rectangle.svg');
}

.highcharts-ellipse-annotation > .highcharts-menu-item-btn {
  background-image: url('https://code.highcharts.com/gfx/stock-icons/ellipse.svg');
}

.highcharts-segment > .highcharts-menu-item-btn {
  background-image: url('https://code.highcharts.com/gfx/stock-icons/segment.svg');
}

.highcharts-arrow-segment > .highcharts-menu-item-btn {
  background-image: url('https://code.highcharts.com/gfx/stock-icons/arrow-segment.svg');
}

.highcharts-ray > .highcharts-menu-item-btn {
  background-image: url('https://code.highcharts.com/gfx/stock-icons/ray.svg');
}

.highcharts-arrow-ray > .highcharts-menu-item-btn {
  background-image: url('https://code.highcharts.com/gfx/stock-icons/arrow-ray.svg');
}

.highcharts-infinity-line > .highcharts-menu-item-btn {
  background-image: url('https://code.highcharts.com/gfx/stock-icons/line.svg');
}

.highcharts-arrow-infinity-line > .highcharts-menu-item-btn {
  background-image: url('https://code.highcharts.com/gfx/stock-icons/arrow-line.svg');
}

.highcharts-horizontal-line > .highcharts-menu-item-btn {
  background-image: url('https://code.highcharts.com/gfx/stock-icons/horizontal-line.svg');
}

.highcharts-vertical-line > .highcharts-menu-item-btn {
  background-image: url('https://code.highcharts.com/gfx/stock-icons/vertical-line.svg');
}

.highcharts-fibonacci-time-zones > .highcharts-menu-item-btn {
  background-image: url('https://code.highcharts.com/gfx/stock-icons/fibonacci-timezone.svg');
}

.highcharts-elliott3 > .highcharts-menu-item-btn {
  background-image: url('https://code.highcharts.com/gfx/stock-icons/elliott-3.svg');
}

.highcharts-elliott5 > .highcharts-menu-item-btn {
  background-image: url('https://code.highcharts.com/gfx/stock-icons/elliott-5.svg');
}

.highcharts-crooked3 > .highcharts-menu-item-btn {
  background-image: url('https://code.highcharts.com/gfx/stock-icons/crooked-3.svg');
}

.highcharts-crooked5 > .highcharts-menu-item-btn {
  background-image: url('https://code.highcharts.com/gfx/stock-icons/crooked-5.svg');
}

.highcharts-measure-x > .highcharts-menu-item-btn {
  background-image: url('https://code.highcharts.com/gfx/stock-icons/measure-x.svg');
}

.highcharts-measure-y > .highcharts-menu-item-btn {
  background-image: url('https://code.highcharts.com/gfx/stock-icons/measure-y.svg');
}

.highcharts-fibonacci > .highcharts-menu-item-btn {
  background-image: url('https://code.highcharts.com/gfx/stock-icons/fibonacci.svg');
}

.highcharts-pitchfork > .highcharts-menu-item-btn {
  background-image: url('https://code.highcharts.com/gfx/stock-icons/pitchfork.svg');
}

.highcharts-parallel-channel > .highcharts-menu-item-btn {
  background-image: url('https://code.highcharts.com/gfx/stock-icons/parallel-channel.svg');
}

.highcharts-toggle-annotations > .highcharts-menu-item-btn {
  background-image: url('https://code.highcharts.com/gfx/stock-icons/annotations-visible.svg');
}

.highcharts-vertical-counter > .highcharts-menu-item-btn {
  background-image: url('https://code.highcharts.com/gfx/stock-icons/vertical-counter.svg');
}

.highcharts-vertical-label > .highcharts-menu-item-btn {
  background-image: url('https://code.highcharts.com/gfx/stock-icons/vertical-label.svg');
}

.highcharts-vertical-arrow > .highcharts-menu-item-btn {
  background-image: url('https://code.highcharts.com/gfx/stock-icons/vertical-arrow.svg');
}

.highcharts-vertical-double-arrow > .highcharts-menu-item-btn {
  background-image: url('https://code.highcharts.com/gfx/stock-icons/vertical-double-arrow.svg');
}

.highcharts-full-screen > .highcharts-menu-item-btn {
  background-image: url('https://code.highcharts.com/gfx/stock-icons/fullscreen.svg');
}
</style>
