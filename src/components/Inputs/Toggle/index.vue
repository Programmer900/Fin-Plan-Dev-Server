<template>
  <label class="inputToggle">
    <input type="checkbox" v-model="modelValue" />
    <span class="inputToggle__slider"></span>
    <span class="inputToggle__text">{{ textRight }}</span>
  </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useVModel } from '@/use/useVModel';

export default defineComponent({
  name: 'InputToggle',
  props: {
    value: Boolean,
    textRight: String,
  },
  setup(props) {
    return {
      modelValue: useVModel(props, 'value'),
    };
  },
});
</script>

<style scoped lang="scss">
.inputToggle {
  $blockname: &;
  $_width: 25px;
  $_height: 14px;

  position: relative;
  display: flex;
  align-items: center;
  width: $_width;
  height: $_height;
  cursor: pointer;

  &__text {
    display: inline-block;
    padding-left: $_width + 10px;
    color: #2a8634;
    font-weight: 500;
    font-size: 12px;
  }

  input {
    display: none;
  }

  &__slider {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #ccc;
    border-radius: 30px;
    transition: 0.4s;

    &::before {
      position: absolute;
      top: 50%;
      left: 0;
      width: $_height;
      height: $_height;
      background-color: #fff;
      border-radius: 50%;
      transform: translate(0, -50%);
      transition: 0.4s;
      content: '';
    }
  }

  input:checked + &__slider {
    background-color: #fec006;
  }

  input:checked + &__slider::before {
    transform: translate($_width / 2, -50%);
  }

  &:hover {
    #{$blockname} {
      &__slider::before {
        background-color: #fec006;
        box-shadow: 0 0 0 1.5px #fec006;
      }
    }
  }

  @include respond-to($container-media--tablet) {
    $_width: 40px;
    $_height: 22px;

    width: $_width;
    height: $_height;

    &__text {
      padding-left: $_width + 20px;
      font-size: 15px;
    }

    &__slider {
      &::before {
        width: $_height;
        height: $_height;
      }
    }

    input:checked + &__slider::before {
      transform: translate($_width / 2, -50%);
    }
  }

  @include respond-to(1200) {
    $_width: 60px;
    $_height: 30px;

    width: $_width;
    height: $_height;

    &__text {
      padding-left: $_width + 20px;
      font-size: 20px;
    }

    &__slider {
      &::before {
        width: $_height;
        height: $_height;
      }
    }

    input:checked + &__slider::before {
      transform: translate($_width / 2, -50%);
    }
  }
}
</style>
