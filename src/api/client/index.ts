export interface IHttpClient {
  get<T, V>(parameters: IHttpClientRequestParameters<V>): Promise<T>;
}

export interface IHttpClientRequestParameters<T> {
  url: string;
  requiresToken: boolean;
  payload?: T;
}

export interface HttpHeader {
  key: string;
  value: string;
}

export * from './apikey.httpclient';
