import { ContainerModule, interfaces } from "inversify";

import { IoCTypes } from "../../infrastructure";

import { IUserController } from "./interfaces/IUserController";
import { IUserRepository } from "./interfaces/IUserRepository";
import { IUserService } from "./interfaces/IUserService";
import { UserController } from "./UserController";
import { UserRepository } from "./UserRepository";
import { UserService } from "./UserService";

export const userContainer = new ContainerModule((bind: interfaces.Bind) => {
	bind<IUserController>(IoCTypes.UserController).to(UserController);
	bind<IUserService>(IoCTypes.UserService).to(UserService);
	bind<IUserRepository>(IoCTypes.UserRepository).to(UserRepository);
});

export type { IUserController } from "./interfaces/IUserController";
