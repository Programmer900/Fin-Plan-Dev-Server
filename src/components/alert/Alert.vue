<template>
  <div class="tableAlert flexRowCenter">
    <img alt="alert" :src="alert" />
    <p>{{ label }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import alert from '../../assets/icons/alert-circle.svg';

export default defineComponent({
  name: 'Alert',
  props: {
    label: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      alert,
    };
  },
});
</script>

<style scoped lang="scss" src="./style.scss" />
