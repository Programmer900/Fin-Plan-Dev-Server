<template>
  <!--  <div class="whiteBg">-->
  <!--    <div class="flexWrapperRow" style="overflow-x: hidden">-->
  <!--      <span class="tableRowIndicator" style="width: 220px">{{ $t('tableTexts.index') }}</span>-->
  <!--      <div ref="root" class="periods flexRowBetween tableRowHeaderCol" style="position: relative;">-->
  <!--        <p v-for="(item, index) in getReverseCategories" :key="index" class="tableRowHeaderColItem">-->
  <!--          &lt;!&ndash;          <template v-if="getProp === 'quarter'">&ndash;&gt;-->
  <!--          &lt;!&ndash;            {{ getPeriodVal[index] }}&ndash;&gt;-->
  <!--          &lt;!&ndash;            {{ $t('companyIndicators.quarter') }}&ndash;&gt;-->
  <!--          &lt;!&ndash;          </template>&ndash;&gt;-->
  <!--          {{ item }}-->
  <!--        </p>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--  </div>-->
  <div ref="root" class="tableRow flexRowCenter tableRowHeader">
    <div class="rowIndex flexRowCenter tableValue tableRowName" style="max-width: 220px">
      <p style="width: 220px">{{ $t('tableTexts.index') }}</p>
    </div>
    <div class="rowValue flexRowCenter tableValue" style="position: relative">
      <p v-for="(item, index) in getReverseCategories" :key="index" class="tableValueItem">
        <template v-if="getReverseQuarters"> {{ item }} {{ getReverseQuarters[index] }}</template>
        <template v-else>{{ item }}</template>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed, defineComponent, onMounted, onUnmounted, ref,
} from 'vue';
import { useEmitter } from '@/use/useEmitter';

export default defineComponent({
  name: 'DocumentIndicatorsTableHeader',
  props: {
    data: {
      type: Object,
      required: true,
    },
    categories: {
      type: Object,
      required: true,
    },
    quarters: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const root = ref<any>(null);
    const emitter = useEmitter();

    const item = ref<any>('');
    const itemWidth = ref<number>(0);
    const scrollValue = ref<number>(0);

    const getReverseCategories = computed(() => Object.values(props.categories).reverse());
    const getReverseQuarters = computed(() => Array.from(props.quarters).reverse());

    const scrollToLeft = (): void => {
      if (scrollValue.value === 0) return;
      scrollValue.value -= itemWidth.value;
      item.value.style.left = `-${scrollValue.value}px`;
    };

    const scrollToRight = (): void => {
      const maxWidth = root.value.querySelector('.rowValue').offsetWidth;
      if (scrollValue.value >= maxWidth - 200) return;
      scrollValue.value += itemWidth.value;
      item.value.style.left = `-${scrollValue.value}px`;
    };

    const init = () => {
      item.value = root.value.querySelector('.rowValue');
      itemWidth.value = root.value.querySelector('.tableValueItem').offsetWidth;
      root.value.querySelector('.rowValue').style.left = 0;
    };

    const reset = () => {
      itemWidth.value = 0;
      scrollValue.value = 0;
    };

    emitter.on('scrollIndicatorsTableToLeft', () => {
      scrollToLeft();
    });

    emitter.on('scrollIndicatorsTableToRight', () => {
      scrollToRight();
    });

    emitter.on('onChangeDocumentTableProp', () => {
      reset();
      init();
    });

    onMounted(() => {
      init();
    });

    onUnmounted(() => {
      emitter.off('scrollIndicatorsTableToLeft');
      emitter.off('scrollIndicatorsTableToRight');
      reset();
    });

    return {
      root,
      getReverseCategories,
      getReverseQuarters,
    };
  },
});
</script>

<style scoped lang="scss">
.tableRowHeader {
  background-color: white !important;

  p {
    font-weight: 400;
  }

  .rowIndex {
    background-color: white !important;
  }

  &:hover {
    cursor: default !important;
    background-color: white !important;

    .rowIndex {
      padding-left: 0 !important;
      background-color: white !important;
    }
  }
}
</style>
