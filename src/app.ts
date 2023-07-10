import { Server } from "http";
import express, { Express } from "express";
import { inject, injectable } from "inversify";
import "reflect-metadata";

import { config } from "./config";
import { IoCTypes } from "./infrastructure";
import { IExceptionFilter } from "./common";
import { UserController } from "./core/user/UserController";

@injectable()
export class App {
	app: Express;
	server: Server;
	port: number;

	constructor(
		@inject(IoCTypes.ExceptionFilter) private exceptionFilter: IExceptionFilter,
		@inject(IoCTypes.UserController) private userController: UserController
	) {
		this.app = express();
		this.port = config.port;
	}

	private applyRoutes() {
		this.app.use("/user", this.userController.router);
	}

	private applyMiddlewares() {
		this.app.use(express.json());
	}

	private useExceptionFilter() {
		this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
	}

	public init() {
		this.applyMiddlewares();
		this.applyRoutes();
		this.useExceptionFilter();
		this.server = this.app.listen(this.port);
	}
}
