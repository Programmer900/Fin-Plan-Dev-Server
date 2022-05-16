<template>
  <div class="utils" :class="[{ 'utils--dark-mode': getDarkModeStatus }]">
    <div class="utils__mobile">
      <div class="utils__select">
        <select v-model="currentType" @change="onClickType(currentType)">
          <option value="line">Линейный</option>
          <option value="proc">Процентный</option>
          <!--          <option value="log">Логарифмический</option>-->
        </select>
        <svg
          fill="none"
          height="9"
          viewBox="0 0 14 9"
          width="14"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1 1.3335L7 7.3335L13 1.3335" stroke="black" />
        </svg>
      </div>
      <!--      <svg-->
      <!--        fill="none"-->
      <!--        height="24"-->
      <!--        viewBox="0 0 24 24"-->
      <!--        width="24"-->
      <!--        xmlns="http://www.w3.org/2000/svg"-->
      <!--      >-->
      <!--        <path-->
      <!--          clip-rule="evenodd"-->
      <!--          d="M8 8V7H4.5V10.5H20V7H16V8H15V7H9V8H8ZM4.5 20V11.5H20V20H4.5ZM20.5 6H16V4H15V6H9V4H8V6H4H3.5V6.5V11V20.5V21H4H20.5H21V20.5V11V6.5V6H20.5ZM16 15H17V14H16V15ZM12.5 15H11.5V14H12.5V15ZM7 15H8V14H7V15Z"-->
      <!--          fill="#797979"-->
      <!--          fill-rule="evenodd"-->
      <!--        />-->
      <!--      </svg>-->
    </div>
    <div class="utils__desktop">
      <div class="utils__types">
        <div
          :class="['utils__type', { 'utils__type--active': getCurrentType === 'line' }]"
          @click="onClickType('line')"
        >
          Линейный
        </div>
        <div
          :class="['utils__type', { 'utils__type--active': getCurrentType === 'proc' }]"
          @click="onClickType('proc')"
        >
          Процентный
        </div>
        <!--        <div-->
        <!--          :class="[-->
        <!--            'utils__type',-->
        <!--            'utils__type&#45;&#45;ml',-->
        <!--            { 'utils__type&#45;&#45;active': getCurrentType === 'log' },-->
        <!--          ]"-->
        <!--          @click="onClickType('log')"-->
        <!--        >-->
        <!--          Логарифмический-->
        <!--        </div>-->
      </div>
      <div class="utils__period">
        <!--        <div class="utils__calendar">-->
        <!--          <svg-->
        <!--            fill="none"-->
        <!--            height="24"-->
        <!--            viewBox="0 0 24 24"-->
        <!--            width="24"-->
        <!--            xmlns="http://www.w3.org/2000/svg"-->
        <!--          >-->
        <!--            <path-->
        <!--              clip-rule="evenodd"-->
        <!--              d="M8 8V7H4.5V10.5H20V7H16V8H15V7H9V8H8ZM4.5 20V11.5H20V20H4.5ZM20.5 6H16V4H15V6H9V4H8V6H4H3.5V6.5V11V20.5V21H4H20.5H21V20.5V11V6.5V6H20.5ZM16 15H17V14H16V15ZM12.5 15H11.5V14H12.5V15ZM7 15H8V14H7V15Z"-->
        <!--              fill="#797979"-->
        <!--              fill-rule="evenodd"-->
        <!--            />-->
        <!--          </svg>-->
        <!--          <span>Выбрать период</span>-->
        <!--        </div>-->
        <div class="utils__periodPresets">
          <div
            id="techAnRangeOneMonth"
            :class="[
              'utils__periodPreset',
              { 'utils__periodPreset--active': getCurrentRange === '1m' },
            ]"
            @click="onClickRange('1m')"
          >
            1м
          </div>
          <div
            id="techAnRangeThreeMonth"
            :class="[
              'utils__periodPreset',
              { 'utils__periodPreset--active': getCurrentRange === '3m' },
            ]"
            @click="onClickRange('3m')"
          >
            3м
          </div>
          <div
            id="techAnRangeSixMonth"
            :class="[
              'utils__periodPreset',
              { 'utils__periodPreset--active': getCurrentRange === '6m' },
            ]"
            @click="onClickRange('6m')"
          >
            6м
          </div>
          <div
            id="techAnRangeOneYear"
            :class="[
              'utils__periodPreset',
              { 'utils__periodPreset--active': getCurrentRange === '1г' },
            ]"
            @click="onClickRange('1г')"
          >
            1г
          </div>
          <div
            id="techAnRangeTwoYear"
            :class="[
              'utils__periodPreset',
              { 'utils__periodPreset--active': getCurrentRange === '2г' },
            ]"
            @click="onClickRange('2г')"
          >
            2г
          </div>
          <div
            id="techAnRangeMax"
            :class="[
              'utils__periodPreset',
              { 'utils__periodPreset--active': getCurrentRange === 'max' },
            ]"
            @click="onClickRange('max')"
          >
            max
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useTechAnalysisStore } from '@/store/pinia/technicalAnalysis';
import { useEmitter, emitEvents } from '@/use/useEmitter';

