import { IsString } from "class-validator";

export class UserLoginDto {
	@IsString({ message: "Empty login" })
	login: string;

	@IsString({ message: "Empty password" })
	password: string;
}
