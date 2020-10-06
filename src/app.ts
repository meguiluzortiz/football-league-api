import express, { Application } from 'express';
import helmet from 'helmet';
import notFoundMiddleware from './web/middlewares/notfound.middleware';
import errorMiddleware from './web/middlewares/exception.middleware';
import { routes } from './routes';

class App {
  app: Application;

  constructor() {
    this.app = express();
    this.config();
  }

  private config(): void {
    this.middlewares();
  }

  private middlewares(): void {
    this.app.use(helmet());
    routes(this.app);
    this.app.use(notFoundMiddleware);
    this.app.use(errorMiddleware);
  }
}

export const app = new App().app;
