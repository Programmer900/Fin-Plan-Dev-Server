<template>
  <ul class="arr_list">
    <li v-if="type === 'portfolio'">
      <span class="icon icon-linear_arr_right"></span>
      <span class="text">
          <span class="text_inner">При обозначенных исходных данных Ваш портфель за <span id="years_txt">{{ period }}</span> лет вырастет <br><span class="bold"><span id="val_max_output">до {{ max }}</span> тыс. руб.</span></span>
      </span>
    </li>
    <li v-if="type === 'tax'">
      <span class="icon icon-linear_arr_right"></span>
      <span class="text">
          <span class="text_inner"><span class="bold"><span id="val_max_output_two">Из которых {{ max }}</span> тыс. руб.</span><br> Вы получите в качестве налогового вычета</span>
      </span>
    </li>
    <li v-if="type === 'invest-profit'">
      <span class="icon icon-linear_arr_right"></span>
      <span class="text">
          <span class="text_inner"><span class="bold"><span id="val_max_output_three">и {{ max }}</span> тыс. руб.</span><br> будет Ваш инвестиционный доход.</span>
      </span>
    </li>
  </ul>
</template>

<script>
  import {
    defineComponent
  } from 'vue';

  export default defineComponent({
    props: ['period', 'max', 'type']
  })
</script>

<style scoped lang="sass">
  ul
    li
      list-style-type: none
  span.bold
    font-weight: bold
</style>
