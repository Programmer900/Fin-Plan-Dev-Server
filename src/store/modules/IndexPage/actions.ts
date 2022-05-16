import { useRoute } from 'vue-router';
import { IIndexPageStore } from '@/store/modules/IndexPage/state';
import { useApiFinplan } from '@/use/api/useApiFinplan';

interface IActions {
  state?: IIndexPageStore;
  dispatch?: any;
  commit?: any;
}

export const actions = {
  async init({ commit }: IActions): Promise<boolean> {
    const api = useApiFinplan();
    try {
      const route = useRoute();
      const ticker = String(route.params.ticker);
      const responseDetail = await api.getIndexDetail(ticker);
      const resDetail = responseDetail.data;
      const responseChart = await api.getIndexChartData(ticker);
      const resChart = responseChart.data;
      commit('init', {
        resDetail,
        resChart,
      });
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  },
};
