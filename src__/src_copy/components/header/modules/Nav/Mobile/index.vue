<template>
  <div :class="[{ overlay: isOpen }]" @click="onCloseMenu" />
  <div :class="['mobile', { 'mobile--is-open': isOpen }]">
    <div class="mobile__closeBtn" @click="onCloseMenu" />
    <nav class="mobile__nav">
      <ul class="mobile__navList">
        <li class="mobile__navItem">
          <a href="#">{{ $t('sitenav.training') }}</a>
        </li>
        <li class="mobile__navItem">
          <a href="#">{{ $t('sitenav.services') }}</a>
        </li>
        <li class="mobile__navItem">
          <a href="#">{{ $t('sitenav.blog') }}</a>
        </li>
        <li class="mobile__navItem mobile__accordion">
          <div
            class="mobile__accordionTitle"
            @click="isOpenActivesAccordion = !isOpenActivesAccordion"
          >
            {{ $t('sitenav.assets') }}
          </div>
          <ul
            :class="[
              'mobile__accordionList',
              { 'mobile__accordionList--is-open': isOpenActivesAccordion },
            ]"
          >
            <li class="mobile__accordionItem">
              <router-link
                :to="{
                  name: 'SecurityList',
                  params: { locale: 'ru', type: 'stocks', region: 'rus' },
                }"
                >Акции РФ</router-link
              >
            </li>
            <li class="mobile__accordionItem">
              <router-link
                :to="{
                  name: 'SecurityList',
                  params: { locale: 'ru', type: 'stocks', region: 'usa' },
                }"
                >Акции США</router-link
              >
            </li>
            <li class="mobile__accordionItem">
              <router-link
                :to="{
                  name: 'SecurityList',
                  params: { locale: 'ru', type: 'bonds', region: 'rus' },
                }"
                >Список облигаций РФ</router-link
              >
            </li>
            <li class="mobile__accordionItem">
              <router-link
                :to="{
                  name: 'SecurityList',
                  params: { locale: 'ru', type: 'etf', region: 'rus' },
                }"
                >Список ETF РФ</router-link
              >
            </li>
            <li class="mobile__accordionItem">
              <router-link
                :to="{
                  name: 'SecurityList',
                  params: { locale: 'ru', type: 'indexes', region: 'rus' },
                }"
                >Список индексов РФ</router-link
              >
            </li>
            <li class="mobile__accordionItem">
              <router-link
                :to="{
                  name: 'ListsWrapAll',
                  params: { locale: 'ru', type: 'industries', region: 'rus' },
                }"
                >Список отраслей РФ</router-link
              >
            </li>
            <li class="mobile__accordionItem">
              <router-link
                :to="{
                  name: 'ListsWrapAll',
                  params: { locale: 'ru', type: 'sectors', region: 'usa' },
                }"
                >Список секторов США</router-link
              >
            </li>
            <li class="mobile__accordionItem">
              <router-link
                :to="{
                  name: 'TechnicalAnalysis',
                  params: { locale: 'ru' },
                }"
                >Технический анализ</router-link
              >
            </li>
            <li class="mobile__accordionItem">
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
        <li class="mobile__navItem">
          <a href="#">{{ $t('sitenav.about') }}</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'HeaderNavMobile',
  emits: ['onCloseMenu'],
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, { emit }) {
    const route = useRoute();
    const isOpenActivesAccordion = ref<boolean>(false);

    const onCloseMenu = () => {
      emit('onCloseMenu');
    };

    const checkRoute = () => {
      if (props.isOpen) {
        onCloseMenu();
      }
    };

    watch(
      () => route.path,
      () => {
        checkRoute();
      },
    );

    return {
      onCloseMenu,
      isOpenActivesAccordion,
    };
  },
});
</script>

<style scoped lang="scss">
.overlay {
  position: fixed;
  z-index: 999;
  width: 100vw;
  height: 10000px;
  background: rgb(0 0 0 / 70%);
}

.mobile {
  $_list-item-margin-bottom: 18px;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  display: none;
  width: 90%;
  max-width: 350px;
  height: 100vh;
  padding: 20px 40px 30px 20px;
  overflow-y: auto;
  background: #fff;
  transition: all 0.2s ease;

  &__closeBtn {
    $_size: 32px;

    position: fixed;
    width: $_size;
    height: $_size;
    cursor: pointer;

    &::before,
    &::after {
      position: absolute;
      left: 15px;
      width: 2px;
      height: 33px;
      background-color: #333;
      content: ' ';
    }

    &::before {
      transform: rotate(45deg);
    }

    &::after {
      transform: rotate(-45deg);
    }
  }

  &__nav {
    margin-top: 30px;
    padding-left: 60px;
  }

  &__navList {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  &__navItem {
    margin-bottom: $_list-item-margin-bottom;
    color: #000;
    font-weight: 500;
    font-size: 14px;

    a {
      color: #000;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      text-decoration: none;
    }
  }

  &__accordion {
    cursor: default;
  }

  &__accordionTitle {
    cursor: pointer;
  }

  &__accordionList {
    display: none;
    margin: 0;
    list-style: none;

    &--is-open {
      display: block;
      padding: 0 0 0 40px;
    }
  }

  &__accordionItem {
    margin-bottom: $_list-item-margin-bottom;
    cursor: pointer;

    &:first-child {
      margin-top: $_list-item-margin-bottom;
    }
  }

  &--is-open {
    display: block;
  }
}
</style>