export default defineComponent({
  name: 'TechnicalAnalysisPageChartTopUtils',
  setup() {
    const emitter = useEmitter();
    const techAnStore = useTechAnalysisStore();
    const currentType = ref('line');

    const onClickRange = (selected: string) => {
      techAnStore.changeCurrentRange(selected);
    };

    const onClickType = (selected: string) => {
      techAnStore.changeCurrentType(selected);
      techAnStore.changeIsDisablePage(true);
      emitter.emit(emitEvents.updateCurrentTypeTechAn);
    };

    return {
      onClickRange,
      onClickType,
      getCurrentRange: computed(() => techAnStore.currentRange),
      getCurrentType: computed(() => techAnStore.currentType),
      getDarkModeStatus: computed(() => techAnStore.isDarkMode),
      currentType,
    };
  },
});
</script>

<style scoped lang="scss">
.utils {
  $block: &;

  position: absolute;
  top: 15px;
  width: 100%;
  padding: 0 15px;

  &__mobile {
    display: flex;
    align-items: center;
    justify-content: space-between;

    svg {
      cursor: pointer;
    }
  }

  &__desktop {
    display: none;
  }

  &__select {
    position: relative;
    display: inline-block;

    select {
      position: relative;
      z-index: 2;
      width: 140px;
      padding: 8px 0;
      color: #000;
      font-size: 12px;
      font-family: $ff-montserrat;
      background: none;
      border: 0;
      outline: 0;
      cursor: pointer;
      appearance: none;

      option {
        color: #000;
        font-size: 12px;
        font-family: $ff-montserrat;
      }

      &:focus {
        outline: none;
      }

      &::-ms-expand {
        display: none;
      }
    }

    svg {
      position: absolute;
      top: 30%;
      right: 0;
    }
  }

  @include respond-to(1220) {
    &__mobile {
      display: none;
    }

    &__desktop {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__types {
      display: flex;
      align-items: center;
    }

    &__type {
      padding: 20px 24px;
      color: #000;
      font-size: 16px;
      font-family: $ff-montserrat;
      background: #f7f7f7;
      cursor: pointer;

      &:hover {
        background: #fec006;
      }

      &--ml {
        margin-left: 13px;
      }

      &--active {
        color: #fff;
        background: #2a8634;

        &:hover {
          background: #2a8634;
        }
      }
    }

    &__period {
      display: flex;
      align-items: center;
    }

    &__calendar {
      display: flex;
      align-items: center;
      padding-right: 30px;
      cursor: pointer;

      span {
        position: relative;
        top: 2px;
        display: inline-block;
        padding-left: 5px;
        color: #797979;
        font-size: 16px;
      }
    }

    &__periodPresets {
      display: flex;
      align-items: center;
    }

    &__periodPreset {
      padding: 20px 10px;
      color: #000;
      font-size: 16px;
      text-transform: uppercase;
      cursor: pointer;

      &:hover {
        background: #fec006;
      }

      &--active {
        color: #fff;
        background: #2a8634;

        &:hover {
          background: #2a8634;
        }
      }
    }
  }

  &--dark-mode {
    #{$block} {
      &__periodPreset {
        color: #fff;
      }

      &__type {
        color: #fff;
        background: #2e2e2e;

        &:hover {
          background: #fec006;
        }

        &--active {
          background: #49843e;

          &:hover {
            background: #49843e;
          }
        }
      }
    }
  }
}
</style>
