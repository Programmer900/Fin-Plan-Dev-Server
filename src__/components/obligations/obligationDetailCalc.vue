<template>
  <div>
    <div class="search-result__info border-b">
      <div class="search-result__info-side">
        Цена облигации, в %
      </div>
      <div class="search-result__info-side">
        <div
          class="form_element"
          :class="{ active: activePriceField }"
        >
          <input
            @focus="() => { activePriceField = true }"
            @blur="() => { activePriceField = false }"
            v-model="form.priceObligation"
            placeholder="Укажите цену облигации"
            name="coupons_modal_calc_price"
            id="coupons_modal_calc_price"
            type="number"
            @input="onChangeCalcPrice"
          >
          <span class="placeholder">
              Укажите цену облигации
            </span>
        </div>
      </div>
    </div>
    <div class="search-result__info" v-for="(coupon, idx) in obligationData.data.COUPONS">
      <div class="search-result__info-side">
        {{ coupon['Дата выплаты'] }}
      </div>

      <div class="search-result__info-side">

        <Input
          @customInput="onCalculateCouponsPrice"
          :placeholder="'Внесите купон, в руб.'"
          :type="'number'"
          :className="'coupons_detail_modal_calc_price'"
          :defaultValue="!parseFloat(coupon['Купоны']) ? '0' : parseFloat(coupon['Купоны'])"
          :idx="idx"
        />

      </div>
    </div>
    <p class="coupons_modal_result text-center" style="display: block;">
      Доходность = <span id="coupons_modal_calc_result">{{ obligationData.profit.toFixed(2) }}</span>%
    </p>
  </div>
</template>

<script>
  import { mapGetters } from "vuex"

  import Input from '@/components/ui/Input/index.vue'

  export default {
    name: "CurrentObligationsCalc",
    components: {
      Input
    },
    data() {
      return {
        activePriceField: false,
        form: {
          priceObligation: 0
        },

        obligationData: null,
        calcCouponSum: null,
        currentPriceWithNkd: 0,
        cancelPrice: 0,
        commonProfit: null,
        yearProfit: null
      }
    },
    methods: {
      onChangeCalcPrice() {
        this.calculate()
      },

      calculate() {
        this.calcCouponSum = this.obligationData.data.COUPONS.reduce((sum, current) => sum + current['Купоны'], 0) // Суммируем все купоны
        this.currentPriceWithNkd = ((this.obligationData.data.AAA.data['FACEVALUE'] * (Number(this.form.priceObligation) ? Number(this.form.priceObligation) : +this.obligationData.data.AAA.data['LEGALCLOSE'])) / 100) + Number(this.obligationData.data.AAA.data['ACCRUEDINT'])
        this.cancelPrice = Number(this.obligationData.data.AAA.data['FACEVALUE']) + this.calcCouponSum
        this.commonProfit = (this.cancelPrice - this.currentPriceWithNkd) * 100 / this.currentPriceWithNkd
        this.yearProfit = this.commonProfit / Number(this.obligationData.data.AAA.data['CANCELATION_DAYS']) * 365
        this.obligationData.profit = this.yearProfit
      },

      onCalculateCouponsPrice(val, idx) {
        this.obligationData.data.COUPONS[idx]['Купоны'] = Number(val) // добавляем значение к конкретному купону
        this.calculate()
      }
    },
    computed: {
      ...mapGetters({
        currentObligationDetail: 'obligationsStore/getCurrentObligations',
        /*getAllObligations: 'obligationsStore/getObligationsAll',

        isModalVisible: 'modalStore/isModalVisible',
        isModalVisible: 'modalStore/isModalVisible',*/
      }),
    },

    created() {
      this.obligationData = JSON.parse(JSON.stringify(this.currentObligationDetail))
      this.form.priceObligation = this.obligationData.data.AAA.data.LASTPRICE || this.obligationData.data.AAA.data.LEGALCLOSE
    }
  }
</script>

<style scoped lang="sass">
  .search-result__info
    margin-top: 10px
    &:nth-child(2)
      margin-top: 20px
  .border-b
    border-bottom: 1px solid #E2E2E2
    padding-bottom: 20px
</style>
