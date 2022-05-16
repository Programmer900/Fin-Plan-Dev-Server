import { getCurrentInstance } from 'vue';

export const useEmitter = () => {
  const internalInstance: any = getCurrentInstance();
  const { emitter } = internalInstance.appContext.config.globalProperties;

  return emitter;
};

export const emitEvents = {
  changeAnnotationStrokeColor: 'changeAnnotationStrokeColor',
  changeAnnotationFillColor: 'changeAnnotationFillColor',
  clickAnnotationChangeColor: 'clickAnnotationChangeColor',
  closeAnnotationChangeColor: 'closeAnnotationChangeColor',
  updateCurrentTypeTechAn: 'updateCurrentTypeTechAn',
};
