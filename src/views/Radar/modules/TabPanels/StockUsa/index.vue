<template>
  <div class="radarBonds">
    <div class="radarBonds__container">
      <div v-if="!getPresetSelectionMode" class="radarBonds__fields">
        <div class="radarBonds__title">Настройка параметров</div>
        <div class="radarBonds__grid radarBonds__grid--col-2">
          <div class="radarBonds__gridInner">
            <InputRange
              v-model:current="filters.pe.value"
              class="radarBonds__range"
              current-text-left="До"
              :max="50"
              :min="0"
              :step="1"
              subtitle="Отношение капитализации компании к скользящей чистой прибыли"
              symbol="мес."
              title="Коэффициент P/E"
            />
            <InputRange
              v-model:current="filters.profitability.value"
              class="radarBonds__range"
              current-text-left="Более"
              current-text-right="%"
              :max="50"
              :min="0"
              :step="1"
              subtitle="Сумма фундаментальной оценки разных источников роста акций"
              symbol="%"
              title="Расчетный потенциал"
            />
            <InputDropdown
              v-model:selected="filters.industry.value"
              class="radarBonds__dropdown"
              :items="filters.industry.dropdownValues"
              placeholder="Не выбрана"
              title="Отрасль"
            />
            <InputDropdown
              v-model:selected="filters.currency.value"
              class="radarBonds__dropdown"
              :items="filters.currency.dropdownValues"
              placeholder="Не выбрано"
              title="Валюта"
            />
            <InputDropdown
              v-model:selected="filters.in_index.value"
              class="radarBonds__dropdown"
              :items="filters.in_index.dropdownValues"
              placeholder="Не выбрано"
              title="Входят в индекс"
            />
            <InputDropdown
              v-model:selected="filters.top.value"
              class="radarBonds__dropdown"
              :items="filters.top.dropdownValues"
              placeholder="Не выбрано"
              title="Подборка"
            />
            <InputDropdown
              v-model:selected="filters.country.value"
              class="radarBonds__dropdown"
              :items="filters.country.dropdownValues"
              placeholder="Не выбрано"
              title="Страна"
            />
            <InputCheckbox
              v-model:selected="filters.use_esg.value"
              class="radarBonds__checkbox"
              title="Учитывать ESG инвестиции"
            />
            <InputCheckbox
              v-model:selected="filters.into_gs_usa_portfolio.value"
              class="radarBonds__checkbox"
              title="Есть расширенная аналитика"
            />
            <InputCheckbox
              v-model:selected="filters.use_halal.value"
              class="radarBonds__checkbox"
              title="Учитывать халяльные инвестиции"
            />
          </div>
          <HelpHowPresetRadarPortfolio class="radarBonds__helpHow" />
        </div>
        <div class="radarBonds__line radarBonds__line--mt" />
        <div class="radarBonds__grid">
          <PageRadarField
            v-model:isActive="filters.dividends.isActive"
            class="radarBonds__field"
            subtitle="Периодические выплаты акционерам"
            title="Дивиденды более"
          >
            <InputNumber
              v-model:value="filters.dividends.value"
              class="radarBonds__fieldSlot"
              :only-positive="true"
              :text-right="filters.dividends.symbol"
            />
          </PageRadarField>
          <PageRadarField
            v-model:isActive="filters.capitalization.isActive"
            class="radarBonds__field"
            subtitle="Рыночная оценка стоимости компании"
            title="Капитализация"
          >
            <InputDropdown
              v-model:selected="filters.capitalization.value"
              class="radarBonds__fieldSlot"
              :items="filters.capitalization.dropdownValues"
              placeholder="Не выбрано"
            />
          </PageRadarField>
          <PageRadarField
            v-model:isActive="filters.price.isActive"
            class="radarBonds__field"
            subtitle="Ограничение по цене актива"
            title="Цена"
          >
            <InputDropdown
              v-model:selected="filters.price.value"
              class="radarBonds__fieldSlot"
              :items="filters.price.dropdownValues"
              placeholder="Не выбрано"
            />
          </PageRadarField>
          <PageRadarField
            v-model:isActive="filters['radar-rating'].isActive"
            class="radarBonds__field"
            subtitle="Популярность"
            title="Рейтинг радара"
          >
            <InputDropdown
              v-model:selected="filters['radar-rating'].value"
              class="radarBonds__fieldSlot"
              :items="filters['radar-rating'].dropdownValues"
              placeholder="Не выбрано"
            />
          </PageRadarField>
          <InputCheckbox
            v-model:selected="filters.future_dividends.value"
            class="radarBonds__checkbox"
            title="Будущие дивиденды"
          />
          <InputCheckbox
            v-model:selected="filters.no_dividends.value"
            class="radarBonds__checkbox"
            title="Нет дивидендов"
          />
        </div>
        <div class="radarBonds__line radarBonds__line--mt" />
        <div class="radarBonds__subtitle">Мультипликаторы</div>
        <div class="radarBonds__grid">
          <PageRadarField
            v-model:isActive="filters['p-e'].isActive"
            class="radarBonds__field"
            subtitle="Отношение капитализации компании к собственном капиталу"
            title="P/Equity"
          >
            <InputDropdown
              v-model:selected="filters['p-e'].value"
              class="radarBonds__fieldSlot"
              :items="filters['p-e'].dropdownValues"
              placeholder="Не выбрано"
            />
          </PageRadarField>
          <PageRadarField
            v-model:isActive="filters.peg.isActive"
            class="radarBonds__field"
            subtitle="Отношение P/E к средним темпам прироста прибыли за 5 лет"
            title="PEG"
          >
            <InputDropdown
              v-model:selected="filters.peg.value"
              class="radarBonds__fieldSlot"
              :items="filters.peg.dropdownValues"
              placeholder="Не выбрано"
            />
          </PageRadarField>
          <PageRadarField
            v-model:isActive="filters.betta.isActive"
            class="radarBonds__field"
            subtitle="Характеризует движение отдельной акции относительно рынка в целом"
            title="Бета"
          >
            <InputDropdown
              v-model:selected="filters.betta.value"
              class="radarBonds__fieldSlot"
              :items="filters.betta.dropdownValues"
              placeholder="Не выбрано"
            />
          </PageRadarField>
        </div>
        <div class="radarBonds__line radarBonds__line--mt" />
        <div class="radarBonds__subtitle">Динамика акций</div>
        <div class="radarBonds__grid">
          <PageRadarField
            v-model:isActive="filters['month-increase'].isActive"
            class="radarBonds__field"
            title="Прирост за месяц"
          >
            <InputDropdown
              v-model:selected="filters['month-increase'].value"
              class="radarBonds__fieldSlot"
              :items="filters['month-increase'].dropdownValues"
              placeholder="Не выбрано"
            />
          </PageRadarField>
          <PageRadarField
            v-model:isActive="filters['year-increase'].isActive"
            class="radarBonds__field"
            title="Прирост за год"
          >
            <InputDropdown
              v-model:selected="filters['year-increase'].value"
              class="radarBonds__fieldSlot"
              :items="filters['year-increase'].dropdownValues"
              placeholder="Не выбрано"
            />
          </PageRadarField>
          <PageRadarField
            v-model:isActive="filters['three-year-increase'].isActive"
            class="radarBonds__field"
            title="Прирост за 3 года"
          >
            <InputDropdown
              v-model:selected="filters['three-year-increase'].value"
              class="radarBonds__fieldSlot"
              :items="filters['three-year-increase'].dropdownValues"
              placeholder="Не выбрано"
            />
          </PageRadarField>
        </div>
        <div class="radarBonds__line radarBonds__line--mt" />
        <div class="radarBonds__grid">
          <PageRadarField
            v-model:isActive="filters.analitics.isActive"
            class="radarBonds__field"
            title="Аналитика"
          >
            <InputDropdown
              v-model:selected="filters.analitics.value"
              class="radarBonds__fieldSlot"
              :items="filters.analitics.dropdownValues"
              placeholder="Не выбрано"
            />
          </PageRadarField>
          <PageRadarField
            v-model:isActive="filters.period_value.isActive"
            class="radarBonds__field"
            title="За период"
          >
            <InputDropdown
              v-model:selected="filters.period_value.value"
              class="radarBonds__fieldSlot"
              :icon="iconCalendar"
              :items="filters.period_value.dropdownValues"
              placeholder="Не выбрано"
            />
          </PageRadarField>
        </div>
        <div class="radarBonds__line radarBonds__line--mt" />
        <div class="radarBonds__grid">
          <PageRadarField
            v-model:isActive="filters['period[Темп прироста выручки][percent]'].isActive"
            class="radarBonds__field"
            subtitle="Выручка за текущий период к данным прошлого года"
            title="Темп прироста выручки"
          >
            <InputNumber
              v-model:value="filters['period[Темп прироста выручки][percent]'].value"
              class="radarBonds__fieldSlot"
              :is-mini="true"
              :only-positive="true"
              text-left="Более"
              text-right="%"
            />
          </PageRadarField>
          <PageRadarField
            v-model:isActive="
              filters['period[Рентабельность собственного капитала][percent]'].isActive
            "
            class="radarBonds__field"
            subtitle="Показать эффективности вложенных средств"
            title="Рентабельность"
          >
            <InputNumber
              v-model:value="filters['period[Рентабельность собственного капитала][percent]'].value"
              class="radarBonds__fieldSlot"
              :is-mini="true"
              :only-positive="true"
              text-left="Более"
              text-right="%"
            />
          </PageRadarField>
          <PageRadarField
            v-model:isActive="filters['period[Темп роста активов][percent]'].isActive"
            class="radarBonds__field"
            subtitle="Активы за указанный период к прошлому"
            title="Темп роста активов"
          >
            <InputNumber
              v-model:value="filters['period[Темп роста активов][percent]'].value"
              class="radarBonds__fieldSlot"
              :is-mini="true"
              :only-positive="true"
              text-left="Более"
              text-right="%"
            />
          </PageRadarField>
          <PageRadarField
            v-model:isActive="
              filters['period[Доля собственного капитала в активах][percent]'].isActive
            "
            class="radarBonds__field"
            subtitle="Собственный капитал к общей сумме активов"
            title="Доля собственного капитала"
          >
            <InputNumber
              v-model:value="filters['period[Доля собственного капитала в активах][percent]'].value"
              class="radarBonds__fieldSlot"
              :is-mini="true"
              :only-positive="true"
              text-left="Более"
              text-right="%"
            />
          </PageRadarField>
          <PageRadarField
            v-model:isActive="filters['period[Темп роста прибыли][percent]'].isActive"
            class="radarBonds__field"
            subtitle="Активы за указанный период к прошлому"
            title="Темп роста прибыли"
          >
            <InputNumber
              v-model:value="filters['period[Темп роста прибыли][percent]'].value"
              class="radarBonds__fieldSlot"
              :is-mini="true"
              :only-positive="true"
              text-left="Более"
              text-right="%"
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
import InputCheckbox from '@/components/Inputs/Checkbox/index.vue';
import HelpHowPresetRadarPortfolio from '@/components/Help/How/modules/Presets/RadarPortfolio/index.vue';
import PageRadarField from '@/views/Radar/modules/Field/index.vue';
import InputNumber from '@/components/Inputs/Number/index.vue';
import InputToggle from '@/components/Inputs/Toggle/index.vue';
import InputRadio from '@/components/Inputs/Radio/index.vue';
import ChangeStrategy from '@/views/Radar/modules/ChangeStrategy/index.vue';
import PageRadarReadyStrategies from '@/views/Radar/modules/ReadyStrategies/index.vue';
import PageRadarChart from '@/views/Radar/modules/Chart/index.vue';
import PageRadarActivesList from '@/views/Radar/modules/ActivesList/index.vue';
import InputToggleRadio from '@/components/Inputs/ToggleRadio/index.vue';
import iconCalendar from '@/assets/icons/calendar.svg';
import { radarStore } from '@/store/pinia/radar';

interface IStateRanges {
  [key: string]: number;
}

interface IStateDropdownItem {
  id: string | number;
  label: string;
}

interface IStateDropdown {
  [key: string]: IStateDropdownItem | null;
}

interface IStateCheckboxes {
  [key: string]: boolean;
}

interface IFieldItem {
  isActive: boolean;
  value: number | string | boolean | null;
}

interface IStateFields {
  [key: string]: IFieldItem;
}

export default defineComponent({
  name: 'PageRadarTabStockUsa',
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
      () => cloneDeep(radar.filters.shares_usa),
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
      getPresetSelectionMode: computed(() => radar.presetSelect.shares_usa),
      filters: radar.filters.shares_usa,
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
