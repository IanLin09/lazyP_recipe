import { Request, Response, NextFunction,ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { PrismaClientInitializationError } from '@prisma/client/runtime/library';
import { ThrowError } from "../helper/error.js";
import logger from "../helper/log.js";

// Correctly type the error handler
export const errorHandler:ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof ZodError) {
    res.status(400).send({
      status: 400,
      message: 'Validation error',
      errors: err.errors.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      })),
    });
  }

  if (err instanceof PrismaClientInitializationError) {
    res.status(409).send({
      status: 409,
      message: 'Sql error',
      errors: err.message,
    });
  }

  if (err instanceof PrismaClientInitializationError) {
    res.status(500).send({
      status: 500,
      message: 'Sql error',
      errors: err.message,
    });
  }

  if (err instanceof ThrowError) {
    res.status(err.statusCode).json({
      status: err.statusCode,
      message: err.message,
    });
  }

  logger.info(err.message)
  logger.info(err.cause)
  res.status(500).send({
    status:500,
    message:"Internal server error",
    errors:err.message
  });
};
