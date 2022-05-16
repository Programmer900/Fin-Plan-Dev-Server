<template>
  <div class="asset">
    <div class="asset__header">
      <div class="asset__title">
        <span
          :class="['asset__toggle', { 'asset__toggle--active': activeModel.isSelected }]"
          @click="onClickActive"
        />{{ active.NAME }}
      </div>
    </div>
    <div class="asset__bodyMobile">
      <ListItemViewMinStatRadarPortfolio
        v-for="(valueTitles, valueTitlesIndex) in getCurrentStatValueTitles"
        :key="valueTitlesIndex"
        :active="active"
        :titles="valueTitles"
        :value-keys="getCurrentStatValueActiveKeys[valueTitlesIndex]"
      />
    </div>
    <div class="asset__footer">
      <div class="asset__count">
        <span>Количество:</span>
        <ListItemViewMinCountRadarPortfolio v-model:count="activeModel.count" />
      </div>
      <div class="asset__sum">Сумма: {{ active.ID }} ₽</div>
    </div>
    <div class="asset__line" />
  </div>
</template>

<script lang="ts">
import ListItemViewMinStatRadarPortfolio from '@/components/Lists/RadarPortfolio/modules/Item/modules/ViewTypes/Min/modules/Stat/index.vue';
import ListItemViewMinCountRadarPortfolio from '@/components/Lists/RadarPortfolio/modules/Item/modules/ViewTypes/Min/modules/Counter/index.vue';
import { radarStore } from '@/store/pinia/radar';
import { useVModel } from '@/use/useVModel';

export default defineComponent({
  name: 'ListItemViewMinRadarPortfolio',
  components: {
    ListItemViewMinCountRadarPortfolio,
    ListItemViewMinStatRadarPortfolio,
  },
  props: {
    active: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  setup(props) {
    const radar = radarStore();
    const isActive = ref(false);
    const activeModel = useVModel(props, 'active');

    const onClickActive = () => {
      activeModel.value.isSelected = !activeModel.value.isSelected;
    };

    return {
      activeModel,
      onClickActive,
      getCurrentStatTitles: radar.getCurrentStatTitles,
      getCurrentStatValueTitles: radar.getCurrentStatValueTitles,
      getCurrentStatValueActiveKeys: radar.getCurrentStatValueActiveKeys,
    };
  },
});
</script>

<style scoped lang="scss">
.asset {
  padding: 25px 20px 0;
  background: #fff;

  &__line {
    margin-top: 30px;
    border-bottom: 1px solid #e8e8e8;
  }

  &__header {
    margin-bottom: 30px;
  }

  &__title {
    position: relative;
    font-weight: 600;
    font-size: 16px;
    line-height: 150%;
    padding-left: 30px;
  }

  &__toggle {
    $_size: 34px;

    @mixin _line {
      position: absolute;
      display: block;
      width: 50%;
      height: 1px;
      background: #fff;
      content: '';
    }

    position: absolute;
    top: 50%;
    left: 0;
    display: inline-block;
    width: $_size;
    height: $_size;
    background: #fec006;
    border: 1px solid #fec006;
    border-radius: 100%;
    cursor: pointer;
    transform: translateY(-50%);

    &::before {
      @include _line();

      top: 50%;
      left: 25%;
    }

    &::after {
      @include _line();

      top: 50%;
      left: 25%;
      transform: rotate(90deg);
    }

    &--active {
      background: transparent;
      border-color: #7a7a7a;

      &::before {
        background: #7a7a7a;
      }

      &::after {
        display: none;
      }

      &:hover {
        border-color: #fec006;

        &::before {
          background: #fec006;
        }
      }
    }
  }

  &__count {
    margin-bottom: 20px;

    span {
      color: #747474;
      font-weight: 500;
      font-size: 12px;
      line-height: 150%;
    }
  }

  &__sum {
    font-weight: 600;
    font-size: 14px;
    line-height: 150%;
  }

  @include respond-to(400) {
    &__footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }

  @include respond-to($container-media--tablet) {
    &__title {
      font-size: 20px;
    }

    &__count {
      span {
        font-size: 16px;
      }
    }

    &__sum {
      font-size: 16px;
    }

    &__toggle {
      $_size: 18px;

      width: $_size;
      height: $_size;

      &::before {
        top: 50%;
      }

      &::after {
        top: 50%;
      }
    }
  }

  @include respond-to(950) {
    &__bodyMobile {
      display: grid;
      grid-auto-flow: column;
      column-gap: 14px;
    }
  }

  @include respond-to(1300) {
    display: none;
    //display: grid;
    //grid-template-columns: 1fr 2fr 1fr;
    //border-bottom: 1px solid #e8e8e8;
    //padding-bottom: 30px;
    //
    //&__header {
    //  margin-bottom: 0;
    //}
    //
    //&__line {
    //  display: none;
    //}
    //
    //&__count {
    //  margin: 0;
    //
    //  span {
    //    display: none;
    //  }
    //}
  }
}
</style>
