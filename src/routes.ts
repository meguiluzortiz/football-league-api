import { Application, Router } from 'express';
import { router as routerHome } from './web/controllers/home.controller';
import { router as routerCompetition } from './web/controllers/competition.controller';
import { router as routerTeam } from './web/controllers/team.controller';
import { router as routerPlayer } from './web/controllers/player.controller';

const _routes: [string, Router][] = [
  ['/competitions', routerCompetition],
  ['/teams', routerTeam],
  ['/players', routerPlayer],
];

export const routes = (app: Application): void => {
  app.use('/', routerHome);
  _routes.forEach(route => {
    const [url, controller] = route;
    app.use('/api' + url, controller);
  });
};
