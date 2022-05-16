<template>
<div class="search">
  <form class="search__form" @submit.prevent="onSubmit">
    <div class="search__field">
      <input v-model="searchValue" type="text" class="search__input" placeholder="Название/тикер/ISIN">
    </div>
    <button class="search__btn">
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.5 11H11.71L11.43 10.73C12.41 9.59 13 8.11 13 6.5C13 2.91 10.09 0 6.5 0C2.91 0 0 2.91 0 6.5C0 10.09 2.91 13 6.5 13C8.11 13 9.59 12.41 10.73 11.43L11 11.71V12.5L16 17.49L17.49 16L12.5 11ZM6.5 11C4.01 11 2 8.99 2 6.5C2 4.01 4.01 2 6.5 2C8.99 2 11 4.01 11 6.5C11 8.99 8.99 11 6.5 11Z" fill="black"/>
      </svg>
    </button>
  </form>
</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'UtilsColumnSearch',
  setup() {
    const searchValue = ref<string>('');

    const onSubmit = () => {
      if (searchValue.value.length > 0) {
        console.log(searchValue.value);
      }
    };

    return {
      searchValue,
      onSubmit,
    };
  },
});
</script>

<style scoped lang="scss">
.search {
  padding-bottom: 30px;

  &__form {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__input {
    width: auto;
    height: auto;
    padding: 10px 16px;
    color: #656464;
    font-weight: 400;
    font-size: 16px;
    font-family: $ff-montserrat;
    background: #F1F1F1;
    border: none;
    border-radius: 10px;
  }

  &__btn {
    margin-left: 8px;
    padding: 0;
    background: none;
    border: none;
    cursor: pointer;
  }
}
</style>
