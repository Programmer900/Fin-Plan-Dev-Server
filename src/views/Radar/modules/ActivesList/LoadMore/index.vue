<script lang="ts">
import Loader from '@/components/Loader/index.vue';

export default defineComponent({
  name: 'RadarActivesListLoadMore',
  components: {
    Loader,
  },
});
</script>

<script setup lang="ts">
import { radarStore } from '@/store/pinia/radar';

const radar = radarStore();

const isItemsCountEqual = computed(() => radar.getCurrentEqualItemsCount);
const getProcessUpdateActives = computed(() => radar.processes.updateActives);

const onClickLoadMore = async () => {
  await radar.updateActives();
};
</script>

<template lang="pug">
.load-more(v-if='!isItemsCountEqual')
  button.load-more__btn(v-if='!getProcessUpdateActives', @click='onClickLoadMore') Загрузить еще
  Loader(v-else)
</template>

<style scoped lang="scss">
.load-more {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 30px;

  &__btn {
    background: #2a8634;
    border: none;
    cursor: pointer;
    padding: 20px 30px;
    border-radius: 2px;
    color: #fff;
    font-size: 18px;

    &:hover {
      background: #fec006;
    }
  }
}
</style>
