<template>
  <div class="greyBg">
    <div v-if="bonds" class="flexWrapperColumn">
      <div v-for="bond in bonds" :key="bond.name" class="wrapper">
        <router-link
          class="bond tableValue flexRowBetween"
          exact
          :to="{
            path: `/${$route.params.locale}/document/${$route.params.region}/${$route.params.company}/${$route.params.ticker}/${bond.CODE}/bond/info`,
          }"
        >
          <div class="bond tableValue flexRowBetween">
            <p>{{ bond.NAME }}</p>
            <p>{{ $t('bonds.isin') }} {{ bond.CODE }}</p>
            <p>{{ $t('bonds.currentPrice') }}</p>
            <p>{{ $t('bonds.totalValue') }}</p>
          </div>
        </router-link>
      </div>
    </div>
    <div v-else class="flexWrapperColumn" style="height: 600px">Loading...</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useApiFinplan } from '@/use/api/useApiFinplan';

export default defineComponent({
  name: 'Bonds',

  data() {
    return {
      bonds: null,
      link: '',
    };
  },

  async created() {
    await this.getPageContent();
  },

  methods: {
    async getPageContent() {
      const api = useApiFinplan();
      if (this.$route.params.document === 'stock') {
        const responseStock = await api.getStockInfo(
          this.$route.params.ticker,
          this.$route.params.region,
        );
        const stock = responseStock.data;
        // @ts-ignore
        const responseEmitent = await api.getEmitentInfo(stock.RADAR_DATA.COMPANY.ID);
        const emitent = responseEmitent.data;
        // @ts-ignore
        this.bonds = emitent.OBLIGATIONS;
      } else if (this.$route.params.document === 'obligation') {
        const responseBond = await api.getBondInfo(
          this.$route.params.ticker,
          this.$route.params.region,
        );
        const bond = responseBond.data;
        // @ts-ignore
        const responseEmitent = await api.getEmitentInfo(bond.RADAR_DATA.COMPANY.ID);
        const emitent = responseEmitent.data;
        // @ts-ignore
        this.bonds = emitent.OBLIGATIONS;
      }
    },
  },
});
</script>

<style scoped lang="scss" src="./style.scss" />
