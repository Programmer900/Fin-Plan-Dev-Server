<template>
  <header class="header">
    <div class="container">
      <button class="hamburger" @click="onOpenMenu">
        <span />
      </button>
      <a class="logo" title="Fin-Plan">
        <svg id="component_1_3" data-name="Component 1 – 3" height="100%" width="70">
          <defs>
            <radialGradient
              id="radial-gradient"
              cx="0.639"
              cy="0.339"
              gradientUnits="objectBoundingBox"
              r="0.5"
            >
              <stop offset="0" stop-color="#2f9637" />
              <stop offset="1" stop-color="#298034" />
            </radialGradient>
            <radialGradient
              id="radial-gradient-2"
              cx="0.699"
              cy="0.211"
              gradientUnits="objectBoundingBox"
              r="0.5"
            >
              <stop offset="0" stop-color="#1c5828" />
              <stop offset="1" stop-color="#184821" />
            </radialGradient>
            <radialGradient
              id="radial-gradient-3"
              cx="0.825"
              cy="0.37"
              gradientUnits="objectBoundingBox"
              r="1.009"
            >
              <stop offset="0" stop-color="#2f9637" />
              <stop offset="0.521" stop-color="#2c8a35" />
              <stop offset="1" stop-color="#298034" />
            </radialGradient>
            <radialGradient
              id="radial-gradient-4"
              cx="0.964"
              cy="0.311"
              gradientTransform="translate(-0.19) scale(1.38 1)"
              gradientUnits="objectBoundingBox"
              r="0.561"
            >
              <stop offset="0" stop-color="#ffe815" />
              <stop offset="1" stop-color="#ffb000" />
            </radialGradient>
          </defs>
          <ellipse
            id="ellipse_1"
            cx="32.349"
            cy="32.463"
            fill="url(#radial-gradient)"
            rx="32.349"
            ry="32.463"
            transform="translate(5.303)"
          />
          <ellipse
            id="ellipse_2"
            cx="22.286"
            cy="20.823"
            fill="url(#radial-gradient-2)"
            rx="22.286"
            ry="20.823"
            transform="translate(15.073 11.64)"
          />
          <circle
            id="ellipse_3"
            cx="10.248"
            cy="10.248"
            fill="url(#radial-gradient-3)"
            r="10.248"
            transform="translate(27.245 22.215)"
          />
          <path
            id="contour_1"
            d="M220.435,161.855l-22.081-17.48c-5.574-4.412-14.057-.664-14.057,6.211v34.961c0,6.875,8.483,10.623,14.057,6.211l22.081-17.48A7.824,7.824,0,0,0,220.435,161.855Z"
            fill="url(#radial-gradient-4)"
            transform="translate(-184.297 -135.603)"
          />
        </svg>
        <span class="logo__text">
          <span class="logo__name">Fin-Plan</span>
          <span class="logo__section">Learning</span>
        </span>
      </a>
      <div class="spacer" />
      <HeaderNavDesktop />
      <HeaderNavMobile :is-open="isMobileMenuOpen" @onCloseMenu="onOpenMenu" />
      <button class="searchOpenBtn header__search icon icon-search" />
      <div style="display: flex; flex-direction: row; align-items: center; width: max-content">
        <a class="header__user" href="user.html" title="Кирилл Абрамов: личный кабинет"
          >Кирилл Абрамов</a
        >
        <a class="header__logout icon icon-logout" href="#" title="Выйти" />
      </div>
      <div class="langPicker picker" style="cursor: pointer">
        <div class="picker__active">
          {{ i18n.global.locale.toUpperCase() }}
          <div class="icon icon-arr_simple_down" style="width: max-content" />
        </div>
        <ul class="picker__list">
          <li v-for="lang of otherLocale" :key="lang" @click="updateAppLocale(lang)">
            <a>{{ lang.toUpperCase() }}</a>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import {
 defineComponent, ref, computed, onMounted, onServerPrefetch, ComputedRef
} from 'vue';
import { useRoute } from 'vue-router';
import i18n from '@/plugins/i18n/vue-i18n';
import HeaderNavDesktop from '@/components/header/modules/Nav/Desktop/index.vue';
import HeaderNavMobile from '@/components/header/modules/Nav/Mobile/index.vue';
import logo from '../../assets/svg.svg';

export default defineComponent({
  name: 'Header',
  components: { HeaderNavMobile, HeaderNavDesktop },
  setup() {
    const store = useStore();
    const route = useRoute();

    const appLang = ref<ComputedRef<string>>(
      computed(() => store.getters['localeStore/getAppLang']),
    );
    const otherLocale = ref<ComputedRef<string[]>>(
      computed(() => store.getters['localeStore/getOtherLocale']),
    );

    const searcher = ref<boolean>(false);
    const isMobileMenuOpen = ref<boolean>(false);

    const updateAppLocale = (selectedLocale): void => {
      window.location.href = `/${selectedLocale}${route.fullPath.slice(3)}`;
      // store.commit('localeStore/setAppLang', selectedLocale);
      // store.dispatch('financialStore/updateGraphDates');
    };

    const initAppLocale = (locale): void => {
      store.dispatch('localeStore/init', locale);
    };

    const turnSearcher = (): void => {
      searcher.value = !searcher.value;
    };

    const onOpenMenu = (): void => {
      isMobileMenuOpen.value = !isMobileMenuOpen.value;
      document.body.classList.toggle('stop-scrolling');
    };

    onMounted(() => {
      initAppLocale(route.params.locale);
    });

    onServerPrefetch(() => {
      initAppLocale(route.params.locale);
    });

    return {
      appLang,
      otherLocale,
      searcher,
      isMobileMenuOpen,
      logo,
      i18n,
      updateAppLocale,
      turnSearcher,
      onOpenMenu,
    };
  },
});
</script>

<style scoped lang="scss">
@import '../assets/fonts/icomoon/style.css';
@import '../assets/styles/libs.min.css';
@import '../assets/styles/styles.css';
.header {
  position: relative;
  z-index: 200;
  height: auto;
  overflow: unset;
}
</style>
