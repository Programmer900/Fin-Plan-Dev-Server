<template>
  <button class="changeStrategy" @click="onClickChange">
    <span v-if="getPresetSelectionMode">Настроить свою стратегию</span>
    <span v-else>Свернуть и выбрать готовую стратегию</span>
    <svg
      id="arrow-right-circle-line"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path id="Контур_65" d="M0,0H24V24H0Z" data-name="Контур 65" fill="none" />
      <path
        id="Контур_66"
        d="M12,11V8l4,4-4,4V13H8V11Zm0-9A10,10,0,1,1,2,12,10,10,0,0,1,12,2Zm0,18a8,8,0,1,0-8-8A8,8,0,0,0,12,20Z"
        data-name="Контур 66"
        fill="#fff"
      />
    </svg>
  </button>
</template>

<script lang="ts">
import { radarStore } from '@/store/pinia/radar';

export default defineComponent({
  name: 'PageRadarChangeStrategy',
  setup(props, { emit }) {
    const radar = radarStore();

    const onClickChange = () => {
      radar.togglePresetSelectionMode();
    };

    return {
      onClickChange,
      getPresetSelectionMode: computed(() => radar.presetSelect[radar.currentTab]),
    };
  },
});
</script>

<style scoped lang="scss">
.changeStrategy {
  $_pad-side: 10px;

  position: relative;
  width: 100%;
  margin-top: 50px;
  padding: $_pad-side;
  font-weight: 500;
  font-size: 14px;
  line-height: 150%;
  text-align: center;
  text-transform: uppercase;
  background: #fff;
  border: none;
  cursor: pointer;
  transition: 0.1s all ease;

  svg {
    position: absolute;
    top: 20%;
    right: $_pad-side;
    display: none;
  }

  @include respond-to($container-media--tablet) {
    padding: 40px 0;

    &:hover {
      color: #fff;
      background: #fec006;

      svg {
        top: 37%;
        display: unset;
      }
    }
  }

  @include respond-to(1200) {
    margin-top: 90px;
    font-size: 20px;
  }
}
</style>
