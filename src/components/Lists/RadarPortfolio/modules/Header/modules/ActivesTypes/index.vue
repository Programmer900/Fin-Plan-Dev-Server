<template>
  <div class="activesTypes">
    <div class="activesTypes__grid">
      <ListHeaderActivesTypesItem title="Все активы" :is-selected="true" />
      <ListHeaderActivesTypesItem title="Акции" count="9" :show-icon="true" />
      <ListHeaderActivesTypesItem title="ETF" count="0" />
      <ListHeaderActivesTypesItem title="Облигации" count="0" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ListHeaderActivesTypesItem from '@/components/Lists/RadarPortfolio/modules/Header/modules/ActivesTypes/modules/Item/index.vue';

export default defineComponent({
  name: 'ListHeaderActivesTypes',
  components: { ListHeaderActivesTypesItem },
});
</script>

<style scoped lang="scss">
.activesTypes {
  &__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px 4%;
  }

  @include respond-to($container-media--tablet) {
    &__grid {
      grid-auto-flow: column;
      grid-template-columns: unset;
      row-gap: 0;
    }
  }
}
</style>
