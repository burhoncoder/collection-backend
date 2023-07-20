import { NextFunction, Request, Response } from "express";
import { injectable } from "inversify";

import { IExceptionFilter } from "../../common";
import { httpCodes } from "../../common";

import { HttpError } from "./http-error";

@injectable()
export class ExceptionFilter implements IExceptionFilter {
	catch(error: Error | HttpError, req: Request, res: Response, next: NextFunction) {
		console.log(error);

		if (error instanceof HttpError) {
			res.status(error.statusCode).send({ status: error.statusCode, error: error.message });
		} else {
			res.status(httpCodes.INTERNAL_ERROR).send({ error: "Internal server error" });
		}
	}
}
