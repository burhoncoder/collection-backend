import { HttpError } from "../../infrastructure/errors/http-error";
import { NextFunction, Response, Request } from "express";

export interface IExceptionFilter {
	catch: (err: Error | HttpError, req: Request, res: Response, next: NextFunction) => void;
}
