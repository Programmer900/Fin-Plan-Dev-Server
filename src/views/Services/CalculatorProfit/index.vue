<template>
  <div class="flexWrapperColumn">
    <div class="wrapperTemplateWithRightSidebar">
      <div class="mainBlock">
        <Banner :info="bannerInfo"></Banner>
        <div id="calc">
          <div class="calculator-iis">
            <div class="">

              <div id="calc-iis">
                <div class="calc_iis__top">
                  <h1 class="calc_iis__title">Онлайн калькулятор доходности</h1>
                  <p class="description">Данный калькулятор доходности покажет Вам чего можно добиться с помощью инвестирования.</p>
                  <p class="t14">Вы можете ввести размер стартового капитала, а также размер ежемесячных пополнений, чтобы моментально смоделировать как будут расти Ваши накопления с учетом той или иной ставки доходности. Данное моделирование поможет Вам понять, что стоимость денег сегодня и завтра совсем разная. Что сэкономленный в день 100 рублей при грамотном инвестировании и сбережении средств через несколько лет могут превратиться в солидный счет. Понимание данного процесса поможет Вам поставить яркие финансовые цели и начать действовать.</p>
                </div>

                <div class="calculator-iis__form" style="display: flex; flex-display: row;">

                  <!-- Main settings -->
                  <div class="calc_iis__fields">
                    <div class="line">
                      <div class="line__inner">
                        <span class="number">1</span>
                        <div class="text">
                          <p class="text_inner">
                            Введите размер стартового капитала
                            <span
                              class="iis_tooltip_tgl"
                              title="Это стартовая сумма Ваших инвестиций, она также может быть равна 0, если у Вас еще нет накоплений."
                            >?</span>
                          </p>
                        </div>

                        <input
                          @keypress="isNumber($event)"
                          @keyup="isNumber($event)"
                          id="input_yield_start"
                          type="text"
                          v-model.number="initialData.startDeposit"
                        >
                      </div>
                    </div>
                    <div class="line">
                      <div class="line__inner">
                        <span class="number">2</span>
                        <div class="text">
                          <p class="text_inner">Ежемесячное пополнение счета
                            <span
                              title="Это сумма ежемесячного пополнения Ваших инвестиций, она также может быть равна 0, если Вы не планируете пополнять свой счет."
                              class="iis_tooltip_tgl"
                            >?</span>
                          </p>
                        </div>

                        <input @keypress="isNumber($event)"
                               @keyup="isNumber($event)"
                               id="input_refill"
                               type="text"
                               v-model.number="initialData.depositMonth"
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
                              title="При вводе ставки доходности следует ориентироваться на то, что чем выше доходность – тем выше риски. Безрисковой ставкой доходности на сегодняшний день можно считать доходность облигаций федерального займа на уровне 8%, 15% - может дать защищенный инвестиционный портфель из акций и облигаций. Более высокий уровень доходности конечно возможен, но риски такого инвестиционного портфеля будут уже более высоки, а стабильность доходности ниже."
                            >?</span></p>
                        </div>

                        <input
                          @keypress="isNumber($event)"
                          @keyup="isNumber($event)"
                          id="input_yield_rate"
                          type="text"
                          v-model="initialData.investRateInput"
                        >
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Info investors -->
                <info :period="initialData.period" :max="maxProfit"></info>

                <!-- Line charts -->
                <div v-if="initialData.period != 0" class="charts" ref="chart">

                <!-- Line charts -->
                  <div class="charts" ref="chart">

                    <charts
                      :options="{
                        chart: {
                          type: 'line',
                          zoomType: 'xy',
                          backgroundColor: 'transparent',
                          spacingLeft: 0,
                          spacingRight: 0,

                          padding: 0,

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
                          },
                          series: {
                            groupPadding: 0
                          }
                        },
                        title: {
                          text: 'Калькулятор доходности',
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
                            tickmarkPlacement: 'between',
                            title: {
                              enabled: true
                            },

                          },
                           yAxis: {
                            tickmarkPlacement: 'between',
                            title: {
                              text: '',
                            },
                            minPadding: 0,
                            maxPadding: 0,
                          },
                        }"
                      :animateOnUpdate="true"
                    />
                  </div>

                </div>

                <!-- Additional Settings -->
                <Accordion>
                  <template v-slot:title>
                    Дополнительные настройки
                  </template>
                  <template v-slot:content>
                    <div class="chart_settings-iis2" style="display: block; opacity: 1;">
                      <div class="chart_settings-iis2_wrapper">
                        <div class="">
                          <input
                            @keypress="isNumber($event)"
                            @keyup="isNumber($event)"
                            v-model.number="initialData.period"
                            type="text"
                            id="input_yield_period"
                          >
                          <label><span>Период на графике (лет)</span></label>
                        </div>

                        <div>
                          <label class="checkbox">
                            <input
                              type="checkbox"
                              v-model.number="initialData.iisTypeA"
                              id="iis_type_a"
                              :checked="true"
                              :disabled="initialData.period == 0"
                            >
                            <span class="checkbox__inner">
                          <span class="dot"></span>
                          <span class="text">Учитывать ИИС типа А в расчетах</span>
                      </span>
                          </label>

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
                <p class="t20">Чтобы узнать, во что инвестировать, чтобы реализовать данный финансовый план, приглашаем Вас на вебинар "Финансовый план: от задумки до реализации":</p>

                <Accordion>
                  <template v-slot:title>Данные по периодам (на конец периода)</template>
                  <template v-slot:content>
                    <table v-if="table.headers && initialData.period != 0" id="iisDataTable" class="table" style="display: table; width: 100%;">
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
                    <p v-else class="warnings">Пожалуйста, выберите временной период, для успешного расчета!</p>
                  </template>
                </Accordion>

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
  </div>
