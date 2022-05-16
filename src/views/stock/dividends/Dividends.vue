<template>
  <div>
    <div class="greyBg">
      <div class="flexWrapperColumn">
        <div class="methodology defaultBlack27px defaultGrey20px">
          <h1>{{ $t('dividends.methodLabel') }}</h1>
          <p>{{ $t('dividends.methodText') }}</p>
        </div>
        <div v-if="dividends" class="table">
          <div class="tableHeader flexRowBetween">
            <p v-for="index in getTranslationTableHeaderLength()" :key="index">
              {{ $t(`dividends.tableHeaders.${index - 1}`) }}
            </p>
          </div>
          <div
            v-for="dividend of dividends"
            :key="dividend.currentPrice"
            class="tableRows tableValue flexRowBetween"
            :class="{
              current: dividend.currentPrice,
              default: !dividend.currentPrice,
            }"
          >
            <p>{{ dividend['Дата закрытия реестра'] }}</p>
            <p>{{ dividend['Дата закрытия реестра (T-2)'] }}</p>
            <p>{{ dividend['Цена на дату закрытия'] }}</p>
            <p>{{ dividend['Дивиденды'] }}</p>
            <p>{{ dividend['Дивиденды, в %'] }}</p>
          </div>
        </div>
        <div v-else style="height: 600px" class="table">Loading...</div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { getBondInfo, getDividendsInfo, getStockInfo } from '@/services/finplan.service';
import i18n from '../../../plugins/i18n/vue-i18n';

export default defineComponent({
  name: 'Dividends',

  data() {
    return {
      i18n,

      dividends: [],
    };
  },

  async created() {
    await this.getPageContent();
  },

  methods: {
    getTranslationTableHeaderLength() {
      return i18n.global.messages.ru.dividends.tableHeaders.length;
    },

    async getPageContent() {
      if (this.$route.params.document === 'stock') {
        const stock = await getStockInfo(this.$route.params.ticker, this.$route.params.region);
        const isin = stock.RADAR_DATA.CODE;
        const dividendsInfo = await getDividendsInfo(isin, this.$route.params.region);

        this.dividends = dividendsInfo.DIVIDENDS;
      } else if (this.$route.params.document === 'obligation') {
        const bond = await getBondInfo(this.$route.params.ticker, this.$route.params.region);
        this.dividends = await getDividendsInfo(
          bond.RADAR_DATA.PROPS.ISIN,
          this.$route.params.region,
        );
      }
    },
  },
});
</script>

<style scoped lang="scss" src="./style.scss" />
