<template>
  <div class="greyBg">
    <div class="flexWrapperColumn">
      <div class="methodology defaultBlack27px defaultGrey20px">
        <h1>{{ $t('dividends.methodLabel') }}</h1>
        <p>{{ $t('dividends.methodText') }}</p>
      </div>
      <div v-if="isInit" class="table">
        <template v-if="!isNotFound">
          <div class="tableHeader flexRowBetween">
            <p v-for="index in getTranslationTableHeaderLength()" :key="index">
              {{ $t(`dividends.tableHeaders.${index - 1}`) }}
            </p>
          </div>
          <div
            v-for="dividend of dividends"
            :key="dividend.currentPrice"
            class="tableRows tableValue flexRowBetween"
            :class="{
              current: dividend.currentPrice,
              default: !dividend.currentPrice,
            }"
          >
            <p>{{ dividend['Дата закрытия реестра'] }}</p>
            <p>{{ dividend['Дата закрытия реестра (T-2)'] }}</p>
            <p>{{ dividend['Цена на дату закрытия'] }}</p>
            <p>{{ dividend['Дивиденды'] }}</p>
            <p>{{ dividend['Дивиденды, в %'] }}</p>
          </div>
        </template>
        <template v-else>
          <h1>Информация о дивидендах не найдена</h1>
        </template>
      </div>
      <Loader v-else />
    </div>
  </div>
</template>

<script lang="ts">
import {
 defineComponent, onMounted, onServerPrefetch, onUnmounted, ref
} from 'vue';
import { useStore } from 'vuex';
import i18n from '@/plugins/i18n/vue-i18n';
import { DynamicObject } from '@/interfaces';
import Loader from '@/components/Loader/index.vue';
import { useApiFinplan } from '@/use/api/useApiFinplan';

export default defineComponent({
  name: 'DocumentDividendsPage',
  components: { Loader },
  setup() {
    const api = useApiFinplan();
    const store = useStore();
    const dividends = ref<DynamicObject | null>(null);
    const isNotFound = ref<boolean>(false);
    const isInit = ref<boolean>(false);

    const getTranslationTableHeaderLength = (): number =>
      i18n.global.messages.ru.dividends.tableHeaders.length;

    const init = async () => {
      const response = await api.getDividends(
        store.getters['documentStore/getRegion'],
        store.getters['documentStore/getSecId'],
      );
      // @ts-ignore
      dividends.value = response.data.DIVIDENDS;

      if (!dividends.value || !dividends.value.length) {
        isNotFound.value = true;
      }

      console.log(dividends.value);
      isInit.value = true;
    };

    const reset = () => {
      dividends.value = null;
      isInit.value = false;
      isNotFound.value = false;
    };

    onServerPrefetch(async () => {
      await init();
    });

    onMounted(async () => {
      if (!isInit.value) {
        await init();
      }
    });

    onUnmounted(() => {
      reset();
    });

    return {
      isInit,
      isNotFound,
      dividends,
      getTranslationTableHeaderLength,
    };
  },
});
</script>

<style scoped lang="scss">
.flexWrapperColumn {
  margin: auto;
}

.methodology {
  > h1 {
    margin-top: 20px;
  }
  > p {
    width: 70%;
    margin-top: 40px;
  }
}

.table {
  margin-top: 60px;
  .tableHeader {
    padding: 25px 20px;
    background-color: white;

    > p {
      width: 18%;
      margin: 0;
    }
  }

  .current {
    background-color: white;
  }

  .current:hover {
    background-color: #fec006;
  }

  .current:hover .currentPrice {
    opacity: 1;
  }

  .default {
    background-color: #f4f4f4;
  }

  .default:hover {
    background-color: white;
  }

  .tableRows {
    width: 100%;
    margin-top: 3px;
    padding: 15px 20px;
    cursor: pointer;

    > p {
      width: 18%;
    }

    .currentPrice {
      position: absolute;
      width: max-content;
      margin-top: 80px;
      padding: 10px 20px;
      color: white;
      font-size: 14px;
      background-color: black;
      border-radius: 20px;
      opacity: 0;
      transition: 0.3s;
    }
  }
}

@media (max-width: 600px) {
  .flexWrapperColumn {
    padding: 0 20px;
    .methodology {
      > p {
        width: 100%;
      }
    }
    .table {
      overflow-x: scroll;
      .tableHeader {
        width: 700px;
      }

      .tableRows {
        width: 700px;
      }
    }
  }
}
</style>
