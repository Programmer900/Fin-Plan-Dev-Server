<template>
  <div class="case">
    <h4 class="case__title">Кейс:</h4>
    <div class="case__item">
      <router-link to="#">
        <img src="@/assets/img/nikel.png" alt="Кейс">
        <span>Пример по акциям ГМК Норильский Никель</span>
      </router-link>
    </div>
    <router-link to="#" class="case__all-link">
      Все кейсы
      <svg width="10" height="17" viewBox="0 0 10 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 15.5L8 8L1 0.999999" stroke="#00943D" stroke-width="2"/>
      </svg>
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'UtilsCase',
});
</script>

<style scoped lang="scss">
.case {
  padding-top: 60px;
  padding-bottom: 30px;
  border-bottom: 1px solid #b6b6b6;

  &__title {
    margin-bottom: 17px;
    color: #000;
    font-weight: 600;
    font-size: 16px;
    font-family: $ff-montserrat;
  }

  &__item {
    a {
      display: flex;
      align-items: center;
      text-decoration: none;

      img {
        width: 100px;
        height: 100px;
        margin-right: 15px;
        object-fit: cover;
      }

      span {
        max-width: 180px;
        color: #656464;
        font-weight: 400;
        font-size: 16px;
        font-family: $ff-montserrat;
      }
    }
  }

  &__all-link {
    display: flex;
    align-items: center;
    margin-top: 25px;
    color: #000;
    font-weight: 600;
    font-size: 16px;
    font-family: $ff-montserrat;
    text-decoration: none;

    svg {
      margin-left: 10px;
    }
  }
}
</style>
