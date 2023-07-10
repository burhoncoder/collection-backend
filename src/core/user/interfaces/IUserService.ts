import { UserLoginDto } from "../dto/UserLoginDto";
import { UserRegisterDto } from "../dto/UserRegisterDto";

export interface IUserService {
	createUser: (dto: UserLoginDto) => void;
	validateUser: (dto: UserRegisterDto) => void;
	getCredentials: () => void;
}
