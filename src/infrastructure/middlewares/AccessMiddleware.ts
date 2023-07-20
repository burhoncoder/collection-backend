import { NextFunction, Request, Response } from "express";
import { isObject } from "lodash";

import { httpCodes, IMiddleware, UserRole } from "../../common";

import { HttpError } from "../errors/http-error";

export class AccessMiddleware implements IMiddleware {
	constructor(private role: UserRole[] = [UserRole.USER, UserRole.ADMIN]) {}

	execute(req: Request, res: Response, next: NextFunction): void {
		if (!isObject(req.user)) {
			throw new HttpError("Authorization failed", httpCodes.AUTH_FAILED);
		} else {
			if (this.role.includes(req.user.role as UserRole)) next();
			else throw new HttpError("Forbidden", httpCodes.FORBIDDEN);
		}
	}
}
