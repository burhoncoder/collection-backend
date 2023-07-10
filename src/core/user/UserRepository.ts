import { injectable } from "inversify";
import "reflect-metadata";
import { IUserRepository } from "./interfaces/IUserRepository";

@injectable()
export class UserRepository implements IUserRepository {
	constructor() {}

	test(): void {}
}
