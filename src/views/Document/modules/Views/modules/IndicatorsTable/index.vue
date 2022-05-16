<template>
  <div v-if="isInit" class="tableIndicators">
    <div class="greyBg">
      <div class="flexWrapperColumn">
        <div class="table">
          <DocumentIndicatorsTableAlert />
          <div class="tableProps flexRowBetween">
            <DocumentIndicatorsTableProps @onChangeParam="onChangeParam" />
            <DocumentIndicatorsTableUtils />
          </div>
        </div>
      </div>
    </div>
    <div class="tableIndicatorsScroller">
      <div class="greyBg">
        <div class="flexWrapperColumn">
          <DocumentIndicatorsTableHeader
            :data="data"
            :categories="categories"
            :quarters="quarters"
          />
          <DocumentIndicatorsTableRow
            v-for="itemKey in getDataKeys"
            :key="itemKey"
            :item="data[itemKey]"
            :id="itemKey"
            :isReportPage="isReportPage"
            @onChangeChartDataView="onChangeChartDataView"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import DocumentIndicatorsTableAlert from '@/views/Document/modules/Views/modules/IndicatorsTable/modules/Alert/index.vue';
import DocumentIndicatorsTableProps from '@/views/Document/modules/Views/modules/IndicatorsTable/modules/Props/index.vue';
import DocumentIndicatorsTableUtils from '@/views/Document/modules/Views/modules/IndicatorsTable/modules/Utils/index.vue';
import DocumentIndicatorsTableRow from '@/views/Document/modules/Views/modules/IndicatorsTable/modules/Row/index.vue';
import DocumentIndicatorsTableHeader from '@/views/Document/modules/Views/modules/IndicatorsTable/modules/Header/index.vue';

