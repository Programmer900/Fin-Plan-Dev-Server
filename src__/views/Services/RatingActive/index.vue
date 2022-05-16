<template>
  <div class="flexWrapperColumn __overlay">
    <div class="wrapperTemplateWithRightSidebar">
      <div class="mainBlock">
        <h1 class="default-w-400">{{ title }}</h1>
        <div class="relative">
          <div class="calculate_form">
            <div class="infinite_container green">

              <div class="events_datepicker_container">
                <div class="col col-xs-12">

                  <!-- Added a fields -->

                </div>
                <div class="events_datepicker_container__fields fxw-w fx-d-r">

                  <div class="form_element">
                    <div class="form_element __inline">
                      <label>Вид рейтинга: </label>
                      <SelectClick
                        :options="options"
                        :tooltipType="'warning'"
                        @onChange="onLoaderEvents"
                        @shouldShowTitle="showTitle"
                      ></SelectClick>
                    </div>
                  </div>
                  <div class="form_element">
                    <div class="form_element __inline">
                      <label>Период: </label>
                      <Select :options="options2" @onChange="onLoaderEvents"></Select>
                    </div>
                  </div>
                  <div class="form_element">
                    <div class="form_element __inline">
                      <label>Выводить по: </label>
                      <Select :options="options3" @onChange="onLoaderEvents"></Select>
                    </div>
                  </div>
                  <div class="form_element">
                    <div class="form_element __inline">
                      <label>Отрасль: </label>
                      <Select :options="options4" @onChange="onLoaderEvents"></Select>
                    </div>
                  </div>

                  <div class="">
                    <div class="form_element">

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br>
        <br>
        <div v-if="show" class="EventsCalendar__element">
          <Table :dataTable="dataTable"></Table>
        </div>
        <div v-else class="EventsCalendar__element" >
          <h3 class="EventsCalendar__date">За выбранный период дат нет ни одного события.</h3>
          <h3 class="EventsCalendar__date">Выберите одно или несколько событий для показа в календаре.</h3>
        </div>
      </div>
      <div class="rightSidebar" style="margin-top: 80px;">
        <UtilsColumn></UtilsColumn>
      </div>
    </div>
  </div>


  <div class="flexWrapperColumn">
    <h1 class="default-w-400">Рейтинг акций</h1>
  </div>
</template>

<script lang="ts">
  import {
    defineComponent, onMounted, onServerPrefetch, onUnmounted, ref, watch,
  } from 'vue';

  import Select from '@/components/Blocks/SelectCustom/Select.vue'
  import SelectClick from '@/components/Blocks/SelectClick/Select.vue'
  import Table from '@/components/ui/Table/Table.vue'
  import UtilsColumn from '@/views/SecurityList/modules/UtilsColumn/index.vue';

  import { useRoute } from 'vue-router';
  import { useStore } from 'vuex';
  import Loader from '@/components/Loader/index.vue';

  export default defineComponent({
    name: 'RatingActive',
    components: { UtilsColumn, Loader, Table, SelectClick, Select },
    data() {
      return {
        title: 'Рейтинг акций 2022',
        show: false,
        options: ['Лидеры роста РФ', 'Лидеры роста ETF', 'Лидеры роста США', 'Лидеры падения РФ', 'Лидеры падения ETF'],
        options2: ['за день', 'за месяц', 'за год', 'за три года'],
        options3: ['20', '50', '100', '200', '500', '1000', '2000'],
        options4: ['Все', 'Финансовый сектор', 'Транспортный сектор', 'Горнодобывающий сектор', '...'],

        dataTable: {
          title: '',
          type: 'ratings',
          head: ['Aктив', 'Рост'],
          rows: [
            {
              name: 'iQIWI',
              url: '/ratings',
              height: '+0.9%',
            },
            {
              name: 'ЦМТ ао',
              url: '/ratings',
              height: '+0.2%',
            },
            {
              name: 'ЦМТ ап',
              url: '/ratings',
              height: '-0.45%',
            },
          ]
        },
        loader: false,
      }
    },
    methods: {
      showTitle(t) {
        this.dataTable.title = t
      },
      onLoaderEvents(title) {
        this.loader = true

        setTimeout(() => {
          this.show = true
          this.loader = false
        }, 2000)
      },
      ...mapMutations({
        showModal: 'modal/showModal'
      })
    },
  })
</script>

<style scoped lang="sass">
  .calculate_line, .events_datepicker_container__fields
    display: flex
    flex-wrap: wrap
    flex-direction: row
    .form_element
      margin: 10px 0
      width: 50%
      &.__inline
        display: inline-block
        width: 100%
        label
          margin-right: 5px
        label, > div
          display: inline-block
</style>

