<template>
  <div class="greyBg">
    <div class="flexWrapperRow">
      <div
        v-if="Object.keys(emitent).length !== 0"
        class="info defaultGrey20px mt-20 default-ul default-h2 VHtmlText"
        v-html="emitent"
      />
      <div v-else :style="{ width: '60%', height: '600px' }">Loading ...</div>
      <div class="rightInfo">
        <div class="bgSquareBefore" />
        <div class="bgSquareAfter default-w-500">
          <p>{{ $t('aboutCompany.newsText') }}</p>
        </div>
        <p class="lowResolutionNews default-w-500">{{ $t('aboutCompany.newsText') }}</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {
 defineComponent, ref, onMounted, onServerPrefetch
} from 'vue';
import { useRoute } from 'vue-router';
import { useApiFinplan } from '@/use/api/useApiFinplan';

export default defineComponent({
  name: 'AboutPage',
  data() {
    return {
      language: '',
      stock: {},
      // emitent: {},
    };
  },

  setup() {
    const api = useApiFinplan();
    const route = useRoute();

    const pageType = ref<string | string[]>(route.params.document);
    const emitent = ref<string>('');

    const init = async (): Promise<void> => {
      if (pageType.value === 'stock') {
        const responseStock = await api.getStockInfo(route.params.ticker, route.params.region);
        const stock = responseStock.data;
        // @ts-ignore
        const responseEmitent = await api.getEmitentInfo(stock.RADAR_DATA.COMPANY.ID);
        const emitentInfo = responseEmitent.data;
        // @ts-ignore
        emitent.value = emitentInfo.PREVIEW_TEXT;
      } else if (pageType.value === 'obligation') {
        const responseBond = await api.getBondInfo(route.params.ticker, route.params.region);
        const bond = responseBond.data;
        // @ts-ignore
        const responseEmitent = await api.getEmitentInfo(bond.RADAR_DATA.COMPANY.ID);
        const emitentInfo = responseEmitent.data;
        // @ts-ignore
        emitent.value = emitentInfo.PREVIEW_TEXT;
      }
    };

    onMounted(async () => {
      await init();
    });

    onServerPrefetch(async () => {
      await init();
    });

    return {
      emitent,
    };
  },
});
</script>

<style scoped lang="scss" src="./style.scss" />
