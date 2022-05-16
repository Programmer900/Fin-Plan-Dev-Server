export interface ICookieSetOptions {
  path?: string;
  expires?: Date;
  maxAge?: number;
  domain?: string;
}

export interface ICookieRemoveOptions {
  path?: string;
  domain?: string;
}
