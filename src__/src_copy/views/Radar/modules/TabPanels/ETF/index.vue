<template>
  <div class="radarBonds">
    <div class="radarBonds__container">
      <div v-if="!getPresetSelectionMode" class="radarBonds__fields">
        <div class="radarBonds__title">Настройка параметров</div>
        <div class="radarBonds__grid radarBonds__grid--col-2">
          <div class="radarBonds__gridInner">
            <InputRange
              v-model:current="filters.ETF_AVG_ICNREASE.value"
              class="radarBonds__range"
              current-text-left="До"
              :max="31"
              :min="0"
              :step="1"
              subtitle="Отношение капитализации компании к скользящей чистой прибыли"
              symbol="%"
              title="Выберите средний прирост x2"
            />
            <InputRange
              v-model:current="filters.ETF_COMISSION.value"
              class="radarBonds__range"
              current-text-left="Более"
              current-text-right="%"
              :max="2.1"
              :min="0"
              :step="1"
              subtitle="Сумма фундаментальной оценки разных источников роста акции"
              symbol="%"
              title="Комиссия"
            />
            <InputDropdown
              v-model:selected="filters.ETF_EXCHANGE.value"
              class="radarBonds__dropdown"
              :items="filters.ETF_EXCHANGE.dropdownValues"
              placeholder="Не выбрана"
              title="Биржа"
            />
          </div>
          <HelpHowPresetRadarPortfolio class="radarBonds__helpHow" />
        </div>
        <div class="radarBonds__line radarBonds__line--mt" />
        <div class="radarBonds__grid">
          <PageRadarField
            v-model:isActive="filters.ETF_INDUSTRY.isActive"
            class="radarBonds__field"
            title="Отрасль"
          >
            <InputDropdown
              v-model:selected="filters.ETF_INDUSTRY.value"
              class="radarBonds__dropdown"
              :items="filters.ETF_INDUSTRY.dropdownValues"
              placeholder="Не выбрана"
            />
          </PageRadarField>
          <PageRadarField
            v-model:isActive="filters.ETF_TYPE_OF_ACTIVES.isActive"
            class="radarBonds__field"
            title="Тип актива"
          >
            <InputDropdown
              v-model:selected="filters.ETF_TYPE_OF_ACTIVES.value"
              class="radarBonds__dropdown"
              :items="filters.ETF_TYPE_OF_ACTIVES.dropdownValues"
              placeholder="Не выбрана"
            />
          </PageRadarField>
          <PageRadarField
            v-model:isActive="filters.ETF_COUNTRY.isActive"
            class="radarBonds__field"
            title="Страна"
          >
            <InputDropdown
              v-model:selected="filters.ETF_COUNTRY.value"
              class="radarBonds__dropdown"
              :items="filters.ETF_COUNTRY.dropdownValues"
              placeholder="Не выбрана"
            />
          </PageRadarField>
          <PageRadarField
            v-model:isActive="filters.ETF_DIVIDENDS.isActive"
            class="radarBonds__field"
            title="Дивиденды"
          >
            <InputDropdown
              v-model:selected="filters.ETF_DIVIDENDS.value"
              class="radarBonds__dropdown"
              :items="filters.ETF_DIVIDENDS.dropdownValues"
              placeholder="Не выбрана"
            />
          </PageRadarField>
        </div>
        <div class="radarBonds__line radarBonds__line--mt" />
        <div class="radarBonds__grid">
          <PageRadarField
            v-model:isActive="filters.ETF_REPLICATION.isActive"
            class="radarBonds__field"
            title="Репликация"
          >
            <InputDropdown
              v-model:selected="filters.ETF_REPLICATION.value"
              class="radarBonds__dropdown"
              :items="filters.ETF_REPLICATION.dropdownValues"
              placeholder="Не выбрана"
            />
          </PageRadarField>
          <PageRadarField
            v-model:isActive="filters.ETF_BASE_CURRENCY.isActive"
            class="radarBonds__field"
            title="Базовая валюта"
          >
            <InputDropdown
              v-model:selected="filters.ETF_BASE_CURRENCY.value"
              class="radarBonds__dropdown"
              :items="filters.ETF_BASE_CURRENCY.dropdownValues"
              placeholder="Не выбрана"
            />
          </PageRadarField>
          <PageRadarField
            v-model:isActive="filters.ETF_TYPE.isActive"
            class="radarBonds__field"
            title="Тип фонда"
          >
            <InputDropdown
              v-model:selected="filters.ETF_TYPE.value"
              class="radarBonds__dropdown"
              :items="filters.ETF_TYPE.dropdownValues"
              placeholder="Не выбрана"
            />
          </PageRadarField>
          <PageRadarField
            v-model:isActive="filters.EMITENT_ID.isActive"
            class="radarBonds__field"
            title="Оператор"
          >
            <InputDropdown
              v-model:selected="filters.EMITENT_ID.value"
              class="radarBonds__dropdown"
              :items="filters.EMITENT_ID.dropdownValues"
              placeholder="Не выбрана"
            />
          </PageRadarField>
          <PageRadarField
            v-model:isActive="filters.ETF_CURRENCY.isActive"
            class="radarBonds__field"
            title="Валюта расчета"
          >
            <InputDropdown
              v-model:selected="filters.ETF_CURRENCY.value"
              class="radarBonds__dropdown"
              :items="filters.ETF_CURRENCY.dropdownValues"
              placeholder="Не выбрана"
            />
          </PageRadarField>
          <PageRadarField
            v-model:isActive="filters.betta.isActive"
            class="radarBonds__field"
            title="Бета"
          >
            <InputDropdown
              v-model:selected="filters.betta.value"
              class="radarBonds__dropdown"
              :items="filters.betta.dropdownValues"
              placeholder="Не выбрана"
            />
          </PageRadarField>
        </div>
        <div class="radarBonds__line radarBonds__line--mt" />
        <div class="radarBonds__subtitle">Динамика ETF</div>
        <div class="radarBonds__grid">
          <PageRadarField
            v-model:isActive="filters['month-increase'].isActive"
            class="radarBonds__field"
            title="Прирост за месяц"
          >
            <InputDropdown
              v-model:selected="filters['month-increase'].value"
              class="radarBonds__dropdown"
              :items="filters['month-increase'].dropdownValues"
              placeholder="Не выбрана"
            />
          </PageRadarField>
          <PageRadarField
            v-model:isActive="filters['year-increase'].isActive"
            class="radarBonds__field"
            title="Прирост за год"
          >
            <InputDropdown
              v-model:selected="filters['year-increase'].value"
              class="radarBonds__dropdown"
              :items="filters['year-increase'].dropdownValues"
              placeholder="Не выбрана"
            />
          </PageRadarField>
          <PageRadarField
            v-model:isActive="filters['three-year-increase'].isActive"
            class="radarBonds__field"
            title="Прирост за 3 года"
          >
            <InputDropdown
              v-model:selected="filters['three-year-increase'].value"
              class="radarBonds__dropdown"
              :items="filters['three-year-increase'].dropdownValues"
              placeholder="Не выбрана"
            />
          </PageRadarField>
        </div>
      </div>
    </div>
    <PageRadarReadyStrategies v-if="getPresetSelectionMode" />
    <div class="radarBonds__container">
      <ChangeStrategy />
    </div>
  </div>
