import { FootballApi } from '../api/football.api';
import InternalServerError from '../exception/server.exception';
import TooManyRequestsError from '../exception/toomanyrequests.exception';
import { Competition, GetAllResponse, Team, Player } from '../web/controllers/controller.types';
import { GetTeamByIdResponse } from '../api/football.api.types';
import { TeamService } from './team.service';
import { PlayerService } from './player.service';

export class CompetitionService {
  private footballApi: FootballApi;
  private teamService: TeamService;
  private playerService: PlayerService;

  constructor() {
    this.footballApi = new FootballApi();
    this.teamService = new TeamService();
    this.playerService = new PlayerService();
  }

  public async getAll(): Promise<GetAllResponse<Competition>> {
    let competitionsFormatted = [];
    try {
      const { competitions } = await this.footballApi.getCompetitions();
      competitionsFormatted = competitions.map(e => new Competition(e));

      return new GetAllResponse<Competition>(competitionsFormatted.length, competitionsFormatted);
    } catch (e) {
      this.handleApiCallError(e);
    }
  }

  public async getOne(competitionId: number): Promise<Competition> {
    try {
      const { teams, ...response } = await this.footballApi.getTeamsByCompetitionId(competitionId);
      const teamsInCompetition = teams.length;
      const idTeamArray = teams.map(e => e.id) as number[];

      // Look for teams in database
      const teamsFromDb = await this.teamService.getMany(idTeamArray);
      const idTeamFoundInDbArray: number[] = teamsFromDb.map(e => e.id);

      // Filtering team ids found in database and returned from API.
      const idTeamNotFoundInDbArray = idTeamArray.filter(x => !idTeamFoundInDbArray.includes(x));

      // Search team by id in API and return id if error
      const teamPromiseArray: Promise<GetTeamByIdResponse | number>[] = idTeamNotFoundInDbArray.map(idTeam =>
        this.footballApi.getTeamById(idTeam).catch(() => idTeam),
      );
      const responses = await Promise.all(teamPromiseArray);

      const noErrorResponses = responses.filter(e => typeof e !== 'number') as GetTeamByIdResponse[];
      const teamsFromApi = noErrorResponses.map(
        e =>
          new Team({
            id: e.id,
            name: e.name,
            members: e.squad.map(e => new Player(e)),
          }),
      );

      // Save no error responses in db
      await this.teamService.save(teamsFromApi);

      const players: Player[] = [];
      teamsFromApi.forEach(e => players.push(...e.members));
      await this.playerService.save(players);

      // Join no error responses with existing teams in db.
      const allTeams = teamsFromApi.concat(teamsFromDb);

      return new Competition({
        ...response.competition,
        currentSeason: response.season,
        teams: {
          total: teamsInCompetition,
          totalObtained: allTeams.length,
          data: allTeams,
        },
      });
    } catch (e) {
      this.handleApiCallError(e);
    }
  }

  private handleApiCallError(e: Error): never {
    const message: string = e.message;
    if (message.includes('429')) {
      throw new TooManyRequestsError();
    }
    console.error(e);
    throw new InternalServerError();
  }
}
