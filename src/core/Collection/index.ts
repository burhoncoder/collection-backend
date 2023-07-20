import { ContainerModule, interfaces } from "inversify";

import { IoCTypes } from "../../infrastructure";

import { CollectionController } from "./CollectionController";
import { CollectionRepository } from "./CollectionRepository";
import { CollectionService } from "./CollectionService";
import { ICollectionController } from "./interfaces/ICollectionController";
import { ICollectionRepository } from "./interfaces/ICollectionRepository";
import { ICollectionService } from "./interfaces/ICollectionService";

export const collectionContainer = new ContainerModule((bind: interfaces.Bind) => {
	bind<ICollectionController>(IoCTypes.CollectionController).to(CollectionController);
	bind<ICollectionService>(IoCTypes.CollectionService).to(CollectionService);
	bind<ICollectionRepository>(IoCTypes.CollectionRepository).to(CollectionRepository);
});
