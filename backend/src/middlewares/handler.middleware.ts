import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client"

// Correctly type the error handler
export const errorHandler = (
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

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    res.status(409).send({
      status: 409,
      message: 'Sql error',
      errors: err.message,
    });
  }

  if (err instanceof Prisma.PrismaClientInitializationError) {
    res.status(500).send({
      status: 500,
      message: 'Sql error',
      errors: err.message,
    });
  }

  console.error('Full error:', err)
  res.status(404).send({status:404,message:err});
};
