<template>
  <div class="tableHistory">
    <div class="tableHistory__container">
      <ListHeaderPortfolioIncome class="tableHistory__header" />
      <ScrollArea>
        <table class="tableHistory__table">
          <thead>
            <tr>
              <th v-for="(title, index) in tableTitles" :key="index">{{ title }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in tableItems" :key="index">
              <td>
                <div class="tableHistory__itemTitle">{{ item.title }}</div>
                <div v-if="item.subtitle" class="tableHistory__itemSubtitle">
                  {{ item.subtitle }}
                </div>
              </td>
              <td>{{ item.accrualDate }}</td>
              <td>{{ item.revenuePerUnit }}</td>
              <td>{{ item.quantity }}</td>
              <td>{{ item.sum }}</td>
            </tr>
          </tbody>
        </table>
      </ScrollArea>
      <ListHeaderRadarPortfolioNavigation class="tableHistory__nav" />
    </div>
  </div>
</template>

<script lang="ts">
import ScrollArea from '@/components/ScrollArea/index.vue';
import ListHeaderPortfolioHistoryOperations from '@/components/Lists/RadarPortfolio/modules/Header/modules/Types/HistoryOperations/index.vue';
import ListHeaderRadarPortfolioNavigation from '@/components/Lists/RadarPortfolio/modules/Header/modules/Navigation/index.vue';
import ListHeaderPortfolioIncome from '@/components/Lists/RadarPortfolio/modules/Header/modules/Types/Icome/index.vue';
import iconTrash from '@/assets/icons/portfolio/trash.svg';
import iconEdit from '@/assets/icons/portfolio/edit.svg';

export default defineComponent({
  name: 'ListActivesRadarPortfolioTableIncome',
  components: {
    ListHeaderPortfolioIncome,
    ListHeaderRadarPortfolioNavigation,
    ListHeaderPortfolioHistoryOperations,
    ScrollArea,
  },
  props: {
    tableTitles: {
      type: Array,
      required: true,
    },
    tableItems: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    return {
      iconTrash,
      iconEdit,
    };
  },
});
</script>

<style scoped lang="scss">
.tableHistory {
  &__table {
    width: 100%;
    white-space: nowrap;
    background: #fff;
    border-collapse: collapse;
  }

  &__container {
    @include wrap-pad();
  }

  &__header {
    margin-top: 35px;
  }

  tr {
    border: 1px solid #e5e5e5;
  }

  th {
    padding: 15px 25px;
    color: #797979;
    font-weight: 500;
    font-size: 10px;
    line-height: 150%;
    text-align: left;
    border: 1px solid #e5e5e5;
    border-bottom-width: 3px;
  }

  td {
    padding: 15px 25px;
    color: #000;
    font-weight: 500;
    font-size: 14px;
    line-height: 150%;
  }

  &__itemSubtitle {
    display: inline-block;
    color: #9a9a9a;
    font-size: 10px;
    line-height: 120%;
    border-bottom: 1px solid #9a9a9a;
  }

  &__tdSum {
    margin-right: 50px;
  }

  &__tdRow {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__tdActions {
    padding-right: 20px;
  }

  &__tdAction {
    $_size: 15px;

    min-width: $_size;
    min-height: $_size;
    cursor: pointer;

    &:not(:last-child) {
      margin-right: 10px;
    }
  }

  &__nav {
    justify-content: flex-end;
  }

  @include respond-to(1200) {
    th {
      padding: 20px 40px;
      font-size: 16px;
    }

    td {
      padding: 25px 40px;
      font-size: 20px;
    }

    &__itemSubtitle {
      font-size: 16px;
    }

    &__tdAction {
      $_size: 20px;

      min-width: $_size;
      min-height: $_size;

      &:not(:last-child) {
        margin-right: 20px;
      }
    }
  }
}
</style>
