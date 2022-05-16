<template>
  <div>
    <div v-if="dataTable.type === 'invest'" class="EventsCalendar__element">
      <h3 class="EventsCalendar__date">{{ dataTable.title }}</h3>
      <table class="EventsCalendar__table">
        <thead>
        <tr>
          <th v-for="head in dataTable.head">{{ head }}</th>
        </tr>
        </thead>
        <tbody>
          <tr v-for="row in dataTable.rows">
            <td><a :href="row.url" target="_blank">{{ row.name }}</a></td>
            <td>
              <p class="label">Текущая цена акции</p>
              <p class="value">{{ row.price }}</p>
            </td>
            <td>
              <p class="label">Дивиденды</p>
              <p class="value">{{ row.div }}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="dataTable.type === 'ratings'" class="EventsCalendar__element">
      <h3 class="EventsCalendar__date">{{ dataTable.title }}</h3>
      <table class="EventsCalendar__table">
        <thead>
        <tr>
          <th v-for="head in dataTable.head">{{ head }}</th>
        </tr>
        </thead>
        <tbody>
          <tr v-for="row in dataTable.rows">
            <td><nuxt-link :to="row.url" target="_blank">{{ row.name }}</nuxt-link></td>
            <td>
              <p class="value">{{ row.height }}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="dataTable.type === 'ipo'" class="EventsCalendar__element__ipo">
    <table class="EventsCalendar__table">
      <thead>
        <tr>
          <th v-for="head in dataTable.head">{{ head }}</th>
        </tr>
      </thead>
      <tbody>
      <tr v-for="(row, idx) in dataTable.rows" :key="idx" class="parent-tr" :class="idx !== 0 ? 'closest' : ''">
        <td :data-label="dataTable.head[0]" @click="showList">{{ row.company }}
          <!--<span
            class="smartNav__next smartNav__btn icon icon-arr_simple_down"
            v-tooltip="{
                content: contentTooltip,
                trigger: 'hover focus click',
                delay: { show: 100, hide: 200 },
            }"
          ></span>-->
        </td>
        <td :data-label="dataTable.head[1]">{{ row.broker }}</td>
        <td :data-label="dataTable.head[2]">{{ row.underwriter }}</td>
        <td :data-label="dataTable.head[3]">{{ row.market }}</td>
        <td :data-label="dataTable.head[4]">{{ row.price }}</td>
        <td :data-label="dataTable.head[5]">{{ row.pe }}</td>
        <td :data-label="dataTable.head[6]">{{ row.volume }}</td>
        <td :data-label="dataTable.head[7]">{{ row.date }}</td>
      </tr>
      </tbody>
    </table>
  </div>
  </div>
</template>

<script>
  /*import Vue from 'vue'
  import { VTooltip } from 'v-tooltip'
  Vue.directive('tooltip', VTooltip)*/

  export default {
    name: "Table",
    props: {
      dataTable: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        isVisibleActive: false,
        contentTooltip: 'Смотреть подробнее...'
      }
    },
    methods: {
      showList($event, idx) {
        this.isVisibleActive = !this.isVisibleActive

        if($event.target.closest('.parent-tr').classList.contains('closest')) {
          $event.target.closest('.parent-tr').classList.remove('closest')
        } else {
          $event.target.closest('.parent-tr').classList.add('closest')
        }
      },
    },
    computed: {},
  }
</script>

<style scoped lang="sass">
  .EventsCalendar__element__ipo
    .icon
      display: none
  @media (max-width: 480px)
    .EventsCalendar__element__ipo table tr td:before
      overflow: hidden
  @media (max-width: 650px)
    .EventsCalendar__element__ipo
      tr
        margin-bottom: 0px
        transition: all 0.3s cubic-bezier(.25,.8,.5,1)
        .icon
          font-size: 7px
          display: inline-flex
          color: #008940
          justify-content: center
          align-items: center
          border-radius: 50%
          border: none
          padding: 0
          width: 25px
          height: 25px
          cursor: pointer
          transition: .3s
        td
          opacity: 1
          display: block
          transition: all 0.3s cubic-bezier(.25,.8,.5,1)
          display: flex
          justify-content: space-between
          align-items: center
        &.closest
          .icon
            transform: rotate(180deg)
          td:not(td:first-child)
            opacity: 0
            display: none
</style>
