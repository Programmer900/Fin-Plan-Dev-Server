<template>
  <template v-if="itemsMap.size !== 0">
    <div v-for="(symbol, index) in itemsMap" :key="index" class="stock">
      <h3>{{ symbol[0] }}</h3>
      <div class="stocksGrid" :style="getGridRowsCount(symbol[1])">
        <template v-if="route.params.type === 'stocks'">
          <LinkStock v-for="item in symbol[1]" :key="item.ID" class="linkList" :item="item" />
        </template>
        <template v-else-if="route.params.type === 'bonds'">
          <LinkBond v-for="item in symbol[1]" :key="item.ID" class="linkList" :item="item" />
        </template>
        <template v-else-if="route.params.type === 'etf'">
          <LinkETF v-for="item in symbol[1]" :key="item.ID" class="linkList" :item="item" />
        </template>
        <template v-else-if="route.params.type === 'indexes'">
          <LinkIndex v-for="item in symbol[1]" :key="item.ID" class="linkList" :item="item" />
        </template>
        <template v-else><h1>Ошибка. Неизвестный тип ценной бумаги.</h1></template>
      </div>
    </div>
  </template>
  <Loader v-else class="stock__loader" />
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useSSR } from '@/use/useSSR';
import { IActivesList, IActivesListItem } from '@/interfaces/finplan/index';
import LinkStock from '@/views/SecurityList/modules/Link/Stock.vue';
import LinkBond from '@/views/SecurityList/modules/Link/Bond.vue';
import LinkETF from '@/views/SecurityList/modules/Link/ETF.vue';
import Loader from '@/components/Loader/index.vue';
import { DynamicObject } from '@/interfaces';
import LinkIndex from '@/views/SecurityList/modules/Link/Index.vue';
import { useApiFinplan } from '@/use/api/useApiFinplan';

export default defineComponent({
  name: 'StocksContainer',
  components: {
    LinkIndex,
    Loader,
    LinkETF,
    LinkBond,
    LinkStock,
  },
  setup() {
    const api = useApiFinplan();
    const response = ref<IActivesList | any>(null);
    const items = ref<DynamicObject[]>([]);
    const itemsMap = ref<any>(new Map());
    const route = useRoute();

    const getGridRowsCount = (arr: []): string => {
      const { length } = arr;
      if (length > 6) {
        return `grid-template-columns: repeat(2, 45%); grid-template-rows: repeat(${Math.round(
          length / 2,
        )}, 1fr)`;
      }
      return `grid-template-columns: repeat(1, 100%); grid-template-rows: repeat(${length}, 1fr)`;
    };

    const createGrid = (): void => {
      let lastFirstSymbol = '';
      let itemsArr: any[] = [];

      items.value.forEach((item: IActivesListItem | DynamicObject) => {
        const itemFirstSymbol = String(item.NAME.charAt(0));

        if (lastFirstSymbol !== itemFirstSymbol) {
          if (lastFirstSymbol !== '') {
            itemsMap.value.set(lastFirstSymbol, [...itemsArr]);
          }
          itemsArr = [];
          lastFirstSymbol = itemFirstSymbol;
          itemsArr.push(item);
        } else if (lastFirstSymbol !== '') {
          itemsArr.push(item);
        }
      });
    };

    const init = async () => {
      if (route.params.type === 'stocks') {
        const _response = await api.getActivesList(
          String(route.params.region).toUpperCase(),
          'shares',
          1000,
          1,
        );
        response.value = _response.data;
        items.value = [...response.value.ITEMS];
        createGrid();
      } else if (route.params.type === 'bonds') {
        const _response = await api.getActivesList('RUS', 'obligations', 1000000, 1);
        response.value = _response.data;
        // console.log(response.value);
        items.value = [...response.value.ITEMS];
        createGrid();
      } else if (route.params.type === 'etf') {
        const _response = await api.getActivesList('RUS', 'shares_etf', 1000000, 1);
        response.value = _response.data;
        items.value = [...response.value.ITEMS];
        createGrid();
      } else if (route.params.type === 'indexes') {
        const _response = await api.getActivesList('RUS', 'indexes', 1000000, 1);
        // console.log(_response.data);
        response.value = _response.data;
        const resItems = response.value.ITEMS[0];
        // console.log(resItems);
        Object.keys(resItems).forEach((key) => {
          items.value.push({
            TICKER: resItems[key].TICKER,
            NAME: resItems[key].NAME,
            ID: resItems[key].ID,
            EXCLUDE_FILTER: resItems[key].EXCLUDE_FILTER,
          });
        });
        createGrid();
      }
    };

    useSSR(async () => {
      await init();
    });

    watch(
      () => route.params,
      () => {
        itemsMap.value = new Map();
        items.value = [];
        response.value = '';
        init();
      },
    );

    return {
      itemsMap,
      route,
      getGridRowsCount,
    };
  },
});
</script>

<style scoped lang="scss">
.stock {
  flex-direction: column;
  margin-top: 50px;

  > h3 {
    color: #00943d;
    font-weight: 600;
    font-size: 20px;
    font-style: normal;
    line-height: 24px;
  }

  ::v-deep .linkList__itemLastPrice {
    color: #00943d;
  }

  ::v-deep &__increase {
    &--bad {
      color: #ed1d1d;
    }

    &--good {
      color: #00943d;
    }

    &--no-data {
      color: #656464;
    }
  }

  &__loader {
    margin-top: 30px;
  }

  .stocksGrid {
    display: grid;

    ::v-deep .linkList {
      display: flex;
      align-items: center;
      padding-top: 10px;

      &__wrap {
        display: flex;
      }
    }

    ::v-deep .linkList__link {
      display: inline-block;
      width: max-content;
      margin-right: 5px;
      color: #000;
      font-weight: normal;
      font-size: 16px;
      font-style: normal;
      line-height: 20px;
      text-decoration: none;

      &:hover {
        color: #00943d;
      }
    }

    @include respond-max-to(980) {
      grid-auto-flow: unset !important;
      grid-template-rows: unset !important;
      grid-template-columns: repeat(1, 100%) !important;
    }

    grid-auto-flow: column;
    grid-column-gap: 4%;
  }
}
</style>
