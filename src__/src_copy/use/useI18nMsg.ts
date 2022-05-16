import { useRoute } from 'vue-router';
import i18n from '@/plugins/i18n/vue-i18n';
import { DynamicObject } from '@/interfaces';

export const useI18nMsg = (): DynamicObject => {
  const route = useRoute();
  const { locale } = route.params;

  return i18n.global.messages[String(locale)];
};
