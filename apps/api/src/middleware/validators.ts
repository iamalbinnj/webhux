import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";
import { ApiError } from "./errorHandler";

type Source = "body" | "params" | "query";

export const validate =
  (schema: ZodType, source: Source = "body") =>
  (req: Request, res: Response, next: NextFunction) => {
    const data = req[source];
    const result = schema.safeParse(data);

    if (!result.success) {
      const message = result.error.issues
        .map((issue) => `${issue.path.join(".") || source}: ${issue.message}`)
        .join("; ");

      throw new ApiError(message, 400);
    }

    req[source] = result.data; // overwrite with parsed data
    next();
  };