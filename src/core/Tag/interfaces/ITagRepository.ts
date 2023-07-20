import { Tag } from "@prisma/client";

import { TagCreateDto } from "../dto/TagCreateDto";
import { TagUpdateDto } from "../dto/TagUpdateDto";

export interface ITagRepository {
	create: (tag: TagCreateDto) => Promise<Tag>;
	update: (tag: TagUpdateDto) => Promise<Tag>;
	delete: (id: number) => Promise<Tag>;
	findAll: () => Promise<Tag[]>;
	findById: (id: number) => Promise<Tag | null>;
}
