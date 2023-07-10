import { injectable } from "inversify";
import "reflect-metadata";

import { IUserService } from "./interfaces/IUserService";
import { UserLoginDto } from "./dto/UserLoginDto";
import { UserRegisterDto } from "./dto/UserRegisterDto";

@injectable()
export class UserService implements IUserService {
	constructor() {}

	createUser(dto: UserLoginDto): void {}

	getCredentials(): void {}

	validateUser(dto: UserRegisterDto): void {}
}