export default defineComponent({
  name: 'DocumentIndicatorsTable',
  emits: ['onChangeParam', 'onChangeChartDataView'],
  props: {
    isInit: {
      type: Boolean,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
    categories: {
      type: Object,
      required: true,
    },
    quarters: {
      type: Array,
      required: true,
    },
    isReportPage: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    DocumentIndicatorsTableHeader,
    DocumentIndicatorsTableRow,
    DocumentIndicatorsTableUtils,
    DocumentIndicatorsTableProps,
    DocumentIndicatorsTableAlert,
  },
  setup(props, { emit }) {
    const onChangeParam = (paramName: string) => {
      emit('onChangeParam', paramName);
    };

    const onChangeChartDataView = (paramName: string) => {
      emit('onChangeChartDataView', paramName);
    };

    const getDataKeys = computed(() => Object.keys(props.data));

    return {
      onChangeParam,
      onChangeChartDataView,
      getDataKeys,
    };
  },
});
</script>

<style lang="scss">
.tableIndicators {
  $_colWidth: 100px;

  .underline {
    border-bottom: 1px solid #e3e3e3;
  }

  .whiteBg {
    .flexWrapperRow {
      margin: auto;
      padding: 15px 200px;

      .tableRowIndicator {
        display: flex;
        align-items: center;
      }
    }
  }

  .greyBg {
    .flexWrapperColumn {
      margin: auto;
      padding: 0 200px;
      overflow-x: hidden;

      .tableHeader {
        display: none;
      }
    }
  }

  .flexWrapperColumn {
    .table {
      width: 100%;

      .tableAlert {
        margin-bottom: 60px;

        > p {
          margin-left: 20px;
          color: #b0b0b0;
          font-size: 15px;
        }
      }

      .tableProps {
        display: flex;
        justify-content: space-between;

        .period {
          width: max-content;
          height: 37px;
          margin-left: -30px;

          > span {
            margin-left: 30px;
            padding: 0 0 15px 0;
            font-weight: 600;
            font-size: 13px;
            line-height: 150%;
            text-transform: uppercase;
            cursor: pointer;
          }

          > span:hover {
            color: #fec006;
          }

          .picked {
            color: #2a8634;
            border-bottom: 4px solid #2a8634;
          }
        }

        .utils {
          width: max-content;
          margin-bottom: 10px;

          .switcher {
            display: flex;
            align-items: center;
            width: max-content;

            > p {
              margin-left: 10px;
              color: #b0b0b0;
              font-size: 14px;
              white-space: nowrap;
            }
          }

          .arrows {
            width: max-content;

            .arrow-right {
              transform: rotate(180deg);
            }

            > img {
              width: 20px;
              height: 20px;
              margin-left: 23px;
              cursor: pointer;
            }
          }
        }
      }
    }
  }

  .flexWrapperRow {
    justify-content: space-between;

    .tableParams {
      display: flex;
      flex-direction: row;
      margin-bottom: 15px;

      .clickedParam {
        background-color: #f7f7f7;
      }

      .clickedParam:hover {
        background-color: #fec006;
      }

      > p {
        width: max-content;
        padding: 15px 40px;
        border-radius: 30px;
        cursor: pointer;
      }

      .unclickedParam:hover {
        color: #fec006;
      }
    }

    > span {
      width: 20%;
      color: #797979;
      font-weight: 500;
      font-size: 15px;
      font-style: normal;
      line-height: 150%;
    }

    .periods {
      //width: 75%;
      //overflow-x: hidden;

      > p {
        min-width: $_colWidth;
        max-width: $_colWidth;
        color: #797979;
        font-weight: 500;
        font-size: 15px;
        font-style: normal;
        line-height: 150%;
      }
    }
  }

  .flexWrapperColumn {
    .tableRowName {
      background-color: #f7f7f7;
    }
  }

  .flexWrapperColumn {
    .pickedRow {
      background: #dedede;

      .tableRowName {
        background: #dedede;
      }
    }

    .tableRow {
      justify-content: space-between;
      padding: 15px 0;
      overflow-x: hidden;
      border-bottom: 1px solid #e8e8e8;
      cursor: pointer;

      .rowIndex {
        position: relative;
        z-index: 1;
        width: 100%;

        > img {
          width: 25px;
          height: 25px;
          margin-right: 20px;
        }
      }

      .rowValue {
        justify-content: space-between;
        //width: 75%;
        //overflow-x: hidden;

        > p {
          display: flex;
          min-width: $_colWidth;
          max-width: $_colWidth;
        }
      }
    }

    .tableRow:hover {
      background-color: white;

      .tableRowName {
        background-color: white;
      }

      .rowIndex {
        padding-left: 30px;
        transition: padding-left 0.3s ease;
      }
    }
  }

  @media (max-width: 1400px) {
    .whiteBg {
      .flexWrapperRow {
        padding: 15px 100px;
      }
    }

    .tableProps {
      .utils {
        display: flex;
        justify-content: space-between;
      }
    }

    .greyBg {
      .flexWrapperColumn {
        padding: 0 100px;
        overflow-x: hidden;

        .tableHeader {
          display: none;
        }
      }
    }
  }

  @media (max-width: 1400px) {
    .whiteBg {
      .flexWrapperRow {
        padding: 15px 100px;
      }
    }

    .greyBg {
      .flexWrapperColumn {
        padding: 0 100px;
        overflow-x: hidden;

        .tableHeader {
          display: none;
        }
      }
    }
  }

  @media (max-width: 900px) {
    .whiteBg {
      .flexWrapperRow {
        padding: 15px 100px;
      }
    }

    .greyBg {
      .flexWrapperColumn {
        padding: 0 100px;
        overflow-x: hidden;

        .tableHeader {
          display: none;
        }

        .tableRow:hover {
          background-color: unset;

          .rowIndex {
            margin-left: unset;
            transition: unset;
          }
        }
      }
    }
  }

  @media (max-width: 1000px) {
    .tableIndicatorsScroller {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      overflow-x: auto;
    }

    .flexWrapperRow {
      overflow-x: scroll;

      .periods {
        //width: 1050px;
      }
    }

    .whiteBg {
      .flexWrapperRow {
        justify-content: unset;
        max-width: unset;
        padding: 0 20px;

        .tableRowIndicator {
          max-width: 100px;
          margin-right: 80px;
        }

        .periods {
          width: unset;
        }
      }
    }

    .greyBg {
      .flexWrapperColumn {
        max-width: unset;
        margin: unset;
        padding: 0 20px;
        overflow-x: scroll;

        .table {
          .tableProps {
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
            margin-top: 0;
            margin-bottom: 20px;
            padding: 0;

            .utils {
              margin-top: 20px;

              .arrows {
                display: none;
              }

              .switcher {
                display: flex;
                flex-direction: row;
                align-items: center;
              }
            }
          }
        }

        .tableHeader {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          width: 1400px;
          margin-bottom: 10px;

          > span {
            margin-right: 187px;
          }

          .periods {
            display: flex;
            flex-direction: row;
            justify-content: space-between;

            > p {
              width: 213px;
            }
          }
        }

        .tableRow {
          //width: 1050px;
          justify-content: unset;

          .rowIndex {
            max-width: 100px;
            margin-right: 80px;
          }

          .rowValue {
            width: unset;
          }
        }
      }
    }
  }
}
</style>
