import { UserModule } from '@/types';

export const install: UserModule = ({ isClient, app }) => {
  if (isClient) {
    import('v-tooltip')
      .then((VTooltip) => {
        console.log('Tooltip: ', VTooltip)
        app.use(VTooltip.default);
      })
      .catch((e) => {
        console.error('VTooltip install error', e);
      });
  }
};
