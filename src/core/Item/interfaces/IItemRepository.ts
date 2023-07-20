import { Item } from "@prisma/client";

export interface IItemRepository {
	create: () => Promise<Item>;
}
