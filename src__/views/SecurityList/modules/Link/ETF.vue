<template>
  <div class="linkList">
    <router-link v-if="meUtils.isExistItem(item)" :to="getLink()" class="linkList__link">
      <span>{{ item.NAME }}</span>
    </router-link>
    <div class="linkList__wrap">
      (<span class="linkList__itemLastPrice"
        >{{ item.LASTPRICE }}{{ item.CURRENCY_SIGN }},&nbsp;</span
      >
      <span :class="meUtils.checkIncreaseClass(item.MONTH_INCREASE)">
        {{ meUtils.toFixed(item.MONTH_INCREASE) }}%,&nbsp;</span
      >
      <span :class="meUtils.checkIncreaseClass(item.QUOTATIONS_MONTH)"
        >{{ meUtils.toFixed(item.QUOTATIONS_MONTH) }}%</span
      >)
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import { meUtils } from '../../utils/meUtils';

export default defineComponent({
  name: 'LinkETF',
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const route = useRoute();

    const getLink = (): string =>
      `/${String(route.params.locale).toLowerCase()}/etf/${String(
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
