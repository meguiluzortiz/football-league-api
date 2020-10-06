import { Request, Response, Router } from 'express';

export const router: Router = Router();

router.get('/', async (_: Request, res: Response) => {
  res.status(200).json({
    version: 'v1',
    name: 'football-api',
    docs: 'https://github.com/meguiluzortiz/football-league-api/blob/master/README.md',
  });
});
