<template>
  <div class="progress">
    <div class="progressInfo flexRowBetween">
      <p>{{ name }}</p>
      <span class="default-w-bold">{{ formattingToShort(Number(value), 2) }} {{ symbol }}</span>
    </div>
    <div v-if="lineMax > 0" class="progress__line-container">
      <div v-if="lineMax" class="linear-progress">
        <div class="bar" :style="getLineStyles" />
      </div>
      <div class="progress__circle" :style="getCircleStyles" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { formattingNum, formattingToShort } from '@/services/formattingNum.service';

export default defineComponent({
  name: 'DocumentProgressItem',
  props: {
    name: {
      type: String,
      default: '',
    },
    value: {
      type: [String, Number],
      default: '',
    },
    symbol: {
      type: [String, Number],
      default: '',
    },
    lineMax: {
      type: Number,
      default: 0,
    },
    color: {
      type: String,
      default: 'blue',
    },
  },
  setup(props) {
    const color = ref<string>(props.color);

    const getColor = computed((): string => {
      if (color.value === 'yellow') return 'progress__line--yellow';
      if (color.value === 'green') return 'progress__line--green';
      return '';
    });

    const getPercent = (from: number | string, to: number | string): number =>
      (Number(from) * 100) / Number(to);

    const getLineStyles = computed(
      (): string => `width: ${getPercent(props.value, props.lineMax)}%; background: ${color.value}`,
    );
    const getCircleStyles = computed((): string => {
      if (props.value < 0) {
        return `left: 0%; background: ${color.value}`;
      }
      return `left: ${getPercent(props.value, props.lineMax) - 1}%; background: ${color.value}`;
    });

    return {
      formattingNum,
      formattingToShort,
      getColor,
      getLineStyles,
      getCircleStyles,
    };
  },
});
</script>

<style scoped lang="scss">
.progress {
  $regular-height: 10px;
  $smaller-height: 2px;

  $angular-material-background: #aad1f9;
  $angular-material-bar: #106cc8;

  $linear-background: #bbdefb;
  $linear-bar: #1565c0;

  &__line-container {
    position: relative;
  }

  &__circle {
    position: absolute;
    top: -3px;
    width: 10px;
    height: 10px;
    border-radius: 100%;
  }

  .linear-progress {
    position: relative;
    width: 100%;
    height: 4px;
    overflow: hidden;
    background: #d9d9d9;

    .bar {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
    }
  }
}
</style>
