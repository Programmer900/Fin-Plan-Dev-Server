import { UserModule } from '@/types';

export const install: UserModule = async ({ isClient, app }) => {
  if (isClient) {
    import('highcharts-vue')
      .then((HighchartsVue) => {
        app.use(HighchartsVue.default);
      })
      .catch((e) => {
        console.error('HighchartsVue install error', e);
      });
  }
};
