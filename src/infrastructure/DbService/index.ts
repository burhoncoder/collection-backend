import { injectable } from "inversify";
import { PrismaClient } from "@prisma/client";

@injectable()
export class DbService {
	client: PrismaClient;
	constructor() {
		this.client = new PrismaClient();
	}

	async connect(): Promise<void> {
		await this.client.$connect();
	}

	async disconnect(): Promise<void> {
		await this.client.$disconnect();
	}
}
