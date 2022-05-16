<template>
  <div v-if="getCandle || getCurrentFinancialData" class="schedule greyBg">
    <div class="flexWrapperRow">
      <ChartCandle v-if="getCandle" :data="getCandle" />
      <div v-if="getCurrentFinancialData" class="graphParameters">
        <h1>Параметры и показатели</h1>
        <DocumentProgress />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import ChartCandle from '@/components/Charts/Candle/index.vue';
import DocumentProgress from '@/views/Document/modules/Body/modules/Progress/index.vue';

export default defineComponent({
  name: 'DocumentBody',
  components: { DocumentProgress, ChartCandle },
  setup() {
    const store = useStore();

    return {
      getCandle: store.getters['documentStore/getCandle'],
      getCurrentFinancialData: store.getters['documentStore/getCurrentFinancialData'],
    };
  },
});
</script>

<style lang="scss">
.schedule {
  .flexWrapperRow {
    margin: auto;
  }

  .graph {
    width: 68%;
    height: 500px;
    background-color: lightblue;
  }

  .graphParameters {
    width: 32%;
    margin-top: -20px;
    margin-left: auto;
    padding: 0 0 0 30px;

    > h1 {
      display: none;
      margin-bottom: 30px;
      font-size: 22px;
    }

    .progress {
      margin-top: 35px;

      .progressInfo {
        align-items: flex-start;
        margin-bottom: -10px;

        > span {
          width: max-content;
          margin-bottom: 30px;
          color: black;
          font-size: 18px;
          line-height: 20px;
          white-space: nowrap;
        }

        > p {
          margin: 0;
          color: #b2b2b2;
          font-size: 14px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }

  @media (max-width: 1500px) {
    .graphParameters {
      .progress {
        .progressInfo {
          > span {
            margin-left: 4px;
            font-size: 12px;
          }

          > p {
            font-size: 12px;
          }
        }
      }
    }
  }

  @media (max-width: 1000px) {
    .flexWrapperRow {
      flex-direction: column;
      width: 100%;

      .graph {
        width: 100%;
      }

      .graphParameters {
        width: 100%;
        margin-top: 20px;
        padding: 0;

        .progress {
          .progressInfo {
            > span {
              font-size: 15px;
            }

            > p {
              font-size: 15px;
            }
          }
        }
      }
    }
  }

  @media (max-width: 600px) {
    .flexWrapperRow {
      flex-direction: column;
      padding: 20px;

      .graph {
        width: 100%;
        height: 300px;
      }

      .graphParameters {
        width: 100%;
        margin-top: 30px;
        padding: 0;

        > h1 {
          display: block;
        }
      }
    }
  }
}
</style>
