<template>
  <svg
    class="clearBtn"
    @click="onClick"
    width="27"
    height="27"
    viewBox="0 0 27 27"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M25.5 13.5C25.5 20.1274 20.1274 25.5 13.5 25.5C6.87258 25.5 1.5 20.1274 1.5 13.5C1.5 6.87258 6.87258 1.5 13.5 1.5C20.1274 1.5 25.5 6.87258 25.5 13.5ZM27 13.5C27 20.9558 20.9558 27 13.5 27C6.04416 27 0 20.9558 0 13.5C0 6.04416 6.04416 0 13.5 0C20.9558 0 27 6.04416 27 13.5ZM18.9697 20.0303L13.5 14.5607L8.03033 20.0303L6.96967 18.9697L12.4393 13.5L6.96967 8.03033L8.03033 6.96967L13.5 12.4393L18.9697 6.96967L20.0303 8.03033L14.5607 13.5L20.0303 18.9697L18.9697 20.0303Z"
      fill="#797979"
    />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TechnicalAnalysisPageClearBtn',
  emits: ['onClick'],
  setup(props, { emit }) {
    const onClick = () => {
      emit('onClick');
    };

    return {
      onClick,
    };
  },
});
</script>

<style scoped lang="scss">
.clearBtn {
  cursor: pointer;
}
</style>
