import { RequestHandler } from "express";
import { DI } from "./bootstrap";

export const createEntityManagerContext: RequestHandler = (
  req: any,
  res,
  next
) => {
  req.em = DI.orm?.em.fork();
  next();
};
