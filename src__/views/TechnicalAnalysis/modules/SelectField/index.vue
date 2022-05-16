<template>
  <div class="selectField">
    <div class="selectField__title">{{ title }}</div>
    <div class="selectField__selected" @click="onClickSelect">
      <template v-if="typeof selected === 'string'">{{ selected }}</template>
      <template v-else-if="typeof selected === 'object'">{{ selected.NAME }}</template>
      <span v-if="showCorner">
        <svg
          fill="none"
          height="8"
          viewBox="0 0 14 8"
          width="14"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1 1L7 7L13 1" stroke="#2A8634" />
        </svg>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'TechnicalAnalysisPageSelectField',
  emits: ['onSelect'],
  props: {
    title: {
      type: String,
      required: true,
    },
    selected: {
      required: true,
    },
    showCorner: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const onClickSelect = () => {
      emit('onSelect');
    };

    return {
      onClickSelect,
    };
  },
});
</script>

<style scoped lang="scss">
.selectField {
  display: flex;
  flex-direction: column;
  width: max-content;

  &__title {
    padding-bottom: 8px;
    color: #000;
    font-weight: 700;
    font-size: 14px;
    font-family: $ff-montserrat;
    line-height: 17px;
  }

  &__selected {
    position: relative;
    display: flex;
    align-items: center;
    color: #2a8634;
    font-weight: 400;
    font-size: 14px;
    font-family: $ff-montserrat;
    line-height: 17px;
    cursor: pointer;

    span {
      padding-left: 8px;
    }
  }

  @include respond-to($media-min-page-analysis--desktop) {
    flex-direction: row;
    align-items: center;

    &__title {
      padding-right: 8px;
      padding-bottom: 0;
    }
  }
}
</style>
