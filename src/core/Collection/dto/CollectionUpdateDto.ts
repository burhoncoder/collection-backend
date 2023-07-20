import { CollectionToField } from "@prisma/client";

import { IsArray, IsNumber, IsString } from "class-validator";

export class CollectionUpdateDto {
	@IsString()
	public name: string;

	@IsString()
	public description: string;

	@IsNumber()
	public topic_id: number;

	@IsArray()
	public collection_fields: CollectionToField[];
}
