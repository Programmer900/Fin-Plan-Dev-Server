<template>
  <div class="flexWrapperColumn __overlay">
    <div class="wrapperTemplateWithRightSidebar">
      <div class="mainBlock">
	      <h1 class="default-w-400">{{ title }}</h1>
        <div class="EventsCalendar__outer main_content_inner">
          <div class="relative">
            <div class="calculate_form">
              <div class="infinite_container green">

                <div class="events_datepicker_container">
                  <div class="col col-xs-12">
                    <p class="t16">Дата</p>
                  </div>
                  <div class="events_datepicker_container__fields">
                    <div class="">
                      <div class="form_element">
                        <PageRadarField
                          v-model:isActive="filters.date_cancel_first.isActive"
                          class="radarBonds__field"
                          :is-toggle="false"
                          :arrow-color="'#ffffff'"
                        >
                          <InputDatePicker
                            :end="filters.date_cancel_last.value"
                            :id-end="filters.date_cancel_last.id"
                            :id-start="filters.date_cancel_first.id"
                            :is-range="true"
                            view-mode="range-input"
                            @onChangeEnd="changeValue"
                            @onChangeStart="changeValue"
                          />
                        </PageRadarField>
                      </div>
                    </div>
                  </div>
                </div>


                <div class="calculate_line __events_keys">
                  <div class="">
                    <div class="form_element">
                      <label>Для портфеля: </label>
                      <Select :options="options" @onChange="onLoaderEvents"></Select>
                    </div>
                  </div>

                  <div class="">
                    <div class="form_element">
                      <Checkbox :options="optionsCheckbox" @onChange="onLoaderEvents"></Checkbox>
                    </div>
                  </div>
                </div>

                <div class="calculate_line fx-d-c">
                  <p class="calculate_step_title">Показывать события</p>
                  <div class="checkbox-row usual_checkboxes">

                    <!-- All Events Trigger -->
                    <div class="_col">
                      <div class="checkbox">
                        <label class="checkbox" for="checkbox_2">
                          <input
                            @click="onAllEventsChange"
                            type="checkbox"
                            class="allEventsCheckbox"
                            :checked="allEventsFlag"
                            name="eventTypeAll"
                            value="ALL"
                            id="checkbox_2"
                          >
                          <span class="checkbox__inner">
                            <span class="dot"></span>
                            <span class="text">Все события</span>
                          </span>
                        </label>
                      </div>
                    </div>
                    <!-- Other Events New Design -->
                    <div v-for="event in allEvents" class="_col">
                      <div class="checkbox">
                        <label class="checkbox" :for="event.id">
                          <input
                            type="checkbox"
                            v-model="eventType"
                            :name="event.name"
                            checked="checked"
                            :value="event.value"
                            :id="event.id"
                            @input="onLoaderEvents"
                          >
                          <span class="checkbox__inner">
                            <span class="dot"></span>
                            <span class="text">{{ event.name }}</span>
                          </span>
                        </label>
                      </div>
                    </div>

                  </div>

                </div>
              </div>
            </div>
          </div>
          <div v-if="allEventTrigger" class="EventsCalendar__element">
            <h3 class="EventsCalendar__date">События на 07.01.2022</h3>
            <table class="EventsCalendar__table">
              <thead>
              <tr>
                <th>Дивиденды по акциям США</th>
                <th>Текущая цена акции</th>
                <th>Дивиденды</th>
              </tr>
              </thead>
              <tbody>

              <tr>
                <td><a href="/lk/actions_usa/US00846U1016/" target="_blank">Agilent Technologies, Inc.</a></td>
                <td>
                  <p class="label">Текущая цена акции</p>
                  <p class="value">159.65&nbsp;$</p>
                </td>
                <td>
                  <p class="label">Дивиденды</p>
                  <p class="value">0.21$ (15.6 руб.) (0.13&nbsp;%)</p>
                </td>
              </tr>                                                    									                                <tr>
                <td><a href="/lk/actions_usa/US2566771059/" target="_blank">Dollar General Corporation</a></td>
                <td>
                  <p class="label">Текущая цена акции</p>
                  <p class="value">235.83&nbsp;$</p>
                </td>
                <td>
                  <p class="label">Дивиденды</p>
                  <p class="value">0.42$ (31.2 руб.) (0.18&nbsp;%)</p>
                </td>
              </tr>                                                    									                                <tr>
                <td><a href="/lk/actions_usa/US74762E1029/" target="_blank">Quanta Services, Inc.</a></td>
                <td>
                  <p class="label">Текущая цена акции</p>
                  <p class="value">114.66&nbsp;$</p>
                </td>
                <td>
                  <p class="label">Дивиденды</p>
                  <p class="value">0.07$ (5.2 руб.) (0.06&nbsp;%)</p>
                </td>
              </tr>                                                    									                                <tr>
                <td><a href="/lk/actions_usa/US7547301090/" target="_blank">Raymond James Financial, Inc.</a></td>
                <td>
                  <p class="label">Текущая цена акции</p>
                  <p class="value">100.4&nbsp;$</p>
                </td>
                <td>
                  <p class="label">Дивиденды</p>
                  <p class="value">0.34$ (25.26 руб.) (0.34&nbsp;%)</p>
                </td>
              </tr>                                                    									                                <tr>
                <td><a href="/lk/actions_usa/US1699051066/" target="_blank">Choice Hotels International, Inc</a></td>
                <td>
                  <p class="label">Текущая цена акции</p>
                  <p class="value">155.99&nbsp;$</p>
                </td>
                <td>
                  <p class="label">Дивиденды</p>
                  <p class="value">0.2375$ (0.15&nbsp;%)</p>
                </td>
              </tr>                                                    									                                <tr>
                <td><a href="/lk/actions_usa/US2963151046/" target="_blank">ESCO Technologies Inc.</a></td>
                <td>
                  <p class="label">Текущая цена акции</p>
                  <p class="value">89.99&nbsp;$</p>
                </td>
                <td>
                  <p class="label">Дивиденды</p>
                  <p class="value">0.08$ (5.94 руб.) (0.09&nbsp;%)</p>
                </td>
              </tr>                                                    									                                <tr>
                <td><a href="/lk/actions_usa/US42225P5017/" target="_blank">Healthcare Trust of America, Inc</a></td>
                <td>
                  <p class="label">Текущая цена акции</p>
                  <p class="value">33.39&nbsp;$</p>
                </td>
                <td>
                  <p class="label">Дивиденды</p>
                  <p class="value">0.325$ (24.15 руб.) (0.97&nbsp;%)</p>
                </td>
              </tr>
              </tbody>
            </table>
          </div>

          <Table v-if="allEventTrigger" :dataTable="dataTable"></Table>

          <div class="EventsCalendar__element" v-else>
            <h3 class="EventsCalendar__date">За выбранный период дат нет ни одного события.</h3>
            <h3 class="EventsCalendar__date">Выберите одно или несколько событий для показа в календаре.</h3>
          </div>
        </div>
        <!--<div class="condition-block center-text">
        <span
          @click="showModal"
          data-toggle="modal"
          data-target="#legal_popup"
        >Условия использования информации, размещённой на данном сайте</span>
        </div>-->
      </div>
      <div class="rightSidebar" style="margin-top: 80px;">
        <UtilsColumn></UtilsColumn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
	import {
		defineComponent, ref
	} from 'vue';

  import { radarStore } from '@/store/pinia/radar';
  import UtilsColumn from '@/views/SecurityList/modules/UtilsColumn/index.vue';

  import Select from '@/components/Blocks/SelectCustom/Select.vue';
  import Checkbox from '@/components/Blocks/CheckboxCustom/Checkbox.vue';
  import Loader from '@/components/Blocks/Loader/Loader.vue';
  //import Loader2 from '@/components/Loader/index.vue';

  import Table from '@/components/ui/Table/Table.vue';
  import PageRadarField from '@/views/Radar/modules/Field/index.vue';
  import InputDatePicker from '@/components/Inputs/DatePicker/index.vue';

	import { useRoute } from 'vue-router';
	import { useStore } from 'vuex';

	export default defineComponent({
		name: 'CalendarInvest',
    components: { Select, Checkbox, Loader, Table, PageRadarField, InputDatePicker, UtilsColumn },

    setup() {
      const radar = radarStore();
      const title = ref('Календарь инвестора')


		  return {
        title,
        filters: radar.filters.bonds,
      }
    },





    data() {
      return {
        selectedDateStart: new Date(),
        selectedDateEnd: new Date(),
        allEventsFlag: false,
        masks: {
          input: 'YYYY-MM-DD',
        },
        options: ['По всем', 'Не учитывать'],
        optionsCheckbox: {
          label: 'Учитывать избранноe',
        },
        allEvents: [
          { name: 'Дивиденды по акциям РФ', value: 'DIVIDENDS', id: 'checkbox_3' },
          { name: 'Дивиденды по акциям США', value: 'DIVIDENDS_USA', id: 'checkbox_4' },
          { name: 'Оферта по облигациям', value: 'OFERTA', id: 'checkbox_5' },
          { name: 'Гашения по облигациям', value: 'CANCELLATION', id: 'checkbox_6' },
          { name: 'Купоны по облигациям', value: 'COUPONS', id: 'checkbox_7' },
          { name: 'Отчетность (компании РФ)', value: 'REPORT_RUS', id: 'checkbox_8' },
          { name: 'Отчетность (компании США)', value: 'REPORT_USA', id: 'checkbox_9' },
          { name: 'Важные события', value: 'IMPORTANT', id: 'checkbox_10' },
          { name: 'Совет директоров', value: 'SOVIET', id: 'checkbox_11' },
          { name: 'ГОСА/ВОСА', value: 'GOSA', id: 'checkbox_12' },
          { name: 'Вебинары', value: 'WEBINAR', id: 'checkbox_13' },
        ],
        eventTypeAll: [],
        eventType: [],
        range: {
          start: new Date(2021, 12, 22),
          end: new Date(2022, 0, 18)
        },
        dataTable: {
          type: 'invest',
          title: 'События на 12.01.2022',
          head: ['Дивиденды по акциям США', 'Текущая цена акции', 'Дивиденды'],
          rows: [
            { type: 'link', name: 'Agilent Technologies, Inc.', url: '/lk/actions_usa/US00846U1016/', price: '159.65 $', div: '0.21$ (15.6 руб.) (0.13 %)' },
            { type: 'text', name: 'Dollar General Corporation', url: '/lk/actions_usa/US2566771059/', price: '235.83 $', div: '0.42$ (31.2 руб.) (0.18 %)' },
          ]
        },
        loader: false,
      }
    },
    methods: {
      changeValue(filterName, filterValue, options = {}) {
        // radar.changeFilterValue(filterName, filterValue, options)
        console.log('changeValue')
      },
      onAllEventsChange() {
        //Loader
        this.loader = true
        /*setTimeout(() => {
          this.loader = false
        }, 900)*/
        setTimeout(() => {
          this.eventType = []
          this.allEventsFlag = !this.allEventsFlag

          if(this.allEventsFlag) {
            this.allEvents.map((item) => {
              this.eventType.push(item.value)
            })
          } else {
            this.eventType = []
          }
        }, 1000)
        //End Loader
      },
      onLoaderEvents() {
        this.loader = true
        setTimeout(() => {
          this.loader = false
        }, 2000)
      },
      ...mapMutations({
        //showModal: 'modal/showModal'
      })
    },
    computed: {
      allEventTrigger() {
        return this.eventType.length
      }
    },
    watch: {
      'allEvents': {
        handler(val){

        },
        deep: true
      }
    }
	})
