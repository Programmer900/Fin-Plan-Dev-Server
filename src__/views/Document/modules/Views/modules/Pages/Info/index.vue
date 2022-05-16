<template>
  <div class="greyBg">
    <div class="flexWrapperColumn">
      <ul class="default-w-400">
        <li v-for="index in getTranslationLength()" :key="index">
          <p>{{ $t(`aboutStock[${index - 1}].name`) }}</p>
          <span>
            {{ checkValue(documentData.RADAR_DATA.PROPS[$t(`aboutStock[${index - 1}].path`)]) }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import i18n from '@/plugins/i18n/vue-i18n';

export default defineComponent({
  name: 'DocumentViewInfo',
  setup() {
    const store = useStore();

    const getTranslationLength = (): number => i18n.global.messages.ru.aboutStock.length;

    const checkValue = (value: string | null): string => {
      if (value) {
        return value;
      }
      return 'Нет данных';
    };

    // const init = async (): Promise<void> => {
    //   if (route.params.document === 'obligation') {
    //     const bond = await getBondInfo(route.params.company, route.params.region);
    //     const emitent = await getEmitentInfo(bond.RADAR_DATA.COMPANY.ID);
    //
    //     bonds.value = emitent.OBLIGATIONS;
    //     console.log(bonds.value);
    //   }
    // };

    return {
      documentData: store.getters['documentStore/getData'],
      getTranslationLength,
      checkValue,
    };
  },
});
</script>

<style scoped lang="scss">
.flexWrapperColumn {
  margin: auto;

  > ul {
    margin-top: -30px;
    list-style: none;

    > li {
      display: flex;
      flex-direction: row;
      //justify-content: space-between;
      width: 700px;
      margin-top: 30px;

      > p {
        display: flex;
        flex-direction: column;
        width: 50%;
        margin: 0;
        color: black;
        font-weight: bold;
        font-size: 18px;
      }

      > span {
        color: #939393;
        font-size: 18px;
      }

      &::before {
        display: none;
      }
    }
  }
}

@media (max-width: 1000px) {
  .flexWrapperColumn {
    > ul {
      margin-top: -30px;

      > li {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        margin-top: 30px;
      }
    }
  }
}

@media (max-width: 600px) {
  .flexWrapperColumn {
    width: 100%;
    padding: 20px;
    > ul {
      margin-top: -30px;

      > li {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        margin-top: 30px;

        > p {
          width: 60%;
          font-size: 16px;
        }

        > span {
          width: 40%;
          margin-left: 20px;
          font-size: 15px;
        }
      }
    }
  }
}
</style>
