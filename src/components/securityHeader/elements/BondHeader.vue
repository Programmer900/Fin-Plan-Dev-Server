<template>
  <div class="whiteBg">
    <div class="flexWrapperColumn">
      <div>
        <div class="stocks">
          <div class="stocksHeader flexRowBetween">
            <div v-if="bond" class="imageNameContainer">
              <!--              <div class="logo" />-->
              <h1 class="default-w-400">
                {{ $t('securityHeader.bond.name') }} {{ bond.radarData.NAME }}
              </h1>
            </div>
            <h1 v-else class="default-w-400">...</h1>
            <div class="priceAndIndexes">
              <span v-if="bond" class="default-w-400">{{ bond.props.COUPONVALUE }} ₽</span>
              <span v-else class="default-w-400">... ₽</span>
              <div style="height: 0" class="types default-w-bold" />
            </div>
          </div>
        </div>
        <div class="stock">
          <div class="stockInfoHeader">
            <div class="stockInfoHeaderDescription">
              <p v-if="bond" class="default-w-400">
                {{ $t('securityHeader.bond.name') }} {{ bond.radarData.NAME }}
                {{ $t('securityHeader.bond.date') }} 1 Мая 2011 г.
                {{ $t('securityHeader.bond.emitent') }} {{ bond.company.NAME }}.
              </p>
              <p v-else style="height: 100px" class="default-w-400">...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapActions } from 'vuex';
import { getBondInfo } from '@/services/finplan.service';

export default defineComponent({
  name: 'BondHeader',
  data() {
    return {
      bond: '',
      indexes: [],
      arrowup: require('../../../assets/icons/arrow-up.svg'),
      arrowdown: require('../../../assets/icons/arrow-red.svg'),
    };
  },
  computed: {},
  methods: {
    async init() {
      const bond = await getBondInfo(this.$route.params.bondcode, this.$route.params.region);

      console.log(bond);

      this.bond = {
        radarData: bond.RADAR_DATA,
        props: bond.RADAR_DATA.PROPS,
        company: bond.RADAR_DATA.COMPANY,
      };
    },
  },
  async created() {
    await this.init();
  },
});
</script>

<style scoped lang="scss" src="./style.scss" />
