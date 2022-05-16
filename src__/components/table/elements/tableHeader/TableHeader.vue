<template>
  <div class="whiteBg">
    <div class="flexWrapperRow">
      <span class="tableRowIndicator">{{ $t('tableTexts.index') }}</span>
      <div class="periods flexRowBetween tableRowHeaderCol">
        <p v-for="(item, index) in getPeriodVal" :key="index" class="tableRowHeaderColItem">
          <template v-if="getProp === 'quarter'">
            {{ getPeriodVal[index] }}
            {{ $t('companyIndicators.quarter') }}
          </template>
          {{ getPeriodYear[index] }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { mapGetters } from 'vuex';
import { useEmitter } from '@/use/useEmitter';

export default defineComponent({
  name: 'TableHeader',
  computed: {
    ...mapGetters({
      getProp: 'financialStore/getProp',
      getPeriodVal: 'financialStore/getPeriodVal',
      getPeriodYear: 'financialStore/getPeriodYear',
    }),
  },
  setup() {
    const emitter = useEmitter();

    const $header = ref<any>('');
    const itemWidth = ref<any>('');

    const initDOM = (): void => {
      if (!$header.value) {
        $header.value = document.querySelector('.tableRowHeaderCol') || '';

        const $item: any = document.querySelector('.tableRowHeaderCol .tableRowHeaderColItem') || '';
        itemWidth.value = $item.offsetWidth;
      }
    };

    const scrollToLeft = (): void => {
      $header.value.scrollLeft -= itemWidth.value + 10;
    };

    const scrollToRight = (): void => {
      $header.value.scrollLeft += itemWidth.value - 6.5;
    };

    emitter.on('scrollIndicatorsTableToLeft', () => {
      initDOM();
      scrollToLeft();
    });

    emitter.on('scrollIndicatorsTableToRight', () => {
      initDOM();
      scrollToRight();
    });

    return {};
  },
});
</script>
