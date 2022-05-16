<template>
  <div class="radarField">
    <div class="radarField__container">
      <div class="radarField__wrap">
        <div class="radarField__title">{{ title }}</div>
        <div class="radarField__subtitle" v-if="subtitle">{{ subtitle }}</div>
        <a class="radarField__link" v-if="link" :href="link">{{ linkText || link }}</a>
      </div>
      <slot />
    </div>
    <span
      :class="['radarField__toggle', { 'radarField__toggle--active': isActive }]"
      @click="onToggleActive"
    ></span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PageRadarField',
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      default: '',
    },
    link: {
      type: String,
      default: '',
    },
    linkText: {
      type: String,
      default: '',
    },
    isActive: Boolean,
  },
  setup(props, { emit }) {
    const onToggleActive = () => {
      emit('update:isActive', !props.isActive);
    };

    return {
      onToggleActive,
    };
  },
});
</script>

<style scoped lang="scss">
.radarField {
  position: relative;
  width: 100%;

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
    top: 0;
    right: 0;
    width: $_size;
    height: $_size;
    background: #fec006;
    border: 1px solid #fec006;
    border-radius: 100%;
    cursor: pointer;

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

  &__container {
    display: inline-block;
    width: 80%;
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

  &__link {
    color: #afafaf;
    font-weight: 500;
    font-size: 10px;
    line-height: 150%;
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

    &__title {
      margin-bottom: 10px;
      font-size: 18px;
    }

    &__subtitle {
      margin-bottom: 30px;
      font-size: 15px;
    }
  }

  @include respond-to(1200) {
    &__container {
      width: 90%;
    }

    &__title {
      font-size: 20px;
    }

    &__link {
      font-size: 14px;
    }
  }
}
</style>
