import { NextFunction, Response, Request } from "express";
import { injectable } from "inversify";
import "reflect-metadata";

import { IExceptionFilter } from "../../common";
import { HttpError } from "./http-error";
import { httpCodes } from "../../common";

@injectable()
export class ExceptionFilter implements IExceptionFilter {
	catch(error: Error | HttpError, req: Request, res: Response, next: NextFunction) {
		console.log(error);
		if (error instanceof HttpError) {
			res.status(error.statusCode).send({ error: error.message });
		} else {
			res.status(httpCodes.INTERNAL_ERROR).send({ error: error.message });
		}
	}
}
