import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import { IHttpClient } from './interfaces/http-client';

export class HttpClient implements IHttpClient {
  private readonly http: AxiosInstance;
  constructor() {
    this.http = axios.create();
  }

  public async post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return await (
      await this.http.post<T>(url, data, config)
    ).data;
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return await (
      await this.http.get<T>(url, config)
    ).data;
  }
}
