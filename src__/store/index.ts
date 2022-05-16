import { reactive, readonly } from 'vue';
import { createStore } from 'vuex';
import { stocksFiltersStore } from './modules/stocksFilters.module';
import { stockInfoStore } from './modules/stockInfo/stockInfo.module';
import { previousCloseStore } from './modules/previousClose';
import { localeStore } from '@/store/modules/locale.module';
import { financialStore } from '@/store/modules/financial';
import { documentStore } from '@/store/modules/Document';
import { listsStore } from '@/store/modules/Lists';
import { indexPageStore } from '@/store/modules/IndexPage';
import { DynamicObject } from '@/interfaces';
import { isSSR } from '@/helpers';

export abstract class Store<T extends DynamicObject> {
  protected state: T;

  constructor() {
    const data = isSSR() ? this.data() : this.hydrate((window as DynamicObject).INITIAL_DATA || {});

    this.state = reactive(data) as T;
  }

  protected abstract hydrate(state: DynamicObject): T;

  protected abstract data(): T;

  public getState(): T {
    return readonly(this.state) as T;
  }
}
