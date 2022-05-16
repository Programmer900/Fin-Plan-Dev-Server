<template>
  <div class="greyBg">
    <div class="flexWrapperRow">
      <div
        v-if="previewText"
        class="info defaultGrey20px mt-20 default-ul default-h2 VHtmlText"
        v-html="previewText"
      />
      <h1 v-else>Информация о компании не найдена</h1>
      <div class="rightInfo">
        <div class="bgSquareBefore" />
        <div class="bgSquareAfter default-w-500">
          <p>{{ $t('aboutCompany.newsText') }}</p>
        </div>
        <p class="lowResolutionNews default-w-500">{{ $t('aboutCompany.newsText') }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
 defineComponent, onMounted, onServerPrefetch, ref
} from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'DocumentAboutCompanyPage',
  setup() {
    const store = useStore();
    // const route = useRoute();

    // const pageType = ref<string | string[]>(route.params.document);
    // const emitent = ref<string>('');

    // onMounted(() => {
    //   console.log(store.getters['documentStore/getEmitentData']);
    // });

    // const init = async (): Promise<void> => {
    //   if (pageType.value === 'stock') {
    //     const stock = await getStockInfo(route.params.ticker, route.params.region);
    //     const emitentInfo = await getEmitentInfo(stock.RADAR_DATA.COMPANY.ID);
    //
    //     emitent.value = emitentInfo.PREVIEW_TEXT;
    //   } else if (pageType.value === 'obligation') {
    //     const bond = await getBondInfo(route.params.ticker, route.params.region);
    //     const emitentInfo = await getEmitentInfo(bond.RADAR_DATA.COMPANY.ID);
    //
    //     emitent.value = emitentInfo.PREVIEW_TEXT;
    //   }
    // };
    //
    // onMounted(async () => {
    //   await init();
    // });
    //
    // onServerPrefetch(async () => {
    //   await init();
    // });

    return {
      previewText: store.getters['documentStore/getEmitentData'].PREVIEW_TEXT,
    };
  },
});
</script>

<style scoped lang="scss">
.flexWrapperRow {
  margin: auto;

  .rightInfo {
    width: 40%;
    margin-left: 50px;

    .lowResolutionNews {
      display: none;
    }

    .bgSquareBefore {
      position: relative;
      width: 125px;
      height: 125px;
      margin-left: -20px;
      background-color: #fec006;
    }

    .bgSquareAfter {
      position: relative;
      width: 50%;
      height: 250px;
      margin-top: -105px;
      padding: 40px 0 0 40px;
      background-color: white;
      transition: 0.3s;

      > p {
        width: 500px;
        margin-bottom: 20px;
      }
    }

    .bgSquareAfter:hover {
      width: 100%;
      height: max-content;
    }
  }

  .info {
    width: 60%;
    //margin-top: -40px;

    > p {
      margin-top: 40px;
    }

    > ul {
      margin-top: 20px;
      > li {
        margin-left: 40px;
        color: #797979;
        font-size: 20px;
        line-height: 150%;
        list-style-type: none;
      }
      ::before {
        position: absolute;
        display: inline-block;
        margin-top: 5px;
        margin-left: -40px;
        color: green;
        font-size: 60px;
      }
    }
  }
}

@media (max-width: 1400px) {
  .flexWrapperRow {
    .rightInfo {
      .bgSquareBefore {
        height: 100px;
      }

      .bgSquareAfter {
        height: 100px;
        margin-top: -80px;

        > p {
          font-size: 14px;
        }
      }

      &:hover .bgSquareAfter {
        width: 370px;
        height: 380px;
      }
    }
    .info {
      .benefits {
        > ul {
          > li {
            font-size: 16px;
          }
        }
      }
    }
  }
}

@media (max-width: 1100px) {
  .flexWrapperRow {
    .rightInfo {
      .bgSquareBefore {
        height: 100px;
      }

      .bgSquareAfter {
        height: 200px;

        > p {
          width: 150%;
          max-height: 300px;
          overflow-y: scroll;
          font-size: 14px;
        }
      }

      &:hover .bgSquareAfter {
        width: 370px;
        height: 380px;
      }
    }
  }
}

@media (max-width: 1000px) {
  .flexWrapperRow {
    flex-direction: column;
    padding: 20px 100px;

    .info {
      width: 100%;
      margin-top: -10px;
    }

    .rightInfo {
      width: 100%;
      margin-left: 0;

      .lowResolutionNews {
        display: flex;
        margin-top: 30px;
        padding: 20px 0;
        border-top: #fec006 2px solid;
      }

      .bgSquareBefore {
        display: none;
      }

      .bgSquareAfter {
        display: none;
      }
    }
  }
}

@media (max-width: 600px) {
  .flexWrapperRow {
    padding: 20px;

    .rightInfo {
      width: 100%;
      margin-left: 0;

      .bgSquareBefore {
        display: none;
      }

      .bgSquareAfter {
        width: 100%;
        height: 100%;
        margin-top: 30px;
        padding: 0;
        background: transparent;
        > p {
          width: 100%;
          margin-top: 30px;
          padding: 20px 0;
          border-top: #fec006 2px solid;
        }
      }
      &:hover .bgSquareAfter {
        width: 100%;
        height: 100%;
      }
    }
  }
}

@media (max-width: 1800px) {
  .flexWrapperRow {
    .rightInfo {
      .bgSquareAfter {
        > p {
          width: 400px;
        }
      }
    }
  }
}

@media (max-width: 1500px) {
  .flexWrapperRow {
    .rightInfo {
      .bgSquareAfter {
        > p {
          width: 300px;
        }
      }
    }
  }
}
</style>
