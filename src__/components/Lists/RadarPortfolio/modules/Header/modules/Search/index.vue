<template>
  <div class="listSearch">
    <form @submit.prevent>
      <input placeholder="Поиск по названию" required type="text" />
      <button class="listSearch__btn">
        <img alt="icon" class="listSearch__icon" :src="iconSearch" />
        <img alt="icon" class="listSearch__icon--focus" :src="iconSearchActive" />
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import iconSearch from '@/assets/icons/search-2.svg';
import iconSearchActive from '@/assets/icons/search-2--active.svg';

export default defineComponent({
  name: 'ListHeaderSearch',
  setup() {
    return {
      iconSearch,
      iconSearchActive,
    };
  },
});
</script>

<style scoped lang="scss">
.listSearch {
  $blockname: &;

  form {
    display: flex;
    align-items: center;
  }

  input {
    width: 100%;
    padding-bottom: 8px;
    background: transparent;
    border: none;
    border-bottom: 1px solid #e8e8e8;
    outline: none;
  }

  &__icon {
    &--focus {
      display: none;
    }
  }

  &__btn {
    padding: 0;
    background: transparent;
    border: none;
    border-bottom: 1px solid #e8e8e8;
    outline: none;
    cursor: pointer;
  }

  input:focus {
    border-bottom-color: #fec006;
  }

  input:focus + &__btn {
    border-bottom-color: #fec006;

    #{$blockname} {
      &__icon {
        display: none;

        &--focus {
          display: unset;
        }
      }
    }
  }
}
</style>
