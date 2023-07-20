import "reflect-metadata";
import "express-async-errors";

import { Container } from "inversify";
import { configDotenv } from "dotenv";

import { IExceptionFilter } from "./common";
import { DbService, ExceptionFilter, IoCTypes } from "./infrastructure";
import { IsBlockedMiddleware } from "./infrastructure/middlewares/IsBlockedMiddleware";

import { App } from "./app";
import { collectionContainer } from "./core/Collection";
import { itemContainer } from "./core/Item";
import { tagContainer } from "./core/Tag";
import { userContainer } from "./core/user";

const main = async () => {
	configDotenv();

	const appContainer = new Container();
	appContainer.load(userContainer);
	appContainer.load(tagContainer);
	appContainer.load(collectionContainer);
	appContainer.load(itemContainer);

	appContainer.bind<App>(IoCTypes.Application).to(App);
	appContainer.bind<IExceptionFilter>(IoCTypes.ExceptionFilter).to(ExceptionFilter);
	appContainer.bind<DbService>(IoCTypes.DbService).to(DbService);
	appContainer.bind<IsBlockedMiddleware>(IoCTypes.IsBlockedMiddleware).to(IsBlockedMiddleware);

	const app = appContainer.get<App>(IoCTypes.Application);
	await app.init();
};

main();