</template>

<script lang="ts">
import { cloneDeep } from 'lodash';
import InputRange from '@/components/Inputs/Range/index.vue';
import InputDropdown from '@/components/Inputs/Dropdown/index.vue';
import { dropdownItems } from '@/views/Radar/data/dropdown';
import InputCheckbox from '@/components/Inputs/Checkbox/index.vue';
import HelpHowPresetRadarPortfolio from '@/components/Help/How/modules/Presets/RadarPortfolio/index.vue';
import PageRadarField from '@/views/Radar/modules/Field/index.vue';
import InputNumber from '@/components/Inputs/Number/index.vue';
import InputToggle from '@/components/Inputs/Toggle/index.vue';
import InputRadio from '@/components/Inputs/Radio/index.vue';
import { options, optionsFinancialAnalysis } from '@/views/Radar/data/options';
import ChangeStrategy from '@/views/Radar/modules/ChangeStrategy/index.vue';
import PageRadarReadyStrategies from '@/views/Radar/modules/ReadyStrategies/index.vue';
import PageRadarChart from '@/views/Radar/modules/Chart/index.vue';
import PageRadarActivesList from '@/views/Radar/modules/ActivesList/index.vue';
import InputToggleRadio from '@/components/Inputs/ToggleRadio/index.vue';
import iconCalendar from '@/assets/icons/calendar.svg';
import { radarStore } from '@/store/pinia/radar';

