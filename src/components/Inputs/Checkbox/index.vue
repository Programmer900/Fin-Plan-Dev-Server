<template>
  <label :class="['inputCheckbox', { 'inputCheckbox--left': isLeftCheckmark }]">
    <span v-if="title">{{ title }}</span>
    <input v-model="valueModel" type="checkbox" />
    <span class="inputCheckbox__checkmark" />
  </label>
</template>

<script lang="ts">
import { useVModel } from '@/use/useVModel';

export default defineComponent({
  name: 'InputCheckbox',
  emits: ['update:selected'],
  props: {
    selected: Boolean,
    title: {
      type: String,
      default: '',
    },
    isLeftCheckmark: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const valueModel = useVModel(props, 'selected');

    const onSelect = () => {
      emit('update:selected', !props.selected);
    };

    return {
      valueModel,
    };
  },
});
</script>

<style scoped lang="scss">
.inputCheckbox {
  $blockname: &;
  $_size: 20px;

  position: relative;
  display: flex;
  align-items: center;
  width: max-content;
  height: $_size;
  padding-right: 35px;
  color: #afafaf;
  font-weight: 500;
  font-size: 10px;
  cursor: pointer;
  user-select: none;

  input {
    position: absolute;
    width: 0;
    height: 0;
    cursor: pointer;
    opacity: 0;
  }

  &__checkmark {
    position: absolute;
    top: 0;
    right: 0;
    width: $_size;
    height: $_size;
    background-color: #eee;
    border: 1px solid #c0c0c0;

    &::after {
      position: absolute;
      top: 3px;
      left: 7px;
      display: none;
      width: 5px;
      height: 10px;
      border: solid #000;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
      content: '';
    }
  }

  &:hover input ~ &__checkmark {
    border-color: #f3c243;
  }

  input:checked ~ &__checkmark {
    background-color: #f3c243;
    border-color: #f3c243;
  }

  input:checked ~ &__checkmark::after {
    display: block;
  }

  @include respond-to($container-media--tablet) {
    $_size: 25px;

    height: $_size;
    font-size: 15px;

    &__checkmark {
      width: $_size;
      height: $_size;

      &::after {
        left: 8px;
        width: 7px;
        height: 14px;
      }
    }

    span {
      display: inline-block;
      padding-right: 10px;
    }
  }

  @include respond-to(1200) {
    font-size: 18px;
  }

  @include respond-to(1650) {
    width: 100%;
  }

  &--left {
    padding-right: 0;
    padding-left: 35px;

    #{$blockname} {
      &__checkmark {
        right: unset;
        left: 0;
      }
    }
  }
}
</style>
