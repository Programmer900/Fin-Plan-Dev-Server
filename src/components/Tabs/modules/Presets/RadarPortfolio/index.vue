<template>
  <div class="tabsPreset">
    <div class="tabsPreset__container">
      <div class="tabsPreset__goTo tabsPreset__goTo--mobile">
        <RouterLink
          :to="{
            name: goToLink,
            params: { locale: 'ru' },
          }"
        >
          {{ goToTitle }}
        </RouterLink>
      </div>
      <h1 class="tabsPreset__title">{{ title }}</h1>
    </div>
    <div class="tabsPreset__wrapTabs tabsPreset__containerTabs">
      <Tabs v-model="selectedTab" class="tabsPreset__tabs">
        <Swiper class="tabsPreset__scrollArea" :free-mode="true" :slides-per-view="'auto'">
          <SwiperSlide v-for="(tab, i) in tabs" :key="`t${i}`" @click="onClickTab(tab.type)">
            <Tab class="tabsPreset__tab" :val="tab.value || i">
              <div
                :class="[
                  { 'tabsPreset__tab-inner--active': getActive(tab.value || i) },
                  'tabsPreset__tab-inner',
                ]"
                :style="{ 'border-color': getActive(tab.value || i) ? '#2A8634' : '' }"
              >
                {{ tab.label }}
              </div>
            </Tab>
          </SwiperSlide>
        </Swiper>
      </Tabs>
      <div class="tabsPreset__goTo tabsPreset__goTo--desktop">
        <RouterLink
          :to="{
            name: goToLink,
            params: { locale: 'ru' },
          }"
        >
          {{ goToTitle }}
        </RouterLink>
      </div>
    </div>
    <div class="tabsPreset__tabsLine" />
    <TabPanels v-model="selectedTab" class="tabsPreset__panels">
      <template v-for="(tab, i) in tabs" :key="`tp${i}`">
        <TabPanel v-if="selectedTab === tab.value" class="tabsPreset__panel" :val="tab.value">
          <component :is="tab.component" />
        </TabPanel>
      </template>
    </TabPanels>
  </div>
</template>

<script lang="ts">
import {
 Component, defineComponent, reactive, toRefs
} from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import Tabs from '@/components/Tabs/index.vue';
import Tab from '@/components/Tabs/modules/Tab/index.vue';
import TabPanels from '@/components/Tabs/modules/TabPanels/index.vue';
import TabPanel from '@/components/Tabs/modules/TabPanel/index.vue';
import ScrollArea from '@/components/ScrollArea/index.vue';
import { radarStore } from '@/store/pinia/radar';

interface ITab {
  label: string;
  component: Component;
  value: number;
  color?: string;
}

export default defineComponent({
  name: 'TabsPresetRadarPortfolio',
  components: {
    ScrollArea,
    TabPanel,
    TabPanels,
    Tab,
    Tabs,
    Swiper,
    SwiperSlide,
  },
  props: {
    tabs: {
      type: Array as () => ITab[],
      required: true,
    },
    selectedTabIndex: {
      type: Number,
      default: 0,
    },
    title: {
      type: String,
      required: true,
    },
    goToLink: {
      type: String,
      required: true,
    },
    goToTitle: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const radar = radarStore();

    const state = reactive({
      selectedTab: props.tabs[props.selectedTabIndex].value,
    });

    function getActive(tab: string | number) {
      return state.selectedTab === tab;
    }

    const onClickTab = async (type) => {
      await radar.changeTab(type);
    };

    return {
      getActive,
      onClickTab,
      ...toRefs(state),
    };
  },
});
</script>

<style lang="scss" scoped>
.tabsPreset {
  padding-top: 40px;
  @include container-paddings();

  &__tabsLine {
    @include wrap-mar--left();
    @include wrap-mar--right();

    height: 1px;
    margin-bottom: 30px;
    background: #e7e7e7;
  }

  &__tab-inner {
    position: relative;
    padding: 10px 10px;
    font-size: 14px;
    white-space: nowrap;
    text-transform: uppercase;

    &--active {
      &::before {
        position: absolute;
        bottom: 0;
        left: 0;
        display: block;
        width: 100%;
        height: 2px;
        background: #2a8634;
        content: '';
      }
      //border-style: solid;
      //border-width: 0;
      //border-bottom-width: 2px;
    }
  }

  &__goTo {
    text-align: right;

    a {
      color: #2a8634;
      font-weight: 500;
      font-size: 12px;
      text-transform: uppercase;
      text-decoration: none;
    }

    &--desktop {
      display: none;
    }
  }

  &__tabTitle {
    @include wrap-pad();

    margin-bottom: 25px;
    font-weight: 500;
    font-size: 18px;
    line-height: 150%;
  }

  &__title {
    margin: 20px 0;
    font-weight: 500;
    font-size: 20px;
    line-height: 150%;
  }

  ::v-deep .tabs {
    display: block;
  }

  ::v-deep .scrollArea__wrap {
    justify-content: flex-start;
    padding-top: 10px;
    padding-bottom: 30px;
  }

  ::v-deep .swiper-slide {
    width: max-content;
    cursor: pointer;

    &:not(:last-child) {
      margin-right: 15px;
    }

    &:first-child {
      @include wrap-mar--left();
    }

    &:last-child {
      @include wrap-mar--right();
    }
  }

  @include respond-to($container-media--tablet) {
    &__title {
      margin-bottom: 40px;
    }

    &__tabTitle {
      margin: 55px 0 55px;
    }
  }

  @include respond-to($container-media--1100) {
    &__wrapTabs {
      display: grid;
      grid-template-columns: 2fr 1fr;
      align-items: center;
    }

    &__containerTabs {
      @include wrap-pad();
    }

    &__title {
      margin: 0 0 50px 0;
      font-size: 36px;
    }

    &__tabTitle {
      font-size: 36px;
    }

    &__goTo {
      a {
        font-size: 16px;
      }

      &--mobile {
        display: none;
      }

      &--desktop {
        display: unset;
      }
    }

    &__tab-inner {
      padding-bottom: 24px;

      &--active {
        &::before {
          height: 5px;
        }
      }
    }

    ::v-deep .swiper-slide {
      &:first-child {
        margin-left: 0;
      }

      &:last-child {
        margin-right: 0;
      }
    }
  }

  @include respond-to(1200) {
    &__title {
      margin-top: 65px;
    }
  }
}
</style>
