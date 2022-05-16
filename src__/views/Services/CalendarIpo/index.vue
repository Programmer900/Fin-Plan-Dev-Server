<template>

  <div class="flexWrapperColumn __overlay">
    <div class="wrapperTemplateWithRightSidebar">
      <div class="mainBlock">
        <h1 class="default-w-400">{{ title }}</h1>
        <div class="main_content">
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
                </div>
              </div>
            </div>
            <br>
            <br>
            <div class="EventsCalendar__element">
              <Table :dataTable="dataTable"></Table>
            </div>
            <div class="EventsCalendar__element" >
              <h3 class="EventsCalendar__date">За выбранный период дат нет ни одного события.</h3>
              <h3 class="EventsCalendar__date">Выберите одно или несколько событий для показа в календаре.</h3>
            </div>
          </div>

          <div class="condition-block center-text">
            <!--<span
              @click="showModal"
              data-toggle="modal"
              data-target="#legal_popup"
            >Условия использования информации, размещённой на данном сайте</span>-->
          </div>

        </div>
      </div>
      <div class="rightSidebar" style="margin-top: 80px;">
        <UtilsColumn></UtilsColumn>
      </div>
    </div>
  </div>

</template>

<script lang="ts">
	import {
		defineComponent, ref,
    onMounted, onServerPrefetch, onUnmounted, reactive, watch
	} from 'vue';

  import UtilsColumn from '@/views/SecurityList/modules/UtilsColumn/index.vue';
  import PageRadarField from '@/views/Radar/modules/Field/index.vue';
  import InputDatePicker from '@/components/Inputs/DatePicker/index.vue';
  import Table from '@/components/ui/Table/Table.vue';
  import Loader from '@/components/Loader/index.vue';

  import { radarStore } from '@/store/pinia/radar';

	export default defineComponent({
		name: 'CalendarIpo',
    components: { UtilsColumn, PageRadarField, InputDatePicker, Loader, Table },
    data() {
		  return {
		    dataTable: {
          type: 'invest',
          title: 'События на 12.01.2022',
          head: ['Дивиденды по акциям США', 'Текущая цена акции', 'Дивиденды'],
          rows: [
            { type: 'link', name: 'Agilent Technologies, Inc.', url: '/lk/actions_usa/US00846U1016/', price: '159.65 $', div: '0.21$ (15.6 руб.) (0.13 %)' },
            { type: 'text', name: 'Dollar General Corporation', url: '/lk/actions_usa/US2566771059/', price: '235.83 $', div: '0.42$ (31.2 руб.) (0.18 %)' },
          ]
        }
      }
    },
    setup() {
      const radar = radarStore()
      const pageTitle = ref('Календарь IPO')

      const changeValue = (filterName, filterValue, options = {}) => {
        //radar.changeFilterValue(filterName, filterValue, options)
        console.log('changeValue')
      }

      return {
        title: pageTitle,
        filters: radar.filters.bonds,
        changeValue
      }
    },
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
</style>
