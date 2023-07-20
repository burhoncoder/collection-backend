import { Collection } from "@prisma/client";

import { CollectionCreateDto } from "../dto/CollectionCreateDto";
import { CollectionUpdateDto } from "../dto/CollectionUpdateDto";

export interface ICollectionRepository {
	create: (tag: CollectionCreateDto) => Promise<Collection>;
	delete: (id: number) => Promise<Collection>;
	update(id: number, dto: CollectionUpdateDto): Promise<Collection | null>;
	findById: (id: number) => Promise<Collection | null>;
	findAll: () => Promise<Collection[]>;
}
