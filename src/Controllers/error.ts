import { NextFunction, Request, Response } from "express";
export const errorController = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof SyntaxError && (err as any).status === 400 && "body" in err) {
    console.log(err);
    res.status(400).send({ error: "Invalid JSON" });
  } else {
    next(err);
  }
};
