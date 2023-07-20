import { Item } from "@prisma/client";

export interface IItemService {
	createItem: () => Promise<Item>;
}
