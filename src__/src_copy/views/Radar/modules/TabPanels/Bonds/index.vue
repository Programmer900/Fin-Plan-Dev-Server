<template>
  <div class="radarBonds">
    <div class="radarBonds__container">
      <div v-if="!getPresetSelectionMode" class="radarBonds__fields">
        <div class="radarBonds__title">Настройка параметров</div>
        <div class="radarBonds__grid radarBonds__grid--col-2">
          <div class="radarBonds__gridInner">
            <InputRange
              v-model:current="filters.duration.value"
              class="radarBonds__range"
              current-text-right="Мес."
              :max="37"
              :min="0"
              :step="1"
              subtitle="Период до даты погашения или оферты"
              symbol="мес."
              title="Срок облигации"
            />
            <InputRange
              v-model:current="filters.rate.value"
              class="radarBonds__range"
              current-text-left="Менее"
              current-text-right="%"
              :max="26"
              :min="0"
              :step="1"
              subtitle="Годовая доходность к сроку облигации"
              symbol="%"
              title="Уровень доходности ценных бумаг"
            />
            <!--            <InputDropdown-->
            <!--              v-model:selected="strategy"-->
            <!--              class="radarBonds__dropdown"-->
            <!--              :items="dropdownItems"-->
            <!--              placeholder="Не выбрана"-->
            <!--              title="Стратегия"-->
            <!--            />-->
            <InputDropdown
              v-model:selected="filters.debstock_rus_only.value"
              class="radarBonds__dropdown"
              :items="filters.debstock_rus_only.dropdownValues"
              placeholder="Не выбран"
              title="Юрисдикция"
            />
            <InputCheckbox
              v-model:selected="filters.turnover_week.value"
              class="radarBonds__checkbox"
              title="Убрать облигации без оборотов"
            />
          </div>
          <HelpHowPresetRadarPortfolio class="radarBonds__helpHow" />
        </div>
        <div class="radarBonds__line radarBonds__line--mt radarBonds__mt-85" />
        <div class="radarBonds__grid">
          <PageRadarField
            v-model:isActive="filters.coupons_more.isActive"
            class="radarBonds__field"
            subtitle="Сумма купонов за год/текущая цена с учетом НКД"
            title="Годовая купонная доходность"
          >
            <InputNumber
              v-model:value="filters.coupons_more.value"
              class="radarBonds__fieldSlot"
              :only-positive="true"
              :text-right="filters.coupons_more.symbol"
            />
          </PageRadarField>
          <PageRadarField
            v-model:isActive="filters.valute.isActive"
            class="radarBonds__field"
            subtitle="Выберите одну из валют"
            title="Валюта облигации"
          >
            <InputDropdown
              v-model:selected="filters.valute.value"
              class="radarBonds__fieldSlot"
              :items="filters.valute.dropdownValues"
              placeholder="Не выбрано"
            />
          </PageRadarField>
          <PageRadarField
            v-model:isActive="filters.quality_bonds.isActive"
            class="radarBonds__field"
            subtitle="Выберите показатель"
            title="Качество"
          >
            <InputDropdown
              v-model:selected="filters.quality_bonds.value"
              class="radarBonds__fieldSlot"
              :items="filters.quality_bonds.dropdownValues"
              placeholder="Не выбрано"
            />
          </PageRadarField>
          <PageRadarField
            v-model:isActive="filters['radar-rating'].isActive"
            class="radarBonds__field"
            subtitle="Выберите показатель"
            title="Рейтинг радара"
          >
            <InputDropdown
              v-model:selected="filters['radar-rating'].value"
              class="radarBonds__fieldSlot"
              :items="filters['radar-rating'].dropdownValues"
              placeholder="Не выбрано"
            />
          </PageRadarField>
          <PageRadarField
            v-model:isActive="filters.offerdate.isActive"
            class="radarBonds__field"
            subtitle="Возможность досрочного погашения"
            title="Оферта"
          >
            <InputToggle
              v-model:value="filters.offerdate.value"
              class="radarBonds__fieldSlot"
              text-right="Есть"
            />
          </PageRadarField>
          <PageRadarField
            v-model:isActive="filters.listlevel.isActive"
            class="radarBonds__field"
            subtitle="Соответствия требованиям биржи"
            title="Уровень листинга"
          >
            <InputRadio
              :id="filters.listlevel.id"
              class="radarBonds__fieldSlot"
              group-name="listlevel"
              :options="filters.listlevel.radioValues"
              :value="filters.listlevel.value"
              @onChange="changeValue"
            />
          </PageRadarField>
          <PageRadarField
            v-model:isActive="filters.coupon_type.isActive"
            class="radarBonds__field"
            subtitle="Узнать подробнее о типах"
            title="Тип купона"
          >
            <InputDropdown
              v-model:selected="filters.coupon_type.value"
              class="radarBonds__fieldSlot"
              :items="filters.coupon_type.dropdownValues"
              placeholder="Не выбран"
            />
          </PageRadarField>
          <PageRadarField
            v-model:isActive="filters.deprecation.isActive"
            class="radarBonds__field"
            subtitle="Возможность досрочного погашения"
            title="Амортизация"
          >
            <InputToggle
              v-model:value="filters.deprecation.value"
              class="radarBonds__fieldSlot"
              text-right="Есть"
            />
          </PageRadarField>
          <PageRadarField
            v-model:isActive="filters.payment_order.isActive"
            class="radarBonds__field"
            subtitle="Займ под репутацию банка"
            title="Субординация"
          >
            <InputToggle
              v-model:value="filters.payment_order.value"
              class="radarBonds__fieldSlot"
              text-right="Есть"
            />
          </PageRadarField>
          <PageRadarField
            v-model:isActive="filters.structural.isActive"
            class="radarBonds__field"
            subtitle="Доход привязан к базовым активам"
            title="Структурность"
          >
            <InputToggle
              v-model:value="filters.structural.value"
              class="radarBonds__fieldSlot"
              text-right="Есть"
            />
          </PageRadarField>
          <PageRadarField
            v-model:isActive="filters.duration_period.isActive"
            class="radarBonds__field"
            subtitle="Период возврата инвестируемой суммы"
            title="Дюрация"
          >
            <InputDropdown
              v-model:selected="filters.duration_period.value"
              class="radarBonds__fieldSlot"
              :items="filters.duration_period.dropdownValues"
              placeholder="Не выбрано"
            />
          </PageRadarField>
          <PageRadarField
            v-model:isActive="filters.coupons_in_year.isActive"
            class="radarBonds__field"
            subtitle="Выбрать облигации в зависимости от частоты выплаты купонного дохода"
            title="Кол-во купонных выплат в год"
          >
            <InputDropdown
              v-model:selected="filters.coupons_in_year.value"
              class="radarBonds__fieldSlot"
              :items="filters.coupons_in_year.dropdownValues"
              placeholder="Не выбрано"
            />
          </PageRadarField>
          <PageRadarField
            v-model:isActive="filters.bonds_guarantor.isActive"
            class="radarBonds__field"
            subtitle=""
            title="Обеспечение"
          >
            <InputDropdown
              v-model:selected="filters.bonds_guarantor.value"
              class="radarBonds__fieldSlot"
              :items="filters.bonds_guarantor.dropdownValues"
              placeholder="Не выбрано"
            />
          </PageRadarField>
        </div>
        <div class="radarBonds__line radarBonds__line--mt radarBonds__mt-85" />
        <div class="radarBonds__grid">
          <PageRadarField
            v-model:isActive="filters.date_start_first.isActive"
            class="radarBonds__field"
            title="Дата выпуска"
          >
            <InputDatePicker
              :end="filters.date_start_last.value"
              :id-end="filters.date_start_last.id"
              :id-start="filters.date_start_first.id"
              :is-range="true"
              :start="filters.date_start_first.value"
              view-mode="range-input"
              @onChangeEnd="changeValue"
              @onChangeStart="changeValue"
            />
          </PageRadarField>
          <PageRadarField
            v-model:isActive="filters.date_cancel_first.isActive"
            class="radarBonds__field"
            title="Дата гашения"
          >
            <InputDatePicker
              :end="filters.date_cancel_last.value"
              :id-end="filters.date_cancel_last.id"
              :id-start="filters.date_cancel_first.id"
              :is-range="true"
              :start="filters.date_cancel_first.value"
              view-mode="range-input"
              @onChangeEnd="changeValue"
              @onChangeStart="changeValue"
            />
          </PageRadarField>
          <PageRadarField
            v-model:isActive="filters.date_soon_coupon_first.isActive"
            class="radarBonds__field"
            title="Ближайший купон"
          >
            <InputDatePicker
              :end="filters.date_soon_coupon_last.value"
              :id-end="filters.date_soon_coupon_last.id"
              :id-start="filters.date_soon_coupon_first.id"
              :is-range="true"
              :start="filters.date_soon_coupon_first.value"
              view-mode="range-input"
              @onChangeEnd="changeValue"
              @onChangeStart="changeValue"
            />
          </PageRadarField>
        </div>
        <div class="radarBonds__line radarBonds__line--mt radarBonds__mt-85" />
        <div class="radarBonds__grid">
          <PageRadarField
            v-model:isActive="filters.fin_analysis.isActive"
            class="radarBonds__field"
            title="Финансовый анализ"
          >
            <InputRadio
              :id="filters.fin_analysis.id"
              class="radarBonds__fieldSlot"
              group-name="financialAnalysis"
              :is-vertical="true"
              :options="filters.fin_analysis.radioValues"
              :value="filters.fin_analysis.value"
              @onChange="changeValue"
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
        <div class="radarBonds__line radarBonds__line--mt radarBonds__mt-85" />
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
              :text-right="filters['period[Темп прироста выручки][percent]'].symbol"
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
              :text-right="filters['period[Рентабельность собственного капитала][percent]'].symbol"
            />
          </PageRadarField>
          <PageRadarField
            v-model:isActive="
              filters['period[Доля собственного капитала в активах][percent]'].isActive
            "
            class="radarBonds__field"
            subtitle="Собственный капитал к общей сумме активов"
            title="Доля капитала"
          >
            <InputNumber
              v-model:value="filters['period[Доля собственного капитала в активах][percent]'].value"
              class="radarBonds__fieldSlot"
              :is-mini="true"
              :only-positive="true"
              text-left="Более"
              :text-right="filters['period[Доля собственного капитала в активах][percent]'].symbol"
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
import iconCalendar from '@/assets/icons/calendar.svg';
import { radarStore } from '@/store/pinia/radar';
import InputDatePicker from '@/components/Inputs/DatePicker/index.vue';

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
  name: 'PageRadarTabBonds',
  components: {
    InputDatePicker,
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
      () => cloneDeep(radar.filters.bonds),
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
      getPresetSelectionMode: computed(() => radar.presetSelect.bonds),
      filters: radar.filters.bonds,
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
