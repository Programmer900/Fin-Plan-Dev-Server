<template>
  <div class="company">
    <div class="company__header">
      <div class="company__title">{{ asset.NAME }}</div>
      <div class="company__subtitle">{{ asset.CODE }}</div>
    </div>
    <div class="company__body">
      <TechnicalAnalysisPageCompanyStat :currency="currency" :items="itemsPrice" title="Цена" />
      <TechnicalAnalysisPageCompanyStat :currency="currency" :items="itemsMixed" title="Другое" />
      <TechnicalAnalysisPageCompanyStat
        :currency="currency"
        :items="itemsDrawdown"
        title="Просад"
      />
    </div>
    <div class="company__footer">
      <div class="company__price">Цена компании: <span>6 694 233 Р.</span></div>
      <div class="company__delete" @click="onClickDelete">
        <svg
          fill="none"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.07317 5.66667L6.03877 21.0626C6.07182 21.5895 6.50883 22 7.03681 22H17.451C17.979 22 18.416 21.5895 18.449 21.0626L19.4146 5.66667H16.3415M2 5.66667H8.14634M23 5.66667H19.6707H16.3415M16.3415 5.66667V2C16.3415 1.44771 15.8937 1 15.3415 1H9.14634C8.59406 1 8.14634 1.44772 8.14634 2V5.66667M16.3415 5.66667H8.14634M8.65854 8L9.17073 18.7333M12.2439 18.7333V8M15.3171 18.7333L15.8293 8"
            stroke="white"
          />
        </svg>
        <span>Удалить из сравнения</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import TechnicalAnalysisPageCompanyStat from '@/views/TechnicalAnalysis/modules/Body/modules/Companies/modules/Company/modules/Stat/index.vue';
import { DynamicObject } from '@/interfaces';
import { useTechAnalysisStore } from '@/store/pinia/technicalAnalysis';

export default defineComponent({
  name: 'TechnicalAnalysisPageCompany',
  components: { TechnicalAnalysisPageCompanyStat },
  props: {
    asset: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const currency = ref('');
    const itemsPrice = ref<DynamicObject[]>([]);
    const itemsDrawdown = ref<DynamicObject[]>([]);
    const itemsMixed = ref<DynamicObject[]>([]);
    const techStore = useTechAnalysisStore();

    const onClickDelete = async () => {
      techStore.deleteSelectedAsset(props.asset);
      await techStore.savePreset();
    };

    const init = () => {
      try {
        if (props.asset.REGION === 'USA') {
          currency.value = '$';
        } else {
          currency.value = '₽';
        }

        if (!props.asset.PROPS) return;

        itemsPrice.value = [
          {
            title: 'Последняя',
            value: props.asset.PROPS.LEGALCLOSE.VALUE,
          },
          {
            title: 'Вчера',
            value: props.asset.PROPS.QUOTATIONS_DAY.VALUE,
          },
          {
            title: 'Месяц назад',
            value: props.asset.PROPS.QUOTATIONS_MONTH.VALUE,
          },
        ];

        itemsDrawdown.value = [
          {
            title: 'Просад',
            value: props.asset.PROPS.PROP_PROSAD.VALUE,
          },
          {
            title: 'Дата',
            value: props.asset.PROPS.PROP_DATA_PROSADA.VALUE,
            notNum: true,
          },
        ];

        itemsMixed.value = [
          {
            title: 'Бетта',
            value: props.asset.PROPS.BETTA.VALUE,
          },
          {
            title: 'Код бумаги',
            value: props.asset.PROPS.SECID.VALUE,
            notNum: true,
          },
        ];
      } catch (e) {
        console.error('techAn company component');
        console.error(e);
      }
    };

    onMounted(() => {
      init();
    });

    return {
      onClickDelete,
      currency,
      itemsPrice,
      itemsDrawdown,
      itemsMixed,
    };
  },
});
</script>

<style scoped lang="scss">
.company {
  margin-bottom: 16px;
  padding: 28px;
  background: #fff;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 10px;
    border-bottom: 1px solid #f9f9f9;
  }

  &__title {
    font-weight: 700;
    font-size: 18px;
  }

  &__subtitle {
    color: #797979;
    font-size: 10px;
  }

  &__footer {
    padding-top: 25px;
  }

  &__price {
    margin-bottom: 46px;
    color: #797979;
    font-size: 12px;

    span {
      display: inline-block;
      margin-left: 27px;
      color: #000;
    }
  }

  &__delete {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 20px;
    color: #fff;
    font-size: 12px;
    text-transform: uppercase;
    background: #2a8634;
    border-radius: 5px;
    cursor: pointer;

    span {
      display: inline-block;
      margin-left: 12px;
    }

    &:hover {
      background: #fec006;
    }
  }

  @include respond-to(760) {
    &__footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__price {
      margin-bottom: 0;
    }
  }

  @include respond-to(1180) {
    &__body {
      display: grid;
      grid-auto-flow: column;
    }
  }
}
</style>
