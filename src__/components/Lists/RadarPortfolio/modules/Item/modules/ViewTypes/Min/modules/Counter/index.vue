<template>
  <div class="counter">
    <button class="counter__btn counter__btn--minus" @click="onClick('minus')" />
    <div class="counter__value">{{ countModel }}</div>
    <button class="counter__btn counter__btn--plus" @click="onClick('plus')" />
  </div>
</template>

<script lang="ts">
import { cloneDeep } from 'lodash';
import { radarStore } from '@/store/pinia/radar';
import { useVModel } from '@/use/useVModel';

export default defineComponent({
  name: 'ListItemViewMinCountRadarPortfolio',
  emits: ['update:count'],
  props: {
    count: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const radar = radarStore();
    const countModel = useVModel(props, 'count', true);

    const onClick = (mode: string) => {
      if (mode === 'minus' && Number(countModel.value) !== 0) {
        countModel.value -= 1;
      } else if (mode === 'plus') {
        countModel.value += 1;
      }
    };

    return {
      countModel,
      onClick,
    };
  },
});
</script>

<style scoped lang="scss">
.counter {
  display: flex;
  align-items: center;
  margin-top: 15px;

  @mixin _line {
    position: absolute;
    display: block;
    width: 50%;
    height: 2px;
    background: #747474;
    transition: 0.1s all ease;
    content: '';
  }

  &__btn {
    $_size: 20px;

    position: relative;
    width: $_size;
    height: $_size;
    padding: 0;
    background: none;
    border: 2px solid #747474;
    border-radius: 100%;
    cursor: pointer;
    transition: 0.1s all ease;

    &--minus {
      &::before {
        @include _line();

        left: 25%;
      }
    }

    &--plus {
      &::before {
        @include _line();

        left: 25%;
      }

      &::after {
        @include _line();

        left: 25%;
        transform: rotate(90deg);
      }
    }

    &:hover {
      border-color: #fec006;

      &::before {
        background: #fec006;
      }

      &::after {
        background: #fec006;
      }
    }
  }

  &__value {
    margin: 0 13px;
    font-weight: 700;
    font-size: 16px;
    line-height: 150%;
  }

  @include respond-to($container-media--tablet) {
    &__value {
      font-size: 20px;
    }

    &__btn {
      $_size: 24px;

      width: $_size;
      height: $_size;
    }
  }

  @include respond-to(1600) {
    margin: 0;
  }
}
</style>
