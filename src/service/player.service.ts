import { ICollection } from 'monk';
import { GetAllResponse, Player } from '../web/controllers/controller.types';
import { model, schema as PlayerSchema } from '../database/models/player.model';

export class PlayerService {
  private model: ICollection<PlayerSchema>;

  constructor() {
    this.model = model;
  }

  public async getAll(): Promise<GetAllResponse<Player>> {
    const result = await this.model.find();
    const players = result.map(e => new Player(e));
    return new GetAllResponse(players.length, players);
  }

  public async save(player: Player | Player[]): Promise<void> {
    await this.model.insert(player);
  }
}
