<template>
  <Calendar :masks="{ weekdays: weekDayMask }" :max-date="new Date()" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'VCalendar',
  setup() {
    const weekDayMask = ref<string>('WW');

    return {
      weekDayMask,
    };
  },
});
</script>

<style scoped lang="scss"></style>
