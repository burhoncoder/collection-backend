import { inject, injectable } from "inversify";
import { Item } from "@prisma/client";

import { DbService, IoCTypes } from "../../infrastructure";

import { IItemRepository } from "./interfaces/IItemRepository";

@injectable()
export class ItemRepository implements IItemRepository {
	constructor(@inject(IoCTypes.DbService) private dbService: DbService) {}

	create(): Promise<Item> {
		return this.dbService.client.item.create({
			data: {
				collection_id: 1,
				name: "",
				is_liked: false,
			},
		});
	}
}
