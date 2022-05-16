import { UserModule } from '@/types';

export const install: UserModule = ({ isClient, app }) => {
  if (isClient) {
    import('v-calendar')
      .then(({ Calendar, DatePicker }) => {
        app.component('Calendar', Calendar);
        app.component('DatePicker', DatePicker);
      })
      .catch((e) => {
        console.error('v-calendar install error', e);
      });
  }
};
