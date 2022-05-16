<template>
  <div class="toggleRadio">
    <div class="toggleRadio__title">{{ title }}</div>
    <label class="toggleRadio__toggleLabel">
      <input class="toggleRadio__toggleInput" type="checkbox" v-model="toggleValueModel" />
      <span class="toggleRadio__toggleText toggleRadio__toggleText--left">{{
        toggleTextLeft
      }}</span>
      <span class="toggleRadio__toggleSlider"></span>
      <span class="toggleRadio__toggleText toggleRadio__toggleText--right">{{
        toggleTextRight
      }}</span>
    </label>
    <div class="toggleRadio__wrapRadio">
      <label class="toggleRadio__radioLabel" v-for="(option, index) in radioOptions" :key="index">
        <input
          class="toggleRadio__radioInput"
          type="radio"
          :value="option.value"
          :name="radioGroupName"
          :checked="option.value === radioValue"
          @change="$emit('value', option.value)"
        />
        <span class="toggleRadio__radioText">{{ option.text }}</span>
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useVModel } from '@/use/useVModel';

interface IOption {
  value: string | number | boolean;
  text: string;

  [key: string]: any;
}

export default defineComponent({
  name: 'InputToggleRadio',
  props: {
    toggleValue: Boolean,
    radioValue: [Number, String, Boolean],
    radioOptions: {
      type: Array as () => IOption[],
      required: true,
    },
    radioGroupName: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: '',
    },
    toggleTextLeft: {
      type: String,
      default: '',
    },
    toggleTextRight: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    return {
      toggleValueModel: useVModel(props, 'toggleValue'),
    };
  },
});
</script>

<style scoped lang="scss">
.toggleRadio {
  $blockname: &;
  $_toggleWidth: 25px;
  $_toggleHeight: 14px;

  margin-bottom: 30px;

  &__title {
    margin-bottom: 18px;
    font-weight: 600;
    font-size: 12px;
    line-height: 150%;
  }

  &__toggleText {
    $_add-pad: 0;

    display: inline-block;
    color: #8a8a8a;
    font-weight: 500;
    font-size: 12px;
    line-height: 150%;

    &--left {
      padding-right: $_toggleWidth + $_add-pad;
    }

    &--right {
      padding-left: $_toggleWidth + $_add-pad;
    }
  }

  &__toggleLabel {
    position: relative;
    display: inline-block;
    cursor: pointer;

    &:hover {
      #{$blockname} {
        &__toggleSlider::before {
          background-color: #fec006;
          box-shadow: 0 0 0 1.5px #fec006;
        }
      }
    }
  }

  &__toggleSlider {
    position: absolute;
    top: 3px;
    left: 50%;
    width: $_toggleWidth;
    height: $_toggleHeight;
    background-color: #ccc;
    border-radius: 30px;
    transition: 0.4s;

    &::before {
      position: absolute;
      top: 50%;
      left: 0;
      width: $_toggleHeight;
      height: $_toggleHeight;
      background-color: #1e5f25;
      border-radius: 50%;
      transform: translate(0, -50%);
      transition: 0.4s;
      content: '';
    }
  }

  &__toggleInput {
    display: none;
  }

  &__toggleInput:checked ~ &__toggleSlider {
    background-color: #2a8634;
  }

  &__toggleInput:checked ~ &__toggleSlider::before {
    transform: translate($_toggleWidth / 2, -50%);
  }

  &__wrapRadio {
    display: flex;
    align-items: center;
    margin-top: 20px;
  }

  &__radioLabel {
    position: relative;
    display: flex;
    align-items: center;
    cursor: pointer;

    &:not(:last-child) {
      margin-right: 35px;
    }
  }

  &__radioText {
    display: inline-block;
    padding-left: 2em;
    color: #2a8634;
    font-weight: 500;
    font-size: 12px;
  }

  &__radioInput {
    $_size: 1.15em;

    position: absolute;
    display: grid;
    width: $_size;
    height: $_size;
    margin: 0;
    border: 1px solid #797979;
    border-radius: 50%;
    transform: translateY(-0.075em);
    cursor: pointer;
    appearance: none;
    place-content: center;

    &::before {
      $_size: 0.65em;

      width: $_size;
      height: $_size;
      background-color: #000;
      border-radius: 50%;
      transform: scale(0);
      transition: 120ms transform ease-in-out;
      content: '';
    }

    &:checked {
      border-color: #fec006;
      border-width: 4px;
    }

    &:checked::before {
      transform: scale(1);
    }
  }

  @include respond-to($container-media--tablet) {
    $_toggleWidth: 40px;
    $_toggleHeight: 22px;

    &__title {
      font-size: 15px;
    }

    &__toggleText {
      font-size: 15px;

      &--left {
        padding-right: $_toggleWidth;
      }

      &--right {
        padding-left: $_toggleWidth;
      }
    }

    &__toggleSlider {
      top: 0;
      width: $_toggleWidth;
      height: $_toggleHeight;

      &::before {
        width: $_toggleHeight;
        height: $_toggleHeight;
      }
    }

    &__radioInput {
      $_size: 1.3em;

      width: $_size;
      height: $_size;

      &:checked {
        border-width: 6px;
      }
    }

    &__toggleInput:checked ~ &__toggleSlider::before {
      transform: translate($_toggleWidth / 2, -50%);
    }

    &__radioText {
      font-size: 15px;
    }
  }

  @include respond-to(1200) {
    $_toggleWidth: 60px;
    $_toggleHeight: 30px;

    &__title {
      margin-bottom: 30px;
      font-size: 20px;
    }

    &__toggleText {
      font-size: 20px;

      &--left {
        padding-right: $_toggleWidth;
      }

      &--right {
        padding-left: $_toggleWidth;
      }
    }

    &__toggleSlider {
      width: $_toggleWidth;
      height: $_toggleHeight;

      &::before {
        width: $_toggleHeight;
        height: $_toggleHeight;
      }
    }

    &__toggleInput:checked ~ &__toggleSlider::before {
      transform: translate($_toggleWidth / 2, -50%);
    }

    &__wrapRadio {
      margin-top: 40px;
    }

    &__radioText {
      font-size: 20px;
    }

    &__radioInput {
      $_size: 1.5em;

      width: $_size;
      height: $_size;

      &:checked {
        border-width: 8px;
      }
    }
  }
}
</style>
