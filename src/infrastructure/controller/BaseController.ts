import { Response, Router } from "express";
import { injectable } from "inversify";

import { httpCodes, IControllerRoute } from "../../common";

const createTypes = {
	create: httpCodes.CREATED,
	update: httpCodes.SUCCESS,
	delete: httpCodes.NO_CONTENT,
	get: httpCodes.SUCCESS,
};

type keys = keyof typeof createTypes;

@injectable()
export abstract class BaseController {
	private readonly _router: Router;

	constructor() {
		this._router = Router();
	}

	get router() {
		return this._router;
	}

	public ok<T>(res: Response, type: keys = "create", message?: T) {
		const ultimateMessage = message || { success: true };
		res.status(createTypes[type]).send(ultimateMessage);
	}

	protected bindRoutes(routes: IControllerRoute[]) {
		for (const route of routes) {
			const boundHandler = route.handler.bind(this);
			const middlewares = route.middlewares?.map((m) => m.execute.bind(m));
			const handlers = middlewares ? [...middlewares, boundHandler] : boundHandler;
			this.router[route.method](route.path, handlers);
		}
	}
}
