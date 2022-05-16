<template>
  <nav class="menuMain">
    <ul>
      <li>
        <a href="#">{{ $t('sitenav.training') }}</a>
      </li>
      <li>
        <a href="#">{{ $t('sitenav.services') }}</a>
      </li>
      <li>
        <a href="#">{{ $t('sitenav.blog') }}</a>
      </li>
      <li class="assets">
        <a href="#">{{ $t('sitenav.assets') }}</a>
        <ul class="assets__nav">
          <li>
            <router-link
              :to="{
                name: 'SecurityList',
                params: { locale: 'ru', type: 'stocks', region: 'rus' },
              }"
              >Акции РФ</router-link
            >
          </li>
          <li>
            <router-link
              :to="{
                name: 'SecurityList',
                params: { locale: 'ru', type: 'stocks', region: 'usa' },
              }"
              >Акции США</router-link
            >
          </li>
          <li>
            <router-link
              :to="{
                name: 'SecurityList',
                params: { locale: 'ru', type: 'bonds', region: 'rus' },
              }"
              >Список облигаций РФ</router-link
            >
          </li>
          <li>
            <router-link
              :to="{
                name: 'SecurityList',
                params: { locale: 'ru', type: 'etf', region: 'rus' },
              }"
              >Список ETF РФ</router-link
            >
          </li>
          <li>
            <router-link
              :to="{
                name: 'SecurityList',
                params: { locale: 'ru', type: 'indexes', region: 'rus' },
              }"
              >Список индексов РФ</router-link
            >
          </li>
          <li>
            <router-link
              :to="{
                name: 'ListsWrapAll',
                params: { locale: 'ru', type: 'industries', region: 'rus' },
              }"
              >Список отраслей РФ</router-link
            >
          </li>
          <li>
            <router-link
              :to="{
                name: 'ListsWrapAll',
                params: { locale: 'ru', type: 'sectors', region: 'usa' },
              }"
              >Список секторов США</router-link
            >
          </li>
          <li>
            <router-link
              :to="{
                name: 'TechnicalAnalysis',
                params: { locale: 'ru' },
              }"
              >Технический анализ</router-link
            >
          </li>
          <li>
            <router-link
              :to="{
                name: 'Portfolio',
                params: { locale: 'ru' },
              }"
              >Портфолио</router-link
            >
          </li>
          <li>
            <router-link
              :to="{
                name: 'Radar',
                params: { locale: 'ru' },
              }"
              >Радар</router-link
            >
          </li>
        </ul>
      </li>
      <li>
        <a href="#">{{ $t('sitenav.about') }}</a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HeaderNavDesktop',
});
</script>

<style scoped lang="scss">
.assets {
  position: relative;

  &__nav {
    position: absolute;
    top: 100%;
    //left: 47%;
    z-index: 1000;
    display: none;
    width: 250px;
    padding: 6px;
    list-style: none;
    background: white;
    border-radius: 4px;
    box-shadow: 0 4px 17px 6px rgb(0 0 0 / 25%);

    li {
      border-radius: 4px;
      transition: all 0s ease;

      a {
        display: block;
        height: auto;
        padding: 5px 8px;
        color: #2a8634;
        font-size: 14px;
        text-align: left;
        text-transform: initial;
        text-decoration: none;
        background: none;
        border: none;
        transition: all 0s ease;

        &:hover {
          background: none;
          border: none;
        }
      }

      &:hover {
        background: #2a8634;

        a {
          color: white;
        }
      }
    }
  }

  &:hover &__nav {
    display: block;
  }
}
</style>
