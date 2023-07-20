import { Collection } from "@prisma/client";

import { CollectionCreateDto } from "../dto/CollectionCreateDto";
import { CollectionUpdateDto } from "../dto/CollectionUpdateDto";

export interface ICollectionService {
	createCollection: (dto: CollectionCreateDto) => Promise<Collection | null>;
	updateCollection: (collectionId: number, dto: CollectionUpdateDto) => Promise<Collection | null>;
	deleteCollection: (collectionId: number) => Promise<Collection | null>;
	getCollections: () => Promise<Collection[]>;
	getCollection: (collectionId: number) => Promise<Collection | null>;
}
