import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";

import { httpCodes, IMiddleware } from "../../common";

import { IUserService } from "../../core/user/interfaces/IUserService";
import { HttpError } from "../errors/http-error";
import { IoCTypes } from "../IoC";

@injectable()
export class IsBlockedMiddleware implements IMiddleware {
	constructor(@inject(IoCTypes.UserService) private userService: IUserService) {}

	async execute(req: Request, res: Response, next: NextFunction) {
		const isBlocked = await this.userService.isBlocked(req.user.id);

		if (isBlocked) throw new HttpError("You are blocked", httpCodes.FORBIDDEN);
		else next();
	}
}
