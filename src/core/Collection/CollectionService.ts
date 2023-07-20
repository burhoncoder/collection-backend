import { inject, injectable } from "inversify";
import { Collection } from "@prisma/client";

import { IoCTypes } from "../../infrastructure";

import { CollectionCreateDto } from "./dto/CollectionCreateDto";
import { CollectionUpdateDto } from "./dto/CollectionUpdateDto";
import { ICollectionRepository } from "./interfaces/ICollectionRepository";
import { ICollectionService } from "./interfaces/ICollectionService";

@injectable()
export class CollectionService implements ICollectionService {
	constructor(@inject(IoCTypes.CollectionRepository) private repository: ICollectionRepository) {}

	async createCollection(dto: CollectionCreateDto): Promise<Collection | null> {
		return this.repository.create(dto);
	}

	async updateCollection(collectionId: number, dto: CollectionUpdateDto): Promise<Collection | null> {
		const existedCollection = await this.repository.findById(collectionId);
		if (!existedCollection) return null;

		return this.repository.update(collectionId, dto);
	}

	async deleteCollection(collectionId: number): Promise<Collection | null> {
		const existedCollection = await this.repository.findById(collectionId);

		if (!existedCollection) return null;

		return this.repository.delete(collectionId);
	}

	async getCollections(): Promise<Collection[]> {
		return this.repository.findAll();
	}

	async getCollection(collectionId: number): Promise<Collection | null> {
		const existedCollection = await this.repository.findById(collectionId);

		return existedCollection || null;
	}
}
