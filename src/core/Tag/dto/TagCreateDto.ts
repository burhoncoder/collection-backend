import { IsString } from "class-validator";

export class TagCreateDto {
	@IsString()
	public name: string;
}
