<template>
  <StockHeader v-if="detectSecurityType === 'stock'" />
  <BondHeader v-if="detectSecurityType === 'bond'" />
</template>

<script>
import { defineComponent } from 'vue';
import StockHeader from '@/components/securityHeader/elements/StockHeader.vue';
import BondHeader from '@/components/securityHeader/elements/BondHeader.vue';

export default defineComponent({
  name: 'SecurityHeader',
  components: { BondHeader, StockHeader },
  watch: {
    // $route(to) {
    //   if (to.params.document === 'stock') this.getStock();
    //   if (to.params.document === 'obligation') this.getBond();
    // },
  },
  computed: {
    detectSecurityType() {
      return this.$route.params.document;
    },
  },
});
</script>
