<template>
  <div class="linkList">
    <router-link v-if="meUtils.isExistItem(item)" :to="getLink()" class="linkList__link">
      <span>{{ item.NAME }}</span>
    </router-link>
    <template v-if="item.LASTPRICE > 0">
      <div class="linkList__wrap">
        (<span class="linkList__itemLastPrice"
          >{{ item.LASTPRICE }}{{ item.CURRENCY_SIGN }},&nbsp;</span
        >
        <span :class="meUtils.checkIncreaseClass(item.MONTH_INCREASE)">
          {{ meUtils.checkExist(item.MONTH_INCREASE) }}%</span
        >)
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import { meUtils } from '../../utils/meUtils';

export default defineComponent({
  name: 'LinkStock',
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const route = useRoute();

    const getLink = (): string =>
      `/${String(route.params.locale).toLowerCase()}/stock/${String(
        route.params.region,
      ).toUpperCase()}/${props.item.NAME}/${props.item.SECID}/info`;

    return {
      route,
      getLink,
      meUtils,
    };
  },
});
</script>

<style scoped lang="scss">
//.linkList {
//  display: flex;
//  align-items: center;
//  padding-top: 10px;
//
//  &__wrap {
//    display: flex;
//  }
//}
</style>
