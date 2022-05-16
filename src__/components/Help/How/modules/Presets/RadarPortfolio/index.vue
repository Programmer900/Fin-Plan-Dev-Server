<template>
  <HelpHow>
    <HelpHowItem
      v-if="removeItem !== 'serviceUse'"
      color="#F3C243"
      :icon="iconService"
      link="#"
      title="Как пользоваться сервисом?"
    />
    <HelpHowItem
      v-if="removeItem !== 'selectActives'"
      color="#2A8634"
      :icon="iconSelectActives"
      link="#"
      title="Как выбрать активы для своего портфеля?"
    />
  </HelpHow>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelpHow from '@/components/Help/How/index.vue';
import HelpHowItem from '@/components/Help/How/modules/Item/index.vue';
import iconService from '@/assets/icons/use-service.svg';
import iconSelectActives from '@/assets/icons/select-actives-portfel.svg';

export default defineComponent({
  name: 'HelpHowPresetRadarPortfolio',
  components: { HelpHowItem, HelpHow },
  props: {
    removeItem: {
      type: String,
      default: '',
    },
  },
  setup() {
    return {
      iconService,
      iconSelectActives,
    };
  },
});
</script>

<style scoped lang="scss"></style>
