import { IsEmail, IsString } from "class-validator";

export class UserRegisterDto {
	@IsEmail({}, { message: "Incorrect email" })
	email: string;

	@IsString({ message: "Empty login" })
	login: string;

	@IsString({ message: "Empty password" })
	password: string;
}
