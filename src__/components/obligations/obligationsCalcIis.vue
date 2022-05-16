<template>
    <div class="modal__iis">
      <!-- Подсказка -->
      <i class="ex-small-text"></i>
      <div>

        <div class="search-result__info" v-for="(year, idx) in (obligationIisData.period)">
          <div v-if="idx === 0" class="search-result__info-side">
            Первоначальный капитал
          </div>
          <div v-else-if="idx === 1" class="search-result__info-side">
            Год 2: (на начало года)
          </div>

          <div v-else class="search-result__info-side">
            Год &nbsp;{{ idx + 1 }}
          </div>

          <div class="search-result__info-side">

            <Input
              ref="detailField"
              @customInput="onCalculateDetailIisPrice"
              :placeholder="'Укажите...'"
              :type="'number'"
              :className="'coupons_detail_modal_calc_price'"
              :defaultValue="iisDepositsDetail.length ? iisDepositsDetail[idx] : obligationIisData.startDeposit"
              :idx="idx"
            />

          </div>
        </div>
        <div class="coupons_modal_result text-center" style="display: block;">
          <span data-v-b1621d32="" @click="calculateRecountIIS" class="button button_gray">Подтвердить</span>
        </div>

      </div>
    </div>
</template>

<script>
  import Input from '@/components/ui/Input/index.vue'
  import { mapActions, mapGetters, mapMutations } from 'vuex'

  export default {
    name: "CurrentObligationsIisCalc",
    props: ['hasDetail'],
    components: {
      Input
    },
    data() {
      return {
        activePriceField: false,
        obligationIisData: null,
        maxIisReturn: 52000,
        month: 12,
        percent: 0.13,
        depositsDetail: []
      }
    },
    methods: {
      ...mapMutations({
        closeObligationsCalcIisModal: 'modalObligationsCalcIisStore/closeModal',
      }),
      ...mapActions({
        saveCalculateIisDetailData: 'obligationsStore/saveCalculateIisDetailData',
      }),
      onCalculateDetailIisPrice(val, idx) {
        this.depositsDetail[idx] = Number(val)
        this.saveCalculateIisDetailData(JSON.parse(JSON.stringify(this.depositsDetail)))
      },
      calculateRecountIIS() {
        this.closeObligationsCalcIisModal()
        this.saveCalculateIisDetailData(JSON.parse(JSON.stringify(this.depositsDetail)))

        this.$emit('onCalculateRecountIIS', this.iisDepositsDetail, this.obligationIisData )
      }
    },
    computed: {
      ...mapGetters({
        iisData: 'obligationsStore/getIisData',
        iisDepositsDetail: 'obligationsStore/getIisDeposits',
      }),
    },
    created() {
      this.obligationIisData = JSON.parse(JSON.stringify(this.iisData))
    },
    mounted() {
      if(this.$refs.detailField) {
        this.$refs.detailField.map(y => {
          this.depositsDetail.push(y.inputText)
        })
      }
    }
  }
</script>

<style lang="sass">

  .modal__iis
    .search-result__info
      margin-top: 10px
      display: flex
      align-items: center
      justify-content: space-between
      &:nth-child(2)
        margin-top: 20px
      .border-b
        border-bottom: 1px solid #E2E2E2
        padding-bottom: 20px
    .search-result__info-side
      width: 50%

</style>
