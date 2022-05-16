<template>
  <div class="footerDocs">
    <a href="#">Политика конфиденциальности</a>
    <a href="#">Отказ от ответственности</a>
    <a href="#">Согласие с рассылкой</a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PageFooterDocs',
});
</script>

<style scoped lang="scss">
.footerDocs {
  a {
    display: block;
    margin-top: 20px;
    color: #959595;
    font-weight: 500;
    font-size: 10px;
    text-decoration: none;
    transition: all 0.1s ease;

    &:hover {
      color: #fec006;
    }
  }

  @include respond-to($container-media--tablet) {
    display: flex;
    order: 1;

    a {
      margin-top: 0;

      &:not(:last-child) {
        margin-right: 4%;
      }
    }
  }

  @include respond-to($container-media--desktop) {
    a {
      font-size: 14px;
    }
  }
}
</style>
