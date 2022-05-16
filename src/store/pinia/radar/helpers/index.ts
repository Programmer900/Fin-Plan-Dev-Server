import { cloneDeep } from 'lodash';
import { DynamicObject } from '@/interfaces';
import { useError } from '@/use/useError';
import { useStringUtils } from '@/use/root/utils/string';
import { useObjectUtils } from '@/use/root/utils/object';

export const useRadarHelpers = () => {
  const { _catch } = useError('Radar helpers');
  const { removeLast, getLast } = useStringUtils();
  const { hasKey } = useObjectUtils();

  const state = reactive({
    percentFields: [
      'coupons_more',
      'month[Доля просрочки, %][percent]',
      'month[Доля просрочки, %][use]',
      'month[Н1,%][percent]',
      'month[Рентабельность собственного капитала, %][percent]',
      'period[Доля собственного капитала в активах][percent]',
      'period[Рентабельность собственного капитала][percent]',
      'period[Темп прироста выручки][percent]',
      'dividends',
      'period[Темп роста активов][percent]',
      'period[Темп роста прибыли][percent]',
    ] as string[],
  });

  /**
   * Подготовка фильтра к отправке
   * @param filterName Название фильтра
   * @param value Значение
   * @param symbol Символ для значения
   */
  const sendFilter = (filterName: string, value: any, symbol = ''): string => {
    const lastSymbol = getLast(String(value));
    if (lastSymbol !== symbol) {
      return `${filterName}=${value}${symbol}`;
    }
    return `${filterName}=${value}`;
  };

  /**
   * Проверить тип поля.
   * Например, если в поле должен быть указан знак процента, функция вернет символ процента
   * @param filterName Название фильтра (ключ объекта)
   * @param value Значение фильтра
   */
  const checkFieldValueType = (filterName: string, value: any): string => {
    if (state.percentFields.indexOf(filterName) !== -1) return sendFilter(filterName, value, '%');
    return sendFilter(filterName, value);
  };

  return {
    ...toRefs(state),

    /**
     * Получить фильтры в формате строки
     * @param filters Фильтры для выбранного типа активов
     */
    prepareFiltersForSending: (filters: DynamicObject): string => {
      try {
        let result = '';

        for (const filtersKey in filters) {
          const filter = filters[filtersKey];

          let apiValue = filter.value;
          const apiSymbol = filter.symbol || '';

          if (hasKey(filter, 'toApi')) {
            const previousValue = apiValue;
            apiValue = filter.toApi[apiValue];
            // console.log(`[${filtersKey}] ${previousValue} -> ${apiValue}`);
          }

          result += `${filtersKey}=${apiValue}${apiSymbol}&`;
        }

        console.log(removeLast(result));
        return removeLast(result);
      } catch (e) {
        _catch(e, 'prepareFiltersForSending');
        return '';
      }
    },

    updateFilterValues: (filters: any, patchFilters: any): any => {
      // const result = cloneDeep(filters);
      // console.log('------');
      // console.log(filters);
      // console.log(patchFilters);
      // console.log('------');
      // for (const filtersKey in filters) {
      //   const filter = result[filtersKey];
      //   const patchFilter = patchFilters[filtersKey] || undefined;
      //
      //   if (patchFilter !== undefined) {
      //     filter.value = patchFilter;
      //   }
      // }
      // return result;
    },
  };
};
