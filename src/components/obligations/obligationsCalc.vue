<template>
    <div>
      <!-- Подсказка -->
      <i class="ex-small-text">Сейчас представлены облигации для поиска:
        Alfa-23 EU, АВТОБФ БП1, АвАгроБ1P1, CBOM Finan
      </i>
      <!-- Поиск эмитента -->
      <div class="search-form">

        <div
          class="form_element"
          :class="{ active: activeSearchField }"
        >
          <input
            @focus="() => { activeSearchField = true }"
            @blur="() => { activeSearchField = false }"
            v-model="searchField"
            placeholder="Введите название облигации"
            name="coupons_modal_search_field"
            id="coupons_modal_search_field"
            type="text"
            @input="onSearch"
            autocomplete="off"
          >
          <span class="placeholder">
            Введите название облигации
          </span>
        </div>

        <div class="search-result" v-show="!currentEl">
         <div
              v-for="item in searchListFilter"
              class="search-item"
              :key="item.data.OBLIGATION.CODE"
              @click="onOpenObligationList(item)"
         >
           {{ item.value }}
         </div>
        </div>
      </div>
      <!-- Цена облигации -->
      <div class="search-result__info" v-if="currentEl">
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
            >
            <span class="placeholder">
              Укажите цену облигации
            </span>
          </div>
        </div>
      </div>
      <!-- Размер неизвестных купонов -->
      <div class="search-result__info" v-if="currentEl && activeObligation.data.UNKNOWN !== 0">
        <div class="search-result__info-side">
          Размер неизвестных купонов, в руб.
        </div>
        <div class="search-result__info-side">
          <div
            class="form_element"
            :class="{ active: activeCouponField }"
          >
            <input
              @focus="() => { activeCouponField = true }"
              @blur="() => { activeCouponField = false }"
              v-model="form.countCouponPrice"
              placeholder="Укажите размер неизвестных купонов"
              name="coupons_modal_calc_coupon_price"
              id="coupons_modal_calc_coupon_price"
              type="number"
            >
            <span class="placeholder">
              Укажите размер неизвестных купонов
            </span>
          </div>
        </div>
      </div>
      <!-- Детализировано -->
      <div class="search-result__info" v-if="currentEl">
        <div class="search-result__info-side"></div>
        <div class="search-result__info-side text-center"
          v-if="activeObligation.data.UNKNOWN !== 0"
        >
          <a href="javascript: void(0)" @click="onOpenDetailModal(activeObligation)">Детализировано</a>
        </div>
      </div>
      <!-- Доходность -->
      <p v-if="currentEl" class="coupons_modal_result text-center" style="display: block;">
        Доходность = <span id="coupons_modal_calc_result2">{{ getYearProfit }}</span>%
      </p>
    </div>
</template>

