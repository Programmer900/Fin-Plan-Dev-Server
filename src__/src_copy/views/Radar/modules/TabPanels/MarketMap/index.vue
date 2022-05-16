<template>
  <div class="radarBonds">
    <div class="radarBonds__container">
      <div class="radarBonds__fields">
        <div class="radarBonds__title">Настройка параметров</div>
        <div class="radarBonds__grid radarBonds__grid--col-2">
          <div class="radarBonds__gridInner">
            <InputDropdown
              v-model:selected="strategy"
              class="radarBonds__dropdown"
              :items="dropdownItems"
              placeholder="Не выбрана"
              title="Стратегия"
            />
            <InputDropdown
              v-model:selected="type"
              class="radarBonds__dropdown"
              :items="dropdownItems"
              placeholder="Не выбрана"
              title="Отрасль"
            />
            <InputDropdown
              v-model:selected="type"
              class="radarBonds__dropdown"
              :items="dropdownItems"
              placeholder="Не выбрано"
              title="Тип карты"
            />
            <InputDropdown
              v-model:selected="type"
              class="radarBonds__dropdown"
              :items="dropdownItems"
              placeholder="Не выбрана"
              title="Период"
            />
          </div>
          <HelpHowPresetRadarPortfolio class="radarBonds__helpHow" remove-item="selectActives" />
        </div>
      </div>
    </div>
    <div class="radarBonds__container">
      <ChangeStrategy />
    </div>
  </div>
</template>

<script lang="ts">
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
  name: 'PageRadarTabMarketMap',
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

    const stateRanges: IStateRanges = reactive({
      bondTerm: 20,
      profitLevel: 20,
    });

    const stateDropdowns: IStateDropdown = reactive({
      strategy: null,
      type: dropdownItems[0],
    });

    const stateCheckboxes: IStateCheckboxes = reactive({
      isRemoveBonds: true,
    });

    const stateFields: IStateFields = reactive({
      yearCouponProfit: {
        isActive: false,
        value: 100.69,
      },
      bondCurrency: {
        isActive: true,
        value: null,
      },
      quality: {
        isActive: true,
        value: null,
      },
      offer: {
        isActive: false,
        value: true,
      },
      taxes: {
        isActive: false,
        value: false,
      },
      listingLevel: {
        isActive: true,
        value: 1,
      },
      couponType: {
        isActive: false,
        value: null,
      },
      amortisation: {
        isActive: false,
        value: false,
      },
      subordination: {
        isActive: true,
        value: false,
      },
      structurality: {
        isActive: true,
        value: false,
      },
      duration: {
        isActive: true,
        value: null,
      },
      releaseDate: {
        isActive: false,
        value: null,
      },
      cancellationDate: {
        isActive: true,
        value: null,
      },
      financialAnalysis: {
        isActive: false,
        value: 1,
      },
      forPeriod: {
        isActive: true,
        value: null,
      },
      profitability: {
        isActive: true,
        value: 0,
      },
      growthType: {
        isActive: true,
        value: 0,
      },
      capitalShare: {
        isActive: true,
        value: 0,
      },
    });

    return {
      ...toRefs(stateRanges),
      ...toRefs(stateDropdowns),
      ...toRefs(stateCheckboxes),
      ...toRefs(stateFields),
      dropdownItems,
      options,
      optionsFinancialAnalysis,
      iconCalendar,
      isReadyStrategy,
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
