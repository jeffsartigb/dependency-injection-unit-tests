import { NextFunction, Request, Response } from "express";
import { Middleware } from "./middleware";

export abstract class BaseController {
  localMiddlewares: Middleware[];
  constructor(localMiddlewares: Middleware[]) {
    this.localMiddlewares = localMiddlewares;
  }
  abstract execute(
    req: Request,
    res: Response,
    next?: NextFunction
  ): Promise<unknown>;
}
