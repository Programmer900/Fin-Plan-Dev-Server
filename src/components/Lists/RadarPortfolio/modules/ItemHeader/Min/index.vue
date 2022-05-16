<template>
  <div class="listHeader">
    <div class="listHeader__title" :style="'width:' + titleAssetWidth + 'px'">Название</div>
    <div class="listHeader__wrapTitle">
      <div class="listHeader__title">Доходность:</div>
      <div class="listHeader__title">Срок гашения:</div>
      <div class="listHeader__title">Цена погашения</div>
    </div>
    <div class="listHeader__title">Количество</div>
    <div class="listHeader__title">Сумма</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
  name: 'ListItemHeaderMinRadarPortfolio',
  setup() {
    const titleAssetNode = ref<HTMLElement | any>();
    const titleProfitNode = ref<HTMLElement | any>();
    const titleCancellationNode = ref<HTMLElement | any>();
    const titleRepaymentNode = ref<HTMLElement | any>();
    const titleCountNode = ref<HTMLElement | any>();
    const titleSumNode = ref<HTMLElement | any>();

    const titleAssetWidth = ref<number>(0);
    const titleProfitWidth = ref<number>(0);
    const titleCancellationWidth = ref<number>(0);
    const titleRepaymentWidth = ref<number>(0);
    const titleCountWidth = ref<number>(0);
    const titleSumWidth = ref<number>(0);

    const windowResizeEvent = () => {
      titleAssetWidth.value = titleAssetNode.value?.offsetWidth || 0;
    };

    const init = () => {
      titleAssetNode.value = document.querySelector('.asset__header');
      windowResizeEvent();
      window.addEventListener('resize', windowResizeEvent);
    };

    onMounted(() => {
      init();
    });

    return {
      titleAssetWidth,
      titleProfitWidth,
      titleCancellationWidth,
      titleRepaymentWidth,
      titleCountWidth,
      titleSumWidth,
    };
  },
});
</script>

<style scoped lang="scss">
.listHeader {
  display: none;
  padding: 22px 20px;
  background: #fff;

  &__title {
    color: #797979;
    font-weight: 500;
    font-size: 16px;
  }

  &__wrapTitle {
    display: flex;
    align-items: center;
  }

  @include respond-to(1600) {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
