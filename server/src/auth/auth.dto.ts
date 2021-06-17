import { IsEmail, IsNotEmpty } from "class-validator";
import { User } from "../user/user.model";

export class RegisterDTO {
  @IsNotEmpty()
  realName: string;

  @IsNotEmpty()
  password: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  displayName: string;
}

export class LoginDTO {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export interface AuthResult {
  token: string;
  user: User;
}
