<template>
  <div class="tableIndicators">
    <div class="greyBg">
      <div class="flexWrapperColumn">
        <div class="table">
          <Alert :label="$t('tableTexts.alertText')" />
          <div class="tableProps flexRowBetween">
            <TableProps />
            <TableUtils />
          </div>
        </div>
      </div>
    </div>
    <TableRows />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';
import Alert from '../alert/Alert.vue';
import TableRows from '@/components/table/elements/tableRows/TableRows.vue';
import TableProps from '@/components/table/elements/tableProps/TableProps.vue';
import TableUtils from '@/components/table/elements/tableUtils/TableUtils.vue';

export default defineComponent({
  name: 'Table',
  language: '',
  components: {
    TableUtils,
    TableProps,
    TableRows,
    Alert,
  },

  async created() {
    await this.initTable();
  },

  unmounted() {
    this.clearTableFieldData();
  },

  methods: {
    ...mapActions({
      initTable: 'financialStore/init',
      clearTableFieldData: 'financialStore/clearTableFieldData',
    }),
  },
});
</script>

<style lang="scss" src="./style.scss" />
