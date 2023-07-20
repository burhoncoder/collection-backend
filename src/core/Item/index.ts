import { ContainerModule, interfaces } from "inversify";

import { IoCTypes } from "../../infrastructure";

import { IItemController } from "./interfaces/IItemController";
import { IItemRepository } from "./interfaces/IItemRepository";
import { IItemService } from "./interfaces/IItemService";
import { ItemController } from "./ItemController";
import { ItemRepository } from "./ItemRepository";
import { ItemService } from "./ItemService";

export const itemContainer = new ContainerModule((bind: interfaces.Bind) => {
	bind<IItemController>(IoCTypes.ItemController).to(ItemController);
	bind<IItemService>(IoCTypes.ItemService).to(ItemService);
	bind<IItemRepository>(IoCTypes.ItemRepository).to(ItemRepository);
});
