<template>
  <div class="asset">
    <div class="asset__header">
      <div class="asset__title">{{ active.NAME }}</div>
      <div class="asset__subtitle">{{ active.COMPANY.NAME }}</div>
    </div>
    <div class="asset__body">
      <TechnicalAnalysisPageCompanyStat
        v-for="(title, titleIndex) in getCurrentStatTitles"
        :key="titleIndex"
        :active="active"
        :title="title"
        :titles="getCurrentStatValueTitles[titleIndex]"
        :value-keys="getCurrentStatValueActiveKeys[titleIndex]"
      />
    </div>
    <div class="asset__footer">
      <div class="asset__price">
        Стоимость облигации: <span>{{ active.ID }} ₽</span>
      </div>
      <div class="asset__quantity">
        <span>Количество:</span>
        <InputNumber v-model:value="activeModel.count" class="asset__quantityInput" />
      </div>
      <div class="asset__wrapBtnAdd">
        <div class="asset__sum">Сумма: {{ active.ID }} ₽</div>
        <button
          v-if="!activeModel.isSelected"
          class="asset__btnAdd"
          @click="activeModel.isSelected = true"
        >
          Добавить
        </button>
        <button
          v-if="activeModel.isSelected"
          class="asset__btnAdd asset__btnAdd--remove"
          @click="activeModel.isSelected = false"
        >
          Убрать
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TechnicalAnalysisPageCompanyStat from '@/views/TechnicalAnalysis/modules/Body/modules/Companies/modules/Company/modules/Stat/index.vue';
import { useVModel } from '@/use/useVModel';
import InputNumber from '@/components/Inputs/Number/index.vue';
import { radarStore } from '@/store/pinia/radar';

export default defineComponent({
  name: 'ListItemViewMaxRadarPortfolio',
  components: { TechnicalAnalysisPageCompanyStat, InputNumber },
  props: {
    active: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  setup(props) {
    const radar = radarStore();
    const quantityModel = ref(1);
    const activeModel = useVModel(props, 'active');

    return {
      activeModel,
      quantityModel,
      getCurrentStatTitles: radar.getCurrentStatTitles,
      getCurrentStatValueTitles: radar.getCurrentStatValueTitles,
      getCurrentStatValueActiveKeys: radar.getCurrentStatValueActiveKeys,
    };
  },
});
</script>

<style scoped lang="scss">
.asset {
  margin-bottom: 30px;
  padding: 20px 20px 40px;
  white-space: nowrap;
  background: #fff;

  &__header {
    padding-bottom: 10px;
    border-bottom: 1px solid #e8e8e8;
  }

  &__title {
    padding-bottom: 4px;
    font-weight: 600;
    font-size: 16px;
    line-height: 150%;
  }

  &__subtitle {
    color: #747474;
    font-weight: 500;
    font-size: 12px;
    line-height: 150%;
  }

  &__footer {
    margin-top: 10px;
    padding-top: 20px;
  }

  &__price {
    margin-bottom: 20px;
    color: #747474;
    font-weight: 500;
    font-size: 12px;
    line-height: 150%;
  }

  &__btnAdd {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
    padding: 10px 12%;
    color: #fff;
    font-weight: 600;
    font-size: 10px;
    text-transform: uppercase;
    background: #2a8634;
    border: none;
    border-radius: 6px;
    outline: none;
    cursor: pointer;
    transition: 0.1s all ease;

    &:hover {
      background: #fec006;
    }

    &--remove {
      background: red;
    }
  }

  &__quantity {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    span {
      margin-right: 12px;
      color: #747474;
      font-weight: 500;
      font-size: 12px;
      line-height: 150%;
    }
  }

  &__sum {
    margin-bottom: 30px;
    font-weight: 600;
    font-size: 14px;
    line-height: 150%;
  }

  ::v-deep .inputNumber__field {
    border: none;

    input {
      padding: 10px 5px;
      background: #f7f7f7;
      border: 1px solid #f7f7f7;

      &:focus {
        background: #fff;
        border-color: #fec006;
      }
    }
  }

  @include respond-to(400) {
    &__btnAdd {
      padding-top: 15px;
      padding-bottom: 15px;
    }
  }

  @include respond-to($container-media--tablet) {
    ::v-deep .inputNumber input {
      width: 100px;
    }
  }

  @include respond-to(770) {
    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__footer {
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 5%;
      row-gap: 20px;
    }

    &__quantity {
      justify-content: flex-end;
      margin: 0;
    }

    &__price {
      margin-bottom: 0;
    }

    &__wrapBtnAdd {
      display: flex;
      grid-column: span 2;
      align-items: center;
      justify-content: space-between;
    }

    &__btnAdd {
      margin: 0;
    }

    &__sum {
      margin: 0;
    }
  }

  @include respond-to(1180) {
    &__body {
      display: grid;
      grid-auto-flow: column;
      column-gap: 10px;
    }

    &__footer {
      grid-template-columns: 1fr 1fr 1fr;
    }

    &__wrapBtnAdd {
      grid-column: auto;
    }

    &__quantity {
      justify-content: flex-start;
      margin-left: 5px;
    }

    &__sum {
      margin-right: 2%;
    }
  }

  @include respond-to(1300) {
    &__title {
      font-size: 26px;
    }

    &__subtitle {
      font-size: 14px;
    }

    &__price {
      font-size: 14px;
    }

    &__quantity {
      span {
        font-size: 14px;
      }
    }

    &__sum {
      font-size: 14px;
    }

    &__btnAdd {
      padding-top: 18px;
      padding-bottom: 18px;
      font-size: 14px;
    }
  }

  @include respond-to(1600) {
    &__price {
      font-size: 18px;
    }

    &__quantity {
      span {
        font-size: 18px;
      }
    }

    &__btnAdd {
      padding: 20px 50px;
    }

    &__sum {
      font-size: 18px;
    }
  }

  @include respond-to(1750) {
    padding: 40px 40px 30px;
  }
}
</style>
