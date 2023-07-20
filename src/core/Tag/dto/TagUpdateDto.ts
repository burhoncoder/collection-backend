import { IsString } from "class-validator";

export class TagUpdateDto {
	@IsString()
	public name: string;

	public id: number;
}
