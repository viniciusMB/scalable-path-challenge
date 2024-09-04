import { HttpClient } from './http-client.adapter';

export class SuperlogicaProvider {
  private httpClientConfig;
  constructor(
    private readonly httpClient: HttpClient,
    private readonly superlogicaBaseUrl: string,
    private readonly superlogicaAppToken: string,
    private readonly superlogicaAccessToken: string,
  ) {
    this.httpClientConfig = {
      baseURL: this.superlogicaBaseUrl,
      headers: {
        app_token: this.superlogicaAppToken,
        access_token: this.superlogicaAccessToken,
      },
      timeout: 90000,
    };
  }

  async getCanceledSubscription(customerId: string): Promise<unknown[]> {
    this.httpClientConfig.params = {
      'CLIENTES[0]': customerId,
      tipo: 'contratos',
      filtrarpor: 'desativadas',
      pagina: '1',
      itensPorPagina: '100',
    };

    const response = await this.httpClient.get(
      '/financeiro/recorrencias/recorrenciasdeplanos',
      this.httpClientConfig,
    );

    return response as unknown[];
  }

  async getMigrateSubscription(customerId: string): Promise<unknown[]> {
    this.httpClientConfig.params = {
      ID_SACADO_SAC: customerId,
      pagina: '1',
      itensPorPagina: '100',
    };

    const response = await this.httpClient.get(
      '/financeiro/assinaturas',
      this.httpClientConfig,
    );

    return response as unknown[];
  }
}
