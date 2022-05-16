export interface IActivesListItem {
  ID: string;
  NAME: string;
  URL: string;
  ISIN: string;
  SECID: string;
  LASTPRICE: string;
  CURRENCY: string;
  CURRENCY_SIGN: string;
  QUOTATIONS_MONTH: string;
  MONTH_INCREASE: string | number | null;
  HAVE_GS: string | number | null;
}

export interface IActivesPageNav {
  TOTAL: string | number;
  PAGE_SIZE: string | number;
  CURRENT_PAGE: string | number;
}

export interface IActivesList {
  ITEMS: IActivesListItem[];
  PAGENAV: IActivesPageNav;
}
