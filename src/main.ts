import { Container } from "inversify";
import { configDotenv } from "dotenv";

import { App } from "./app";
import { ExceptionFilter, IoCTypes } from "./infrastructure";
import { userContainer } from "./core/user";
import { IExceptionFilter } from "./common";

const main = () => {
	configDotenv();

	const appContainer = new Container();
	appContainer.bind<App>(IoCTypes.Application).to(App);
	appContainer.bind<IExceptionFilter>(IoCTypes.ExceptionFilter).to(ExceptionFilter);
	appContainer.load(userContainer);

	const app = appContainer.get<App>(IoCTypes.Application);
	app.init();
};

main();
