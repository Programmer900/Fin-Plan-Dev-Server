<script lang="ts">
export default defineComponent({
  name: 'TableLeftCellTitle',
});
</script>

<script setup lang="ts">
import { radarStore } from '@/store/pinia/radar';
import { useVModel } from '@/use/useVModel';

const props = defineProps({
  active: {
    type: Object,
    required: true,
    default: () => {},
  },
});

const radar = radarStore();
const isActive = ref(false);
const activeModel = useVModel(props, 'active');

const onClickActive = () => {
  activeModel.value.isSelected = !activeModel.value.isSelected;
};
</script>

<template lang="pug">
td.cellTitle
  span(
    :class='["cellTitle__toggle", { "cellTitle__toggle--active": activeModel.isSelected }]',
    @click='onClickActive'
  )
  span.cellTitle__name {{ activeModel.NAME }}
</template>

<style scoped lang="scss">
.cellTitle {
  position: relative;
  font-weight: 500;
  font-size: 20px;
  vertical-align: top;

  &__name {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 40px;
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
    left: 10px;
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

  @include respond-to($container-media--tablet) {
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
}
</style>
