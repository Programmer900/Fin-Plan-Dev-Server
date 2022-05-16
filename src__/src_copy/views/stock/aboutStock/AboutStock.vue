<template>
  <div class="greyBg">
    <div class="flexWrapperColumn">
      <ul v-if="stock" class="default-w-400">
        <li v-for="index in getTranslationLength()" :key="index">
          <p>{{ $t(`aboutStock[${index - 1}].name`) }}</p>
          <span>{{ stock.RADAR_DATA.PROPS[$t(`aboutStock[${index - 1}].path`)] }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import i18n from '../../../plugins/i18n/vue-i18n';
import { useApiFinplan } from '@/use/api/useApiFinplan';

export default defineComponent({
  name: 'AboutStock',

  setup() {
    const api = useApiFinplan();
    const store = useStore();
    const route = useRoute();

    const stock = ref(computed(() => store.getters['stockInfoStore/fullInfo']));
    const bonds = ref<any>('');

    const getTranslationLength = (): number => i18n.global.messages.ru.aboutStock.length;

    const init = async (): Promise<void> => {
      if (route.params.document === 'obligation') {
        const responseBond = await api.getBondInfo(route.params.company, route.params.region);
        const bond = responseBond.data;
        // @ts-ignore
        const responseEmitent = await api.getEmitentInfo(bond.RADAR_DATA.COMPANY.ID);
        const emitent = responseEmitent.data;
        // @ts-ignore
        bonds.value = emitent.OBLIGATIONS;
        console.log(bonds.value);
      }
    };

    onServerPrefetch(async () => {
      await init();
    });

    onMounted(async () => {
      await init();
    });

    return {
      stock,
      getTranslationLength,
    };
  },
});
</script>

<style scoped lang="scss" src="./style.scss" />
