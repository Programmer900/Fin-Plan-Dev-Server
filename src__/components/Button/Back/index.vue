<script lang="ts">
export default {
  name: 'ButtonBack',
};
</script>

<script setup lang="ts">
import type { TRouterLink } from '@/types';

const props = defineProps({
  to: {
    type: [Object as () => TRouterLink, Number],
    default: -1,
  },
  text: {
    type: String,
    default: 'Назад',
  },
  confirm: {
    type: Boolean,
    default: false,
  },
  /**
   * Авто-выход если после подтверждения выхода, значение confirm поменялось на false
   */
  autoExit: {
    type: Boolean,
    default: false,
  },
  classMods: {
    type: [Array, String],
    default: '',
  },
});

const emit = defineEmits(['leave', 'confirm']);

const router = useRouter();

const leave = () => {
  if (typeof props.to === 'number') {
    if (window.history.length === 1 || window.history.length === 0) {
      router.push({ name: 'home' });
    } else {
      router.go(props.to);
    }
  } else if (typeof props.to === 'object') {
    router.push(props.to);
  }
};

const goTo = () => {
  if (props.confirm) {
    emit('confirm');
  } else {
    emit('leave');
    leave();
  }
};

const getClassMods = (): string => {
  const c = 'button-back--';

  if (props.classMods === '') return '';

  if (typeof props.classMods === 'string') return `${c}${props.classMods}`;

  if (Array.isArray(props.classMods)) {
    let result = '';
    props.classMods.forEach((mod) => {
      result += `${c}${mod} `;
    });
    return result;
  }

  return '';
};

watch(
  () => props.confirm,
  () => {
    if (!props.autoExit) return;
    goTo();
  },
);
</script>

<template lang="pug">
button.button-back(@click='goTo()', :class='getClassMods()')
  //IconArrow2.button-back__icon
  .button-back__text(v-if='text') {{ text }}
</template>

<style scoped lang="scss">
.button-back {
  $_block: &;

  @apply cursor-pointer flex-c rounded-box bg-accent px-12px py-10px border-none;

  &__text {
    @include text-restrict();

    @apply text-white text-14px font-semibold;
  }

  &:hover {
    @apply allow-hover:(bg-accent--hover);
  }

  :deep(.icon-arrow-2) {
    $_size: 15px;

    width: $_size;
    height: $_size;
  }

  &--icon-sm {
    :deep(.icon-arrow-2) {
      $_size: 10px;

      width: $_size;
      height: $_size;
    }
  }

  &--hide-text-phone {
    #{$_block}__text {
      @apply hidden;

      @include respond-to(showSidebar) {
        @apply block;
      }
    }
  }

  &--danger {
    &:hover {
      @apply allow-hover:(bg-danger);

      #{$_block}__text {
        @apply allow-hover:(text-white-600);
      }
    }
  }

  &--hide-on-phone {
    @apply hidden;

    @include respond-to(showSidebar) {
      @apply flex;
    }
  }
}
</style>
