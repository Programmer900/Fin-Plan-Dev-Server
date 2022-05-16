<template>
  <div class="flexWrapperColumn">
    <div class="wrapperTemplateWithRightSidebar">
      <div class="mainBlock">
        <Banner :info="bannerInfo"></Banner>
        <h1 class="default-w-400">Онлайн калькулятор ИИС</h1>
        <div id="calc">
        <div class="calculator-iis">
          <div class="">
            <div id="calc-iis">
              <div class="calc_iis__top">
                <p class="description">Индивидуальные инвестиционные счета (ИИС) уже прочно вошли в жизнь инвесторов и позволяют получать дополнительный доход к инвестированию в виде государственных льгот по возврату НДФЛ</p>
                <div class="calc_iis__link">
                  <div class="calc_iis__link__inner">
                    <p>Подробнее узнать об этих счетах можно в нашей статье <br><span class="big">«Что такое ИИС?»</span></p>
                  </div>
                  <router-link to="/blog/iis-podrobniy-razbor/" class="button button_gray">Читать</router-link>
                </div>

                <p class="t20">
                  Если коротко, то ИИС позволяет получать налоговый вычет по НДФЛ в размере 13% от суммы инвестиций.
                </p>
                <p class="t14">
                  К сожалению данный вычет не может быть больше суммы уплаченного Вами в расчетном году НДФЛ, поэтому для корректного расчета доходов от ИИС необходимо учитывать размер официальной заработной платы. Данный калькулятор покажет Вам все данные расчеты на 3 года вперед.
                </p>
              </div>

              <div class="calculator-iis__form" style="display: flex; flex-display: row;">
                <!-- Main settings -->
                <div class="calc_iis__fields">

                  <div class="line">
                    <div class="line__inner">
                      <span class="number">1</span>
                      <div class="text">

                        <p class="text_inner">
                          Введите размер пополнения ИИС в год
                            <span
                              class="iis_tooltip_tgl"
                              title="Это сумма ежегодного пополнения ИИС. Если Вы не планируете пополнять ИИС каждый год, тогда нажмите «детализировано по годам» и скорректируйте суммы пополнения детализировано по годам."
                            >?</span>
                        </p>
                      </div>
                      <input
                        :disabled="iisDetail"
                        @keypress="isNumber($event)"
                        @keyup="isNumber($event)"
                        id="input_yield_start"
                        type="text"
                        v-model.number="initialData.startDeposit"
                      >

                      <div class="detail_by_years">
                        <div>
                          <label>
                            <input
                              type="checkbox"
                              v-model.number="iisDetail"
                              id="iis_type_a"
                              :checked="true"
                              :disabled="initialData.period == 0"
                            >
                            <span class="checkbox__inner">
                            <span class="dot"></span>
                        </span>
                          </label>
                        </div>
                        <div>
                          <span class="text" @click="showObligationsCalcIisModal">
                            Ввести детализировано по годам.
                          </span>
                        </div>
                      </div>
                    </div>


                  </div>
                  <div class="line">
                    <div class="line__inner">
                      <span class="number">2</span>
                      <div class="text">
                        <p class="text_inner">Официальная ежемесячная заработная плата, с которой платится НДФЛ
                          <span
                            title="Это сумма ежемесячной официальной заработной платы, с которой платится НДФЛ. Данная сумма нужна для корректно расчета налогового вычета по ИИС. Если у Вас несколько мест работы, то для корректного учета следует написать суммарный официальный заработок. Пенсии, стипендии, предпринимательский доход, а также дивиденды в данный расчет не включаются."
                            class="iis_tooltip_tgl"
                          >
                            ?</span>
                        </p>
                      </div>

                      <input
                        @keypress="isNumber($event)"
                        @keyup="isNumber($event)"
                        id="input_refill"
                        type="text"
                        v-model.number="initialData.salary"
                      >
                    </div>
                  </div>
                  <div class="line">
                    <div class="line__inner">
                      <span class="number">3</span>
                      <div class="text">
                        <p class="text_inner">Введите ставку доходности, в %
                          <span
                            class="iis_tooltip_tgl"
                            title="Эта ставка позволит Вам увидеть полный результат инвестиционного дохода как от ИИС, так и от инвестиционных активов. При вводе ставки доходности следует ориентироваться на то, что чем выше доходность – тем выше риски. Безрисковой ставкой доходности на сегодняшний день можно считать доходность облигаций федерального займа на уровне 8%, 15% - может дать защищенный инвестиционный портфель из акций и облигаций. Более высокий уровень доходности конечно возможен, но риски такого инвестиционного портфеля будут уже более высоки, а стабильность доходности ниже."
                          >?</span></p>
                      </div>

                      <input
                        @keypress="isNumber($event)"
                        @keyup="isNumber($event)"
                        id="input_yield_rate"
                        type="text"
                        v-model.number="initialData.investRateInput"
                      >
                    </div>
                  </div>

                </div>
              </div>

              <div>
                <!-- Info investors -->
                <info :period="initialData.period" :max="maxProfit" :type="'portfolio'"></info>
                <!-- Info investors -->
                <info :max="iis_output" :type="'tax'"></info>
                <!-- Info investors -->
                <info :max="passive_output" :type="'invest-profit'"></info>
              </div>

              <!-- Line charts -->
              <div class="charts" ref="chart">
                <charts
                  :options="{
                  chart: {
                    type: 'line',

                    zoomType: 'xy',
                    backgroundColor: 'transparent'
                  },
                  plotOptions: {
                    area: {
                      stacking: 'normal',
                      lineColor: 'transparent',
                      lineWidth: 1,
                      marker: {
                        lineWidth: 1,
                        symbol: 'circle',
                        radius: 2
                      }
                    },
                    line: {

                      marker: {
                        lineWidth: 1,
                        symbol: 'circle',
                        radius: 3
                      }
                    }
                  },
                  title: {
                    text: 'Калькулятор ИИС',
                  },
                  tooltip: {
                    split: true,
                    valueSuffix: ' руб.'
                  },
                  series:[
                    {
                      type: 'area',
                      name: 'C %',
                      data: values_arr,
                      color: 'yellow',
                    },
                    {
                      type: 'area',
                      name: 'С ИИС',
                      data: iss_arr,
                      color: 'orange',
                    },
                    {
                      type: 'area',
                      name: 'Первоначальный капитал',
                      data: initial_arr,
                      color: 'blue',
                    }
                    ],
                    xAxis: {
                      categories: labels_arr,
                      tickmarkPlacement: 'on',
                      title: {
                        enabled: true
                      }
                    },
                     yAxis: {
                      title: {
                        text: '',
                      },
                    },
                  }"
                  :animateOnUpdate="true"
                />
              </div>
              <!-- Additional Settings -->
              <Accordion :isOpenDefault="true">
                <template v-slot:title>
                  Дополнительные настройки
                </template>
                <template v-slot:content>
                  <div class="chart_settings-iis2" style="display: block; opacity: 1;">
                    <div class="chart_settings-iis2_wrapper">
                      <div class="">
                        <input
                          class="period"
                          @keypress="isNumber($event)"
                          @keyup="isNumber($event)"
                          v-model.number="initialData.period"
                          type="text"
                          id="input_yield_period"
                        >
                        <label><span>Период на графике (лет)</span></label>
                      </div>

                      <div class="t-right">
                        <input
                          @keypress="isNumber($event)"
                          @keyup="isNumber($event)"
                          v-model.number="initialData.yieldTaxes"
                          type="text"
                          id="input_yield_taxes"

                          class="f-right"
                          :disabled="initialData.period == 0"
                        >
                        <label><span>Учитывать налоги на прирост капитала в расчетах по ставке (%)</span></label>
                      </div>
                    </div>
                  </div>
                </template>
              </Accordion>
              <p class="t20">Данный график лишь первый набросок Вашего финансового плана, для его реализации нужны конкретные финансовые инструменты и понимание инвестиционного процесса.</p>
              <p class="t20">Чтобы узнать, во что инвестировать на ИИС, приглашаем вас на бесплатный вебинар по инвестированию:</p>

              <div class="calc_iis__link">
                <div class="calc_iis__link__inner">
                  <p>Записаться на вебинар <br><span class="big">«Во что инвестировать на ИИС»</span></p>
                </div>
                <router-link to="/" class="button button_gray">Читать</router-link>
              </div>

              <div class="calculator-iis__table" style="position:relative;">
                <Accordion :isOpenDefault="true">
                  <template v-slot:title>Данные по периодам (на конец периода)</template>
                  <template v-slot:content>
                    <table v-if="table.headers" id="iisDataTable" class="table" style="display: table; width: 100%;">
                      <thead>
                      <tr>
                        <th style="display: table-cell;" v-for="headerItem in table.headers" >{{ headerItem.title }}</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="item in table.rows">
                        <td style="display: table-cell;">{{item.period}}</td>
                        <td style="display: table-cell;">{{item.capital}}</td>
                        <td style="display: table-cell;">{{item.iis}}</td>
                        <td style="display: table-cell;">{{item.percent}}</td>
                      </tr>
                      </tbody>
                    </table>
                    <div v-else >
                      <p class="warnings">Пожалуйста, выберите временной период, для успешного расчета!</p>
                    </div>
                  </template>
                </Accordion>
              </div>
              <!-- Table -->
            </div>
          </div>
        </div>
      </div>
      </div>
      <div class="rightSidebar">
        <UtilsColumn></UtilsColumn>
      </div>
    </div>

    <transition name="modals">
      <Modal
        v-if="isModalObligationsCalcIisVisible"
        @close="closeObligationsCalcIisModal"
        :width="'465px'"
        :bgColor="'#0d1214'"
        :color="'#fff'"
        :positionTitle="'center'"
        :separatorColor="'#00a44c'"
      >
        <template v-slot:title>
          Введите размер пополнения ИИС в год
        </template>
        <template v-slot:content-text>
          <ObligationsCalcIis :hasDetail="iisDetail" @onCalculateRecountIIS="onCalculateRecountIIS"></ObligationsCalcIis>
        </template>
      </Modal>
    </transition>

  </div>
