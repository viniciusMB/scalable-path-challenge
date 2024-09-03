export interface HttpClienteRequestConfig<T = unknown> {
  baseURL?: string;
  data?: T;
}

export interface IHttpClient {
  post<T>(
    url: string,
    data?: unknown,
    config?: HttpClienteRequestConfig<T>,
  ): Promise<void>;
}
