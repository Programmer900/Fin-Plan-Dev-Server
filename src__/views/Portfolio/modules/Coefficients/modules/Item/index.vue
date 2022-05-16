<template>
  <div class="coefficient">
    <div class="coefficient__wrap">
      <div class="coefficient__title">{{ title }}</div>
      <img v-if="about" alt="about" class="coefficient__iconAbout" :src="iconAbout" />
    </div>
    <div v-if="valueType === 'common'" :class="['coefficient__value', getValueClass(value)]">
      {{ value }} <span>{{ valueSymbol }}</span>
    </div>
    <div v-if="valueType === 'compression'" class="coefficient__valueCompression">
      <span
        v-for="(item, index) in valueCompression"
        :key="index"
        :class="['coefficient__value', getValueClass(item)]"
      >
        {{ item }}
        <span v-if="index !== valueCompression.length - 1" class="coefficient__iconMore">> </span>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import iconAbout from '@/assets/icons/portfolio/about.svg';

export default defineComponent({
  name: 'PagePortfolioCoefficientsItem',
  props: {
    title: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      default: 0,
    },
    valueType: {
      type: String,
      required: true,
    },
    valueSymbol: {
      type: String,
      default: '',
    },
    valueCompression: {
      type: Array,
      default: () => [],
    },
    about: {
      type: String,
      default: 'Какое-то описание',
    },
  },
  setup() {
    const getValueClass = (value: number | string): string => {
      const _value = Number(value);

      if (_value > 0) {
        return 'coefficient__value--more';
      }
      if (_value === 0) {
        return 'coefficient__value--equal';
      }
      if (_value < 0) {
        return 'coefficient__value--less';
      }
      return '';
    };

    return {
      getValueClass,
      iconAbout,
    };
  },
});
</script>

<style scoped lang="scss">
.coefficient {
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__title {
    font-weight: 500;
    font-size: 12px;
    line-height: 150%;
  }

  &__wrap {
    display: flex;
    align-items: center;
  }

  &__value {
    font-weight: 700;
    font-size: 12px;
    line-height: 150%;

    &--more {
      color: #2a8634;
    }

    &--equal {
      color: #000;
    }

    &--less {
      color: #ce0e07;
    }
  }

  &__iconAbout {
    margin-left: 6px;
    cursor: help;
  }

  @include respond-to(900) {
    &__title {
      font-size: 16px;
    }

    &__value {
      font-size: 16px;
    }
  }
}
</style>
