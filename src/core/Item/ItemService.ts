import { inject, injectable } from "inversify";
import { Item } from "@prisma/client";

import { IoCTypes } from "../../infrastructure";

import { IItemService } from "./interfaces/IItemService";
import { ItemRepository } from "./ItemRepository";

@injectable()
export class ItemService implements IItemService {
	constructor(@inject(IoCTypes.ItemRepository) private repository: ItemRepository) {}

	async createItem(): Promise<Item> {
		return { id: 1, name: "dasfd", is_liked: true, collection_id: 1 };
	}
}
