<template>
  <div
    v-if="item.data.length !== 0"
    class="checkbox flexRowCenter"
    :class="{ displayNone: isVisible }"
    @click="onClick"
  >
    <div class="checkboxRound flexRowCenter" :style="[{ background: item.color }]">
      <div class="clicked" v-if="item.visible" />
    </div>
    <p class="default-w-bold">{{ item.name }}</p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'ChartDynamicProCheckbox',
  emits: ['onClick'],
  props: {
    id: {
      type: String,
      required: true,
    },
    item: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const onClick = (): void => {
      emit('onClick', props.id);
    };

    const isVisible = computed(() => !props.item.visible && !props.item.permanent);

    return {
      isVisible,
      onClick,
    };
  },
});
</script>

<style scoped lang="scss">
.displayNone {
  display: none !important;
}
.checkbox {
  width: max-content;
  cursor: pointer;
  > p {
    margin-left: 10px;
    font-size: 16px;
  }

  &:not(:last-child) {
    margin-right: 35px;
  }

  .checkboxRound {
    $_size: 35px;

    justify-content: center;
    width: $_size;
    height: $_size;
    border-radius: 50%;
    cursor: pointer;

    .clicked {
      $_size: 14px;

      width: $_size;
      height: $_size;
      background-color: white;
      border-radius: 50%;
    }
  }
}

@media (max-width: 1400px) {
  .checkbox {
    > p {
      font-size: 16px;
    }
    .checkboxRound {
      $_size: 30px;

      width: $_size;
      height: $_size;

      .clicked {
        $_size: 12px;

        width: $_size;
        height: $_size;
      }
    }
  }
}
</style>
