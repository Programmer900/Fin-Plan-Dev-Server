<template>
  <div v-if="isInit" class="lists-body">
    <ListsChartSwitch />
    <TableCommon
      v-if="isInit && isSuccess"
      class="lists-body__table"
      :col-titles="getTableColTitles"
      index-title="Название отрасли"
      :rows="getTableRows"
    />
    <ListsSumIndicators />
  </div>
  <Loader v-else />
</template>

<script lang="ts">
import { useIndustriesStore } from '@/store/pinia/industries';
import TableCommon from '@/components/Tables/Common/index.vue';
import Loader from '@/components/Loader/index.vue';
import ListsChartSwitch from '@/views/Lists/modules/Pages/All/modules/Body/components/ChartSwitch/index.vue';
import ListsSumIndicators from '@/views/Lists/modules/Pages/All/modules/Body/components/SumIndicators/index.vue';

export default defineComponent({
  name: 'ListWrapAllBody',
  components: {
    ListsSumIndicators,
    ListsChartSwitch,
    Loader,
    TableCommon,
  },
  setup() {
    const route = useRoute();
    const industriesStore = useIndustriesStore();

    const isInit = ref(false);
    const isSuccess = ref<boolean | null>(null);

    const getIndustriesItems = computed(() => industriesStore.items);

    const init = async () => {
      const region = String(route.params.region);
      if (!isInit.value && industriesStore.accessRegions.indexOf(region) !== -1) {
        isSuccess.value = await industriesStore.setIndustries({
          // @ts-ignore
          country: region,
          pageNumber: 1,
        });
        industriesStore.setTableRows();
        industriesStore.setTableColTitles();
        isInit.value = true;
      }
    };

    onServerPrefetch(async () => {
      await init();
    });

    onMounted(async () => {
      await init();
      // console.log(industriesStore.items);
    });

    onBeforeUnmount(() => {
      industriesStore.resetState();
    });

    const getTableRows = computed(() => industriesStore.tableRows);
    const getTableColTitles = computed(() => industriesStore.tableColTitles);

    return {
      isInit,
      isSuccess,
      getIndustriesItems,
      getTableRows,
      getTableColTitles,
    };
  },
});
</script>

<style scoped lang="scss">
.lists-body {
  &__table {
    margin-top: 30px;
  }
}

.bottomChart {
  margin-top: 50px;
}
</style>
