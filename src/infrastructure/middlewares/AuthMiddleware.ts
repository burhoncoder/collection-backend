import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { isObject, isString } from "lodash";

import { IMiddleware } from "../../common";

export class AuthMiddleware implements IMiddleware {
	execute(req: Request, res: Response, next: NextFunction): void {
		if (isString(req.headers.authorization)) {
			const token = req.headers.authorization.split(" ")[1];
			verify(token, process.env.SECRET || "", (err, payload) => {
				if (err) next();
				else if (isObject(payload) && "user_id" in payload && "role" in payload) {
					req.user = {
						id: payload.user_id,
						role: payload.role,
					};
					next();
				} else next();
			});
		} else next();
	}
}
