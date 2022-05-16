<template>
  <div class="greyBg">
    <div v-if="bonds" class="flexWrapperColumn">
      <div v-for="bond in bonds" :key="bond.NAME" class="wrapper">
        <router-link
          exact
          :to="{
            name: 'DocumentInfo',
            params: {
              locale: route.params.locale,
              type: 'bond',
              id: bond.CODE,
              company: bond.NAME,
            },
          }"
          class="bond tableValue flexRowBetween"
        >
          <div class="bond tableValue flexRowBetween">
            <p>{{ bond.NAME }}</p>
            <p>{{ $t('bonds.isin') }} {{ bond.CODE }}</p>
            <p>{{ $t('bonds.currentPrice') }}</p>
            <p>{{ $t('bonds.totalValue') }}</p>
          </div>
        </router-link>
      </div>
    </div>
    <h1 v-else class="flexWrapperColumn">Информация об облигациях не найдена</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'DocumentBondsPage',
  setup() {
    const store = useStore();
    const route = useRoute();

    return {
      bonds: store.getters['documentStore/getEmitentData'].OBLIGATIONS,
      route,
    };
  },
});
</script>

<style scoped lang="scss">
.flexWrapperColumn {
  margin: auto;
}

.wrapper {
  position: relative;
  margin-top: 5px;
  overflow: hidden;
  color: #fff;
  background-color: white;
  border-left: #fec006 5px solid;
  cursor: pointer;

  &:hover::before {
    left: 0;
  }

  > a {
    text-decoration: none;
  }

  &::before {
    position: absolute;
    top: 0;
    left: -100%;
    width: 200%;
    height: 100%;
    background: linear-gradient(
      to right,
      rgb(254, 192, 6) 0%,
      rgba(254, 192, 6, 1) 50%,
      rgb(255, 255, 255) 50%,
      rgb(255, 255, 255) 100%
    );
    transition: left 0.4s;
    content: '';
  }

  .bond {
    position: relative;
    width: 100%;
    padding: 15px 30px;

    > p {
      margin: 0;
    }
  }
}

@media (max-width: 1100px) {
  .greyBg {
    overflow-x: scroll;
    .flexWrapperColumn {
      .wrapper {
        > a {
          padding: 0;
        }
      }
    }
  }
}

@media (max-width: 1000px) {
  .greyBg {
    overflow-x: scroll;
    .flexWrapperColumn {
      padding: 20px;
      .wrapper {
        width: 900px;
      }
    }
  }
}
</style>
