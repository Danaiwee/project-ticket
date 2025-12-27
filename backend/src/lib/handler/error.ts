import { Response } from "express";
import z, { ZodError } from "zod";
import { RequestError, ValidationError } from "../http-error.js";
import logger from "../logger.js";

const sendErrorResponse = (
  res: Response,
  status: number,
  message: string,
  errors?: Record<string, string[]> | undefined
) => {
  return res.status(status).json({
    success: false,
    error: {
      message,
      details: errors,
    },
  });
};

const handleError = (error: unknown, res: Response) => {
  if (error instanceof RequestError) {
    logger.error({ err: error }, `API Error: ${error.message}`);

    return sendErrorResponse(
      res,
      error.statusCode,
      error.message,
      error.errors
    );
  }

  if (error instanceof ZodError) {
    const validationError = new ValidationError(
      error.flatten().fieldErrors as Record<string, string[]>
    );

    logger.error(
      { err: error },
      `Validation Error: ${validationError.message}`
    );

    return sendErrorResponse(
      res,
      validationError.statusCode,
      validationError.message,
      validationError.errors
    );
  }

  if (error instanceof Error) {
    logger.error(error.message);
    return sendErrorResponse(res, 500, error.message);
  }

  logger.error({ err: error }, "An unexpected error ocurred");
  return sendErrorResponse(res, 500, "An unexpected error occurred");
};

export default handleError;
