<template>
  <div class="calendar">
    <h4 class="calendar__title">Поиск по дате публикации</h4>
    <ClientOnly>
      <component :is="VCalendar" />
    </ClientOnly>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'UtilsCalendar',
  setup() {
    const weekDayMask = ref<string>('WW');

    const VCalendar = markRaw(
      defineAsyncComponent(
        () => import('@/views/SecurityList/modules/Calendar/modules/VCalendar/index.vue'),
      ),
    );

    return {
      VCalendar,
      weekDayMask,
    };
  },
});
</script>

<style scoped lang="scss">
.calendar {
  padding-top: 35px;

  &__title {
    margin-bottom: 28px;
    color: #000;
    font-weight: 600;
    font-size: 16px;
    font-family: $ff-montserrat;
  }

  ::v-deep .vc-svg-icon {
    color: #00943d;
  }

  ::v-deep .vc-weekday {
    color: #00943d;
    font-weight: 600;
    font-size: 16px;
    font-family: $ff-montserrat;
    text-transform: lowercase;
  }

  ::v-deep .vc-title {
    color: #000;
    font-weight: 600;
    font-size: 16px;
    font-family: $ff-montserrat;
  }

  ::v-deep .vc-day {
    color: #000;
    font-weight: 400;
    font-size: 16px;
    font-family: $ff-montserrat;
  }

  ::v-deep .vc-day.is-not-in-month * {
    color: #989898;
    opacity: 1 !important;
    pointer-events: inherit;
  }

  ::v-deep .vc-day.in-month > span.is-disabled {
    color: #989898;
  }
}
</style>