</template>

<script>
	import {
		defineComponent
	} from 'vue'

  import Banner from '@/components/Blocks/Banner/Banner.vue'
  import Info from '@/components/calculatorIis/Info/index.vue'
  import Accordion from '@/components/ui/Accordion/index.vue'
  import Modal from '@/components/Blocks/ConditionModal/index.vue'
  import ObligationsCalcIis from '@/components/obligations/obligationsCalcIis.vue'
  import UtilsColumn from '@/views/SecurityList/modules/UtilsColumn/index.vue'
  import Charts from './modules/Charts/index.vue'
  import { mapMutations, mapActions, mapGetters } from 'vuex'

	export default defineComponent({
		name: 'CalculatorIis',
    components: {
		  Banner,
      Accordion,
      Modal,
      ObligationsCalcIis,
      'info': Info,
      UtilsColumn,
      'charts': Charts
    },
    data() {
		  return {
        bannerInfo: {
          accentColor: '#9e48c5',
          subtitleColor: '#000000',
          text: `Стратегии прибыльных инвестиций 2022`,
          subtitle: 'запишись на эксклюзивный вебинар',
          img: '@/assets/img/banner/img3_1_.jpg',
          textColor: '#ffffff',
          direction: 'row',
          shadow: false,
          size: 'cover',
          buttonText: 'Узнать',
          buttonUrl: '/'
        },
        initialData: {
          startDeposit: 400000, // Старт депо
          salary: 50000, // Пополнение в течении месяца
          investRateInput: 10, // % доходности
          period: 30, // период для графика
          yieldTaxes: 13, // Ставка на прибыль(доход)
        },
        table: {
          headers: [
            {
              name: 'period',
              title: 'Период',
            },
            {
              name: 'capital',
              title: 'Первоначальный капитал',
            },
            {
              name: 'iis',
              title: 'С ИИС',
            },
            {
              name: 'percent',
              title: 'С %',
            },
          ],
          rows: []
        },

        mainData: [],
        chart_arr: [],
        deposits: [],

        defaultDeposit: [],
        detailDeposit: [],
        stateCustomDeposit: [],

        iisDetail: false,
        dataCollection: {},
        maxIisReturn: 52000,
        iisMultiplier: 0.13,
        month: 12,
        maxProfit: 0,
        iis_output: 0,
        passive_output: 0,
        obligationIisData: {},

        initial_arr: [],
        iss_arr: [],
        values_arr: [],
        labels_arr: [],
      }
    },

    methods: {
      ...mapMutations({
        showObligationsCalcIisModal: 'modalObligationsCalcIisStore/showModal',
        closeObligationsCalcIisModal: 'modalObligationsCalcIisStore/closeModal',
      }),

      ...mapActions({
        saveCalculateIisData: 'obligationsStore/saveCalculateIisData',
        saveCalculateIisDetailData: 'obligationsStore/saveCalculateIisDetailData',
      }),

      isNumber (evt) {
        const keysAllowed = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        const keyPressed = evt.key;

        if (!keysAllowed.includes(keyPressed)) {
          evt.preventDefault()
        }
      },

      // рисуем таблицу Калькулятора доходности
      viewTable(data) {
        this.table.rows = []

        data.map((el,i) => {
          this.table.rows[i] = {
            period: i,
            capital: parseInt(data[i].initialCapital).toLocaleString(),
            iis: parseInt(data[i].iisCapital).toLocaleString(),
            percent: parseInt(data[i].savingAmount).toLocaleString(),
          }
        })
      },

      onCalculateRecountIIS(dep, obligationData) {
        this.viewCharts(obligationData, dep)
      },

      // рисуем график
      viewCharts(data, customDeposit = null) {
        let depo = []

        if(!this.iisDetail) {
          for (let ix = 0; ix <= data.period; ++ix) {
            depo.push(data.startDeposit)
          }
        } else {
          if(customDeposit !== null) {
            depo = customDeposit
          } else {
            for (let ix = 0; ix <= data.period; ++ix) {
              depo.push(data.startDeposit)
            }
          }
        }

        let { salary, investRateInput, period, startDeposit, yieldTaxes } = data

        salary = Number(salary)
        investRateInput = Number(investRateInput)
        period = Number(period)
        startDeposit = Number(startDeposit)
        yieldTaxes = Number(yieldTaxes) / 100

        let currentIisReturn = Math.min(this.maxIisReturn, salary * 12 * 0.13) // текущий возврат по ИИС

        let mainData = [],
          chart_arr =[]

        let issSum = 0,
          yieldSum = 0

        for(var i = 0; i <= period; i++) {

          mainData[i] = {
            savingAmount: 0,
            deposit: 0,
            replFromIis: 0,
            yearYield: 0,
            initialCapital: 0,
            iisCapital: 0,
          }

          if (i === 0) {

            mainData[i].savingAmount = depo[i]
            mainData[i].deposit = depo[i]
            mainData[i].initialCapital = depo[i]
            mainData[i].iisCapital = depo[i]

            chart_arr.push([
              i,
              mainData[i].savingAmount,
              0,
              0,
              mainData[i].initialCapital,
              mainData[i].iisCapital,
            ]);

            continue;
          }

          let currentYear = mainData[i] // Текущий год
          let previousYear = mainData[i-1] // Предыдущий год

          //сумма ежегодного пополнения
          currentYear.deposit = depo[i-1]
          let nextYearDeposit = (i >= period) ? 0 : depo[i]

          //сумма первоначального капитала
          currentYear.initialCapital = previousYear.initialCapital + nextYearDeposit

          //сумма первоначального капитала
          currentYear.initialCapital = nextYearDeposit + previousYear.initialCapital

          let iisReturn = previousYear.deposit * 0.13

          if(i === 2) {
            iisReturn = previousYear.deposit ? previousYear.deposit * 0.13 : previousYear.savingAmount * 0.13
          }

          // пополнение от ИИС
          currentYear.replFromIis = (iisReturn > currentIisReturn) ? currentIisReturn : iisReturn

          if(i < 2) {
            currentYear.replFromIis = 0
          }

          if ((i > 2) && previousYear.deposit === 0) {
            currentYear.replFromIis = 0
          }

          issSum += currentYear.replFromIis

          //капитал с ИИС
          currentYear.iisCapital = currentYear.initialCapital + issSum

          // считаем доходность на текущий год
          currentYear.yearYield = (previousYear.savingAmount + currentYear.replFromIis) * this.investRate * (1 - yieldTaxes)
          yieldSum += currentYear.yearYield
          currentYear.savingAmount = currentYear.iisCapital + yieldSum

          chart_arr.push([
            i,
            mainData[i].savingAmount,
            previousYear.replFromIis,
            currentYear.deposit,
            mainData[i].initialCapital,
            mainData[i].iisCapital,
          ]);
        }

        this.iis1ChartRebuild(chart_arr, period) // view chart
        this.viewTable(mainData) // view table
      },

      // f() rerender
      iis1ChartRebuild(arr, y) {

        let labels_arr = [],
          values_arr = [],
          initial_arr = [],
          iss_arr = [];

        this.values_arr = []
        this.initial_arr = []
        this.iss_arr = []

        for (let i = 0; i < arr.length; i++) {
          // создаем массивы для меток и для значений
          //parseInt(data[i].savingAmount).toLocaleString(),
          labels_arr.push('Год ' + arr[i][0])
          this.labels_arr.push('Год ' + arr[i][0])



          //values_arr.push(arr[i][1].toFixed(2))
          this.values_arr.push(+arr[i][1].toFixed(2))
          //initial_arr.push(arr[i][4].toFixed(2))
          this.initial_arr.push(+arr[i][4].toFixed(2))
          //iss_arr.push(arr[i][5].toFixed(2))
          this.iss_arr.push(+arr[i][5].toFixed(2))
        }

        // Доход портфеля
        let val_max_output = (arr[arr.length-1][1] / 1000).toFixed(0)
        val_max_output = parseInt(val_max_output).toLocaleString()
        this.maxProfit = val_max_output

        // Прирост за счет ИИС
        let iis_output = ((arr[arr.length-1][5]) - (arr[arr.length-1][4])) / 1000
        iis_output = parseInt(iis_output.toFixed(0)).toLocaleString()
        this.iis_output = iis_output

        // Инвестиционный доход
        let passive_output = ((arr[arr.length-1][1]) - (arr[arr.length-1][5])) / 1000
        passive_output = parseInt(passive_output.toFixed(0)).toLocaleString()
        this.passive_output = passive_output

        this.dataCollection = {
          labels: this.labels_arr,
          datasets: [
            {
              label: 'Первоначальный капитал',
              backgroundColor: 'rgba(238,114,128,0.8)',
              borderColor: 'rgba(226,53,71,0.8)',
              borderWidth: 2,
              data: this.initial_arr
            },
            {
              label: 'С ИИС',
              backgroundColor: 'rgba(68,128,238,0.8)',
              borderColor: 'rgb(37,60,139)',
              borderWidth: 2,
              data: this.iss_arr
            },
            {
              label: 'С %',
              backgroundColor: 'rgb(238, 211, 36, 0.8)',
              borderColor: 'rgb(5, 149, 72)',
              borderWidth: 2,
              data: this.values_arr
            }
          ],
        }
      },
    },
    watch: {
      initialData: {
        handler(data) {
          let depo = this.getIisDeposits

          this.detailDeposit = Array(data.period).fill().map((item) => item = data.startDeposit)
          this.defaultDeposit = Array(data.period).fill().map((item) => item = data.startDeposit)

          Array.prototype.splice.apply(this.detailDeposit, [0, depo.length].concat(depo))
          this.stateCustomDeposit = this.detailDeposit

          if(this.iisDetail) {
            this.saveCalculateIisDetailData(this.detailDeposit)
            this.saveCalculateIisData(data)

            if(data.period !== '') {
              this.viewCharts(data, this.detailDeposit)
            }
          } else {
            if(this.stateCustomDeposit.length) {
              this.saveCalculateIisDetailData(this.stateCustomDeposit)
            } else {
              this.saveCalculateIisDetailData(this.defaultDeposit)
            }

            this.saveCalculateIisData(data)

            if(data.period !== '') {
              this.viewCharts(data, this.defaultDeposit)
            }
          }

          this.obligationIisData = JSON.parse(JSON.stringify(this.iisData))
        },
        deep: true
      }
    },
    computed: {
      ...mapGetters({
        iisData: 'obligationsStore/getIisData',
        getIisDeposits: 'obligationsStore/getIisDeposits',
        isModalObligationsCalcIisVisible: 'modalObligationsCalcIisStore/isModalVisible',
      }),

      depositYear() {
        return this.initialData.salary * 12 // Общая сумма пополнение в течении года
      },
      investRate() {
        return parseFloat(this.initialData.investRateInput) / 100 // Ставка доходности в %
      }
    },
    mounted() {
      // InitialState
      for (let ix = 0; ix < this.initialData.period; ++ix) {
        this.deposits.push(JSON.parse(JSON.stringify(this.initialData.startDeposit)))
      }

      this.saveCalculateIisData(this.initialData)
      this.saveCalculateIisDetailData(this.deposits)
      this.obligationIisData = JSON.parse(JSON.stringify(this.iisData))

      this.viewCharts(this.initialData)
    },

  })
