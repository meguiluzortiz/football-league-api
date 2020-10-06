import { NextFunction, Request, Response, Router } from 'express';
import { CompetitionService } from '../../service/competition.service';

export const router: Router = Router();
const service = new CompetitionService();

router.get('/', async (_: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).send(await service.getAll());
  } catch (e) {
    next(e);
  }
});

router.get('/:competitionId', async (req: Request, res: Response, next: NextFunction) => {
  const competitionId = parseInt(req.params.competitionId);
  try {
    res.status(200).send(await service.getOne(competitionId));
  } catch (e) {
    next(e);
  }
});