</script>

<style lang="sass">
  .mainBlock
    padding: 0 !important
  .infinite_container
    position: relative
    background: #282828
    padding: 40px 0
    color: white
    background: #2a8634
    &.green:after
      background: #2a8634
      content: ''
      display: block
      position: absolute
      top: 0
      left: -200%
      z-index: 5
      width: 200%
      height: 100%

  .events_datepicker_container__fields
    display: flex
    > div
      width: 100%
      margin-right: 15px
      input
        width: 100%
        position: relative
        border: 1px solid #d7dce0
        border-radius: 2px
        padding-left: 20px
        padding-right: 20px
        width: 100%
        padding-top: 0
        font-size: 20px
        color: #333333
        -webkit-transition: border 0.3s, -webkit-box-shadow 0.3s
        -moz-transition: border 0.3s, -moz-box-shadow 0.3s
        transition: border 0.3s, box-shadow 0.3s
  .vc-weeks
    .vc-weekday
      color: #2a8634
  .vc-title
    &:hover
      /*background: #ffba00*/
      color: #2a8634 !important
      /*padding: 0 10px*/
      opacity: 1
  /*border-radius: 5px*/
  .vc-arrows-container
    .vc-arrow
      color: #2a8634
      &:hover
        background: #ffba00

  .calculate_line.__events_keys
    display: flex
    justify-content: space-between
    margin: 25px 0
    .select
      display: inline-block
    > div
      width: 50%
      margin-right: 15px
    label
      display: inline-block
      margin: 0 10px 0 0
      line-height: 20px
      font-size: 18px
      font-weight: 400
      color: white


  .checkbox-row.usual_checkboxes
    display: flex
    flex-wrap: wrap
    align-items: stretch
    align-content: stretch
    justify-content: space-between
    ._col
      .checkbox__inner
        z-index: 5
      width: 30%
      margin-bottom: 10px
      .text
        font-size: 14px
      .dot:before
        background: #ffba00
  .EventsCalendar__element
    .EventsCalendar__date
      margin-bottom: 40px
      color: #008940
      font-size: 22px
      font-weight: 300
    .EventsCalendar__table
      width: 100%
      border-collapse: separate
      margin-bottom: 40px
      tbody td:last-child
        border-right: 1px solid transparent
        width: 33.333333%
      tbody tr:hover td:first-child
        border-left-color: #ffba00
      //font-size: 16px
      tbody tr:hover td:last-child
        border-right-color: #ffba00
      tbody tr:hover td
        border-top-color: #ffba00
        border-bottom-color: #ffba00
        background: #fff
      tbody td:first-child
        border-left: 1px solid transparent
        width: 33.333333%
      tbody td:first-child a
        font-weight: 300
        color: #008940
      td
        border: 1px solid transparent
        border-left: none
        border-right: none
        padding: 10px 15px 10px 5px
        vertical-align: top
        font-size: 14px
        color: #333
        transition: .3s
        a
          text-decoration: none
          font-size: 15px
          &:hover
            text-decoration: underline
        p
          line-height: 1.3
          font-size: 16px
          color: #383838
      thead th
        border-bottom: 1px solid #dededf
        padding-left: 5px
        padding-right: 15px
        padding-bottom: 10px
        vertical-align: top
        font-size: 14px
        font-weight: 700
        color: #333
        text-align: left
      .label
        display: none
        margin: 0
        padding: 0
        font-size: 11px
        font-weight: 700
        text-align: left
        color: #8c8c8c
      .value
        margin: 0
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
  .checkbox input, .radio input
    position: relative
    top: 0
    z-index: 5
    opacity: 0
    width: 0px
    height: 0px

  .checkbox__inner
    .text
      display: inline-flex
      align-items: center
      padding-left: 40px
      min-height: 32px
      font-size: 16px
  @media (min-width: 1000px)
    .date-picker--range-input
      span
        margin: auto 10px !important
  @media (max-width: 1040px)
    .flexWrapperColumn.__overlay
      padding-right: 0
  @media (max-width: 1000px)
    .calculate_form
      padding-left: 15px
      .date-picker--range-input
        span
          text-align: center
          transform: rotate(90deg) !important
  @media (max-width: 800px)
    .flexWrapperColumn.__overlay
      padding: 0
      /* padding: 35px 100px; */
</style>
