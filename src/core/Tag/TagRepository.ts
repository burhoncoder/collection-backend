import { inject, injectable } from "inversify";
import { Tag } from "@prisma/client";

import { DbService, IoCTypes } from "../../infrastructure";

import { TagCreateDto } from "./dto/TagCreateDto";
import { TagUpdateDto } from "./dto/TagUpdateDto";
import { ITagRepository } from "./interfaces/ITagRepository";

@injectable()
export class TagRepository implements ITagRepository {
	constructor(@inject(IoCTypes.DbService) private dbService: DbService) {}

	async create({ name }: TagCreateDto): Promise<Tag> {
		return this.dbService.client.tag.create({
			data: { name },
		});
	}

	async update({ id, name }: TagUpdateDto): Promise<Tag> {
		return this.dbService.client.tag.update({
			data: {
				name,
			},
			where: {
				id,
			},
		});
	}

	async delete(id: number) {
		return this.dbService.client.tag.delete({
			where: {
				id,
			},
		});
	}

	async findAll(): Promise<Tag[]> {
		return this.dbService.client.tag.findMany({});
	}

	async findById(id: number): Promise<Tag | null> {
		return this.dbService.client.tag.findUnique({
			where: {
				id,
			},
		});
	}
}
