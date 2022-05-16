<script lang="ts">
import ClientOnly from '@/components/ClientOnly/index.vue';

export default defineComponent({
  name: 'InputDatePicker',
  components: {
    ClientOnly,
  },
});
</script>

<script setup lang="ts">
import { useVModel } from '@/use/useVModel';

enum VIEW_MODE {
  DEFAULT = 'default',
  RANGE_INPUTS = 'range-input',
}

const props = defineProps({
  isRange: {
    type: Boolean,
    default: false,
  },
  start: {
    type: String,
    default: '01.03.2022',
  },
  end: {
    type: String,
    default: '05.03.2022',
  },
  viewMode: {
    type: String,
    default: 'default',
  },
  idStart: {
    type: [Number, String],
    default: '',
  },
  idEnd: {
    type: [Number, String],
    default: '',
  },
});

const emit = defineEmits([
  'onChange',
  'update:start',
  'update:end',
  'onChangeStart',
  'onChangeEnd',
]);

const masks = ref({
  input: 'DD.MM.YYYY',
  data: 'DD.MM.YYYY',
  iso: 'DD.MM.YYYY',
});

const formatDate = (date) => {
  let dd: string | number = date.getDate();
  if (dd < 10) dd = `0${dd}`;

  let mm: string | number = date.getMonth() + 1;
  if (mm < 10) mm = `0${mm}`;

  let yy: string | number = date.getFullYear() % 100;
  if (yy < 10) yy = `0${yy}`;

  return `${dd}.${mm}.${yy}`;
};

const dateRange = ref({
  start: useVModel(props, 'start'),
  end: useVModel(props, 'end'),
});

watch(
  () => dateRange.value,
  () => {
    emit('onChangeStart', props.idStart, formatDate(dateRange.value.start), {
      silentUpdate: true,
    });
    emit('onChangeStart', props.idEnd, formatDate(dateRange.value.end));
  },
);
</script>

<template lang="pug">
ClientOnly
  DatePicker(
    v-if='viewMode === VIEW_MODE.DEFAULT',
    :is-range='isRange',
    mode='date',
    v-model='dateRange',
    :masks='masks'
  )
  DatePicker(
    v-if='viewMode === VIEW_MODE.RANGE_INPUTS',
    v-model='dateRange',
    :is-range='isRange',
    :masks='masks',
    mode='date'
  )
    template(v-slot='{ inputValue, inputEvents }')
      .date-picker.date-picker--range-input
        input(:value='inputValue.start', v-on='inputEvents.start', placeholder='Введите дату')
        span →
        input(:value='inputValue.end', v-on='inputEvents.end', placeholder='Введите дату')
</template>

<style scoped lang="scss">
.date-picker {
  &--range-input {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    span {
      display: inline-block;
      margin: auto;
      font-size: 30px;
      transform: rotate(90deg);
    }

    input {
      padding: 6px 10px;
      font-size: 14px;
      font-family: $ff-default;
      border: 1px solid #b4b4b4;
      border-radius: 4px;

      &:first-child {
        margin-bottom: 10px;
      }

      &:last-child {
        margin-top: 10px;
      }
    }

    @include respond-to(1000) {
      flex-direction: row;

      span {
        margin: 0 10px 2px;
        transform: rotate(0deg);
        color: #383838;
      }

      input {
        font-size: 16px;

        &:first-child {
          margin: 0;
        }

        &:last-child {
          margin-top: 0;
        }
      }
    }
  }
}
</style>
