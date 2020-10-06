export interface Season {
  startDate: string;
  endDate: string;
}

export interface Competition {
  id: number;
  area: {
    name: string;
  };
  name: string;
  plan: string;
}

type GetCompetitionsResponseCompetitionsType = Competition | { currentSeason: Season };

export interface GetCompetitionsRequest {
  areas?: string;
  plan?: string;
}

export interface GetCompetitionsResponse {
  competitions: GetCompetitionsResponseCompetitionsType[];
}

export interface GetTeamsByCompetitionIdRequest {
  season: number;
}

export interface GetTeamsByCompetitionIdResponse {
  competition: Competition;
  season: Season;
  teams: { id: number }[];
}

// GetTeamByIdRequest

export interface GetTeamByIdResponse {
  id: number;
  name: string;
  squad: { id: number; name: string; position: string; shirtNumber: string }[];
}
