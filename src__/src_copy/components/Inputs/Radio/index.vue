<template>
  <div :class="['inputRadio', { 'inputRadio--vertical': isVertical }]">
    <div v-if="title" class="inputRadio__title">{{ title }}</div>
    <div class="inputRadio__row">
      <label v-for="(option, index) in Object.values(options)" :key="index">
        <input
          v-model="modelValue"
          :name="groupName"
          type="radio"
          :value="option.value"
          @change="onChange(option)"
        />
        <span>{{ option.label }}</span>
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { useVModel } from '@/use/useVModel';

interface IOption {
  value: string | number | boolean;
  text: string;
  [key: string]: any;
}

export default defineComponent({
  name: 'InputRadio',
  emits: ['update:value', 'onChange'],
  props: {
    value: {
      type: [Number, String, Boolean],
      required: true,
    },
    options: {
      type: Object,
      required: true,
      default: () => {},
    },
    groupName: {
      type: String,
      required: true,
    },
    isVertical: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    id: {
      type: [Number, String],
      default: '',
    },
  },
  setup(props, { emit }) {
    const onChange = (option) => {
      if (props.id !== '') {
        emit('onChange', props.id, option.value);
      }
    };

    return {
      modelValue: useVModel(props, 'value'),
      onChange,
    };
  },
});
</script>

<style scoped lang="scss">
.inputRadio {
  $blockname: &;

  &__title {
    margin-bottom: 18px;
    font-weight: 600;
    font-size: 12px;
    line-height: 150%;
  }

  &__row {
    display: flex;
    align-items: center;
  }

  label {
    position: relative;
    display: flex;
    align-items: center;
    cursor: pointer;

    &:not(:last-child) {
      margin-right: 35px;
    }
  }

  span {
    display: inline-block;
    padding-left: 2em;
    color: #2a8634;
    font-weight: 500;
    font-size: 12px;
    line-height: 150%;
  }

  input[type='radio'] {
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
  }

  input[type='radio']::before {
    $_size: 0.65em;

    width: $_size;
    height: $_size;
    background-color: #000;
    border-radius: 50%;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
    content: '';
  }

  input[type='radio']:checked {
    border-color: #fec006;
    border-width: 4px;
  }

  input[type='radio']:checked::before {
    transform: scale(1);
  }

  &--vertical {
    #{$blockname}__row {
      flex-direction: column;
      align-items: flex-start;
    }

    label {
      &:not(:last-child) {
        margin-bottom: 15px;
      }
    }
  }

  @include respond-to($container-media--tablet) {
    &__title {
      font-size: 15px;
    }

    span {
      font-size: 15px;
    }

    input[type='radio'] {
      $_size: 1.3em;

      width: $_size;
      height: $_size;

      &:checked {
        border-width: 6px;
      }
    }
  }

  @include respond-to(1200) {
    &__title {
      margin-bottom: 30px;
      font-size: 20px;
    }

    span {
      font-size: 20px;
    }

    input[type='radio'] {
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
