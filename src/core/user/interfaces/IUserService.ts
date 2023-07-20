import { User } from "@prisma/client";

import { UserLoginDto } from "../dto/UserLoginDto";
import { UserRegisterDto } from "../dto/UserRegisterDto";
import { UserSingleDto } from "../dto/UserSingleDto";

export interface IUserService {
	createUser: (dto: UserRegisterDto) => Promise<User | null>;
	validateUser: (dto: UserLoginDto) => Promise<string | null>;
	getUserCredentials: (id: number) => Promise<UserSingleDto | null>;
	getUsers: () => Promise<UserSingleDto[] | null>;
	isBlocked: (id: number) => Promise<boolean>;
}
