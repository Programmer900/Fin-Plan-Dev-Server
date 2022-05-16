<template>
  <div class="tableAlert flexRowCenter">
    <img alt="Уведомление" :src="alertIcon" />
    <p>{{ $t('tableTexts.alertText') }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import alertIcon from '@/assets/icons/alert-circle.svg';

export default defineComponent({
  name: 'DocumentIndicatorsTableAlert',
  setup() {
    return {
      alertIcon,
    };
  },
});
</script>

<style scoped lang="scss"></style>
