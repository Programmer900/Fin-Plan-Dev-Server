<template>
  <SecurityHeader />
  <Schedule />
  <PageSwitcher />
  <router-view />
</template>

<script>
import { defineComponent } from 'vue';
import Schedule from '../../components/schedule/Schedule.vue';
import SecurityHeader from '../../components/securityHeader/SecurityHeader.vue';
import PageSwitcher from '../../components/pageSwitcher/PageSwitcher.vue';
import { getIndexes, getIndexActions } from '@/services/finplan.service';

export default defineComponent({
  name: 'Stock',
  components: { PageSwitcher, SecurityHeader, Schedule },

  data() {
    return {
      stockData: {},
      emitent: {},
      bondData: {},
    };
  },

  async mounted() {
    await getIndexes();
    await getIndexActions();
  },
});
</script>

<style scoped lang="scss"></style>
