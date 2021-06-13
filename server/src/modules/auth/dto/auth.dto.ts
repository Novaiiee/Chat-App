import { User } from "./../../user/user.model";

export interface RegisterDTO {
  name: string;
  password: string;
  email: string;
  username: string;
}

export interface LoginDTO extends Pick<RegisterDTO, "email" | "password"> {}

export interface LoginResultDTO {
  token: string;
  user: User;
}