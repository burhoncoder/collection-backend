import { NextFunction, Request, Response } from "express";
import { injectable } from "inversify";
import "reflect-metadata";

import { BaseController, ValidateMiddleware } from "../../infrastructure";
import { IUserController } from "./interfaces/IUserController";
import { UserLoginDto } from "./dto/UserLoginDto";
import { UserRegisterDto } from "./dto/UserRegisterDto";

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor() {
		super();
		this.bindRoutes([
			{
				path: "/sign-in",
				method: "post",
				handler: this.login,
				middlewares: [new ValidateMiddleware(UserLoginDto)],
			},
			{
				path: "/sign-up",
				method: "post",
				handler: this.register,
				middlewares: [new ValidateMiddleware(UserRegisterDto)],
			},
		]);
	}

	login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction) {
		res.send({ success: true });
	}

	register(req: Request<{}, {}, UserRegisterDto>, res: Response, next: NextFunction) {
		res.send({ success: true });
	}
}
