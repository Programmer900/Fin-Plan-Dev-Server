<template>
  <div class="params">
    <InputDropdown
      :items="dropdownItems"
      v-model:selected="benchmark.value"
      placeholder="Растущий миллион"
      title="Бенчмарк:"
    />
    <InputDropdown
      :items="dropdownItems"
      v-model:selected="profile.value"
      placeholder="Растущий миллион"
      title="Ваш портфель:"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import InputDropdown from '@/components/Inputs/Dropdown/index.vue';

export default defineComponent({
  name: 'ListHeaderCompareParams',
  components: { InputDropdown },
  setup() {
    const stateDropdowns = reactive({
      benchmark: {
        value: null,
      },
      profile: {
        value: null,
      },
    });

    const dropdownItems = [
      {
        id: 0,
        label: 'Крутой выбор',
      },
      {
        id: 1,
        label: 'Суперский выбор',
      },
      {
        id: 2,
        label: 'Обалденный выбор',
      },
    ];

    return {
      dropdownItems,
      ...toRefs(stateDropdowns),
    };
  },
});
</script>

<style scoped lang="scss">
.params {
  padding-bottom: 15px;
  border-bottom: 1px solid #e8e8e8;
}
</style>
