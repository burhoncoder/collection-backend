import { inject, injectable } from "inversify";
import { Collection } from "@prisma/client";

import { DbService, IoCTypes } from "../../infrastructure";

import { CollectionCreateDto } from "./dto/CollectionCreateDto";
import { CollectionUpdateDto } from "./dto/CollectionUpdateDto";
import { ICollectionRepository } from "./interfaces/ICollectionRepository";

@injectable()
export class CollectionRepository implements ICollectionRepository {
	constructor(@inject(IoCTypes.DbService) private dbService: DbService) {}

	async findById(id: number): Promise<Collection | null> {
		return this.dbService.client.collection.findUnique({
			where: {
				id,
			},
		});
	}

	async findAll(): Promise<Collection[]> {
		return this.dbService.client.collection.findMany({
			include: {
				topic: true,
				user: true,
			},
		});
	}

	async create({ name, description, user_id, topic_id, collection_fields }: CollectionCreateDto): Promise<Collection> {
		return this.dbService.client.collection.create({
			data: {
				name,
				description,
				user_id,
				topic_id,
				CollectionToField: {
					createMany: {
						data: collection_fields,
					},
				},
			},
		});
	}

	async update(id: number, { name, description, topic_id, collection_fields }: CollectionUpdateDto): Promise<Collection> {
		await this.dbService.client.collectionToField.deleteMany({
			where: {
				collection_id: id,
			},
		});

		return this.dbService.client.collection.update({
			data: {
				name,
				description,
				topic_id,
				CollectionToField: {
					createMany: {
						data: collection_fields,
					},
				},
			},
			where: {
				id,
			},
		});
	}

	async delete(id: number): Promise<Collection> {
		return this.dbService.client.collection.delete({
			where: {
				id: id,
			},
		});
	}
}
