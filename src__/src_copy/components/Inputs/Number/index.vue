<template>
  <div
    :class="[
      'inputNumber',
      { 'inputNumber--error': isError || error },
      { 'inputNumber--mini': isMini },
    ]"
  >
    <div v-if="textLeft" class="inputNumber__text inputNumber__text--left">{{ textLeft }}</div>
    <div class="inputNumber__field">
      <input
        v-model="modelValue"
        pattern="\d+(,\d{2})?"
        type="text"
        @input="onInput($event)"
        @keypress="onKeyPress($event)"
        @keyup="onKeyUp"
      />
      <div v-if="textRight" class="inputNumber__text">{{ textRight }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'InputNumber',
  props: {
    value: {
      type: [Number, String],
      required: true,
      default: 0,
    },
    textLeft: {
      type: String,
      default: '',
    },
    textRight: {
      type: String,
      default: '',
    },
    onlyPositive: {
      type: Boolean,
      default: false,
    },
    isMini: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const isError = ref<boolean>(false);
    const modelValue = ref<string>(String(props.value).replace(/[.]/g, ',') || '0');

    const onInput = async (evt) => {
      const { value }: { value: any } = evt.target;

      modelValue.value = modelValue.value.replace(/[.]/g, ',');

      if (modelValue.value.split('').filter((s) => s === ',').length >= 2) {
        modelValue.value = modelValue.value.slice(0, -1);
      }

      let newValue = Number(modelValue.value.replace(/[,]/g, '.'));

      if (Number.isNaN(newValue)) {
        newValue = 0;
      }

      if (value.length === 2 && value[0] === '0' && value[1] !== '.') {
        // eslint-disable-next-line prefer-destructuring
        modelValue.value = value[1];
      }
      await emit('update:value', newValue);
    };

    const onKeyPress = (evt) => {
      evt = evt || window.event;
      const charCode = evt.which ? evt.which : evt.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
        evt.preventDefault();
      }
    };

    const onKeyUp = () => {
      if (modelValue.value.length === 0) {
        modelValue.value = '0';
      }
    };

    return {
      onInput,
      onKeyPress,
      onKeyUp,
      isError,
      modelValue,
    };
  },
});
</script>

<style scoped lang="scss">
.inputNumber {
  $blockname: &;

  display: flex;
  align-items: center;

  &__field {
    $_pad-side: 8px;

    display: flex;
    align-items: center;
    border-bottom: 1px solid #e7e7e7;
  }

  &__text {
    font-weight: 600;
    font-size: 16px;
    line-height: 150%;

    &--left {
      padding-right: 2px;
    }
  }

  input {
    width: 80px;
    font-weight: 600;
    font-size: 16px;
    line-height: 150%;
    background: transparent;
    border: none;
    outline: none;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      margin: 0;
      -webkit-appearance: none;
    }

    &[type='number'] {
      -moz-appearance: textfield;
    }
  }

  &--mini {
    #{$blockname}__field {
      input {
        max-width: 50px;
      }
    }
  }

  &--error {
    #{$blockname}__field {
      border-bottom-color: red;
    }
  }

  @include respond-to($container-media--tablet) {
    &__field {
      padding-left: 0;
    }

    input {
      width: 200px;
      font-size: 18px;
    }

    &__text {
      &--left {
        padding-right: 30px;
      }
    }
  }
}
</style>
