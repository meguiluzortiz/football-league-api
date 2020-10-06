import axios, { AxiosRequestConfig } from 'axios';
import { HttpHeader, IHttpClient, IHttpClientRequestParameters } from '.';

export class ApiKeyHttpClient implements IHttpClient {
  getToken(): HttpHeader {
    return {
      key: process.env.FOOTBALL_API_AUTH_KEY ?? '',
      value: process.env.FOOTBALL_API_AUTH_VALUE ?? '',
    };
  }

  get<T, V>(params: IHttpClientRequestParameters<V>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      // extract the individual parameters
      const { url, requiresToken, payload } = params;

      // axios request options like headers etc
      const options: AxiosRequestConfig = {
        headers: {},
        params: payload,
      };

      // if API endpoint requires a token, we'll need to add a way to add this.
      if (requiresToken) {
        const authHeader = this.getToken();
        options.headers[authHeader.key] = authHeader.value;
      }

      axios
        .get(url, options)
        .then((response: any) => {
          resolve(response.data as T);
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .catch((response: any) => {
          reject(response);
        });
    });
  }
}
