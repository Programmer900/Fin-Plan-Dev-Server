<template>
  <div class="linkList">
    <router-link v-if="meUtils.isExistItem(item)" :to="getLink()" class="linkList__link">
      <span>{{ item.NAME }}</span>
    </router-link>
    <div class="linkList__wrap">
      (<span :class="meUtils.checkIncreaseClass(item['Доходность годовая'])"
        >{{ meUtils.checkExist(item['Доходность годовая']) }}%,&nbsp;</span
      >
      <span class="linkList__itemLastPrice"> {{ meUtils.convertDate(item.MATDATE) }}</span
      >)
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import { meUtils } from '../../utils/meUtils';

export default defineComponent({
  name: 'LinkBond',
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const route = useRoute();

    const getLink = (): string =>
      `/${String(route.params.locale).toLowerCase()}/bond/${String(
        route.params.region,
      ).toUpperCase()}/${props.item.NAME}/${props.item.SECID}/info`;

    return {
      meUtils,
      getLink,
    };
  },
});
</script>

<style scoped lang="scss"></style>
