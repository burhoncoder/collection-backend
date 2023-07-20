import { User } from "@prisma/client";

import { UserEntity } from "../UserEtity";

export interface IUserRepository {
	create: (user: UserEntity) => Promise<User>;
	find: (email: string) => Promise<User | null>;
	findByUserName: (username: string) => Promise<User | null>;
	findById: (id: number) => Promise<User | null>;
	findByEmail: (email: string) => Promise<User | null>;
	findAll: () => Promise<User[] | null>;
}
