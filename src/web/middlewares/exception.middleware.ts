import { NextFunction, Request, Response } from 'express';
import HttpException from '../../exception/http.exception';
const isDevelopment = process.env.NODE_ENV === 'development';

function errorMiddleware(error: HttpException, req: Request, response: Response, next: NextFunction): void {
  const status = error.status || 500;
  const message = error.message || 'Server error';
  response.status(status).send({
    message,
    stack: isDevelopment ? error.stack : undefined,
  });
}

export default errorMiddleware;
