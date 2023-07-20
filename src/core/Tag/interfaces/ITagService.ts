import { Tag } from "@prisma/client";

import { TagCreateDto } from "../dto/TagCreateDto";
import { TagUpdateDto } from "../dto/TagUpdateDto";

export interface ITagService {
	createTag: (dto: TagCreateDto) => Promise<Tag | null>;
	updateTag: (dto: TagUpdateDto) => Promise<Tag | null>;
	deleteTag: (tagId: number) => Promise<Tag | null>;
	getTags: () => Promise<Tag[] | null>;
}
