import { ApiKeyHttpClient, IHttpClientRequestParameters } from './client';
import {
  GetCompetitionsRequest,
  GetCompetitionsResponse,
  GetTeamsByCompetitionIdRequest,
  GetTeamsByCompetitionIdResponse,
  GetTeamByIdResponse,
} from './football.api.types';

export class FootballApi {
  private FREE_TIER_LEAGUE_AREAS = [2032, 2072, 2081, 2088, 2114, 2163, 2187, 2224];
  private FREE_TIER_PLAN = 'TIER_ONE';
  private SEASON_2020 = 2020;
  private httpClient: ApiKeyHttpClient;
  private apiUri: string;

  constructor() {
    this.apiUri = process.env.FOOTBALL_API_URI ?? '';
    this.httpClient = new ApiKeyHttpClient();
  }

  public async getCompetitions(): Promise<GetCompetitionsResponse> {
    const params: IHttpClientRequestParameters<GetCompetitionsRequest> = {
      url: this.apiUri + '/competitions/',
      requiresToken: true,
      payload: {
        areas: this.FREE_TIER_LEAGUE_AREAS.join(','),
        plan: this.FREE_TIER_PLAN,
      },
    };

    return this.httpClient.get<GetCompetitionsResponse, GetCompetitionsRequest>(params);
  }

  public async getTeamsByCompetitionId(id: number): Promise<GetTeamsByCompetitionIdResponse> {
    const params: IHttpClientRequestParameters<GetTeamsByCompetitionIdRequest> = {
      url: `${this.apiUri}/competitions/${id}/teams`,
      requiresToken: true,
      payload: {
        season: this.SEASON_2020,
      },
    };

    return this.httpClient.get<GetTeamsByCompetitionIdResponse, GetTeamsByCompetitionIdRequest>(params);
  }

  public async getTeamById(id: number): Promise<GetTeamByIdResponse> {
    const params: IHttpClientRequestParameters<undefined> = {
      url: `${this.apiUri}/teams/${id}`,
      requiresToken: true,
    };

    return this.httpClient.get<GetTeamByIdResponse, undefined>(params);
  }
}