export default defineComponent({
  name: 'PageRadarTabETF',
  components: {
    InputToggleRadio,
    PageRadarActivesList,
    PageRadarChart,
    PageRadarReadyStrategies,
    ChangeStrategy,
    InputRadio,
    InputToggle,
    InputNumber,
    PageRadarField,
    HelpHowPresetRadarPortfolio,
    InputCheckbox,
    InputDropdown,
    InputRange,
  },
  setup() {
    const radar = radarStore();
    const isReadyStrategy = ref<boolean>(false);
    const timeout = ref<any>(undefined);

    const resetTimeout = () => {
      if (timeout.value) {
        clearTimeout(timeout.value);
      }
    };

    watch(
      () => cloneDeep(radar.filters.etf),
      async () => {
        resetTimeout();
        timeout.value = setTimeout(async () => {
          await radar.changeFilterValue();
        }, 700);
      },
    );

    onBeforeUnmount(() => {
      resetTimeout();
    });

    return {
      iconCalendar,
      isReadyStrategy,
      getPresetSelectionMode: computed(() => radar.presetSelect.etf),
      filters: radar.filters.etf,
      changeValue: (filterName, filterValue, options = {}) =>
        // @ts-ignore
        radar.changeFilterValue(filterName, filterValue, options),
    };
  },
});
</script>

<style scoped lang="scss">
.radarBonds {
  @include container-paddings();

  &__title {
    margin-bottom: 25px;
    font-weight: 500;
    font-size: 18px;
    line-height: 150%;
  }

  &__subtitle {
    margin: 30px 0;
    font-weight: 500;
    font-size: 18px;
    line-height: 150%;
  }

  &__helpHow {
    margin-top: 30px;
  }

  &__range {
    margin-bottom: 40px;
  }

  &__dropdown {
    margin-bottom: 5px;
  }

  &__checkbox {
    margin-top: 15px;
  }

  &__line {
    height: 1px;
    background: #e7e7e7;

    &--mt {
      margin-top: 30px;
    }
  }

  &__field {
    margin-top: 30px;
  }

  &__fieldSlot {
    margin-top: 15px;

    ::v-deep .inputDropdown__label {
      padding-left: 0;
    }
  }

  @include respond-to($container-media--tablet) {
    &__field {
      margin-top: 50px;
    }

    &__title {
      margin: 55px 0;
      font-size: 30px;
    }
  }

  @include respond-to(700) {
    &__subtitle {
      font-size: 22px;
    }

    &__grid {
      display: grid;
      grid-auto-flow: row;
      grid-column-gap: 4%;
      grid-template-columns: repeat(2, 1fr);
    }

    &__helpHow {
      margin-top: 0;
    }

    &__dropdown {
      margin-top: 25px;
      margin-bottom: 0;
    }

    &__checkbox {
      margin-top: 25px;
    }
  }

  @include respond-to(1000) {
    &__grid {
      grid-template-columns: repeat(3, 1fr);

      &--col-2 {
        grid-template-columns: 2fr 1fr;
      }
    }

    &__field {
      margin-top: 80px;
    }

    &__title {
      font-size: 36px;
    }
  }

  @include respond-to(1200) {
    &__subtitle {
      margin-top: 85px;
      margin-bottom: 35px;
      font-size: 28px;
    }

    &__line--mt {
      margin-top: 90px;
    }

    &__mt-85 {
      margin-top: 85px;
    }
  }

  @include respond-to(1650) {
    &__gridInner {
      display: grid;
      grid-auto-flow: row;
      grid-column-gap: 4%;
      grid-template-columns: repeat(2, 1fr);
    }

    &__checkbox {
      margin-top: 40px;
    }
  }
}
</style>
