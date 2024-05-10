import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/model/CustomError";

export const ErrorHandlerMiddleware = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(err);

  res.status(err.statusCode || 500).json({
    message: err.message || "Internal server error",
  });
};
