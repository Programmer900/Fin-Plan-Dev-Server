<template>
  <div :class="['inputDropdown', { 'inputDropdown--column': isColumn }]">
    <div v-if="title" class="inputDropdown__title">{{ title }}</div>
    <div class="inputDropdown__field">
      <div class="inputDropdown__selector" @click="onToggle()">
        <div class="inputDropdown__label">
          <span v-if="icon" class="inputDropdown__icon">
            <img alt="icon" :src="icon" />
          </span>
          <span v-if="selected">{{ getSelectedLabel }}</span>
          <span v-else>{{ placeholder }}</span>
        </div>
        <img
          alt="icon"
          class="inputDropdown__arrow"
          :class="{ 'inputDropdown__arrow--expanded': isVisible }"
          :src="iconDropdown"
        />
        <div
          :class="[
            { 'inputDropdown__wrapList--hidden': !isVisible },
            'inputDropdown__wrapList--visible',
          ]"
        >
          <ul>
            <li
              v-for="(item, index) in Object.values(items)"
              :key="index"
              :class="{ 'inputDropdown__item--current': isCurrentItem(item) }"
              @click="onSelect(item)"
            >
              {{ item.label }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import iconDropdown from './icons/dropdown.svg';
import { useVModel } from '@/use/useVModel';

interface IItem {
  id: string | number;
  label: string;

  [key: string]: any;
}

export default defineComponent({
  name: 'InputDropdown',
  emits: ['update:selected'],
  props: {
    title: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: 'Выбрать',
    },
    items: {
      type: Object,
      required: true,
      default: () => {},
    },
    isColumn: {
      type: Boolean,
      default: false,
    },
    selected: {
      type: [Number, String],
      required: true,
      default: '',
    },
  },
  setup(props, { emit }) {
    const valueModel = useVModel(props, 'selected');
    const isVisible = ref<boolean>(false);

    const onSelect = (selected) => {
      // emit('update:selected', selected);
      valueModel.value = selected.value;
    };

    const onToggle = () => {
      isVisible.value = !isVisible.value;
    };

    const isCurrentItem = (item: IItem): boolean => {
      if (props.selected) {
        return item.value === valueModel.value;
      }
      return false;
    };

    return {
      onSelect,
      onToggle,
      isCurrentItem,
      iconDropdown,
      isVisible,
      valueModel,
      getSelectedLabel: computed(() => props.items[valueModel.value].label),
    };
  },
});
</script>

<style scoped lang="scss">
.inputDropdown {
  $blockname: &;

  display: flex;
  align-items: center;

  &__field {
    cursor: pointer;
  }

  &__title {
    font-weight: 600;
    font-size: 12px;
  }

  &__selector {
    position: relative;
    min-width: 200px;
  }

  &__arrow {
    position: absolute;
    top: 40%;
    right: 10px;
    transform: rotateZ(0deg) translateY(0);
    transition-timing-function: cubic-bezier(0.59, 1.39, 0.37, 1.01);
    transition-duration: 0.3s;

    &--expanded {
      transform: rotateZ(180deg) translateY(2px);
    }
  }

  &__label {
    display: flex;
    align-items: center;
    padding: 12px 15px;
    color: #2a8634;
    font-weight: 500;
    font-size: 12px;

    span {
      display: inline-block;
      margin-right: 20px;
    }
  }

  &__item {
    &--current {
      background: #eaeaea;
    }
  }

  &__wrapList {
    &--visible {
      visibility: visible;
    }

    &--hidden {
      visibility: hidden;
    }
  }

  ul {
    position: absolute;
    z-index: 1;
    width: 100%;
    margin: 0;
    padding: 0;
    font-size: 12px;
    list-style-type: none;
    background: #fff;
    border: 1px solid gainsboro;
    max-height: 220px;
    overflow-y: auto;
  }

  li {
    padding: 12px;
    color: #666;

    &:hover {
      color: white;
      background: #2a8634;
    }
  }

  &__icon {
    margin-right: 5px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &:hover {
    #{$blockname} {
      &__label {
        color: #fec006;
        span {
          color: #fec006;
        }
      }
    }
  }

  &--column {
    flex-direction: column;
    align-items: flex-start;

    #{$blockname} {
      &__title {
        margin-bottom: 18px;
      }
    }
  }

  @include respond-to($container-media--tablet) {
    &__title {
      font-size: 15px;
    }

    &__label {
      font-size: 15px;
    }

    ul {
      font-size: 15px;
    }
  }

  @include respond-to(1200) {
    &__title {
      font-size: 20px;
    }

    &__label {
      font-size: 20px;
    }

    ul {
      font-size: 20px;

      li {
        padding: 14px;
      }
    }

    &__selector {
      min-width: 250px;
    }
  }
}
</style>
