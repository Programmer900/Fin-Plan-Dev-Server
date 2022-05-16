<template>
  <div class="inputRange">
    <div v-if="title" class="inputRange__title">{{ title }}</div>
    <div v-if="subtitle" class="inputRange__subtitle">{{ subtitle }}</div>
    <div class="inputRange__current">
      {{ currentTextLeft }} {{ current }} {{ currentTextRight }}
    </div>
    <div class="inputRange__field">
      <input
        v-model="currentModel"
        :max="max"
        :min="min"
        :step="step"
        type="range"
        @input="onInput"
      />
      <div class="inputRange__progress" :style="`width: ${progressWidth}%`" />
    </div>
    <div class="inputRange__minMax">
      <span>{{ min }} {{ symbol }}</span>
      <span>{{ max }} {{ symbol }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import {
 defineComponent, onMounted, ref, watch
} from 'vue';
import { useVModel } from '@/use/useVModel';

export default defineComponent({
  name: 'InputRange',
  emits: ['change', 'update:current'],
  props: {
    title: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
    currentTextLeft: {
      type: String,
      default: '',
    },
    currentTextRight: {
      type: String,
      default: '',
    },
    min: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
    symbol: {
      type: String,
      default: '',
    },
    step: {
      type: Number,
      required: true,
    },
    toNum: {
      type: Boolean,
      default: true,
    },
    current: [Number, String],
  },
  setup(props, { emit }) {
    const progressWidth = ref<number>(0);
    const currentModel = useVModel(props, 'current', props.toNum);

    const onInput = () => {
      progressWidth.value = (Number(props.current) / props.max) * 100;
      emit('change', currentModel.value);
    };

    onMounted(() => {
      onInput();
    });

    watch(
      () => props.current,
      () => {
        onInput();
      },
    );

    return {
      onInput,
      progressWidth,
      currentModel,
    };
  },
});
</script>

<style scoped lang="scss">
.inputRange {
  $_range-height: 5px;
  $_range-color: #2a8634;

  &__field {
    position: relative;

    input {
      @mixin _thumb() {
        $_size: 14px;

        width: $_size;
        height: $_size;
        background: $_range-color;
        border-radius: 100%;
        appearance: none;
      }

      width: 100%;
      height: $_range-height;
      margin-top: 12px;
      background-color: #ccc;
      outline: none;
      cursor: pointer;
      transition: opacity 0.2s;
      appearance: none;

      &:hover {
        opacity: 1;
      }

      &::-webkit-slider-thumb {
        @include _thumb();
      }

      &::-moz-range-thumb {
        @include _thumb();
      }
    }
  }

  &__progress {
    position: absolute;
    top: calc(50% + 1.5px);
    z-index: 1;
    height: $_range-height;
    background-color: $_range-color;
    content: '';
  }

  &__title {
    font-weight: 500;
    font-size: 12px;
    line-height: 150%;
  }

  &__subtitle {
    color: #afafaf;
    font-weight: 500;
    font-size: 10px;
    line-height: 150%;
  }

  &__current {
    margin: 10px 0 5px;
    font-weight: 500;
    font-size: 14px;
  }

  &__minMax {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 5px;

    span {
      color: #afafaf;
      font-weight: 300;
      font-size: 10px;
    }
  }

  @include respond-to($container-media--tablet) {
    &__title {
      margin-bottom: 10px;
      font-size: 18px;
    }

    &__subtitle {
      font-size: 14px;
    }

    &__current {
      margin: 25px 0 10px;
      font-size: 20px;
    }

    &__minMax {
      span {
        font-size: 20px;
      }
    }
  }
}
</style>
