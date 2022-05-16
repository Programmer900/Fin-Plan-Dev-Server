import { DynamicObject } from '@/interfaces';

export interface ICurrency {
  sign: string;
  value: string;
}

export interface IDynamics {
  current: string;
  month: string;
  year: string;
  threeYears: string;
}

export interface IIndexStaff {
  in: DynamicObject[];
  main: DynamicObject[];
}

export interface IIndexPageStore {
  id: string;
  ticker: string;
  name: string;
  fullName: string;
  indexStaff: IIndexStaff;
  previewText: string;
  currency: ICurrency;
  dynamics: IDynamics;
  chart: {
    data: [];
  };
}

export const initState = (): IIndexPageStore => ({
  id: '',
  ticker: '',
  name: '',
  fullName: '',
  indexStaff: {
    in: [],
    main: [],
  },
  previewText: '',
  currency: {
    sign: '',
    value: '',
  },
  dynamics: {
    current: '',
    month: '',
    year: '',
    threeYears: '',
  },
  chart: {
    data: [],
  },
});

export const state: IIndexPageStore = {
  ...initState(),
};
