import { Response } from "express";

export const successResponse = <T>(
  res: Response,
  data: T,
  message = "Success",
  statusCode = 200
) => {
  return res.status(statusCode).json({
    status: "success",
    message,
    data
  });
};

export const errorResponse = (
  res: Response,
  message = "Something went wrong",
  statusCode = 500
) => {
  return res.status(statusCode).json({
    status: "error",
    message
  });
};

export const successWithCount = <T>(
  res: Response,
  data: T[],
  message = "Success",
  count: number,
  statusCode = 200
) => {
  return res.status(statusCode).json({
    status: "success",
    message,
    count,
    data
  });
};