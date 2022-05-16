<template>
  <section class="utilsColumn">
    <div class="utilsColumn__container">
      <div class="utilsColumn__inner">
        <UtilsColumnSearch/>
        <UtilsNotes/>
        <UtilsCalendar/>
        <UtilsCase/>
        <UtilsFollow/>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UtilsColumnSearch from '@/views/SecurityList/modules/Search/index.vue';
import UtilsNotes from '@/views/SecurityList/modules/Notes/index.vue';
import UtilsCase from '@/views/SecurityList/modules/Case/index.vue';
import UtilsFollow from '@/views/SecurityList/modules/Follow/index.vue';
import UtilsCalendar from '@/views/SecurityList/modules/Calendar/index.vue';

export default defineComponent({
  name: 'UtilsColumn',
  components: {
    UtilsCalendar,
    UtilsFollow,
    UtilsCase,
    UtilsNotes,
    UtilsColumnSearch,
  },
});
</script>

<style scoped lang="scss">
.utilsColumn {
  padding: 27px;
  background: #fff;

  &__inner {
    display: flex;
    flex-direction: column;
  }
}
</style>