</template>

<script>
  import { defineComponent } from 'vue'
  import Info from '@/components/calculatorIis/Info/index.vue'
  import Accordion from '@/components/ui/Accordion/index.vue'
  import Banner from '@/components/Blocks/Banner/Banner.vue'
  import UtilsColumn from '@/views/SecurityList/modules/UtilsColumn/index.vue'
  import Charts from './modules/Charts/index.vue'

  export default defineComponent({
    name: "CalculatorProfit",
    components: {
      'info': Info,
      Accordion,
      Banner,
      UtilsColumn,
      'charts': Charts
    },
    data() {
      return {
        language: "",
        bannerInfo: {
          text: `Инвестиции: от А до Я`,
          img: '6da0621991e87df6cc00d6a2d453c47d.jpg',
          shadow: true,
          size: 'cover',
          buttonText: 'Записаться',
          buttonUrl: '/'
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
        initialData: {
          startDeposit: 10000, // Старт депо
          depositMonth: 1000, // Пополнение в течении месяца
          investRateInput: 15, // % доходности
          period: 25, // период для графика
          yieldTaxes: 13, // Ставка на прибыль(доход)
          iisTypeA: true // flag on / off from Iis
        },
        dataCollection: {},
        maxIisReturn: 52000,
        iisMultiplier: 0.13,
        maxProfit: 0,


        initial_arr: [],
        iss_arr: [],
        values_arr: [],
        labels_arr: [],
      }
    },
    methods: {
      isNumber (evt) {
        console.log(evt)
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

      // рисуем график
      viewCharts(data) {
        let {depositMonth, iisTypeA, investRateInput, period, startDeposit, yieldTaxes} = data

        // local variables
        depositMonth = Number(depositMonth)
        investRateInput = Number(investRateInput)
        period = Number(period)
        startDeposit = Number(startDeposit)
        yieldTaxes = Number(yieldTaxes) / 100

        let deposits = new Array(period)
        deposits.fill(this.depositYear)
        deposits[0] = startDeposit

        let mainData = [],
          chart_arr =[]

        let issSum = 0,
          yieldSum = 0

        for(var i = 0; i <= period; i++) {

          mainData[i] = {};

          if (i === 0) {
            mainData[i] = {
              savingAmount: startDeposit,
              initialCapital: startDeposit,
              iisCapital: startDeposit,
              replFromIis: 0,
              yearYield: 0,
            };

            chart_arr.push([
              i,
              mainData[i].savingAmount,
              mainData[i].initialCapital,
              mainData[i].iisCapital,
            ]);

            continue;
          }

          let currentYear = mainData[i] // Текущий год
          let previousYear = mainData[i-1] // Предыдущий год
          let nextYearDeposit = (i >= period) ? 0 : deposits[i]
          // Если счетчик больше или равен последнему году периода то выставляем 0

          currentYear.deposit = deposits[i-1]
          currentYear.initialCapital = previousYear.initialCapital + nextYearDeposit
          currentYear.replFromIis = 0

          if(iisTypeA) {
            let iisReturn = previousYear.deposit * this.iisMultiplier // Высчитываем депозить с прошлого года для IIS

            if(i === 2) {
              iisReturn = previousYear.deposit ? previousYear.deposit * this.iisMultiplier : previousYear.savingAmount * this.iisMultiplier
            }

            // пополнение от ИИС
            currentYear.replFromIis = (iisReturn > this.maxIisReturn) ? this.maxIisReturn : iisReturn

            if(i < 2) {
              currentYear.replFromIis = 0
            }

            if ((i > 2) && previousYear.deposit === 0) {
              currentYear.replFromIis = 0
            }
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
            mainData[i].initialCapital,
            mainData[i].iisCapital,
          ]);

        }

        this.chartReview(chart_arr, i) // view chart
        this.viewTable(mainData) // view table
      },

      // f() rerender
      chartReview(arr, y) {

        let labels_arr = [], values_arr = [], initial_arr = [], iss_arr = [], val_max = 0;

        this.values_arr = []
        this.initial_arr = []
        this.iss_arr = []

        for (let i = 0; i < arr.length; i++) {
          // создаем массивы для меток и для значений
          labels_arr.push('Год ' + arr[i][0])
          this.labels_arr.push('Год ' + arr[i][0])


          //values_arr.push(arr[i][1].toFixed(2))
          this.values_arr.push(+arr[i][1].toFixed(2))
          //initial_arr.push(arr[i][2].toFixed(2))
          this.initial_arr.push(+arr[i][2].toFixed(2))
          //iss_arr.push(arr[i][3].toFixed(2))
          this.iss_arr.push(+arr[i][3].toFixed(2))

          // определяем максимальное значение
          if (arr[i][1] > val_max) {
            val_max = arr[i][1]
          }
        }

        let val_max_output = (val_max / 1000).toFixed(0)
        val_max_output = parseInt(val_max_output).toLocaleString()
        this.maxProfit = val_max_output

        this.dataCollection = {
          labels: labels_arr,
          datasets: [
            {
              label: 'Первоначальный капитал',
              backgroundColor: 'rgba(238,114,128,0.8)',
              borderColor: 'rgba(226,53,71,0.8)',
              borderWidth: 2,
              data: this.initial_arr
            }, {
              label: 'С ИИС',
              backgroundColor: 'rgba(68,128,238,0.8)',
              borderColor: 'rgb(37,60,139)',
              borderWidth: 2,
              data: this.iss_arr
            }, {
              label: 'С %',
              backgroundColor: 'rgb(238, 211, 36, 0.8)',
              borderColor: 'rgb(5, 149, 72)',
              borderWidth: 2,
              data: this.values_arr
            }
          ],
        }
      }
    },
    watch: {
      initialData: {
        handler(data) {
          this.viewCharts(data)
        },
        deep: true
      }
    },
    computed: {
      depositYear() {
        return this.initialData.depositMonth * 12 // Общая сумма пополнение в течении года
      },
      investRate() {
        return parseFloat(this.initialData.investRateInput) / 100 // Ставка доходности в %
      }
    },
    mounted() {
      this.viewCharts(this.initialData)
    },
  })
</script>

<style scoped lang="sass">
  .mainBlock
    padding: 0 !important
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
    max-width: 1200px
    margin: 0 auto
    margin-top: 25px
    #calc-iis
      max-width: 900px
    .calc_iis__fields
      border-radius: 6px
      background: #204733
      margin-bottom: 40px
      padding: 20px 40px
    .charts
      max-width: 700px
      margin-bottom: 20px
  .calc_iis__top
    max-width: 700px
    .description
      font-size: 20px
      font-weight: 300
      color: #545d4f
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
        position: relative
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
  .checkbox input,
  .radio input
    position: absolute
    top: 0
    z-index: 5
    opacity: 0
    width: 5px
    height: 5px
  .checkbox__inner .text, .radio__inner .text
    display: inline-flex
    align-items: center
    padding-left: 40px
    min-height: 32px
    font-size: 16px
  @media screen and (max-width: 600px)
    #calc
      padding: 0 15px
</style>