<script>

  import { mapActions, mapGetters, mapMutations } from "vuex"

  export default {
    name: "obligationsCalc",
    props: ['hasCloseDetailObligation'],

    data() {
      return {
        activeSearchField: false,
        activePriceField: false,
        activeCouponField: false,
        searchList: null,
        searchListFilter: [],
        activeElement: '',
        currentEl: false,
        activeObligation: null,
        searchField: '',


        form: {
          priceObligation: '',
          calcPrice: null,
          countCouponPrice: 0,
        },

        calcCouponSum: null,
        currentPriceWithNkd: 0,
        cancelPrice: 0,
        commonProfit: null,
        yearProfit: null

      }
    },
    methods: {
      onOpenDetailModal(el) {
        const self = this
        setTimeout(function() {
          self.closeObligationsCalcModal()
          self.showDetailObligationsCalcModal()
          self.currentObligation(el)
        }, 400)

      },

      ...mapMutations({
        showDetailObligationsCalcModal: 'modalObligationsCalcStore/showModalDetail',
        closeObligationsCalcModal: 'modalObligationsCalcStore/closeModal',
      }),
      ...mapActions({
        currentObligation: 'obligationsStore/setCurrentObligation',
      }),

      onSearch(event) {
        if(event.target.value.length !== 0) {
          this.currentEl = false
          this.searchListFilter = this.searchList.filter(o => o.value.toLowerCase().includes(event.target.value.toLowerCase()))
        } else {
          this.searchListFilter = []
        }
      },

      onOpenObligationList(el) {
        this.form.countCouponPrice = 0
        this.currentEl = true
        this.activeElement = ''
        this.activeObligation = el
        this.currentObligation(el)
        this.form.priceObligation = el.data.AAA.data.LASTPRICE || el.data.AAA.data.LEGALCLOSE

        setTimeout(() => {
          this.activeElement = el.value
          this.searchField = el.value
        }, 0)
      },

      calculate(info, activeObligation) {
        const obligation = JSON.parse(JSON.stringify(activeObligation))

        let { data: { AAA } } = obligation
        let { data: { COUPONS } } = obligation

        obligation.data.AAA.data['LASTPRICE'] = this.form.priceObligation
        obligation.data.AAA.data['LEGALCLOSE'] = this.form.priceObligation

        if (obligation.data.UNKNOWN !== 0) {
          COUPONS.forEach((c, i) => {
            if(typeof c['Купоны'] == 'string' || c['modify']) {
              obligation.data.COUPONS[i]['Купоны'] = Number(this.form.countCouponPrice)
              obligation.data.COUPONS[i]['modify'] = true
            }
          })
          this.calcCouponSum = obligation.data.COUPONS.reduce((sum, current) => sum + current['Купоны'], 0)
        } else {
          this.calcCouponSum = AAA.data['COUPONS_SUM']
        }
        this.currentPriceWithNkd = ((Number(AAA.data['FACEVALUE']) * (Number(this.form.priceObligation) ? Number(this.form.priceObligation) : Number(AAA.data['LEGALCLOSE']))) / 100) + Number(AAA.data['ACCRUEDINT'])
        this.cancelPrice = Number(AAA.data['FACEVALUE']) + this.calcCouponSum
        this.commonProfit = (this.cancelPrice - this.currentPriceWithNkd) * 100 / this.currentPriceWithNkd
        obligation.commonprofit = this.commonProfit
        this.yearProfit = obligation.profit = this.commonProfit / Number(AAA.data['CANCELATION_DAYS']) * 365
        this.activeObligation = obligation
        this.currentObligation(obligation)
      }
    },
    computed: {
      ...mapGetters({
        currentObligationDetail: 'obligationsStore/getCurrentObligations',
        getAllObligations: 'obligationsStore/getObligationsAll',

        isModalVisible: 'modalStore/isModalVisible',
        isModalVisible: 'modalStore/isModalVisible',
      }),

      getYearProfit() {
        return (this.commonProfit / Number(this.activeObligation.data.AAA.data['CANCELATION_DAYS']) * 365).toFixed(2)
      }
    },
    watch: {
      form: {
        handler(val, old) {
          this.calculate(+val, this.activeObligation)
        }, deep: true
      }
    },
    created() {
      if(this.hasCloseDetailObligation ) {
        const currentObligation = this.currentObligationDetail
        this.onOpenObligationList(currentObligation)
      }

      const allObligations = JSON.parse(JSON.stringify(this.getAllObligations()))
      this.searchList = allObligations
    },
  }
</script>

<style lang="sass">
  .coupons_modal_result
    margin-top: 30px
    font-size: 20px
    font-weight: 500
    color: #c9caca
  .search-form
    position: relative
  .search-result
    position: absolute
    width: 100%
    z-index: 9
    &__info
      margin-top: 40px
      display: flex
      align-items: center
      justify-content: space-between
    &__info-side
      width: 60%
      &:nth-child(2)
        width: 40%
    .search-item
      background-color: #fff
      padding: 10px
      width: 100%
      color: #757575
      transition: all .3s ease
      cursor: pointer

      &:hover
        background-color: #008940
        color: #fff

  .list-enter-active,
  .list-leave-active
    transition: all .3s ease

  .list-enter-from,
  .list-leave-to
    opacity: 0

</style>
