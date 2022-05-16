<template>
  <div>
    <div class="greyBg">
      <div class="flexWrapperRow tableValue">
        <p
          @click="handleClick(button)"
          v-for="button in reportSwitches"
          :key="button.name"
          :class="{ isClicked: button.clicked }"
        >
          {{ button.name }}
        </p>
      </div>
    </div>
    <Table :isReporting="true" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Table from '@/components/table/Table.vue';

export default defineComponent({
  name: 'Reporting',
  components: { Table },

  data() {
    return {
      reportSwitches: [
        { name: 'Баланс', clicked: true },
        { name: 'Прибыль и убытки', clicked: false },
        { name: 'Движение денежных средств', clicked: false },
        { name: 'Фин оценка', clicked: false },
      ],
    };
  },

  methods: {
    handleClick(button) {
      this.reportSwitches.forEach((prop) => {
        prop.clicked = false;
      });
      button.clicked = !button.clicked;
    },
  },
});
</script>

<style scoped lang="scss" src="./style.scss" />
