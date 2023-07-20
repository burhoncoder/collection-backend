import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";

import { httpCodes, UserRole } from "../../common";
import { AccessMiddleware, BaseController, IoCTypes, ValidateMiddleware } from "../../infrastructure";
import { HttpError } from "../../infrastructure/errors/http-error";

import { UserLoginDto } from "./dto/UserLoginDto";
import { UserRegisterDto } from "./dto/UserRegisterDto";
import { IUserController } from "./interfaces/IUserController";
import { IUserService } from "./interfaces/IUserService";

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(@inject(IoCTypes.UserService) private service: IUserService) {
		super();
		this.bindRoutes([
			{
				path: "/info",
				method: "get",
				handler: this.info,
				middlewares: [new AccessMiddleware()],
			},
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
			{
				path: "/",
				method: "get",
				handler: this.list,
				middlewares: [new AccessMiddleware([UserRole.ADMIN])],
			},
		]);
	}

	async info(req: Request, res: Response, next: NextFunction) {
		const user = await this.service.getUserCredentials(req.user?.id);
		if (!user) throw new HttpError("Invalid credentials", httpCodes.AUTH_FAILED);
		res.status(httpCodes.SUCCESS).send(user);
	}

	async login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction) {
		const token = await this.service.validateUser(req.body);
		if (!token) {
			throw new HttpError("Invalid credentials", httpCodes.AUTH_FAILED);
		}

		this.ok(res, "create", token);
	}

	async register(req: Request<{}, {}, UserRegisterDto>, res: Response, next: NextFunction) {
		const user = await this.service.createUser(req.body);
		if (!user) {
			throw new HttpError("This user already exists", httpCodes.CONFLICT);
		}
		this.ok(res);
	}

	async list(req: Request<{}, {}, UserRegisterDto>, res: Response, next: NextFunction) {
		const users = await this.service.getUsers();
		this.ok(res, "get", users || []);
	}

	async updateStatus(req: Request, res: Response, next: NextFunction) {}
}
