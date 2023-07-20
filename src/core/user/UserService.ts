import { inject, injectable } from "inversify";
import { User } from "@prisma/client";
import { isArray } from "lodash";

import { httpCodes, UserRole } from "../../common";
import { IoCTypes } from "../../infrastructure";
import { HttpError } from "../../infrastructure/errors/http-error";

import { UserLoginDto } from "./dto/UserLoginDto";
import { UserRegisterDto } from "./dto/UserRegisterDto";
import { UserSingleDto } from "./dto/UserSingleDto";
import { IUserRepository } from "./interfaces/IUserRepository";
import { IUserService } from "./interfaces/IUserService";
import { UserEntity } from "./UserEtity";

@injectable()
export class UserService implements IUserService {
	constructor(@inject(IoCTypes.UserRepository) private repository: IUserRepository) {}

	async createUser(dto: UserRegisterDto): Promise<User | null> {
		const userEntity = new UserEntity(dto.login, dto.email);
		await userEntity.setPassword(dto.password);
		const existedUser = await this.repository.findByEmail(dto.email);
		if (existedUser) {
			return null;
		}
		console.log(userEntity);

		return this.repository.create(userEntity);
	}

	async validateUser(dto: UserLoginDto): Promise<string | null> {
		const existedUser = await this.repository.findByUserName(dto.login);
		if (!existedUser) {
			return null;
		}
		const userEntity = new UserEntity(
			existedUser.username,
			existedUser.email,
			existedUser.password,
			existedUser.id,
			existedUser.role as UserRole,
			existedUser.is_blocked
		);
		const isRightPassword = await userEntity.comparePassword(dto.password);

		if (!isRightPassword) return null;

		return userEntity.generateToken();
	}

	async getUserCredentials(id: number): Promise<UserSingleDto | null> {
		const user = await this.repository.findById(id);
		return new UserSingleDto(user?.id, user?.email, user?.username, user?.role);
	}

	async getUsers(): Promise<UserSingleDto[] | null> {
		const users = await this.repository.findAll();

		if (isArray(users)) {
			return users.map((user) => new UserSingleDto(user.id, user.email, user.username, user.role));
		} else return null;
	}

	async isBlocked(id: number): Promise<boolean> {
		const existedUser = await this.repository.findById(id);
		return existedUser ? existedUser.is_blocked : false;
	}

	async updateUserStatus(userId: number) {
		const existedUser = await this.repository.findById(userId);
		if (!existedUser) throw new HttpError("User not found", httpCodes.NOT_FOUND);
	}
}
