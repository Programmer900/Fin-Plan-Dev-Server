<template>
  <div class="whiteBg">
    <div class="flexWrapperColumn">
      <div class="indexes flexRowCenter" :class="{ stickyIndexes: scroll > 100 && width > 600 }">
        <Index index="3471,92" text="Индекс ММВБ" type="up" />
        <Index index="3768,25" text="Американский индекс СП-500" type="down" />
        <Index :index="indexes.usd.value" text="USD" :type="indexes.usd.type" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Index from './index/Index.vue';
import { useApiPolygon } from '@/use/api/useApiPolygon';

import { LS_KEY_USD } from '../../../env.common';

export default defineComponent({
  name: 'Indexes',
  components: { Index },
  setup() {
    const indexes = ref({
      usd: {
        value: '' as string | number,
        type: 'up',
      },
    });

    const scroll = ref(0);
    const width = ref(0);

    const interval = ref<any>(undefined);

    const handleScroll = () => {
      scroll.value = window.scrollY;
    };

    const updateCurrencyConversion = async () => {
      const api = useApiPolygon();
      const response = await api.getCurrencyConversion();
      const value: any = response.data;

      const previousValueUSD: number = Number(localStorage.getItem(LS_KEY_USD)) || 0;

      localStorage.setItem(LS_KEY_USD, Number(value.last.ask).toFixed(2));
      indexes.value.usd.value = Number(localStorage.getItem(LS_KEY_USD));

      if (indexes.value.usd.value >= previousValueUSD) {
        indexes.value.usd.type = 'up';
      } else {
        indexes.value.usd.type = 'down';
      }
    };

    const init = async () => {
      width.value = window.innerWidth;
      window.addEventListener('scroll', handleScroll);

      await updateCurrencyConversion();

      interval.value = setInterval(async () => {
        await updateCurrencyConversion();
      }, 10000);
    };

    onMounted(async () => {
      await init();
    });

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval.value);
    });

    return {
      indexes,
      scroll,
      width,
    };
  },
});
</script>

<style scoped lang="scss" src="./style.scss" />
