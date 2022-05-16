<template>
  <div class="accordionItem">
    <div class="accordionItem__title">
      <div @click="onToggle" class="accordionItem__trigger">
        <div
          :class="[
            'accordionItem__icon',
            { 'accordionItem__icon--error': type === 'error' },
            { 'accordionItem__icon--warning': type === 'warning' },
            { 'accordionItem__icon--success': type === 'success' },
          ]"
        ></div>
        <div class="accordionItem__wrapTitle">
          <div class="accordionItem__titleText">{{ title }}</div>
          <div class="accordionItem__subtitle">{{ subtitle }}</div>
        </div>
        <span
          class="accordionItem__triggerIcon"
          :class="{ 'accordionItem__triggerIcon--is-active': isActive }"
        ></span>
      </div>
    </div>
    <transition
      name="accordion-item"
      @enter="startTransition"
      @after-enter="endTransition"
      @before-leave="startTransition"
      @after-leave="endTransition"
    >
      <div v-if="isActive" class="accordionItem__details">
        <div class="accordionItem__detailsInner">
          <slot name="content" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'PagePortfolioGeneralStructureItem',
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
  },
  setup() {
    const isActive = ref<boolean>(false);

    const startTransition = (el) => {
      el.style.height = `${el.scrollHeight}px`;
    };

    const endTransition = (el) => {
      el.style.height = '';
    };

    const onToggle = () => {
      isActive.value = !isActive.value;
    };

    return {
      isActive,
      startTransition,
      endTransition,
      onToggle,
    };
  },
});
</script>

<style scoped lang="scss">
.accordionItem {
  background: #fff;

  &__title {
    position: relative;
  }

  &__wrapTitle {
    width: 80%;
  }

  &__titleText {
    margin-bottom: 5px;
    font-weight: 600;
    font-size: 12px;
    line-height: 150%;
  }

  &__icon {
    $_size: 20px;

    position: relative;
    width: $_size;
    height: $_size;
    margin-right: 5px;
    border-radius: 100%;

    @mixin _exclamatory {
      &::before {
        position: absolute;
        top: 4px;
        left: 9px;
        display: block;
        width: 2px;
        height: 8px;
        background: #fff;
        border-radius: 4px;
        content: '';
      }

      &::after {
        position: absolute;
        bottom: 4px;
        left: 9px;
        display: block;
        width: 2px;
        height: 2px;
        background: #fff;
        border-radius: 100%;
        content: '';
      }
    }

    &--error {
      background: #ce0e07;
      @include _exclamatory();
    }

    &--warning {
      background: #fec006;
      @include _exclamatory();
    }

    &--success {
      background: #2a8634;

      &::before {
        position: absolute;
        top: 5px;
        left: 5px;
        display: block;
        width: 10px;
        height: 6px;
        border-bottom: 2px solid #fff;
        border-left: 2px solid #fff;
        transform: rotate(-45deg);
        content: '';
      }
    }
  }

  &__subtitle {
    color: #797979;
    font-weight: 500;
    font-size: 12px;
    line-height: 150%;
  }

  &__trigger {
    display: flex;
    width: 100%;
    padding: 20px 10px;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }

  &__triggerIcon {
    $size: 8px;

    position: absolute;
    top: 0;
    right: 1.25rem;
    bottom: 0;
    display: block;
    width: $size;
    height: $size;
    margin: auto;
    border-right: 2px solid #000;
    border-bottom: 2px solid #000;
    transform: translateY(-$size / 4) rotate(45deg);
    transition: transform 0.2s ease;

    &--is-active {
      transform: translateY($size / 4) rotate(225deg);
    }
  }

  &__details {
    overflow: hidden;
  }

  &__detailsInner {
    margin: 0 10px 20px 10px;
    padding-top: 20px;
    border-top: 1px solid #e2e2e2;
  }

  @include respond-to(900) {
    &__titleText {
      margin-bottom: 10px;
      font-size: 20px;
    }

    &__subtitle {
      font-size: 20px;
    }

    &__trigger {
      padding: 30px 30px 40px;
    }

    &__detailsInner {
      margin: 0 30px 30px 40px;
      padding-top: 50px;
    }

    &__icon {
      $_size: 40px;

      width: $_size;
      height: $_size;
      margin-right: 25px;

      &--error,
      &--warning {
        &::before {
          top: 7px;
          left: 18px;
          width: 4px;
          height: 15px;
        }

        &::after {
          bottom: 9px;
          left: 18px;
          width: 4px;
          height: 4px;
        }
      }

      &--success {
        &::before {
          top: 10px;
          left: 10px;
          width: 20px;
          height: 12px;
          border-bottom: 4px solid #fff;
          border-left: 4px solid #fff;
        }
      }
    }
  }
}

.accordion-item-enter-active,
.accordion-item-leave-active {
  transition: height 0.2s ease;
  will-change: height;
}

.accordion-item-enter,
.accordion-item-leave-to {
  height: 0 !important;
}
</style>
