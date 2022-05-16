<template>
  <div class="staff">
    <h1 class="staff__title">{{ title }}</h1>
    <div class="staff__table" v-if="data">
      Данные есть (сообщить об этом разработчику, т.к. раньше их не было)
    </div>
    <div class="staff__no-data" v-else>Нет данных</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'IndexPageStaff',
  props: {
    title: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
      default: () => {},
    },
  },
});
</script>

<style scoped lang="scss">
.staff {
  padding-top: 30px;

  &__title {
    margin-bottom: 30px;
    font-weight: 500;
    font-size: 28px;
  }
}
</style>
