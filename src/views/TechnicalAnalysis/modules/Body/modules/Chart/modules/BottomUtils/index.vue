<template>
  <div class="chart-wrapper">
    <div
      class="highcharts-stocktools-wrapper highcharts-bindings-container highcharts-bindings-wrapper"
    >
      <div class="highcharts-menu-wrapper">
        <div class="utils">
          <div class="utils__left">
            <div id="techAnClearBtn" class="utils__btn utils__btn--mr">
              <svg
                fill="none"
                height="24"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.5 21L21.5 11.5L13.5 3L9.25019 7.24981M12.5 21H8.5L2 14.5L9.25019 7.24981M12.5 21L17.5 15.5L9.25019 7.24981M12.5 21H21.5"
                  stroke="white"
                />
              </svg>
              <span>Очистить график</span>
            </div>
            <div id="techAnDeleteBtn" class="utils__btn">
              <svg
                fill="none"
                height="24"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.07317 5.66667L6.03877 21.0626C6.07182 21.5895 6.50883 22 7.03681 22H17.451C17.979 22 18.416 21.5895 18.449 21.0626L19.4146 5.66667H16.3415M2 5.66667H8.14634M23 5.66667H19.6707H16.3415M16.3415 5.66667V2C16.3415 1.44771 15.8937 1 15.3415 1H9.14634C8.59406 1 8.14634 1.44772 8.14634 2V5.66667M16.3415 5.66667H8.14634M8.65854 8L9.17073 18.7333M12.2439 18.7333V8M15.3171 18.7333L15.8293 8"
                  stroke="white"
                />
              </svg>
              <span>Удалить элемент</span>
            </div>
          </div>
          <div class="utils__right">
            <div class="utils__btn highcharts-full-screen">
              <svg
                fill="none"
                height="24"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clip-rule="evenodd"
                  d="M2.5 2H2V2.5V8V9.20711L2.85355 8.35355L3.35355 7.85355L4.35355 6.85355L5.25 5.95711L11.2929 12L5.25 18.0429L4.35355 17.1464L3.60355 16.3964L2.85355 15.6464L2 14.7929V16V21.5V22H2.5H8H9.20711L8.35355 21.1464L7.85355 20.6464L6.85355 19.6464L5.95711 18.75L12 12.7071L18.0429 18.75L17.6464 19.1464L17.1464 19.6464L16.3964 20.3964L16.0214 20.7714L15.6464 21.1464L14.7929 22H16H17.375H18.75H20H20.75H21.5H22V21.5V21V20.5V19.5V18.5V16V14.7929L21.1464 15.6464L20.3964 16.3964L19.6464 17.1464L19.0214 17.7714L18.75 18.0429L12.7071 12L18.75 5.95711L19.1464 6.35355L19.6464 6.85355L20.3964 7.60355L20.7714 7.97855L21.1464 8.35355L22 9.20711V8V6.625V5.25V4V3.25V2.5V2H21.5H21H20.5H19.5H18.5H16H14.7929L15.6464 2.85355L16.3964 3.60355L17.1464 4.35355L17.7714 4.97855L18.0429 5.25L12 11.2929L5.95711 5.25L6.85355 4.35355L7.60355 3.60355L8.35355 2.85355L9.20711 2H8H2.5ZM5.29289 4.5L5.25 4.54289L5.20711 4.5H5.29289ZM4.54289 5.25L4.5 5.20711V5.29289L4.54289 5.25ZM4.5 18.7071L4.54289 18.75L4.5 18.7929L4.5 18.7071ZM5.25 19.4571L5.20711 19.5H5.29289L5.25 19.4571Z"
                  fill="white"
                  fill-rule="evenodd"
                />
              </svg>
              <span>На весь экран</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TechnicalAnalysisPageChartBottomUtils',
});
</script>

<style scoped lang="scss">
.utils {
  position: absolute;
  bottom: 17px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 15px;

  &__left {
    display: flex;
  }

  &__btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    background: #2a8634;
    border-radius: 5px;
    cursor: pointer;

    span {
      display: none;
      margin-left: 20px;
      color: #fff;
      font-weight: 500;
      font-size: 12px;
      font-family: $ff-montserrat;
      text-transform: uppercase;
    }

    &:hover {
      background: #fec006;
    }

    &--mr {
      margin-right: 6px;
    }
  }

  @include respond-to(1000) {
    &__btn {
      width: auto;
      height: auto;
      padding: 15px 30px;

      span {
        display: inline-block;
      }
    }
  }
}
</style>
