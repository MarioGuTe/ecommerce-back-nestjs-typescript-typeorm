import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`This is ${req.method} request to ${req.url}`);
    next();
  }
}

export function globalLogger(req: Request, res: Response, next: NextFunction) {
  console.log(
    `A ${req.method} request has been made to ${req.url} route at ${Date()}`,
  );
  next();
}
