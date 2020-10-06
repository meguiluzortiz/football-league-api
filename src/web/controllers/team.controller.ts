import { NextFunction, Request, Response, Router } from 'express';
import { TeamService } from '../../service/team.service';

export const router: Router = Router();
const service = new TeamService();

router.get('/', async (_: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).send(await service.getAll());
  } catch (e) {
    next(e);
  }
});

router.get('/:teamId', async (req: Request, res: Response, next: NextFunction) => {
  const teamId = parseInt(req.params.teamId);
  try {
    res.status(200).send(await service.getOne(teamId));
  } catch (e) {
    next(e);
  }
});
