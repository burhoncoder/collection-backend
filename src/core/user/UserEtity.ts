import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { UserRole } from "../../common";

export class UserEntity {
	passwordHash: string;
	role: UserRole;
	id: number;
	is_blocked: boolean;

	constructor(public username: string, public email: string, passwordHash?: string, id?: number, role?: UserRole, is_blocked = false) {
		this.role = role ? role : UserRole.ADMIN;
		if (passwordHash) this.passwordHash = passwordHash;
		if (id) this.id = id;
		this.is_blocked = is_blocked;
	}

	async setPassword(password: string): Promise<void> {
		this.passwordHash = await hash(password, Number(process.env.SALT));
	}

	async comparePassword(password: string): Promise<boolean> {
		return await compare(password, this.passwordHash);
	}

	generateToken() {
		return sign(
			{
				user_id: this.id,
				role: this.role,
			},
			process.env.SECRET || "",
			{
				algorithm: "HS256",
				expiresIn: "1d",
			}
		);
	}
}
