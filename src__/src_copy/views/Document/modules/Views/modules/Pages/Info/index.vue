<template>
  <div class="greyBg">
    <div class="flexWrapperColumn">
      <ul class="default-w-400">
        <li v-for="index in getTranslationLength()" :key="index">
          <p style="font-weight: bold">{{ $t(`aboutStock[${index - 1}].name`) }}</p>
          <p>
            {{ getValue($t(`aboutStock[${index - 1}].path`)) }}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { find, matchesProperty } from 'lodash';
import i18n from '@/plugins/i18n/vue-i18n';
import type { DynamicObject } from '@/interfaces';

export default defineComponent({
  name: 'DocumentViewInfo',
  setup() {
    const store = useStore();

    const getTranslationLength = (): number => i18n.global.messages.ru.aboutStock.length;

    const getDocData = computed(() => store.getters['documentStore/getData']);

    const deepFind = (JSONArray, keyPath, keyValue) =>
      find(JSONArray, matchesProperty(keyPath, keyValue));

    const getValue = (path: string): string => {
      try {
        let deepObject: undefined | DynamicObject;
        let result = 'Нет данных';
        const objectPath: string[] = path.split('.');

        objectPath.forEach((_path) => {
          if (deepObject === undefined) {
            deepObject = getDocData.value[_path];
          } else {
            deepObject = deepObject[_path];
          }
        });

        if (deepObject) {
          result = String(deepObject);
        }

        return result;
      } catch (e) {
        console.error(e);
        return 'Нет данных';
      }
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
      getDocData,
      getTranslationLength,
      getValue,
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
