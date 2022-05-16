<template>
  <div :class="[{ active: isActive && indicator }, 'tabItem']" @click="onClickTab">
    <slot>
      <div class="tabItem__inner">
        {{ label }}
      </div>
    </slot>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, inject, reactive, computed, toRefs,
} from 'vue';
import { Tabs } from '@/components/Tabs/index.vue';

export default defineComponent({
  name: 'Tab',
  props: {
    val: {
      default: null,
      type: [String, Number],
    },
    label: {
      default: null,
      type: String,
    },
    indicator: {
      default: false,
      type: Boolean,
    },
  },
  setup(props) {
    const tabs = inject<Tabs>('tabs', {
      state: reactive({
        active: null,
      }),
      activateTab: () => {},
    });
    const state = reactive({
      isActive: computed(() => tabs.state.active === props.val),
    });
    function onClickTab() {
      tabs.activateTab(props.val);
    }
    return {
      ...toRefs(state),
      tabs,
      onClickTab,
    };
  },
});
</script>

<style lang="scss" scoped>
.tabItem {
  cursor: pointer;

  &__inner {
    padding: 10px 20px;
  }
}

.active {
  border-color: black;
  border-style: solid;
  border-width: 0;
  border-bottom-width: 2px;
}
</style>
