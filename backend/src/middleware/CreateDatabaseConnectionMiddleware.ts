import { NextFunction, Request, Response } from "express";
import { Database } from "../repository/Database";
import { AppDataSource } from "../../ormconfig";
import { container } from "tsyringe";

export function CreateDatabaseConnectionMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  container.register(Database, {
    useValue: new Database(AppDataSource),
  });

  next();
}
