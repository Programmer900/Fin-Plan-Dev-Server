<template>
  <div class="whiteBg">
    <div class="flexWrapperColumn">
      <div>
        <div class="stocks">
          <div class="stocksHeader flexRowBetween">
            <div v-if="stock" class="imageNameContainer">
              <!--              <div class="logo" />-->
              <h1 class="default-w-400">
                {{ $t('securityHeader.stock.name') }} {{ stock.RADAR_DATA.COMPANY.NAME }}
              </h1>
            </div>
            <h1 v-else class="default-w-400">...</h1>
            <div class="priceAndIndexes">
              <span v-if="stock" class="default-w-400"
                >{{ stock.RADAR_DATA.PROPS.LASTPRICE }} ₽</span
              >
              <span v-else class="default-w-400">... ₽</span>
              <div v-if="getIndexes" class="types default-w-bold">
                <span v-for="index of getIndexes" :key="index">{{ index }}</span>
              </div>
              <div v-else class="types default-w-bold" style="height: 0" />
            </div>
          </div>
        </div>
        <div class="stock">
          <div class="stockInfoHeader">
            <div class="stockInfoHeaderDescription">
              <p v-if="stock" class="default-w-400">
                {{ stock.RADAR_DATA.PROPS.PROP_TIP_AKTSII }} {{ $t('securityHeader.stock.name') }}
                {{ stock.RADAR_DATA.COMPANY.NAME }} ({{ $t('securityHeader.stock.ticker') }} -
                {{ stock.RADAR_DATA.PROPS.SECID }}) {{ $t('securityHeader.stock.date') }} 1 Мая 2011
                г. {{ $t('securityHeader.stock.emitent') }} {{ stock.RADAR_DATA.COMPANY.NAME }}.
              </p>
              <p v-else class="default-w-400" style="height: 100px">...</p>
            </div>

            <div v-if="stock" class="info">
              <h1 class="default-w-500">{{ $t('securityHeader.stock.dynamics.text') }}</h1>
              <div class="dynamic flexRowCenter">
                <div class="percents">
                  <p>
                    {{ stock.RADAR_DATA.DYNAM.MONTH_INCREASE }}%
                    <img
                      alt="arrow up"
                      :class="{ arrowDown: stock.RADAR_DATA.DYNAM.MONTH_INCREASE < 0 }"
                      :src="stock.RADAR_DATA.DYNAM.MONTH_INCREASE < 0 ? arrowdown : arrowup"
                    />
                  </p>
                  <span>{{ $t('securityHeader.stock.dynamics.month') }}</span>
                </div>
                <div class="percents">
                  <p>
                    {{ stock.RADAR_DATA.DYNAM.YEAR_INCREASE }}%
                    <img
                      alt="arrow up"
                      :class="{ arrowDown: stock.RADAR_DATA.DYNAM.YEAR_INCREASE < 0 }"
                      :src="stock.RADAR_DATA.DYNAM.YEAR_INCREASE < 0 ? arrowdown : arrowup"
                    />
                  </p>
                  <span>{{ $t('securityHeader.stock.dynamics.year') }}</span>
                </div>
                <div class="percents">
                  <p>
                    {{ stock.RADAR_DATA.DYNAM.THREE_YEAR_INCREASE }}%
                    <img
                      alt="arrow up"
                      :class="{ arrowDown: stock.RADAR_DATA.DYNAM.THREE_YEAR_INCREASE < 0 }"
                      :src="stock.RADAR_DATA.DYNAM.THREE_YEAR_INCREASE < 0 ? arrowdown : arrowup"
                    />
                  </p>
                  <span>{{ $t('securityHeader.stock.dynamics.three_years') }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
 defineComponent, onServerPrefetch, ref, onMounted, computed
} from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'StockHeader',
  data() {
    return {
      // stock: '',
      indexes: [],
      arrowup: require('../../../assets/icons/arrow-up.svg'),
      arrowdown: require('../../../assets/icons/arrow-red.svg'),
    };
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const stock = ref<any>(computed(() => store.getters['stockInfoStore/fullInfo']));

    const getIndexes = computed((): any => {
      if (stock.value) {
        const indexes: string[] = [];

        stock.value.RADAR_DATA.PROPS.PROP_MSCI === 'Да' && indexes.push('MSCI');
        stock.value.RADAR_DATA.PROPS.PROP_MMVB === 'Да' && indexes.push('ММВБ');

        return indexes;
      }

      return [];
    });

    const init = async (): Promise<void> => {
      await store.dispatch('stockInfoStore/setStockInfo', {
        company: route.params.ticker,
        region: route.params.region,
      });
    };

    onServerPrefetch(async () => {
      await init();
    });

    onMounted(async () => {
      await init();

      console.log(stock.value);
    });

    return {
      stock,
      getIndexes,
    };
  },
});
</script>

<style scoped lang="scss" src="./style.scss" />
