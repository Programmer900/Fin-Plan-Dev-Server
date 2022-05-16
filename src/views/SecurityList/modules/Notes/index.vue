<template>
<div class="notes">
  <h4 class="notes__title">{{ title }}</h4>
  <ul class="notes__list">
    <li class="notes__item" v-for="(note, index) in notes" :key="index">
      <router-link :to="note.link">{{ note.title }}</router-link>
    </li>
  </ul>
</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'UtilsNotes',
  setup() {
    const title = ref<string>('Посмотреть записи по темам:');
    const notes = ref<any[]>([
      {
        title: 'Банки',
        link: '#',
      },
      {
        title: 'Инвест-портфели',
        link: '#',
      },
      {
        title: 'Инвестиции',
        link: '#',
      },
      {
        title: 'Информация',
        link: '#',
      },
      {
        title: 'Личный блог',
        link: '#',
      },
      {
        title: 'Обзоры полезных книг',
        link: '#',
      },
      {
        title: 'Пенсия',
        link: '#',
      },
      {
        title: 'Словарь финансовых терминов',
        link: '#',
      },
      {
        title: 'Основы финансового планирования',
        link: '#',
      },
      {
        title: 'Все разделы',
        link: '#',
      },
    ]);

    return {
      title,
      notes,
    };
  },
});
</script>

<style scoped lang="scss">
.notes {
  padding-bottom: 23px;
  border-bottom: 1px solid #b6b6b6;

  &__title {
    margin-bottom: 15px;
    color: #000;
    font-weight: 600;
    font-size: 16px;
    font-family: $ff-montserrat;
  }

  &__list {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  &__item {
    max-width: 270px;
    margin: 0;
    margin-bottom: 15px;
    padding: 0;

    a {
      color: #656464;
      font-size: 16px;
      font-family: $ff-montserrat;
      text-decoration: none;
    }

    &::before {
      display: none;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
