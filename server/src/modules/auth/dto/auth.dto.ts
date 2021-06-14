import { User } from "./../../user/user.model";

export interface RegisterDTO {
  realName: string;
  password: string;
  email: string;
  displayName: string;
}

export interface LoginDTO extends Pick<RegisterDTO, "email" | "password"> {}

export interface AuthResult {
  token: string;
  user: User;
}