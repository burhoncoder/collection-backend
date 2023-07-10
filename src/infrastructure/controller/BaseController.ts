import { Router } from "express";
import { injectable } from "inversify";
import "reflect-metadata";

import { IControllerRoute } from "../../common";

@injectable()
export abstract class BaseController {
	private readonly _router: Router;

	constructor() {
		this._router = Router();
	}

	get router() {
		return this._router;
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
