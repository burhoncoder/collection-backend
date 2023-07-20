import { Server } from "http";
import express, { Express, NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import cors from "cors";

import { httpCodes, IExceptionFilter } from "./common";
import { AuthMiddleware, DbService, IoCTypes } from "./infrastructure";
import { config } from "./config";

import { CollectionController } from "./core/Collection/CollectionController";
import { ItemController } from "./core/Item/ItemController";
import { TagController } from "./core/Tag/TagController";
import { UserController } from "./core/user/UserController";

@injectable()
export class App {
	app: Express;
	server: Server;
	port: number;

	constructor(
		@inject(IoCTypes.ExceptionFilter) private exceptionFilter: IExceptionFilter,
		@inject(IoCTypes.DbService) private dbService: DbService,
		@inject(IoCTypes.UserController) private userController: UserController,
		@inject(IoCTypes.TagController) private tagController: TagController,
		@inject(IoCTypes.CollectionController) private collectionController: CollectionController,
		@inject(IoCTypes.ItemController) private itemController: ItemController
	) {
		this.app = express();
		this.port = config.port;
	}

	private applyRoutes() {
		this.app.use("/user", this.userController.router);
		this.app.use("/tag", this.tagController.router);
		this.app.use("/collection", this.collectionController.router);
		this.app.use("/item", this.itemController.router);
	}

	private applyMiddlewares() {
		const authMiddleware = new AuthMiddleware();
		this.app.use(express.json());
		this.app.use(authMiddleware.execute.bind(authMiddleware));
		this.app.use(cors({}));
	}

	private useExceptionFilter() {
		this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
	}

	private unknownRouteHandler() {
		this.app.all("*", (req: Request, res: Response, next: NextFunction) => {
			res.status(httpCodes.NOT_FOUND).send({ error: "Page not found" });
			next();
		});
	}

	public async init() {
		await this.dbService.connect();
		this.applyMiddlewares();
		this.applyRoutes();
		this.useExceptionFilter();
		this.unknownRouteHandler();
		this.server = this.app.listen(this.port);
	}
}
