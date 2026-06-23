import rateLimit from "express-rate-limit";

export const apiRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
});

export const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
});

export const webhookRateLimit = rateLimit({
  windowMs: 60 * 1000,
  max: 1000,
});