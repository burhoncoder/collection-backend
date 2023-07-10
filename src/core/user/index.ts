import { ContainerModule, interfaces } from "inversify";

import { IUserController } from "./interfaces/IUserController";
import { IUserService } from "./interfaces/IUserService";
import { IUserRepository } from "./interfaces/IUserRepository";
import { UserController } from "./UserController";
import { UserService } from "./UserService";
import { UserRepository } from "./UserRepository";
import { IoCTypes } from "../../infrastructure";

export const userContainer = new ContainerModule((bind: interfaces.Bind) => {
	bind<IUserController>(IoCTypes.UserController).to(UserController);
	bind<IUserService>(IoCTypes.UserService).to(UserService);
	bind<IUserRepository>(IoCTypes.UserRepository).to(UserRepository);
});

export type { IUserController } from "./interfaces/IUserController";
