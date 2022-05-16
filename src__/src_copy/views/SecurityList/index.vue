<template>
  <div class="allStocks">
    <div class="flexWrapperColumn">
      <div class="stocksHeader defaultBlack27px">
        <template v-if="route.params.type === 'stocks' && route.params.region === 'rus'">
          <h1 class="allStocks__title">{{ $t('assetsList.stockRu') }}</h1>
        </template>
        <template v-if="route.params.type === 'stocks' && route.params.region === 'usa'">
          <h1 class="allStocks__title">{{ $t('assetsList.stockEn') }}</h1>
        </template>
        <template v-else-if="route.params.type === 'bonds'">
          <h1 class="allStocks__title">{{ $t('assetsList.bond') }}</h1>
        </template>
        <template v-else-if="route.params.type === 'etf'">
          <h1 class="allStocks__title">{{ $t('assetsList.etf') }}</h1>
        </template>
        <template v-else-if="route.params.type === 'indexes'">
          <h1 class="allStocks__title">{{ $t('assetsList.indexes') }}</h1>
        </template>
      </div>
      <Swiper class="stocksFilter" :free-mode="true" :slides-per-view="'auto'" :space-between="10">
        <SwiperSlide
          v-for="filter in getAllStocks"
          :key="filter.name"
          @click="changeFilter(filter)"
        >
          <span :class="{ isPicked: filter.isPicked }">{{ filter.name }}</span>
        </SwiperSlide>
      </Swiper>
      <div class="stocksMain">
        <div class="stocks">
          <template v-if="route.params.type === 'bonds' || route.params.type === 'etf'">
            <Alert
              v-if="route.params.type === 'bonds'"
              label="В скобках указаны доходность и дата погашения облигаций"
            />
            <Alert
              v-if="route.params.type === 'etf'"
              label="В скобках указаны последняя цена закрытия, прирост за месяц и комиссия"
            />
          </template>
          <Alert v-else label="В скобках указаны последняя цена закрытия и прирост за месяц" />
          <StocksContainer />
        </div>
        <div class="rightInfo">
          <UtilsColumn />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';

import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import mutations from '../../store/mutations';

import Alert from '../../components/alert/Alert.vue';
import StocksContainer from '../../components/stocksContainer/StocksContainer.vue';
import { useSSR } from '@/use/useSSR';
import { appStore } from '@/store/app';
import UtilsColumn from '@/views/SecurityList/modules/UtilsColumn/index.vue';

const { STOCKS_FILTER_CHANGE_PICKED, STOCKS_FILTER_CURRENT } = mutations;

export default defineComponent({
  name: 'SecurityList',
  components: {
    UtilsColumn,
    StocksContainer,
    Alert,
    Swiper,
    SwiperSlide,
  },

  setup() {
    const store = useStore();
    const route = useRoute();

    const getAllStocks = computed(() => store.getters['stocksFiltersStore/allStocks']);
    const getCurrentFilter = computed(() => store.getters['stocksFiltersStore/currentFilter']);

    const changeFilter = (pickedFilter) => {
      // store.commit(`stocksFiltersStore/${STOCKS_FILTER_CHANGE_PICKED}`);
      // store.commit(`stocksFiltersStore/${STOCKS_FILTER_CURRENT}`, pickedFilter);
    };

    return {
      route,
      getAllStocks,
      changeFilter,
    };
  },
});
</script>

<style scoped lang="scss">
.allStocks {
  background: #f1f1f1;

  .flexWrapperColumn {
    margin: auto;
  }

  &__title {
    @include respond-max-to(600) {
      padding: 0 20px;
    }
  }

  .stocksHeader {
    padding: 10px 0 9px 0;
    border-bottom: 1px solid #cbcbcb;
  }

  .stocksFilter {
    padding: 22px 0;
    border-bottom: 1px solid #cbcbcb;

    .isPicked {
      color: #fff;
      background-color: #00943d;
      border-radius: 5px;

      &:hover {
        color: #fff;
      }
    }

    span {
      //width: max-content;
      padding: 5px 10px;
      color: #656464;
      font-size: 14px;
      font-style: normal;
      line-height: 17px;
      cursor: pointer;

      &:hover {
        color: green;
      }
    }
  }

  .stocksMain {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .stocks {
      display: flex;
      flex-direction: column;
      width: 75%;
      padding: 10px 0;

      @include respond-max-to(1100) {
        width: 65%;
      }

      @include respond-max-to(800) {
        width: 100%;
      }
    }

    .rightInfo {
      display: flex;
      flex-direction: column;

      @include respond-max-to(800) {
        display: none;
      }
    }

    @include respond-max-to(600) {
      padding: 0 20px;
    }
  }

  .swiper-slide {
    width: auto;

    @include respond-max-to(600) {
      &:first-child {
        margin-left: 20px;
      }
      &:last-child {
        margin-right: 20px;
      }
    }
  }

  .swiper-container {
    margin-right: unset;
    margin-left: unset;
  }
}
</style>
