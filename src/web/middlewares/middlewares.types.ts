import { Request, Response, NextFunction } from 'express';
import HttpException from 'src/exception/http.exception';

export type ErrorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => void;
export type NotFoundMiddleware = (_: Request, response: Response, __: NextFunction) => void;
