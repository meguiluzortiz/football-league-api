import { FilterQuery } from 'mongodb';
import { FindOptions, ICollection } from 'monk';
import { GetAllResponse, Team } from '../web/controllers/controller.types';
import { model, schema as TeamSchema } from '../database/models/team.model';
export class TeamService {
  private model: ICollection<TeamSchema>;

  constructor() {
    this.model = model;
  }

  public async getAll(): Promise<GetAllResponse<Team>> {
    const result = await this.model.find({}, { projection: { _id: 0 } });
    const teams = result.map(e => new Team(e));
    return new GetAllResponse(teams.length, teams);
  }

  public async getOne(teamId: number): Promise<Team> {
    const query: FilterQuery<TeamSchema> = { id: teamId };
    const options: FindOptions<TeamSchema> = { projection: { _id: 0 } };

    const result = await this.model.findOne(query, options);
    return new Team(result);
  }

  public async getMany(idTeamArray: number[]): Promise<Team[]> {
    const query: FilterQuery<TeamSchema> = { id: { $in: idTeamArray } };
    const options: FindOptions<TeamSchema> = { projection: { _id: 0 } };

    const result = await this.model.find(query, options);
    return result.map(e => new Team(e));
  }

  public async save(team: Team | Team[]): Promise<void> {
    await this.model.insert(team);
  }
}
