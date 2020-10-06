import { NextFunction, Request, Response, Router } from 'express';
import { PlayerService } from '../../service/player.service';

export const router: Router = Router();
const service = new PlayerService();

router.get('/', async (_: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).send(await service.getAll());
  } catch (e) {
    next(e);
  }
});
