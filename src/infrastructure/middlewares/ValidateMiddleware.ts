import { NextFunction, Request, Response } from "express";

import { httpCodes, IMiddleware } from "../../common";

import { ClassConstructor, plainToClass } from "class-transformer";
import { validate } from "class-validator";

export class ValidateMiddleware implements IMiddleware {
	constructor(private classToValidate: ClassConstructor<object>) {}
	execute(req: Request, res: Response, next: NextFunction): void {
		const dto = plainToClass(this.classToValidate, req.body);

		validate(dto).then((errors) => {
			if (errors.length > 0) {
				const errorObj = errors.reduce(
					(acc, curr) => ({
						...acc,
						[curr.property]: Object.values(curr.constraints || {}).join(","),
					}),
					{}
				);

				res.status(httpCodes.UNPROCESSABLE_CONTENT).send(errorObj);
			} else {
				next();
			}
		});
	}
}
