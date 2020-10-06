import { NextFunction, Request, Response } from 'express';
import HttpException from '../../exception/http.exception';
import { NotFoundMiddleware } from './middlewares.types';

const notFoundMiddleware: NotFoundMiddleware = (_: Request, response: Response, next: NextFunction): void => {
  next(new HttpException(404, 'Not Found'));
};

export default notFoundMiddleware;
