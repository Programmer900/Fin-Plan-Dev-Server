import { createI18n } from 'vue-i18n';
import ru from '@/langs/ru/ru-RU';
import en from '@/langs/en/en-US';

const messages = {
  ru,
  en,
};

export const install = ({ app }) => {
  const i18n = createI18n({
    locale: 'ru',
    messages,
  });

  app.use(i18n);
};
