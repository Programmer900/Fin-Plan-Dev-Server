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
  name: 'DocumentIndicatorsChartCheckboxes',
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
.checkboxes {
  display: flex;
  flex-wrap: wrap;
  width: 70%;
  margin-bottom: 20px;

  .checkbox {
    width: max-content;
    cursor: pointer;
    > p {
      margin-left: 20px;
      font-size: 18px;
      line-height: 150%;
    }

    &:not(:last-child) {
      margin-right: 35px;
    }

    .checkboxRound {
      justify-content: center;
      width: 50px;
      min-width: 50px;
      height: 50px;
      border-radius: 50%;
      cursor: pointer;

      .clicked {
        width: 20px;
        height: 20px;
        background-color: white;
        border-radius: 50%;
      }
    }
  }
}

@media (max-width: 1600px) {
  .checkboxes {
    width: 80%;
  }
}

@media (max-width: 1400px) {
  .checkboxes {
    .checkbox {
      > p {
        font-size: 16px;
      }
      .checkboxRound {
        width: 35px;
        min-width: 35px;
        height: 35px;

        .clicked {
          width: 15px;
          height: 15px;
        }
      }
    }
  }
}

@media (max-width: 1200px) {
  .checkboxes {
    width: 90%;
  }
}

@media (max-width: 1100px) {
  .checkboxes {
    width: 100%;
  }
}
</style>