</script>

<style scoped lang="sass">
    .mainBlock
      padding: 0 !important
    .calculator-iis__table
     &:before
      content: ''
      display: block
      position: absolute
      top: 0
      left: -200%
      width: 200%
      height: 100%
    #iisDataTable tbody
      position: relative
    .warnings
      color: rgba(204,51,0,.9)
    .f-right
      float: right
    .f-left
      float: left
    .t-right
      text-align: right
    .t-left
      text-align: left
    canvas
      cursor: pointer
    .calculator-iis
      max-width: 1175px
      margin: 0 auto
      margin-top: 25px
      #calc-iis
        max-width: 850px
        .detail_by_years
          margin-top: 10px
          display: flex
          align-items: center
          input
            display: none
          .checkbox__inner
            span
              position: static
              display: block
              &:before
                width: 20px
                height: 20px

          span.text
            text-decoration: underline
            color: #ace616
            margin-left: 10px
            cursor: pointer
          span.text:hover
            text-decoration: none
      .calc_iis__fields
        border-radius: 6px
        background: #204733
        margin-bottom: 40px
        padding: 20px 40px

      .calc_iis__link
        display: flex
        align-items: flex-start
        justify-content: space-between
        border-top: 2px solid #00a44c
        border-bottom: 2px solid #00a44c
        padding: 18px 0
        margin: 40px 0
        .big
          font-size: 22px
          font-weight: 500
        p
          margin: 0
        .description
          font-size: 20px
          font-weight: 300
          color: #545d4f
    .calc_iis__top
      //max-width: 700px
      max-width: 100%
    .line
      border-bottom: 1px solid #868686
      padding: 40px 0
      &:last-child
        border-bottom: none
      .line__inner
        position: relative
        padding-left: 70px
        padding-right: 180px
        .number
          position: absolute
          top: 0
          left: 0
          border: 1px solid #ace616
          border-radius: 50%
          width: 45px
          height: 45px
          line-height: 43px
          font-size: 20px
          font-weight: 600
          text-align: center
          color: #fff
        .text
          min-height: 45px
          line-height: 45px
          .text_inner
            display: inline-block
            margin: 0
            width: 100%
            line-height: 1.2
            vertical-align: middle
            font-size: 18px
            font-weight: 600
            color: #fff
            .iis_tooltip_tgl
              display: inline-block
              border-radius: 50%
              background: #ace616
              margin-left: 5px
              width: 20px
              height: 20px
              line-height: 20px
              text-align: center
              font-size: 12px
              font-weight: 700
              color: #fff
              cursor: pointer
              transition: all 0.3s
      input
        padding-top: 0
        text-align: center
        position: absolute
        top: -5px
        right: 0
        border-radius: 6px
        width: 140px
        height: 55px
        font-size: 20px
        font-weight: 700
        border: 1px solid #d7dce0
        border-radius: 2px
        padding-left: 20px
        padding-right: 20px
        color: #333
        -webkit-transition: border 0.3s, -webkit-box-shadow 0.3s
        -moz-transition: border 0.3s, -moz-box-shadow 0.3s
        transition: border 0.3s, box-shadow 0.3s
        &:disabled
          background-color: #b7b5b5
          cursor: not-allowed
    .chart_settings-iis2
      .chart_settings-iis2_wrapper
        display: flex
        flex-direction: row
        justify-content: space-between
        align-items: center
        div
          margin: 10px
          width: 33.333%
        input
          border: 1px solid #E2E2E2
          border-radius: 6px
          width: 110px
          height: 55px
          font-size: 22px
          font-weight: 700
          color: #000
        label
          font-size: 14px
          font-weight: 400
          color: #545d4f
          display: inline-block
          max-width: 100%
          margin-bottom: 5px
          margin-top: 15px
      input[type="text"]
        display: block
      .checkbox
        input
          & + label
            &:before
              top: 13px
              left: 5px
              line-height: 25px
              height: 25px
              width: 25px
              content: ''
              top: 2px
              left: 2px
            &:after
              border-color: #000
              top: 10px
              border-radius: 0
              width: 35px
              height: 35px
          &:checked
            & + label
              &:after
                border-color: #ffba00
                background: #ffba00
        input[type="checkbox"]
          position: absolute
      input
        padding-top: 0
    .chart_settings-iis2 .checkbox input:checked + label:before, .chart_settings-iis2 .radio input:checked + label:before
      opacity: 1
    .table
      padding: 25px 0
      border-bottom: 1px solid #eaeaea
      border-collapse: separate
      width: 100%
      thead
        th
          border-top: 1px solid #eaeaea
          border-bottom: 1px solid #eaeaea
          height: 50px
          font-size: 12px
          font-weight: 400
          padding: 5px 10px
          transition: all 0.3s
        tr
          th
            &:first-child
              text-align: left
      td
        padding: 5px 10px
        transition: all 0.3s
        border-top: 1px solid transparent
        border-bottom: 1px solid transparent
        height: 40px
        font-size: 14px
        font-weight: 400
      tbody
        td
          &:first-child
            position: relative
            border-left: 1px solid transparent
            max-width: 120px
        tr td:not(td:nth-child(1))
          text-align: center

    .arr_list
      margin: 0px 0 30px
      padding: 0
      li
        margin-bottom: 40px
        counter-reset: li
        display: inline-block
        padding-left: 0
        list-style: none
        margin-bottom: 40px
        padding-left: 75px
        &:before
          display: none
      .icon
        position: absolute
        top: 0
        left: 0
        border-radius: 50%
        background: #ace616
        width: 45px
        height: 45px
        line-height: 45px
        text-align: center
        display: inline-block
        font-family: 'icomoon' !important
        font-style: normal
        font-weight: normal
        font-variant: normal
        text-transform: none
        line-height: 1
        -webkit-font-smoothing: antialiased

    .iisDataTable
      position: relative

    .chartjs-render-monitor
      animation-duration: 0.001s
      animation-timing-function: ease
      animation-delay: 0s
      animation-iteration-count: 1
      animation-direction: normal
      animation-fill-mode: none
      animation-play-state: running
      animation-name: chartjs-render-animation

      @keyframes chartjs-render-animation
        0%
          opacity: .99
        100%
          opacity: 1

  // MMQ

  @media screen and (max-width: 768px)
    .line .line__inner
      padding-right: 0
    .line input
      position: relative
      width: 100%
      margin-top: 20px
    .calculator-iis .calc_iis__fields
      width: 100%
      max-width: 100%

  @media screen and (max-width: 575px)
    .calc_iis__link
      flex-direction: column
      a
        margin-top: 20px
        margin: 0 auto
        margin-top: 20px
    .calculator-iis .charts
      width: 100%
    .accordion__title
      font-size: 20px !important
    .line
      padding: 10px 0

    .line input
      height: 40px

    .line .line__inner .number
      width: 25px
      height: 25px
      line-height: 22px
      font-size: 15px

    .line .line__inner
      padding-left: 35px

    .calculator-iis .calc_iis__fields
      width: 100%

    .chart_settings-iis2_wrapper
      flex-wrap: wrap
      align-items: flex-start !important
      width: 100%
    .chart_settings-iis2 .chart_settings-iis2_wrapper label
      margin-top: 0
    .chart_settings-iis2 .chart_settings-iis2_wrapper div
      width: 48%
      margin: 0px
      margin-bottom: 10px

    .chart_settings-iis2 .chart_settings-iis2_wrapper div:last-child
      width: 100%

    .chart_settings-iis2 .checkbox__inner .text
      font-size: 14px

    .chart_settings-iis2 .chart_settings-iis2_wrapper input
      float: left
      margin-bottom: 5px
      height: 40px

  @media screen and (max-width: 475px)
    .calculator-iis .calc_iis__fields
      padding: 20px 20px
    .detail_by_years
      span.text
        font-size: 12px
    .checkbox__inner
      .dot
        width: 22px
        height: 22px
    .calculator-iis #calc-iis .detail_by_years .checkbox__inner span::before
      width: 14px
      height: 14px
      top: 4px
      left: 4px
  @media screen and (max-width: 400px)
    .response-scroll
      overflow: auto
    .table thead th, .table tbody td
      padding: 5px
      font-size: 12px
.wrapperTemplateWithRightSidebar
  display: flex
  flex-direction: row
  justify-content: space-between
  .rightSidebar
    display: flex
    flex-direction: column
    @media screen and (max-width: 800px)
      display: none
  .mainBlock
    display: flex
    flex-direction: column
    width: 75%
    padding: 10px 0
    @media screen and (max-width: 1100px)
      width: 65%
    @media screen and (max-width: 800px)
      width: 100%

  @media screen and (max-width: 600px)
    #calc
      padding: 0 15px
    .mainBlock
     h1
      padding: 0 15px
      font-size: 1.5em

  @media screen and (max-width: 430px)
    #iisDataTable
      width: 100%
      overflow-y: scroll
</style>
