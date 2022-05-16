<template lang="pug">
.table-common
  .table-common__helpers
    TableCommonPagination(@onScrollTable='onScrollTable')
  ScrollArea.table-common__scroll-area(:disable-desktop='true')
    table.table-common__table
      thead.table-common__thead
        tr.table-common__tr
          th.table-common__th.table-common__fixed.table-common__fixed--th {{ indexTitle }}
          th.table-common__th(
            v-for='(colTitle, index) in colTitles',
            :key='index',
            :style='`left: ${currentTableScroll}px`'
          ) {{ colTitle }}
      tbody.table-common__tbody
        tr.table-common__tr.table-common__tr--item(
          v-for='(row, rowIndex) in rows',
          :key='rowIndex',
          @click='onClickRow(row.id || rowIndex)',
          :class='[{ "table-common__tr--selected": row.picked || false }]'
        )
          td.table-common__td.table-common__fixed.table-common__row-title
            router-link(v-if='row.link', :to='row.link') {{ row.title }}
            span(v-else) {{ row.title }}
          td.table-common__td.table-common__values(
            v-for='(value, valueIndex) in row.values',
            :key='valueIndex',
            :style='`left: ${currentTableScroll}px`'
          ) {{ Number(value).toFixed(2) }}
</template>

<script lang="ts">
import { ref } from 'vue';
import { ITableCommonRow, ITableCommonTabs } from '@/components/Tables/Common/types';
import TableCommonRow from '@/components/Tables/Common/Row/index.vue';
import TableCommonPagination from '@/components/Tables/Common/Pagination/index.vue';
import TableCommonColTitles from '@/components/Tables/Common/ColTitles/index.vue';
import ScrollArea from '@/components/ScrollArea/index.vue';

export default defineComponent({
  name: 'TableCommon',
  components: {
    ScrollArea,
    TableCommonColTitles,
    TableCommonPagination,
    TableCommonRow,
  },
  emits: ['clickRow', 'onChangeParam', 'onChangeChartDataView'],
  props: {
    allowPick: {
      type: Boolean,
      default: false,
    },
    showPagination: {
      type: Boolean,
      default: true,
    },
    colTitles: {
      type: Array as () => string[],
      required: true,
    },
    rows: {
      type: Array as () => ITableCommonRow[],
      required: true,
    },
    tabs: {
      type: Array as () => ITableCommonTabs[],
      default: () => [],
    },
    alertText: {
      type: String,
      default: '',
    },
    indexTitle: {
      type: String,
      default: '',
    },
  },
  setup(props, { emit }) {
    const currentTableScroll = ref<number>(0);

    const onChangeParam = (paramName: string) => {
      currentTableScroll.value = 0;
      emit('onChangeParam', paramName);
    };

    const onChangeChartDataView = (paramName: string) => {
      emit('onChangeChartDataView', paramName);
    };

    const onScrollTable = (direction: string): void => {
      switch (direction) {
        case 'left': {
          if (currentTableScroll.value !== 0) {
            currentTableScroll.value += 100;
          }
          break;
        }
        case 'right': {
          currentTableScroll.value -= 100;
          break;
        }
        default: {
          console.warn('Неизвестное направление скрола');
          break;
        }
      }
    };

    const onClickRow = (id: number) => {
      emit('clickRow', id);
    };

    return {
      onScrollTable,
      onChangeParam,
      onChangeChartDataView,
      onClickRow,
      currentTableScroll,
    };
  },
});
</script>

<style lang="scss">
.table-common {
  $block: &;
  $_col-pad-r: 20px;

  &__table {
    position: relative;
    border-collapse: collapse;
  }

  &__thead {
    background: #fff;
  }

  &__th,
  &__td {
    position: relative;
    font-size: 14px;
  }

  &__th {
    padding: 10px $_col-pad-r 10px 0;
    font-weight: 400;
    text-align: left;
  }

  &__td {
    $_row-pad-top-bottom: 30px;

    padding: $_row-pad-top-bottom $_col-pad-r $_row-pad-top-bottom 0;
  }

  &__tr {
    &--item {
      cursor: pointer;

      &:hover {
        background: #fff;
      }
    }

    &--selected {
      background: #e8e8e8;

      #{$block} {
        &__fixed {
          background: #e8e8e8;
        }
      }

      &:hover {
        background: #cecece;
      }
    }
  }

  &__tr--item:hover > &__fixed {
    padding-left: 20px;
    background: #fff;
    transition: padding-left 0.2s ease;
  }

  &__tr--selected:hover > &__fixed {
    background: #cecece;
  }

  &__fixed {
    z-index: 1;
    width: 100%;
    max-width: 180px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    background: #f7f7f7;

    a {
      color: #000;
      white-space: nowrap;
    }

    &--th {
      background: #fff;
    }
  }

  &__row-title {
    font-weight: 700;
  }

  &__scroll-area {
    ::v-deep(.scrollArea__wrap) {
      display: block;
    }
  }

  &__helpers {
    margin-bottom: 20px;
  }

  @include respond-to(1300) {
    &__fixed {
      max-width: 200px;
    }
  }

  @include respond-max-to(500) {
    &__fixed {
      max-width: 140px;
    }
  }
}
</style>
