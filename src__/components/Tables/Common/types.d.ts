export interface ITableCommonRowTitle {
  title: string;
  link?: string;
}

export interface ITableCommonRowLink {
  name: string;
  params: {
    locale: string;
    [key: string]: string | number;
  };
}

export interface ITableCommonRow {
  title: ITableCommonRowTitle;
  values: number[];
  picked?: boolean;
  id?: number | string;
  code?: number | string;
  link?: ITableCommonRowLink;
  [key: string]: any;
}

export interface ITableCommonTabs {
  title: string;
  current: boolean;
  event: string;
}
