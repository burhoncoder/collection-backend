import { inject, injectable } from "inversify";
import { Tag } from "@prisma/client";

import { IoCTypes } from "../../infrastructure";

import { TagCreateDto } from "./dto/TagCreateDto";
import { TagUpdateDto } from "./dto/TagUpdateDto";
import { ITagRepository } from "./interfaces/ITagRepository";
import { ITagService } from "./interfaces/ITagService";

@injectable()
export class TagService implements ITagService {
	constructor(@inject(IoCTypes.TagRepository) private repository: ITagRepository) {}

	async getTags(): Promise<Tag[] | null> {
		return await this.repository.findAll();
	}

	async createTag(dto: TagCreateDto): Promise<Tag | null> {
		return this.repository.create(dto);
	}

	async updateTag(dto: TagUpdateDto): Promise<Tag | null> {
		const existedTag = await this.repository.findById(dto.id);

		if (!existedTag) return null;

		return this.repository.update(dto);
	}

	async deleteTag(tagId: number): Promise<Tag | null> {
		const existedTag = await this.repository.findById(tagId);

		if (!existedTag) return null;

		return await this.repository.delete(tagId);
	}
}
