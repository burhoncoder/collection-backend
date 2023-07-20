import { inject, injectable } from "inversify";
import { User } from "@prisma/client";

import { DbService, IoCTypes } from "../../infrastructure";

import { IUserRepository } from "./interfaces/IUserRepository";
import { UserEntity } from "./UserEtity";

@injectable()
export class UserRepository implements IUserRepository {
	constructor(@inject(IoCTypes.DbService) private dbService: DbService) {}

	create({ username, email, passwordHash, role, is_blocked }: UserEntity): Promise<User> {
		return this.dbService.client.user.create({
			data: {
				username,
				email,
				role,
				password: passwordHash,
				is_blocked,
			},
		});
	}

	find(email: string): Promise<User | null> {
		return this.dbService.client.user.findFirst({
			where: {
				email,
			},
		});
	}

	findAll(): Promise<User[] | null> {
		return this.dbService.client.user.findMany();
	}

	findByUserName(username: string) {
		return this.dbService.client.user.findUnique({
			where: {
				username,
			},
		});
	}

	findByEmail(email: string) {
		return this.dbService.client.user.findUnique({
			where: {
				email,
			},
		});
	}

	findById(id: number) {
		return this.dbService.client.user.findUnique({
			where: {
				id,
			},
		});
	}

	updateStatus(id: number) {
		this.dbService.client.user.update({
			where: {
				id,
			},
			data: {
				is_blocked: false,
			},
		});
	}
}
