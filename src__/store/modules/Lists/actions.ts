import { IListsState } from '@/store/modules/Lists/state';
import { utils } from '@/services/utils';

interface IListsAction {
  state: IListsState;
  dispatch?: any;
  commit?: any;
}

interface IListsActionInitAbout {
  title: string;
}

export const actions = {
  initAbout({ state, dispatch }: IListsAction, config: IListsActionInitAbout): boolean {
    try {
      state.title = config.title;
      state.previewText = 'Какой-то текст, который приходит по API';
      return true;

      return false;
    } catch (e) {
      console.log(e);
      return false;
    }
  },

  initChartAboutPage({ state }: IListsAction): boolean {
    try {
      // --------------- ТЕСТОВЫЕ ДАННЫЕ ---------------
      let isCatInit = false;
      for (let i = 0; i < utils.getRandomNum(2, 4); i++) {
        const mockData: number[] = [];
        for (let j = 0; j < 10; j++) {
          mockData.push(utils.getRandomNum());
          if (!isCatInit) {
            state.chartAboutPage.categories.push(2010 + j);
          }
        }
        isCatInit = true;

        state.chartAboutPage.items.push({
          name: `Показатель ${i + 1}`,
          color: utils.getRandomColor(),
          data: [...mockData],
          type: 'column',
          visible: true,
        });
      }

      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  },

  resetChartAboutPage({ state, commit }: IListsAction): boolean {
    commit('setDefaultChartAboutPageState');
    return true;
  },
};
